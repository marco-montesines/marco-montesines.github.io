import { DEFAULT_WALLPAPER, WALLPAPERS } from "../os/wallpapers";

/**
 * Desktop wallpaper — resolved from the wallpaper registry (photos are
 * Marco's own, EXIF/GPS stripped at asset creation; keep it that way).
 */
export function Wallpaper({ id }: { id: string }) {
  const def =
    WALLPAPERS.find((w) => w.id === id) ??
    WALLPAPERS.find((w) => w.id === DEFAULT_WALLPAPER)!;
  if (def.css) {
    return (
      <div
        className="wallpaper"
        style={{ background: def.css }}
        aria-hidden="true"
      />
    );
  }
  return <img className="wallpaper" src={def.src} alt="" aria-hidden="true" />;
}
