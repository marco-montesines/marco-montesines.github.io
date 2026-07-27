import { useContent } from "../i18n";
import { openInBrowser } from "../os/browserBus";

export function Projects() {
  const { projects } = useContent();
  return (
    <div className="app-pad">
      {projects.map((p) => (
        <a
          key={p.name}
          className="project-card"
          href={p.href}
          onClick={(e) => {
            // our own Pages sites allow framing — open them in-OS
            e.preventDefault();
            openInBrowser(p.href);
          }}
        >
          <strong>{p.name}</strong>
          <span>{p.note}</span>
        </a>
      ))}
    </div>
  );
}
