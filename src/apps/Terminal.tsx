import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { bio } from "../content";
import { useContent, type Content } from "../i18n";
import type { AppId } from "../os/apps";

const HELP = [
  "available commands:",
  "  help          this list",
  "  about         who marco is",
  "  skills        skill groups",
  "  experience    work stations",
  "  projects      public projects",
  "  education     schools & degrees",
  "  achievements  selected wins",
  "  languages     human languages",
  "  links         public profiles",
  "  certificates  🔒 request via LinkedIn",
  "  diplomas      🔒 request via LinkedIn",
  "  references    🔒 request via LinkedIn",
  "  open <app>    open a window (about|experience|skills|projects)",
  "  clear         clear the screen",
  "  exit          close the terminal",
];

const COMMANDS = [
  "about",
  "achievements",
  "certificates",
  "clear",
  "diplomas",
  "education",
  "exit",
  "experience",
  "help",
  "languages",
  "links",
  "open",
  "projects",
  "references",
  "skills",
  "whoami",
];

const OPEN_TARGETS = ["about", "experience", "skills", "projects"];

const LINKEDIN =
  bio.links.find((l) => l.label === "LinkedIn")?.href ?? "LinkedIn";

const locked = (what: string): string[] => [
  `🔒  ${what} are shared privately, not published.`,
  `    DM me on LinkedIn → ${LINKEDIN}`,
];

function run(
  cmd: string,
  openApp: (id: AppId) => void,
  c: Content,
): string[] {
  const [name, ...args] = cmd.trim().split(/\s+/);
  switch (name) {
    case "":
      return [];
    case "help":
      return HELP;
    case "about":
      return [`${c.bio.name} — ${c.bio.role}`, c.bio.tagline];
    case "skills":
      return Object.entries(c.skills).map(
        ([g, items]) => `${g}: ${items.join(", ")}`,
      );
    case "experience":
      return c.experience.map((s) => `${s.period}  ${s.role} · ${s.org}`);
    case "projects":
      return c.projects.map((p) => `${p.name} — ${p.note}`);
    case "education":
      return c.education.map(
        (e) => `${e.period}  ${e.degree} — ${e.school}`,
      );
    case "achievements":
      return c.achievements.map((a) => `${a.title}: ${a.note}`);
    case "languages":
      return [c.bio.languages];
    case "links":
      return c.bio.links.map((l) => `${l.label}: ${l.href}`);
    case "certificates":
      return locked("Certificates");
    case "diplomas":
      return locked("Diplomas");
    case "references":
      return locked("References");
    case "whoami":
      return ["guest"];
    case "open": {
      const target = args[0] as AppId | undefined;
      if (
        target &&
        ["about", "experience", "skills", "projects"].includes(target)
      ) {
        openApp(target);
        return [`opening ${target}…`];
      }
      return ["usage: open <about|experience|skills|projects>"];
    }
    default:
      return [`command not found: ${name} — try "help"`];
  }
}

export function Terminal({
  openApp,
  onExit,
}: {
  openApp: (id: AppId) => void;
  onExit: () => void;
}) {
  const [lines, setLines] = useState<string[]>(() => [
    `Last login: ${new Date().toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })} on console`,
    'Type "help" to explore.',
  ]);
  const [input, setInput] = useState("");
  const content = useContent();
  const endRef = useRef<HTMLDivElement>(null);
  const history = useRef<string[]>([]);
  const histIdx = useRef(-1); // -1 = not browsing history
  const draft = useRef("");

  useEffect(() => {
    endRef.current?.scrollIntoView();
  }, [lines]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const completingArg = /^open\s+\S*$/.test(input);
      const prefix = completingArg
        ? input.replace(/^open\s+/, "")
        : input.trimStart();
      const pool = completingArg ? OPEN_TARGETS : COMMANDS;
      const matches = pool.filter((c) => c.startsWith(prefix));
      if (!matches.length) return;
      const common = matches.reduce((a, b) => {
        let i = 0;
        while (i < a.length && a[i] === b[i]) i += 1;
        return a.slice(0, i);
      });
      const word =
        matches.length === 1
          ? matches[0] + (matches[0] === "open" ? " " : "")
          : common;
      const next = completingArg ? `open ${word}` : word;
      if (next !== input) setInput(next);
      else if (matches.length > 1) {
        setLines((ls) => [
          ...ls,
          `guest@marco:~$ ${input}`,
          matches.join("  "),
        ]);
      }
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const h = history.current;
      if (!h.length) return;
      if (histIdx.current === -1) {
        draft.current = input;
        histIdx.current = h.length - 1;
      } else if (histIdx.current > 0) {
        histIdx.current -= 1;
      }
      setInput(h[histIdx.current]);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx.current === -1) return;
      histIdx.current += 1;
      if (histIdx.current >= history.current.length) {
        histIdx.current = -1;
        setInput(draft.current);
      } else {
        setInput(history.current[histIdx.current]);
      }
      return;
    }
    if (e.key !== "Enter") return;
    const cmd = input;
    setInput("");
    if (cmd.trim() && cmd !== history.current[history.current.length - 1]) {
      history.current.push(cmd);
    }
    histIdx.current = -1;
    draft.current = "";
    if (cmd.trim() === "clear") {
      setLines([]);
      return;
    }
    if (cmd.trim() === "exit") {
      setLines((ls) => [...ls, `guest@marco:~$ ${cmd}`, "logout"]);
      setTimeout(onExit, 350);
      return;
    }
    setLines((ls) => [
      ...ls,
      `guest@marco:~$ ${cmd}`,
      ...run(cmd, openApp, content),
    ]);
  };

  return (
    <div
      className="terminal"
      onClick={(e) =>
        e.currentTarget.querySelector("input")?.focus({ preventScroll: true })
      }
    >
      {lines.map((l, i) => (
        <div key={i} className="terminal-line">
          {l}
        </div>
      ))}
      <div className="terminal-prompt">
        <span>guest@marco:~$&nbsp;</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Terminal input"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </div>
      <div ref={endRef} />
    </div>
  );
}
