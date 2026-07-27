import bayside from "../assets/wallpaper.webp";

/**
 * Desktop wallpapers: Marco's photos plus original gradient art.
 *
 * To add a photo: strip metadata first (`magick in.HEIC -auto-orient
 * -strip -resize "2560x2560>" -quality 78 wNN.webp`, plus a 480px
 * `wNN-thumb.webp`), drop both in src/assets/wallpapers/, and add the id
 * to PHOTO_NAMES. Gradients are entries with `css`.
 */
export interface WallpaperDef {
  id: string;
  name: string;
  /** Photo wallpaper asset. */
  src?: string;
  /** Small preview for the Settings grid (defaults to src). */
  thumb?: string;
  /** CSS background for gradient wallpapers. */
  css?: string;
}

const files = import.meta.glob<string>("../assets/wallpapers/*.webp", {
  eager: true,
  import: "default",
});
const asset = (n: string) => files[`../assets/wallpapers/${n}.webp`];

const PHOTO_NAMES: [string, string][] = [
  ["w01", "Dusk Islets"],
  ["w02", "Jungle Shore"],
  ["w03", "Blue Bay"],
  ["w04", "White Cove"],
  ["w05", "Golden Hour"],
  ["w06", "Evening Cove"],
  ["w07", "Flamingo Cove"],
  ["w08", "Hidden Beach"],
  ["w09", "Island Kayaks"],
  ["w10", "Rocky Point"],
  ["w11", "Reef Panorama"],
  ["w12", "Islet Bay"],
  ["w13", "Twin Coves"],
];

export const WALLPAPERS: WallpaperDef[] = [
  { id: "bayside", name: "Bayside", src: bayside },
  ...PHOTO_NAMES.map(([id, name]) => ({
    id,
    name,
    src: asset(id),
    thumb: asset(`${id}-thumb`),
  })),
  {
    id: "olive-dusk",
    name: "Olive Dusk",
    css: "linear-gradient(160deg, #0b1220 0%, #1c2430 45%, #4d6a0a 130%)",
  },
  {
    id: "slate-fog",
    name: "Slate Fog",
    css: "linear-gradient(180deg, #141b26 0%, #334155 70%, #475569 100%)",
  },
  {
    id: "deep-grove",
    name: "Deep Grove",
    css: "radial-gradient(ellipse at 30% 20%, #24310f 0%, #0b1220 70%)",
  },
];

export const DEFAULT_WALLPAPER = WALLPAPERS[0].id;
