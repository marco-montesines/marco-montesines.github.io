import { useState, type ReactNode } from "react";

const WELCOME = `# Markdown

A little markdown pad — type on the left, see it rendered on the
right.

## What works

- **Bold** and *italic* text
- Inline \`code\`
- Headings with #, ##, ###
- Bullet lists like this one

Nothing you type leaves this window.`;

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("**")) {
      out.push(<strong key={key++}>{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith("`")) {
      out.push(<code key={key++}>{tok.slice(1, -1)}</code>);
    } else {
      out.push(<em key={key++}>{tok.slice(1, -1)}</em>);
    }
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function render(md: string): ReactNode[] {
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  let key = 0;
  const flushList = () => {
    if (!list.length) return;
    blocks.push(
      <ul key={key++}>
        {list.map((item, i) => (
          <li key={i}>{inline(item)}</li>
        ))}
      </ul>,
    );
    list = [];
  };
  for (const rawLine of md.split("\n")) {
    const line = rawLine.trimEnd();
    if (line.startsWith("- ")) {
      list.push(line.slice(2));
      continue;
    }
    flushList();
    if (line.startsWith("### ")) blocks.push(<h3 key={key++}>{inline(line.slice(4))}</h3>);
    else if (line.startsWith("## ")) blocks.push(<h2 key={key++}>{inline(line.slice(3))}</h2>);
    else if (line.startsWith("# ")) blocks.push(<h1 key={key++}>{inline(line.slice(2))}</h1>);
    else if (line.trim() === "") blocks.push(<div key={key++} className="markdown-gap" />);
    else blocks.push(<p key={key++}>{inline(line)}</p>);
  }
  flushList();
  return blocks;
}

export function Markdown() {
  const [text, setText] = useState(WELCOME);
  return (
    <div className="markdown">
      <textarea
        className="markdown-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        aria-label="Markdown input"
      />
      <div className="markdown-preview">{render(text)}</div>
    </div>
  );
}
