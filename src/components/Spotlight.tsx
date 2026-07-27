import { useEffect, useMemo, useRef, useState } from "react";
import { bio, experience, projects, skills } from "../content";
import { AppIcon, SearchIcon } from "../icons";
import { APPS, type AppId } from "../os/apps";

interface Hit {
  label: string;
  sub: string;
  appId: AppId;
}

function buildIndex(): Hit[] {
  const hits: Hit[] = [];
  for (const app of APPS) {
    hits.push({ label: app.title, sub: "Application", appId: app.id });
  }
  for (const [group, items] of Object.entries(skills)) {
    for (const s of items) {
      hits.push({ label: s, sub: `Skills — ${group}`, appId: "skills" });
    }
  }
  for (const p of projects) {
    hits.push({ label: p.name, sub: "Project", appId: "projects" });
  }
  for (const s of experience) {
    hits.push({
      label: `${s.role} · ${s.org}`,
      sub: `Experience — ${s.period}`,
      appId: "experience",
    });
  }
  hits.push({ label: bio.name, sub: "About", appId: "about" });
  return hits;
}

interface SpotlightProps {
  onLaunch: (id: AppId) => void;
  onClose: () => void;
}

export function Spotlight({ onLaunch, onClose }: SpotlightProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(buildIndex, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index.filter((h) => h.sub === "Application");
    return index
      .filter(
        (h) =>
          h.label.toLowerCase().includes(q) || h.sub.toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [query, index]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const launch = (hit: Hit | undefined) => {
    if (!hit) return;
    onLaunch(hit.appId);
    onClose();
  };

  return (
    <div className="spotlight-backdrop" onClick={onClose}>
      <div className="spotlight" onClick={(e) => e.stopPropagation()}>
        <div className="spotlight-input">
          <SearchIcon size={18} />
          <input
            ref={inputRef}
            value={query}
            placeholder="Search Marco"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelected((s) => Math.min(s + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelected((s) => Math.max(s - 1, 0));
              } else if (e.key === "Enter") {
                launch(results[selected]);
              }
            }}
            aria-label="Search"
          />
        </div>
        {results.length > 0 && (
          <ul className="spotlight-results">
            {results.map((hit, i) => (
              <li key={`${hit.appId}-${hit.label}`}>
                <button
                  className={`spotlight-hit ${i === selected ? "spotlight-hit-sel" : ""}`}
                  onMouseEnter={() => setSelected(i)}
                  onClick={() => launch(hit)}
                >
                  <AppIcon id={hit.appId} size={20} />
                  <span className="spotlight-label">{hit.label}</span>
                  <span className="spotlight-sub">{hit.sub}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
