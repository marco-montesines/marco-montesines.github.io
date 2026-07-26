import chill from "../assets/music/chill.mp3";
import corporate from "../assets/music/corporate.mp3";
import funk from "../assets/music/funk.mp3";

/**
 * Bundled under the Pixabay Content License (free use, no attribution
 * required, no expiry) — sources listed in MEDIA-LICENSES.md.
 */
export interface Track {
  title: string;
  artist: string;
  src: string;
}

export const TRACKS: Track[] = [
  { title: "Chill", artist: "prettyjohn1", src: chill },
  { title: "Joyful Rhythm Walk", artist: "LightBeats", src: funk },
  { title: "Inspiring Technology", artist: "Kornev Music", src: corporate },
];
