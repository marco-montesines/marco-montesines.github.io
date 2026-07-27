import { useState, type ReactNode } from "react";
import { bio } from "../content";
import { AppIcon } from "../icons";
import type { AppId } from "../os/apps";
import { About } from "./About";
import { Experience } from "./Experience";
import { Projects } from "./Projects";
import { Skills } from "./Skills";

function LockIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect
        x="5"
        y="10.5"
        width="14"
        height="9.5"
        rx="2.4"
        fill="currentColor"
      />
      <path
        d="M8 10.5 V7.5 A4 4 0 0 1 16 7.5 V10.5"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

function LockedNote({ what }: { what: string }) {
  const linkedIn = bio.links.find((l) => l.label === "LinkedIn")?.href;
  return (
    <div className="locked-note">
      <LockIcon size={38} />
      <h2>{what}</h2>
      <p>Shared privately on request — not published here.</p>
      <a href={linkedIn} target="_blank" rel="noreferrer">
        DM me on LinkedIn
      </a>
    </div>
  );
}

interface Note {
  id: string;
  icon: AppId | "lock";
  title: string;
  body: () => ReactNode;
}

const NOTES: Note[] = [
  { id: "about", icon: "about", title: "About Me", body: () => <About /> },
  {
    id: "experience",
    icon: "experience",
    title: "Experience",
    body: () => <Experience />,
  },
  { id: "skills", icon: "skills", title: "Skills", body: () => <Skills /> },
  {
    id: "projects",
    icon: "projects",
    title: "Projects",
    body: () => <Projects />,
  },
  {
    id: "references",
    icon: "lock",
    title: "References",
    body: () => <LockedNote what="References" />,
  },
  {
    id: "certificates",
    icon: "lock",
    title: "Certificates",
    body: () => <LockedNote what="Certificates" />,
  },
  {
    id: "diplomas",
    icon: "lock",
    title: "Diplomas",
    body: () => <LockedNote what="Diplomas" />,
  },
];

function CloudOffIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 17.5 H17.5 C19.4 17.5 21 16 21 14 C21 12.2 19.7 10.9 18 10.6 C17.6 8 15.5 6 12.8 6 C11.6 6 10.5 6.4 9.6 7.1 M5.2 9.3 C3.9 9.9 3 11.2 3 12.9 C3 15.4 5 17.3 7 17.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M4 4 L20 20"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M5 4 V20 M12 4 V20 M19 4 V20" />
      </g>
      <circle cx="5" cy="9" r="2" fill="currentColor" />
      <circle cx="12" cy="15" r="2" fill="currentColor" />
      <circle cx="19" cy="7" r="2" fill="currentColor" />
    </svg>
  );
}

export function MangoNotes() {
  const [selected, setSelected] = useState(NOTES[0].id);
  const note = NOTES.find((n) => n.id === selected) ?? NOTES[0];
  return (
    <div className="notes">
      <aside className="notes-side">
        <div className="notes-tools" aria-hidden="true">
          <CloudOffIcon />
          <SlidersIcon />
        </div>
        <ul className="notes-list">
          {NOTES.map((n) => (
            <li key={n.id}>
              <button
                className={`notes-item ${n.id === selected ? "notes-item-sel" : ""}`}
                onClick={() => setSelected(n.id)}
              >
                {n.icon === "lock" ? (
                  <LockIcon />
                ) : (
                  <AppIcon id={n.icon} size={16} />
                )}
                {n.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <div className="notes-content">{note.body()}</div>
    </div>
  );
}
