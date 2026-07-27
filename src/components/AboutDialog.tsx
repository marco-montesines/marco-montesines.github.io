import { useEffect } from "react";
import { useUI } from "../i18n";
import { AvatarLogo } from "../icons";

interface AboutDialogProps {
  onClose: () => void;
  onMoreInfo: () => void;
}

export function AboutDialog({ onClose, onMoreInfo }: AboutDialogProps) {
  const ui = useUI();
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
          {ui.specs.map(([k, v]) => (
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
          {ui.moreInfo}
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
