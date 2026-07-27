import { useEffect, useState, type FormEvent } from "react";
import { bio } from "../content";
import { AvatarLogo } from "../icons";
import { Wallpaper } from "./Wallpaper";

interface LoginScreenProps {
  wallpaper: string;
  wallpaperSrc?: string;
  onLogin: () => void;
}

export function LoginScreen({
  wallpaper,
  wallpaperSrc,
  onLogin,
}: LoginScreenProps) {
  const [password, setPassword] = useState("");
  const [leaving, setLeaving] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 10_000);
    return () => clearInterval(t);
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (leaving) return;
    setLeaving(true);
    setTimeout(onLogin, 420);
  };

  return (
    <div className={`login ${leaving ? "login-leaving" : ""}`}>
      <Wallpaper id={wallpaper} src={wallpaperSrc} />
      <div className="login-scrim" />
      <div className="login-clock">
        <div className="login-time">
          {now.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        <div className="login-date">
          {now.toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      <div className="login-card">
        <AvatarLogo size={84} />
        <div className="login-name">{bio.name}</div>
        <form onSubmit={submit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            aria-label="Password — any input unlocks this portfolio"
            autoFocus
            autoComplete="off"
          />
        </form>
        <div className="login-hint">any password works — press Enter</div>
      </div>
    </div>
  );
}
