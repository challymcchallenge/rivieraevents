// Capturi full-page ale site-ului construit, cu emulare reală de viewport (Chrome DevTools Protocol).
// Pornește `next start` pe 127.0.0.1:3100 și o instanță Chrome headless separată, apoi le închide.
// Utilizare: node scripts/shot.mjs <user-data-dir temporar> <folder ieșire> /cale1 /cale2 ... [--dark] [--widths=390,1440]
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const [udd, outDir, ...rest] = process.argv.slice(2);
const dark = rest.includes('--dark');
const widthsArg = rest.find((a) => a.startsWith('--widths='));
const widths = widthsArg ? widthsArg.split('=')[1].split(',').map(Number) : [390, 1440];
const paths = rest.filter((a) => a.startsWith('/'));
if (!udd || !outDir || !paths.length) throw new Error('utilizare: shot.mjs <udd> <out> /cale ...');
mkdirSync(outDir, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', '3100', '-H', '127.0.0.1'], { stdio: 'ignore' });
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--remote-debugging-address=127.0.0.1',
  '--remote-debugging-port=9334', `--user-data-dir=${udd}`, 'about:blank'], { stdio: 'ignore' });

try {
  for (let i = 0; i < 80; i++) { try { await fetch('http://127.0.0.1:3100/'); break; } catch { await sleep(250); } }
  let wsUrl;
  for (let i = 0; i < 60 && !wsUrl; i++) {
    try { wsUrl = (await (await fetch('http://127.0.0.1:9334/json/list')).json()).find((t) => t.type === 'page')?.webSocketDebuggerUrl; } catch { /* pornește */ }
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
  const evalJs = (expression, awaitPromise = false) => send('Runtime.evaluate', { expression, awaitPromise, returnByValue: true });
  await send('Page.enable'); await send('Runtime.enable');

  for (const p of paths) {
    for (const w of widths) {
      const mobile = w < 768;
      await send('Emulation.setDeviceMetricsOverride', { width: w, height: mobile ? 844 : 900, deviceScaleFactor: 1, mobile });
      let loaded = once('Page.loadEventFired');
      await send('Page.navigate', { url: `http://127.0.0.1:3100${p}` });
      await loaded;
      // fără bula WhatsApp în capturi și cu tema cerută
      await evalJs(`sessionStorage.setItem('riviera-bula-wa','1');localStorage.setItem('riviera-tema','${dark ? 'dark' : 'light'}')`);
      loaded = once('Page.loadEventFired');
      await send('Page.reload'); await loaded;
      await evalJs('document.fonts.ready.then(()=>true)', true);
      // derulare până jos, ca să se încarce pozele lazy
      await evalJs(`(async()=>{for(let y=0;y<document.body.scrollHeight;y+=500){scrollTo(0,y);await new Promise(r=>setTimeout(r,250))}const imgs=[...document.images];await Promise.race([Promise.all(imgs.map(i=>i.complete?1:new Promise(r=>{i.onload=i.onerror=r}))),new Promise(r=>setTimeout(r,25000))]);scrollTo(0,0);await new Promise(r=>setTimeout(r,1200));return imgs.filter(i=>!i.complete||!i.naturalWidth).length})()`, true);
      const ov = await evalJs('document.documentElement.scrollWidth - innerWidth');
      const { cssContentSize } = await send('Page.getLayoutMetrics');
      const h = Math.min(Math.ceil(cssContentSize.height), 16000);
      const { data } = await send('Page.captureScreenshot', { format: 'jpeg', quality: 72, captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: h, scale: 1 } });
      const name = `${(p === '/' ? 'acasa' : p.slice(1).replace(/\//g, '_'))}-${w}${dark ? '-dark' : ''}.jpg`;
      writeFileSync(path.join(outDir, name), Buffer.from(data, 'base64'));
      console.log(`${name}: ${w}x${h}, depășire orizontală ${ov.result.value}px`);
    }
  }
  ws.close();
} finally {
  chrome.kill(); server.kill();
}
