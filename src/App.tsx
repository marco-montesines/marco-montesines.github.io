import { useEffect, useState, type ReactNode } from "react";
import { About } from "./apps/About";
import { Experience } from "./apps/Experience";
import { Chromium } from "./apps/Chromium";
import { Finance } from "./apps/Finance";
import { Harapan } from "./apps/Harapan";
import { MangoNotes } from "./apps/MangoNotes";
import { Spotify } from "./apps/Spotify";
import { Markdown } from "./apps/Markdown";
import { Projects } from "./apps/Projects";
import { Settings } from "./apps/Settings";
import { Skills } from "./apps/Skills";
import { Terminal } from "./apps/Terminal";
import { VSCode } from "./apps/VSCode";
import { AboutDialog } from "./components/AboutDialog";
import { BootScreen } from "./components/BootScreen";
import { Dock } from "./components/Dock";
import { Launchpad } from "./components/Launchpad";
import { LoginScreen } from "./components/LoginScreen";
import { MenuBar, type Theme } from "./components/MenuBar";
import { Spotlight } from "./components/Spotlight";
import { Wallpaper } from "./components/Wallpaper";
import { Window } from "./components/Window";
import { LocaleContext, type Locale } from "./i18n";
import { useRef } from "react";
import type { AppId } from "./os/apps";
import { TRACKS } from "./os/tracks";
import {
  addCustomWallpaper,
  loadCustomWallpapers,
  removeCustomWallpaper,
  type CustomWallpaper,
} from "./os/customWallpapers";
import { DEFAULT_WALLPAPER } from "./os/wallpapers";
import { useWindowManager } from "./os/windowing";

const BOOT_MS = 2000;

type Power = "on" | "sleep" | "restart" | "off";

export default function App() {
  const wm = useWindowManager();
  const [booted, setBooted] = useState(false);
  const [locked, setLocked] = useState(true);
  const [power, setPower] = useState<Power>("on");
  const [theme, setTheme] = useState<Theme>("auto");
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(70);
  const [wifi, setWifi] = useState(true);
  const [spotlight, setSpotlight] = useState(false);
  const [launchpad, setLaunchpad] = useState(false);
  const [aboutInfo, setAboutInfo] = useState(false);
  const [wallpaper, setWallpaper] = useState(
    () => localStorage.getItem("wallpaper") ?? DEFAULT_WALLPAPER,
  );
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = localStorage.getItem("locale");
    if (saved === "en" || saved === "de") return saved;
    return navigator.language.toLowerCase().startsWith("de") ? "de" : "en";
  });

  const changeLocale = (l: Locale) => {
    setLocale(l);
    localStorage.setItem("locale", l);
  };

  const changeWallpaper = (id: string) => {
    setWallpaper(id);
    localStorage.setItem("wallpaper", id);
  };

  const [customWps, setCustomWps] = useState<CustomWallpaper[]>([]);
  useEffect(() => {
    void loadCustomWallpapers().then(setCustomWps);
  }, []);

  const addWallpaper = (file: File) => {
    if (!file.type.startsWith("image/") || file.size > 10 * 1024 * 1024) return;
    void addCustomWallpaper(file).then((w) => {
      if (!w) return;
      setCustomWps((ws) => [...ws, w]);
      changeWallpaper(w.id);
    });
  };

  const removeWallpaper = (id: string) => {
    void removeCustomWallpaper(id);
    setCustomWps((ws) => ws.filter((w) => w.id !== id));
    if (wallpaper === id) changeWallpaper(DEFAULT_WALLPAPER);
  };

  const customSrc = customWps.find((w) => w.id === wallpaper)?.url;
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const nextTrackRef = useRef<() => void>(() => {});

  const ensureAudio = () => {
    if (!audioRef.current) {
      const a = new Audio();
      a.addEventListener("ended", () => nextTrackRef.current());
      audioRef.current = a;
    }
    return audioRef.current;
  };

  const toggleMusic = () => {
    const a = ensureAudio();
    if (musicPlaying) {
      a.pause();
      setMusicPlaying(false);
    } else {
      if (!a.src) a.src = TRACKS[trackIdx].src;
      a.volume = volume / 100;
      void a.play();
      setMusicPlaying(true);
    }
  };

  const skipTrack = (dir: 1 | -1) => {
    const n = (trackIdx + dir + TRACKS.length) % TRACKS.length;
    setTrackIdx(n);
    const a = ensureAudio();
    a.src = TRACKS[n].src;
    if (musicPlaying) void a.play();
  };
  nextTrackRef.current = () => {
    const n = (trackIdx + 1) % TRACKS.length;
    setTrackIdx(n);
    const a = ensureAudio();
    a.src = TRACKS[n].src;
    void a.play();
  };

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  useEffect(
    () => () => {
      audioRef.current?.pause();
    },
    [],
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "auto") delete root.dataset.theme;
    else root.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSpotlight((s) => !s);
        setLaunchpad(false);
      } else if (e.key === "Escape") {
        setSpotlight(false);
        setLaunchpad(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), BOOT_MS);
    return () => clearTimeout(t);
  }, []);

  // Apps hand URLs to the Chromium window via the browser bus.
  const openBrowser = wm.open;
  useEffect(() => {
    const onOpenUrl = () => openBrowser("chromium");
    window.addEventListener("os-open-url", onOpenUrl);
    return () => window.removeEventListener("os-open-url", onOpenUrl);
  }, [openBrowser]);

  // Restart: fade to black, then boot again via a full reload.
  useEffect(() => {
    if (power !== "restart") return;
    const t = setTimeout(() => window.location.reload(), 800);
    return () => clearTimeout(t);
  }, [power]);

  // Sleep and shutdown silence the machine.
  useEffect(() => {
    if (power === "on") return;
    audioRef.current?.pause();
    setMusicPlaying(false);
  }, [power]);

  // Sleep: any key wakes the machine (clicks handled on the overlay).
  useEffect(() => {
    if (power !== "sleep") return;
    const wake = () => setPower("on");
    window.addEventListener("keydown", wake);
    return () => window.removeEventListener("keydown", wake);
  }, [power]);

  // Greet with the Mango notes window once the user logs in.
  const openGreeter = wm.open;
  useEffect(() => {
    if (booted && !locked) openGreeter("mango");
  }, [booted, locked, openGreeter]);

  // The “Recruiter” call banner + ringtone are deliberately disabled: an
  // unprompted incoming call can scare off exactly the visitors this site
  // is for. The CallBanner component is kept for possible reuse.

  const appBody = (id: AppId): ReactNode => {
    switch (id) {
      case "about":
        return <About />;
      case "mango":
        return <MangoNotes />;
      case "markdown":
        return <Markdown />;
      case "chromium":
        return <Chromium />;
      case "vscode":
        return <VSCode />;
      case "harapan":
        return <Harapan />;
      case "spotify":
        return <Spotify />;
      case "finance":
        return <Finance />;
      case "settings":
        return (
          <Settings
            theme={theme}
            setTheme={setTheme}
            locale={locale}
            setLocale={changeLocale}
            wallpaper={wallpaper}
            setWallpaper={changeWallpaper}
            customWallpapers={customWps}
            onAddWallpaper={addWallpaper}
            onRemoveWallpaper={removeWallpaper}
          />
        );
      case "experience":
        return <Experience />;
      case "skills":
        return <Skills />;
      case "projects":
        return <Projects />;
      case "terminal":
        return (
          <Terminal openApp={wm.open} onExit={() => wm.close("terminal")} />
        );
    }
  };

  return (
    <LocaleContext.Provider value={locale}>
    <div
      className={`os ${booted && locked ? "os-locked" : ""}`}
      style={{ filter: `brightness(${brightness / 100})` }}
    >
      <Wallpaper id={wallpaper} src={customSrc} />
      <BootScreen done={booted} />
      {booted && locked && (
        <LoginScreen
          wallpaper={wallpaper}
          wallpaperSrc={customSrc}
          onLogin={() => setLocked(false)}
        />
      )}
      <MenuBar
        activeApp={wm.activeApp}
        windows={wm.windows}
        openApp={wm.open}
        closeApp={wm.close}
        minimizeApp={wm.minimize}
        toggleMaximizeApp={wm.toggleMaximize}
        focusApp={wm.focus}
        theme={theme}
        setTheme={setTheme}
        brightness={brightness}
        setBrightness={setBrightness}
        volume={volume}
        setVolume={setVolume}
        wifi={wifi}
        setWifi={setWifi}
        locale={locale}
        setLocale={changeLocale}
        onSpotlight={() => setSpotlight(true)}
        onAboutInfo={() => setAboutInfo(true)}
        musicPlaying={musicPlaying}
        trackTitle={TRACKS[trackIdx].title}
        trackArtist={TRACKS[trackIdx].artist}
        onToggleMusic={toggleMusic}
        onNextTrack={() => skipTrack(1)}
        onPrevTrack={() => skipTrack(-1)}
        onSleep={() => setPower("sleep")}
        onRestart={() => setPower("restart")}
        onShutdown={() => setPower("off")}
      />
      {power === "sleep" && (
        <div
          className="power-overlay power-sleep"
          onClick={() => setPower("on")}
          aria-label="Sleeping — click to wake"
        />
      )}
      {power === "restart" && <div className="power-overlay" />}
      {power === "off" && (
        <div className="power-overlay power-down">
          <button
            className="power-btn"
            aria-label="Power on"
            onClick={() => window.location.reload()}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 3 L12 11"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M7.2 6.2 A7.5 7.5 0 1 0 16.8 6.2"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </button>
        </div>
      )}
      {spotlight && (
        <Spotlight onLaunch={wm.open} onClose={() => setSpotlight(false)} />
      )}
      {aboutInfo && (
        <AboutDialog
          onClose={() => setAboutInfo(false)}
          onMoreInfo={() => wm.open("mango")}
        />
      )}
      {launchpad && (
        <Launchpad onLaunch={wm.open} onClose={() => setLaunchpad(false)} />
      )}
      <main className="desktop">
        {wm.windows
          .filter((w) => !w.minimized)
          .map((w) => (
            <Window
              key={w.appId}
              win={w}
              active={wm.activeApp === w.appId}
              onFocus={() => wm.focus(w.appId)}
              onClose={() => wm.close(w.appId)}
              onMinimize={() => wm.minimize(w.appId)}
              onToggleMaximize={() => wm.toggleMaximize(w.appId)}
              onMove={(x, y) => wm.move(w.appId, x, y)}
              onResize={(width, height) => wm.resize(w.appId, width, height)}
            >
              {appBody(w.appId)}
            </Window>
          ))}
      </main>
      <Dock
        windows={wm.windows}
        activeApp={wm.activeApp}
        onLaunch={wm.open}
        onLaunchpad={() => setLaunchpad((l) => !l)}
      />
    </div>
    </LocaleContext.Provider>
  );
}
