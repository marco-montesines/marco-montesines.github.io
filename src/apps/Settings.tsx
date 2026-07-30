import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useContent, useUI, type Locale, type UIStrings } from "../i18n";
import { AvatarLogo } from "../icons";
import type { CustomWallpaper } from "../os/customWallpapers";
import { WALLPAPERS } from "../os/wallpapers";
import type { Theme } from "../components/MenuBar";

interface SettingsProps {
  theme: Theme;
  setTheme: (t: Theme) => void;
  locale: Locale;
  setLocale: (l: Locale) => void;
  wallpaper: string;
  setWallpaper: (id: string) => void;
  customWallpapers: CustomWallpaper[];
  onAddWallpaper: (file: File) => void;
  onRemoveWallpaper: (id: string) => void;
}

const SECTION_KEYS = [
  "wallpaper",
  "appearance",
  "language",
  "storage",
  "about",
] as const;

type SectionKey = (typeof SECTION_KEYS)[number];

/** Skill mix rendered as a segmented storage bar. */
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
  customWallpapers,
  onAddWallpaper,
  onRemoveWallpaper,
  ui,
}: Pick<
  SettingsProps,
  | "wallpaper"
  | "setWallpaper"
  | "customWallpapers"
  | "onAddWallpaper"
  | "onRemoveWallpaper"
> & { ui: UIStrings }) {
  return (
    <>
      <p className="settings-hint">{ui.wallpaperHint}</p>
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
              <img
                className="wp-art"
                src={w.thumb ?? w.src}
                alt=""
                loading="lazy"
              />
            )}
            {w.name}
          </button>
        ))}
        {customWallpapers.map((w) => (
          <button
            key={w.id}
            className={`wp-thumb ${w.id === wallpaper ? "wp-thumb-sel" : ""}`}
            onClick={() => setWallpaper(w.id)}
            aria-pressed={w.id === wallpaper}
          >
            <img className="wp-art" src={w.url} alt="" loading="lazy" />
            {w.name}
            <span
              className="wp-remove"
              role="button"
              aria-label={`Remove ${w.name}`}
              onClick={(e) => {
                e.stopPropagation();
                onRemoveWallpaper(w.id);
              }}
            >
              ✕
            </span>
          </button>
        ))}
        <label className="wp-thumb wp-add">
          <span className="wp-art wp-add-art">+</span>
          {ui.addWallpaper}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onAddWallpaper(f);
              e.target.value = "";
            }}
          />
        </label>
      </div>
    </>
  );
}

function AppearancePane({
  theme,
  setTheme,
  ui,
}: Pick<SettingsProps, "theme" | "setTheme"> & { ui: UIStrings }) {
  const options: [Theme, string][] = [
    ["auto", ui.themeAuto],
    ["light", ui.themeLight],
    ["dark", ui.themeDark],
  ];
  return (
    <>
      <p className="settings-hint">{ui.appearanceHint}</p>
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

function LanguagePane({
  locale,
  setLocale,
  ui,
}: Pick<SettingsProps, "locale" | "setLocale"> & { ui: UIStrings }) {
  const { bio } = useContent();
  const resolved = Intl.DateTimeFormat().resolvedOptions();
  const options: [Locale, string][] = [
    ["en", "English"],
    ["de", "Deutsch"],
  ];
  return (
    <>
      <p className="settings-hint">{ui.languageLabel}</p>
      <div className="settings-row-group">
        {options.map(([value, label]) => (
          <button
            key={value}
            className={`settings-chip ${locale === value ? "settings-chip-sel" : ""}`}
            onClick={() => setLocale(value)}
            aria-pressed={locale === value}
          >
            {label}
          </button>
        ))}
      </div>
      <dl className="settings-facts" style={{ marginTop: "1rem" }}>
        <div>
          <dt>{ui.marcoSpeaks}</dt>
          <dd>{bio.languages}</dd>
        </div>
        <div>
          <dt>{ui.yourLocale}</dt>
          <dd>{navigator.language}</dd>
        </div>
        <div>
          <dt>{ui.yourTimeZone}</dt>
          <dd>{resolved.timeZone}</dd>
        </div>
        <div>
          <dt>{ui.yourCalendar}</dt>
          <dd>{resolved.calendar}</dd>
        </div>
      </dl>
    </>
  );
}

function StoragePane({ ui }: { ui: UIStrings }) {
  const [estimate, setEstimate] = useState<[string, string] | null>(null);

  useEffect(() => {
    let cancelled = false;
    navigator.storage
      ?.estimate?.()
      .then((e) => {
        if (cancelled || e.usage == null || e.quota == null) return;
        setEstimate([
          (e.usage / 1024 / 1024).toFixed(1),
          String(Math.round(e.quota / 1024 / 1024 / 1024)),
        ]);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <p className="settings-hint">{ui.storageHint}</p>
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
      {estimate && (
        <p className="settings-hint">{ui.storageEstimate(...estimate)}</p>
      )}
    </>
  );
}

function AboutPane({ ui }: { ui: UIStrings }) {
  const { bio } = useContent();
  return (
    <div className="settings-about">
      <AvatarLogo size={64} />
      <h3>{bio.name}</h3>
      <p className="settings-hint">{bio.role}</p>
      <dl className="settings-facts">
        {ui.specs.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Settings(props: SettingsProps) {
  const ui = useUI();
  const [section, setSection] = useState<SectionKey>("wallpaper");
  // One scroll container for every section: without this, leaving a long
  // section keeps its offset and drops the next one in at its bottom.
  const pane = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    pane.current?.scrollTo(0, 0);
  }, [section]);
  return (
    <div className="settings">
      <aside className="settings-side">
        {SECTION_KEYS.map((s) => (
          <button
            key={s}
            className={`settings-item ${s === section ? "settings-item-sel" : ""}`}
            onClick={() => setSection(s)}
          >
            {ui.sections[s]}
          </button>
        ))}
      </aside>
      <div className="settings-content" ref={pane}>
        <h2>{ui.sections[section]}</h2>
        {section === "wallpaper" && <WallpaperPane {...props} ui={ui} />}
        {section === "appearance" && <AppearancePane {...props} ui={ui} />}
        {section === "language" && <LanguagePane {...props} ui={ui} />}
        {section === "storage" && <StoragePane ui={ui} />}
        {section === "about" && <AboutPane ui={ui} />}
      </div>
    </div>
  );
}
