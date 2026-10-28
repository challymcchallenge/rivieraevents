import { Fragment, type ReactNode } from 'react';

/**
 * Afișează textul din content/pagini/*.mdx. Suportă doar ce folosesc textele noastre:
 * ### titluri, paragrafe, liste cu „-”, tabele cu „|”, **bold**, `cod` și [linkuri](url).
 * Nu folosește HTML din text (fără dangerouslySetInnerHTML).
 */
function inline(text: string, key = 0): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = key;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<strong key={i++}>{inline(m[1], i * 100)}</strong>);
    else if (m[2]) out.push(<code key={i++} className="text-[0.92em]">{m[2]}</code>);
    else if (m[3]) {
      const ext = /^https?:/.test(m[4]);
      out.push(<a key={i++} href={m[4]} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{m[3]}</a>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Inline({ text }: { text: string }) {
  return <>{inline(text)}</>;
}

export default function Prose({ text, className = '' }: { text: string; className?: string }) {
  const blocks = text.replace(/\r/g, '').split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className={`prose-riviera ${className}`}>
      {blocks.map((b, bi) => {
        if (b.startsWith('### ')) {
          const [h, ...rest] = b.split('\n');
          return (
            <Fragment key={bi}>
              <h3>{inline(h.slice(4))}</h3>
              {rest.length > 0 && <p>{inline(rest.join(' '))}</p>}
            </Fragment>
          );
        }
        const lines = b.split('\n');
        if (lines.every((l) => l.startsWith('- '))) {
          return <ul key={bi}>{lines.map((l, li) => <li key={li}>{inline(l.slice(2))}</li>)}</ul>;
        }
        if (lines.every((l) => l.trim().startsWith('|'))) {
          const rows = lines.filter((l) => !/^\|\s*-/.test(l.trim())).map((l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim()));
          const [head, ...body] = rows;
          return (
            <table key={bi}>
              <thead><tr>{head.map((c, ci) => <th key={ci} scope="col">{inline(c)}</th>)}</tr></thead>
              <tbody>{body.map((r, ri) => <tr key={ri}>{r.map((c, ci) => <td key={ci}>{inline(c)}</td>)}</tr>)}</tbody>
            </table>
          );
        }
        return <p key={bi}>{inline(lines.join(' '))}</p>;
      })}
    </div>
  );
}
