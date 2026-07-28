import { useEffect, useRef, useState, type ReactNode } from "react";
import { intlLocale, useLocale, type Locale } from "../i18n";
import { AvatarLogo, SearchIcon } from "../icons";
import { appMeta, type AppId } from "../os/apps";
import type { OSWindow } from "../os/windowing";

export type Theme = "auto" | "light" | "dark";

interface MenuBarProps {
  activeApp: AppId | null;
  windows: OSWindow[];
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  toggleMaximizeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  brightness: number;
  setBrightness: (b: number) => void;
  volume: number;
  setVolume: (v: number) => void;
  wifi: boolean;
  setWifi: (w: boolean) => void;
  locale: Locale;
  setLocale: (l: Locale) => void;
  onSpotlight: () => void;
  onAboutInfo: () => void;
  musicPlaying: boolean;
  trackTitle: string;
  trackArtist: string;
  onToggleMusic: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  onSleep: () => void;
  onRestart: () => void;
  onShutdown: () => void;
}

type MenuRow =
  | "sep"
  | {
      label: string;
      action?: () => void;
      disabled?: boolean;
      checked?: boolean;
    };

interface MenuSpec {
  id: string;
  label: ReactNode;
  bold?: boolean;
  rows: MenuRow[];
}

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(t);
  }, []);
  const loc = intlLocale(useLocale());
  const date = now.toLocaleDateString(loc, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const time = now.toLocaleTimeString(loc, {
    hour: "numeric",
    minute: "2-digit",
  });
  return (
    <>
      {date}&ensp;{time}
    </>
  );
}

/** Month calendar dropped down from the clock. State resets on close. */
function CalendarPanel() {
  const loc = intlLocale(useLocale());
  const today = new Date();
  const [view, setView] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const mondayFirst = !loc.startsWith("en");
  const firstDow = (view.getDay() + (mondayFirst ? 6 : 0)) % 7;
  const daysInMonth = new Date(
    view.getFullYear(),
    view.getMonth() + 1,
    0,
  ).getDate();
  const title = view.toLocaleDateString(loc, {
    month: "long",
    year: "numeric",
  });
  // 2024-01-01 is a Monday, 2024-01-07 a Sunday — stable weekday labels
  const dows = Array.from({ length: 7 }, (_, i) =>
    new Date(2024, 0, mondayFirst ? i + 1 : i + 7).toLocaleDateString(loc, {
      weekday: "narrow",
    }),
  );
  const isToday = (d: number) =>
    d === today.getDate() &&
    view.getMonth() === today.getMonth() &&
    view.getFullYear() === today.getFullYear();
  const shift = (by: number) =>
    setView(new Date(view.getFullYear(), view.getMonth() + by, 1));

  return (
    <div className="menu-panel menu-attached-right cal-panel">
      <div className="cal-head">
        <strong>{title}</strong>
        <span className="cal-nav">
          <button onClick={() => shift(-1)} aria-label="Previous month">
            ‹
          </button>
          <button
            onClick={() =>
              setView(new Date(today.getFullYear(), today.getMonth(), 1))
            }
            aria-label="Current month"
          >
            •
          </button>
          <button onClick={() => shift(1)} aria-label="Next month">
            ›
          </button>
        </span>
      </div>
      <div className="cal-grid">
        {dows.map((d, i) => (
          <span key={`d${i}`} className="cal-dow">
            {d}
          </span>
        ))}
        {Array.from({ length: firstDow }, (_, i) => (
          <span key={`b${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => (
          <span
            key={i}
            className={`cal-day ${isToday(i + 1) ? "cal-today" : ""}`}
          >
            {i + 1}
          </span>
        ))}
      </div>
    </div>
  );
}

function WifiIcon({ on }: { on: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <g
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity={on ? 1 : 0.4}
      >
        <path d="M2 6.5 C5.5 3.2 10.5 3.2 14 6.5" />
        <path d="M4.3 9 C6.5 7 9.5 7 11.7 9" />
        <path d="M6.6 11.4 C7.4 10.7 8.6 10.7 9.4 11.4" />
      </g>
      <circle cx="8" cy="13.2" r="1.1" fill="currentColor" opacity={on ? 1 : 0.4} />
      {!on && (
        <path
          d="M2.5 14 L13.5 2.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

function BatteryIcon({ level, charging }: { level: number; charging: boolean }) {
  return (
    <span className="mb-battery">
      <span className="mb-battery-pct">{Math.round(level)}%</span>
      <svg width="24" height="12" viewBox="0 0 24 12" aria-hidden="true">
        <rect
          x="0.8"
          y="0.8"
          width="19"
          height="10.4"
          rx="2.6"
          stroke="currentColor"
          strokeWidth="1.1"
          fill="none"
          opacity="0.55"
        />
        <rect
          x="2.4"
          y="2.4"
          width={Math.max(1.5, 15.8 * (level / 100))}
          height="7.2"
          rx="1.4"
          fill={charging ? "var(--leaf)" : "currentColor"}
        />
        <path d="M21.2 4 A2.4 2.4 0 0 1 21.2 8 Z" fill="currentColor" opacity="0.55" />
      </svg>
    </span>
  );
}

function ControlIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M2 5 H14" />
        <path d="M2 11 H14" />
      </g>
      <circle cx="10.5" cy="5" r="2.1" fill="var(--paper)" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="5.5" cy="11" r="2.1" fill="var(--paper)" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Toggle({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      className={`toggle ${on ? "toggle-on" : ""}`}
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
    >
      <span className="toggle-knob" />
    </button>
  );
}

export function MenuBar(props: MenuBarProps) {
  const {
    activeApp,
    windows,
    openApp,
    closeApp,
    minimizeApp,
    toggleMaximizeApp,
    focusApp,
    theme,
    setTheme,
    brightness,
    setBrightness,
    volume,
    setVolume,
    wifi,
    setWifi,
    locale,
    setLocale,
    onSpotlight,
    onAboutInfo,
    musicPlaying,
    trackTitle,
    trackArtist,
    onToggleMusic,
    onNextTrack,
    onPrevTrack,
    onSleep,
    onRestart,
    onShutdown,
  } = props;
  const [open, setOpen] = useState<string | null>(null);
  const [battery, setBattery] = useState({ level: 100, charging: false });
  const [bluetooth, setBluetooth] = useState(false);
  const [airdrop, setAirdrop] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const sync = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen().catch(() => {});
  };

  useEffect(() => {
    interface BatteryManager {
      level: number;
      charging: boolean;
    }
    const nav = navigator as Navigator & {
      getBattery?: () => Promise<BatteryManager>;
    };
    nav
      .getBattery?.()
      .then((b) => setBattery({ level: b.level * 100, charging: b.charging }))
      .catch(() => {});
  }, []);

  const barRef = useRef<HTMLElement>(null);

  // Any open menu closes on Esc, on a press anywhere outside the menu bar,
  // or when focus leaves the page (e.g. a click landing inside an iframe).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    const onDown = (e: Event) => {
      if (!barRef.current?.contains(e.target as Node)) setOpen(null);
    };
    const onBlur = () => setOpen(null);
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown, true);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown, true);
      window.removeEventListener("blur", onBlur);
    };
  }, [open]);

  const isDark =
    theme === "dark" ||
    (theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const activeWin = windows.find((w) => w.appId === activeApp);

  const menus: MenuSpec[] = [
    {
      id: "logo",
      label: <AvatarLogo size={18} />,
      rows: [
        { label: "About This Marco", action: onAboutInfo },
        "sep",
        { label: "System Settings…", action: () => openApp("settings") },
        "sep",
        { label: "Sleep", action: onSleep },
        { label: "Restart…", action: onRestart },
        { label: "Shut Down…", action: onShutdown },
      ],
    },
    {
      id: "appname",
      label: activeApp ? appMeta(activeApp).title : "Marco",
      bold: true,
      rows: activeApp
        ? [
            {
              label: `Quit ${appMeta(activeApp).title}`,
              action: () => closeApp(activeApp),
            },
          ]
        : [{ label: "Open About", action: () => openApp("mango") }],
    },
    {
      id: "file",
      label: "File",
      rows: [
        { label: "New Terminal", action: () => openApp("terminal") },
        {
          label: "Close Window",
          action: activeApp ? () => closeApp(activeApp) : undefined,
          disabled: !activeApp,
        },
      ],
    },
    {
      id: "edit",
      label: "Edit",
      rows: [
        { label: "Undo", disabled: true },
        { label: "Redo", disabled: true },
        "sep",
        { label: "Cut", disabled: true },
        { label: "Copy", disabled: true },
        { label: "Paste", disabled: true },
      ],
    },
    {
      id: "view",
      label: "View",
      rows: [
        {
          label: activeWin?.maximized ? "Exit Full Screen" : "Enter Full Screen",
          action: activeApp ? () => toggleMaximizeApp(activeApp) : undefined,
          disabled: !activeApp,
        },
      ],
    },
    {
      id: "window",
      label: "Window",
      rows: [
        {
          label: "Minimize",
          action: activeApp ? () => minimizeApp(activeApp) : undefined,
          disabled: !activeApp,
        },
        {
          label: "Zoom",
          action: activeApp ? () => toggleMaximizeApp(activeApp) : undefined,
          disabled: !activeApp,
        },
        ...(windows.length
          ? ([
              "sep",
              ...windows.map((w) => ({
                label: appMeta(w.appId).title,
                checked: w.appId === activeApp,
                action: () => focusApp(w.appId),
              })),
            ] as MenuRow[])
          : []),
      ],
    },
    {
      id: "help",
      label: "Help",
      rows: [{ label: "Search Marco", action: onSpotlight }],
    },
  ];

  return (
    <header className="menubar" ref={barRef}>
      {menus.map((menu) => (
        <span key={menu.id} className="mb-menu-wrap">
          <button
            className={`mb-item ${menu.bold ? "mb-appname" : ""} ${menu.id === "logo" ? "mb-logo" : ""} ${open === menu.id ? "mb-item-open" : ""}`}
            onClick={() => setOpen(open === menu.id ? null : menu.id)}
            onMouseEnter={() => {
              if (open && open !== menu.id) setOpen(menu.id);
            }}
          >
            {menu.label}
          </button>
          {open === menu.id && (
            <nav className="menu-panel menu-attached">
              {menu.rows.map((row, i) =>
                row === "sep" ? (
                  <hr key={i} className="menu-sep" />
                ) : (
                  <button
                    key={i}
                    className="menu-row"
                    disabled={row.disabled}
                    onClick={() => {
                      setOpen(null);
                      row.action?.();
                    }}
                  >
                    <span className="menu-check">{row.checked ? "✓" : ""}</span>
                    {row.label}
                  </button>
                ),
              )}
            </nav>
          )}
        </span>
      ))}

      <span className="menubar-spacer" />
      <button
        className="mb-item"
        onClick={() => {
          setOpen(null);
          onSpotlight();
        }}
        aria-label="Search"
      >
        <SearchIcon />
      </button>
      <span className="mb-menu-wrap">
        <button
          className={`mb-item mb-lang ${open === "lang" ? "mb-item-open" : ""}`}
          onClick={() => setOpen(open === "lang" ? null : "lang")}
          onMouseEnter={() => {
            if (open && open !== "lang") setOpen("lang");
          }}
          aria-label="Language"
        >
          {locale.toUpperCase()}
        </button>
        {open === "lang" && (
          <nav className="menu-panel menu-attached-right">
            {(
              [
                ["en", "English"],
                ["de", "Deutsch"],
              ] as [Locale, string][]
            ).map(([value, label]) => (
              <button
                key={value}
                className="menu-row"
                onClick={() => {
                  setLocale(value);
                  setOpen(null);
                }}
              >
                <span className="menu-check">
                  {locale === value ? "✓" : ""}
                </span>
                {label}
              </button>
            ))}
          </nav>
        )}
      </span>
      <span className="mb-menu-wrap">
        <button
          className={`mb-item ${open === "music" ? "mb-item-open" : ""} ${musicPlaying ? "mb-music-on" : ""}`}
          onClick={() => setOpen(open === "music" ? null : "music")}
          onMouseEnter={() => {
            if (open && open !== "music") setOpen("music");
          }}
          aria-label="Music player"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M9 18 V6 L19 4 V16"
              stroke="currentColor"
              strokeWidth="1.9"
              fill="none"
              strokeLinejoin="round"
            />
            <circle cx="7" cy="18" r="2.3" fill="currentColor" />
            <circle cx="17" cy="16" r="2.3" fill="currentColor" />
          </svg>
        </button>
        {open === "music" && (
          <div className="menu-panel menu-attached-right cc-panel">
            <div className="cc-music">
              <span className="cc-art" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    d="M9 18 V6 L19 4 V16"
                    stroke="#fff"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinejoin="round"
                  />
                  <circle cx="7" cy="18" r="2.4" fill="#fff" />
                  <circle cx="17" cy="16" r="2.4" fill="#fff" />
                </svg>
              </span>
              <span className="cc-music-text">
                {trackTitle}
                <small>{trackArtist} — Pixabay</small>
              </span>
            </div>
            <div className="cc-transport">
              <button className="cc-play" onClick={onPrevTrack} aria-label="Previous track">
                <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M11.5 2.5 L5 8 L11.5 13.5 Z" fill="currentColor" />
                  <rect x="3.2" y="2.5" width="1.8" height="11" rx="0.9" fill="currentColor" />
                </svg>
              </button>
              <button
                className="cc-play cc-play-main"
                onClick={onToggleMusic}
                aria-label={musicPlaying ? "Pause" : "Play"}
              >
                {musicPlaying ? (
                  <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
                    <rect x="3.5" y="2.5" width="3.2" height="11" rx="1" fill="currentColor" />
                    <rect x="9.3" y="2.5" width="3.2" height="11" rx="1" fill="currentColor" />
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M4.5 2.5 L13 8 L4.5 13.5 Z" fill="currentColor" />
                  </svg>
                )}
              </button>
              <button className="cc-play" onClick={onNextTrack} aria-label="Next track">
                <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M4.5 2.5 L11 8 L4.5 13.5 Z" fill="currentColor" />
                  <rect x="11" y="2.5" width="1.8" height="11" rx="0.9" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </span>
      <span className="mb-menu-wrap">
        <button
          className={`mb-item ${open === "battery" ? "mb-item-open" : ""}`}
          onClick={() => setOpen(open === "battery" ? null : "battery")}
          onMouseEnter={() => {
            if (open && open !== "battery") setOpen("battery");
          }}
        >
          <BatteryIcon level={battery.level} charging={battery.charging} />
        </button>
        {open === "battery" && (
          <div className="menu-panel menu-attached-right cc-panel">
            <div className="cc-row">
              <span>Battery</span>
              <span className="cc-value">{Math.round(battery.level)}%</span>
            </div>
            <div className="cc-note">
              Power Source: {battery.charging ? "Power Adapter" : "Battery"}
            </div>
          </div>
        )}
      </span>
      <span className="mb-menu-wrap">
        <button
          className={`mb-item ${open === "wifi" ? "mb-item-open" : ""}`}
          onClick={() => setOpen(open === "wifi" ? null : "wifi")}
          onMouseEnter={() => {
            if (open && open !== "wifi") setOpen("wifi");
          }}
        >
          <WifiIcon on={wifi} />
        </button>
        {open === "wifi" && (
          <div className="menu-panel menu-attached-right cc-panel">
            <div className="cc-row">
              <span>Wi-Fi</span>
              <Toggle on={wifi} onChange={setWifi} label="Wi-Fi" />
            </div>
            {wifi && (
              <div className="cc-note">
                Connected to <strong>marco-net 5G</strong>
              </div>
            )}
          </div>
        )}
      </span>
      <span className="mb-menu-wrap">
        <button
          className={`mb-item ${open === "control" ? "mb-item-open" : ""}`}
          onClick={() => setOpen(open === "control" ? null : "control")}
          onMouseEnter={() => {
            if (open && open !== "control") setOpen("control");
          }}
        >
          <ControlIcon />
        </button>
        {open === "control" && (
          <div className="menu-panel menu-attached-right cc-panel cc-grid-panel">
            <div className="cc-grid-top">
              <div className="cc-card cc-radios">
                <button
                  className="cc-radio"
                  onClick={() => setWifi(!wifi)}
                  aria-pressed={wifi}
                >
                  <span className={`cc-chip ${wifi ? "cc-chip-on" : ""}`}>
                    <WifiIcon on={true} />
                  </span>
                  <span className="cc-radio-text">
                    Wi-Fi
                    <small>{wifi ? "marco-net" : "Off"}</small>
                  </span>
                </button>
                <button
                  className="cc-radio"
                  onClick={() => setBluetooth(!bluetooth)}
                  aria-pressed={bluetooth}
                >
                  <span className={`cc-chip ${bluetooth ? "cc-chip-on" : ""}`}>
                    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                      <path
                        d="M4.5 5 L11 11.5 L8 14 L8 2 L11 4.5 L4.5 11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                  </span>
                  <span className="cc-radio-text">
                    Bluetooth
                    <small>{bluetooth ? "On" : "Off"}</small>
                  </span>
                </button>
                <button
                  className="cc-radio"
                  onClick={() => setAirdrop(!airdrop)}
                  aria-pressed={airdrop}
                >
                  <span className={`cc-chip ${airdrop ? "cc-chip-on" : ""}`}>
                    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                      <g stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round">
                        <circle cx="8" cy="8" r="2" />
                        <path d="M4.5 4.5 C2.6 6.4 2.6 9.6 4.5 11.5" />
                        <path d="M11.5 4.5 C13.4 6.4 13.4 9.6 11.5 11.5" />
                      </g>
                    </svg>
                  </span>
                  <span className="cc-radio-text">
                    Share
                    <small>{airdrop ? "Everyone" : "Off"}</small>
                  </span>
                </button>
              </div>
              <div className="cc-grid-right">
                <button
                  className="cc-card cc-bigtile"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  aria-pressed={isDark}
                >
                  <span className={`cc-chip ${isDark ? "cc-chip-on" : ""}`}>
                    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                      <path
                        d="M13 9.5 A5.5 5.5 0 1 1 6.5 3 A4.4 4.4 0 0 0 13 9.5 Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  Dark Mode
                </button>
                <button
                  className="cc-card cc-bigtile"
                  onClick={toggleFullscreen}
                  aria-pressed={fullscreen}
                >
                  <span className={`cc-chip ${fullscreen ? "cc-chip-on" : ""}`}>
                    <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true">
                      <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round">
                        <path d="M2.5 6 V2.5 H6" />
                        <path d="M10 2.5 H13.5 V6" />
                        <path d="M13.5 10 V13.5 H10" />
                        <path d="M6 13.5 H2.5 V10" />
                      </g>
                    </svg>
                  </span>
                  {fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                </button>
              </div>
            </div>
            <div className="cc-card cc-slider">
              <span>Display</span>
              <input
                type="range"
                min="45"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                aria-label="Display brightness"
              />
            </div>
            <div className="cc-card cc-slider">
              <span>Sound</span>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                aria-label="Sound volume"
              />
            </div>
            <div className="cc-card cc-music">
              <span className="cc-art" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    d="M9 18 V6 L19 4 V16"
                    stroke="#fff"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinejoin="round"
                  />
                  <circle cx="7" cy="18" r="2.4" fill="#fff" />
                  <circle cx="17" cy="16" r="2.4" fill="#fff" />
                </svg>
              </span>
              <span className="cc-music-text">
                {trackTitle}
                <small>{trackArtist} — Pixabay</small>
              </span>
              <button
                className="cc-play"
                onClick={onToggleMusic}
                aria-label={musicPlaying ? "Pause" : "Play"}
              >
                {musicPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                    <rect x="3.5" y="2.5" width="3.2" height="11" rx="1" fill="currentColor" />
                    <rect x="9.3" y="2.5" width="3.2" height="11" rx="1" fill="currentColor" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M4.5 2.5 L13 8 L4.5 13.5 Z" fill="currentColor" />
                  </svg>
                )}
              </button>
              <button className="cc-play" onClick={onNextTrack} aria-label="Next track">
                <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M4.5 2.5 L11 8 L4.5 13.5 Z" fill="currentColor" />
                  <rect x="11" y="2.5" width="1.8" height="11" rx="0.9" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </span>
      <span className="mb-menu-wrap">
        <button
          className={`mb-item mb-clock ${open === "clock" ? "mb-item-open" : ""}`}
          onClick={() => setOpen(open === "clock" ? null : "clock")}
          onMouseEnter={() => {
            if (open && open !== "clock") setOpen("clock");
          }}
        >
          <Clock />
        </button>
        {open === "clock" && <CalendarPanel />}
      </span>
    </header>
  );
}
