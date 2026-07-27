import { useContent, useUI } from "../i18n";
import { openInBrowser } from "../os/browserBus";

export function About() {
  const { bio, recommendations } = useContent();
  const ui = useUI();
  return (
    <div className="app-pad">
      <h1 className="about-name">{bio.name}</h1>
      <p className="about-role">
        {bio.role} — {bio.tagline}
      </p>
      <p>{bio.about}</p>
      <p className="about-links">
        {bio.links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={(e) => {
              e.preventDefault();
              openInBrowser(l.href);
            }}
          >
            {l.label}
          </a>
        ))}
      </p>
      <h2 className="section-head">{ui.recommendations}</h2>
      {recommendations.map((r) => (
        <blockquote key={r.who} className="quote">
          “{r.quote}”<footer>{r.who}</footer>
        </blockquote>
      ))}
    </div>
  );
}
