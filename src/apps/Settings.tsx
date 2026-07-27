import { useEffect, useState } from "react";
import { bio } from "../content";
import { AvatarLogo } from "../icons";
import { WALLPAPERS } from "../os/wallpapers";
import { SPECS } from "../components/AboutDialog";
import type { Theme } from "../components/MenuBar";

interface SettingsProps {
  theme: Theme;
  setTheme: (t: Theme) => void;
  wallpaper: string;
  setWallpaper: (id: string) => void;
}

const SECTIONS = [
  "Wallpaper",
  "Appearance",
  "Language & Region",
  "Storage",
  "About",
] as const;

type Section = (typeof SECTIONS)[number];

/** Skill mix rendered as a macangelo-style segmented storage bar. */
const STORAGE_SEGMENTS: [string, number, string][] = [
  ["Go", 30, "#7ba00f"],
  ["Python", 20, "#a7cc4e"],
  ["PHP", 16, "#5c7d0b"],
  ["Cloud", 14, "#475569"],
  ["Databases", 12, "#94a2b3"],
  ["Coffee", 8, "#7a5230"],
];

function WallpaperPane({
  wallpaper,
  setWallpaper,
}: Pick<SettingsProps, "wallpaper" | "setWallpaper">) {
  return (
    <>
      <p className="settings-hint">Click a wallpaper to apply it.</p>
      <div className="wp-grid">
        {WALLPAPERS.map((w) => (
          <button
            key={w.id}
            className={`wp-thumb ${w.id === wallpaper ? "wp-thumb-sel" : ""}`}
            onClick={() => setWallpaper(w.id)}
            aria-pressed={w.id === wallpaper}
          >
            {w.css ? (
              <span className="wp-art" style={{ background: w.css }} />
            ) : (
              <img className="wp-art" src={w.thumb ?? w.src} alt="" loading="lazy" />
            )}
            {w.name}
          </button>
        ))}
      </div>
    </>
  );
}

function AppearancePane({
  theme,
  setTheme,
}: Pick<SettingsProps, "theme" | "setTheme">) {
  const options: [Theme, string][] = [
    ["auto", "Auto"],
    ["light", "Light"],
    ["dark", "Dark"],
  ];
  return (
    <>
      <p className="settings-hint">
        Auto follows this device’s system preference.
      </p>
      <div className="settings-row-group">
        {options.map(([value, label]) => (
          <button
            key={value}
            className={`settings-chip ${theme === value ? "settings-chip-sel" : ""}`}
            onClick={() => setTheme(value)}
            aria-pressed={theme === value}
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );
}

function LanguagePane() {
  const resolved = Intl.DateTimeFormat().resolvedOptions();
  return (
    <dl className="settings-facts">
      <div>
        <dt>Marco speaks</dt>
        <dd>{bio.languages}</dd>
      </div>
      <div>
        <dt>Your locale</dt>
        <dd>{navigator.language}</dd>
      </div>
      <div>
        <dt>Your time zone</dt>
        <dd>{resolved.timeZone}</dd>
      </div>
      <div>
        <dt>Your calendar</dt>
        <dd>{resolved.calendar}</dd>
      </div>
    </dl>
  );
}

function StoragePane() {
  const [estimate, setEstimate] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    navigator.storage
      ?.estimate?.()
      .then((e) => {
        if (cancelled || e.usage == null || e.quota == null) return;
        const mb = (n: number) => (n / 1024 / 1024).toFixed(1);
        setEstimate(
          `This site uses ${mb(e.usage)} MB of the ${Math.round(
            e.quota / 1024 / 1024 / 1024,
          )} GB your browser allows it.`,
        );
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <p className="settings-hint">23 years in production, allocated as:</p>
      <div className="storage-bar" role="img" aria-label="Skill storage bar">
        {STORAGE_SEGMENTS.map(([label, pct, color]) => (
          <span
            key={label}
            style={{ width: `${pct}%`, background: color }}
            title={`${label} ${pct}%`}
          />
        ))}
      </div>
      <ul className="storage-legend">
        {STORAGE_SEGMENTS.map(([label, pct, color]) => (
          <li key={label}>
            <span className="storage-dot" style={{ background: color }} />
            {label} · {pct}%
          </li>
        ))}
      </ul>
      {estimate && <p className="settings-hint">{estimate}</p>}
    </>
  );
}

function AboutPane() {
  return (
    <div className="settings-about">
      <AvatarLogo size={64} />
      <h3>{bio.name}</h3>
      <p className="settings-hint">{bio.role}</p>
      <dl className="settings-facts">
        {SPECS.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Settings({
  theme,
  setTheme,
  wallpaper,
  setWallpaper,
}: SettingsProps) {
  const [section, setSection] = useState<Section>("Wallpaper");
  return (
    <div className="settings">
      <aside className="settings-side">
        {SECTIONS.map((s) => (
          <button
            key={s}
            className={`settings-item ${s === section ? "settings-item-sel" : ""}`}
            onClick={() => setSection(s)}
          >
            {s}
          </button>
        ))}
      </aside>
      <div className="settings-content">
        <h2>{section}</h2>
        {section === "Wallpaper" && (
          <WallpaperPane wallpaper={wallpaper} setWallpaper={setWallpaper} />
        )}
        {section === "Appearance" && (
          <AppearancePane theme={theme} setTheme={setTheme} />
        )}
        {section === "Language & Region" && <LanguagePane />}
        {section === "Storage" && <StoragePane />}
        {section === "About" && <AboutPane />}
      </div>
    </div>
  );
}
