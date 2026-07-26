import wallpaper from "../assets/wallpaper.webp";

/**
 * Desktop wallpaper — Marco's own photo (EXIF/GPS stripped at build asset
 * creation; keep it that way when replacing the image).
 */
export function Wallpaper() {
  return <img className="wallpaper" src={wallpaper} alt="" aria-hidden="true" />;
}
