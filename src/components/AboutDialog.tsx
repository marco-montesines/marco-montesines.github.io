import { useEffect } from "react";
import { AvatarLogo } from "../icons";

const SPECS: [string, string][] = [
  ["Chip", "Human Brain — 86 billion neurons"],
  ["Memory", "~2.5 PB associative (lossy, coffee-dependent)"],
  ["Power draw", "~20 W — outperforms any silicon per watt"],
  ["Uptime", "23+ years in production · 99.9%"],
  ["OS", "Marco 26.5 “Bayside”"],
  ["Languages", "English · Tagalog · German (B1)"],
];

interface AboutDialogProps {
  onClose: () => void;
  onMoreInfo: () => void;
}

export function AboutDialog({ onClose, onMoreInfo }: AboutDialogProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="about-dlg-backdrop" onClick={onClose}>
      <div
        className="about-dlg"
        role="dialog"
        aria-label="About This Marco"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="about-dlg-close"
          aria-label="Close"
          onClick={onClose}
        />
        <div className="about-dlg-avatar">
          <AvatarLogo size={96} />
        </div>
        <h1>Marco Montesines</h1>
        <p className="about-dlg-sub">Head of Software Development, est. 2002</p>
        <dl className="about-dlg-specs">
          {SPECS.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <button
          className="about-dlg-more"
          onClick={() => {
            onClose();
            onMoreInfo();
          }}
        >
          More Info…
        </button>
        <p className="about-dlg-fine">
          Human capacity: creativity, judgment & humor — unbenchmarkable.
          <br />™ and © 2002–2026 Marco Montesines. All Rights Reserved.
          <br />An independent personal portfolio in the shape of a desktop
          OS. Product names (Spotify, Chromium, VS Code, GitHub, Markdown)
          belong to their respective owners — no affiliation or endorsement
          implied.
        </p>
      </div>
    </div>
  );
}
