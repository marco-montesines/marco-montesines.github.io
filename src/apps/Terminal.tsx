import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  achievements,
  bio,
  education,
  experience,
  projects,
  skills,
} from "../content";
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

const LINKEDIN =
  bio.links.find((l) => l.label === "LinkedIn")?.href ?? "LinkedIn";

const locked = (what: string): string[] => [
  `🔒  ${what} are shared privately, not published.`,
  `    DM me on LinkedIn → ${LINKEDIN}`,
];

function run(cmd: string, openApp: (id: AppId) => void): string[] {
  const [name, ...args] = cmd.trim().split(/\s+/);
  switch (name) {
    case "":
      return [];
    case "help":
      return HELP;
    case "about":
      return [`${bio.name} — ${bio.role}`, bio.tagline];
    case "skills":
      return Object.entries(skills).map(
        ([g, items]) => `${g}: ${items.join(", ")}`,
      );
    case "experience":
      return experience.map((s) => `${s.period}  ${s.role} · ${s.org}`);
    case "projects":
      return projects.map((p) => `${p.name} — ${p.note}`);
    case "education":
      return education.map(
        (e) => `${e.period}  ${e.degree} — ${e.school}`,
      );
    case "achievements":
      return achievements.map((a) => `${a.title}: ${a.note}`);
    case "languages":
      return [bio.languages];
    case "links":
      return bio.links.map((l) => `${l.label}: ${l.href}`);
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
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView();
  }, [lines]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const cmd = input;
    setInput("");
    if (cmd.trim() === "clear") {
      setLines([]);
      return;
    }
    if (cmd.trim() === "exit") {
      setLines((ls) => [...ls, `guest@marco:~$ ${cmd}`, "logout"]);
      setTimeout(onExit, 350);
      return;
    }
    setLines((ls) => [...ls, `guest@marco:~$ ${cmd}`, ...run(cmd, openApp)]);
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
