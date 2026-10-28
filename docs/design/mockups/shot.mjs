// Capturi full-page ale machetelor, cu emulare reală de viewport (Chrome DevTools Protocol).
// Utilizare: node docs/design/mockups/shot.mjs <user-data-dir temporar>
// Pornește o instanță Chrome headless separată, doar pe 127.0.0.1, și o închide la final.
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9333;
const here = path.dirname(fileURLToPath(import.meta.url));
const udd = process.argv[2];
if (!udd) throw new Error('lipsește user-data-dir');

const JOBS = [];
for (const theme of ['luminos', 'intunecat']) {
  JOBS.push({ s: 'acasa', theme, name: 'mobil', width: 390, height: 844, mobile: true });
  JOBS.push({ s: 'acasa', theme, name: 'desktop', width: 1440, height: 900, mobile: false });
}

const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--remote-debugging-address=127.0.0.1',
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${udd}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let wsUrl;
for (let i = 0; i < 60 && !wsUrl; i++) {
  try {
    const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    wsUrl = list.find((t) => t.type === 'page')?.webSocketDebuggerUrl;
  } catch { /* încă pornește */ }
  if (!wsUrl) await sleep(250);
}
const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let seq = 0; const pending = new Map(); const waiters = [];
ws.addEventListener('message', (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(m.error.message)) : res(m.result); }
  else if (m.method) waiters.filter((w) => w.method === m.method).forEach((w) => { waiters.splice(waiters.indexOf(w), 1); w.res(m.params); });
});
const send = (method, params = {}) => new Promise((res, rej) => { const id = ++seq; pending.set(id, { res, rej }); ws.send(JSON.stringify({ id, method, params })); });
const once = (method) => new Promise((res) => waiters.push({ method, res }));

await send('Page.enable');
await send('Runtime.enable');
try {
  for (const j of JOBS) {
    await send('Emulation.setDeviceMetricsOverride', { width: j.width, height: j.height, deviceScaleFactor: 1, mobile: j.mobile });
    const loaded = once('Page.loadEventFired');
    await send('Page.navigate', { url: pathToFileURL(path.join(here, `${j.s}.html`)).href + (j.theme === 'intunecat' ? '?theme=dark' : '') });
    await loaded;
    await send('Runtime.evaluate', { expression: 'document.fonts.ready.then(() => true)', awaitPromise: true });
    await sleep(800);
    const ov = await send('Runtime.evaluate', { expression: 'document.documentElement.scrollWidth - innerWidth', returnByValue: true });
    const { cssContentSize } = await send('Page.getLayoutMetrics');
    const h = Math.ceil(cssContentSize.height);
    const { data } = await send('Page.captureScreenshot', { format: 'jpeg', quality: 80, captureBeyondViewport: true,
      clip: { x: 0, y: 0, width: j.width, height: h, scale: 1 } });
    const out = path.join(here, `${j.s}-${j.theme}-${j.name}.jpg`);
    writeFileSync(out, Buffer.from(data, 'base64'));
    console.log(`${j.s}-${j.theme}-${j.name}: ${j.width}x${h}, depășire orizontală ${ov.result.value}px`);
  }
} finally {
  ws.close(); chrome.kill();
}
