export type AppId =
  | "about"
  | "mango"
  | "markdown"
  | "chromium"
  | "vscode"
  | "harapan"
  | "spotify"
  | "experience"
  | "skills"
  | "projects"
  | "terminal";

export interface AppMeta {
  id: AppId;
  title: string;
  /** Minimum window size (px) and preferred size as viewport fractions. */
  w: number;
  h: number;
  wf: number;
  hf: number;
  /** Not shown in dock/Launchpad (content lives inside Mango). */
  hidden?: boolean;
}

export const APPS: AppMeta[] = [
  {
    id: "about",
    title: "About",
    w: 520,
    h: 500,
    wf: 0.4,
    hf: 0.68,
    hidden: true,
  },
  { id: "mango", title: "Marco", w: 820, h: 560, wf: 0.64, hf: 0.75 },
  { id: "markdown", title: "Markdown", w: 720, h: 480, wf: 0.56, hf: 0.66 },
  { id: "chromium", title: "Chromium", w: 700, h: 500, wf: 0.52, hf: 0.66 },
  { id: "vscode", title: "VS Code", w: 780, h: 540, wf: 0.6, hf: 0.72 },
  { id: "harapan", title: "Harapan", w: 540, h: 460, wf: 0.42, hf: 0.62 },
  { id: "spotify", title: "Spotify", w: 380, h: 480, wf: 0.3, hf: 0.7 },
  {
    id: "experience",
    title: "Experience",
    w: 600,
    h: 540,
    wf: 0.5,
    hf: 0.78,
    hidden: true,
  },
  {
    id: "skills",
    title: "Skills",
    w: 520,
    h: 520,
    wf: 0.46,
    hf: 0.78,
    hidden: true,
  },
  {
    id: "projects",
    title: "Projects",
    w: 500,
    h: 380,
    wf: 0.4,
    hf: 0.5,
    hidden: true,
  },
  { id: "terminal", title: "Terminal", w: 560, h: 360, wf: 0.46, hf: 0.5 },
];

export const appMeta = (id: AppId): AppMeta => APPS.find((a) => a.id === id)!;
