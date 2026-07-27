import type { AppId } from "./os/apps";
import avatar from "./assets/avatar.webp";

/**
 * App icons are original inline SVG; the OS logo is Marco's avatar in a
 * circle (asset is metadata-stripped — keep it that way when replacing).
 */
export function AvatarLogo({ size = 20 }: { size?: number }) {
  return (
    <img
      className="logo-avatar"
      src={avatar}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
    />
  );
}

function AboutIcon() {
  return (
    <>
      <circle cx="12" cy="9" r="3.4" fill="currentColor" />
      <path
        d="M5.5 19.5C6.5 15.8 9 14 12 14C15 14 17.5 15.8 18.5 19.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
    </>
  );
}

function ExperienceIcon() {
  return (
    <>
      <rect x="4" y="8" width="16" height="11" rx="2" fill="currentColor" />
      <path
        d="M9 8V6.5C9 5.7 9.7 5 10.5 5H13.5C14.3 5 15 5.7 15 6.5V8"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
      />
    </>
  );
}

function SkillsIcon() {
  return (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.6" fill="currentColor" />
      <rect x="13" y="4" width="7" height="7" rx="1.6" fill="currentColor" opacity="0.55" />
      <rect x="4" y="13" width="7" height="7" rx="1.6" fill="currentColor" opacity="0.55" />
      <rect x="13" y="13" width="7" height="7" rx="1.6" fill="currentColor" />
    </>
  );
}

function ProjectsIcon() {
  return (
    <path
      d="M4 7C4 5.9 4.9 5 6 5H9.5L11.5 7.5H18C19.1 7.5 20 8.4 20 9.5V17C20 18.1 19.1 19 18 19H6C4.9 19 4 18.1 4 17V7Z"
      fill="currentColor"
    />
  );
}

function TerminalIcon() {
  return (
    <>
      <path
        d="M4.5 6 L11.5 12 L4.5 18"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M13.5 18.5 H20"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </>
  );
}

/** The Markdown mark (public domain, via Devicon), single color. */
function MarkdownIcon() {
  return (
    <g transform="scale(0.1875)" fill="currentColor">
      <path d="M11.95 24.348c-5.836 0-10.618 4.867-10.618 10.681v57.942c0 5.814 4.782 10.681 10.617 10.681h104.102c5.835 0 10.617-4.867 10.617-10.681V35.03c0-5.814-4.783-10.681-10.617-10.681H14.898l-.002-.002H11.95zm-.007 9.543h104.108c.625 0 1.076.423 1.076 1.14v57.94c0 .717-.453 1.14-1.076 1.14H11.949c-.623 0-1.076-.423-1.076-1.14V35.029c0-.715.451-1.135 1.07-1.138z" />
      <path d="M20.721 84.1V43.9H32.42l11.697 14.78L55.81 43.9h11.696v40.2H55.81V61.044l-11.694 14.78-11.698-14.78V84.1H20.722zm73.104 0L76.28 64.591h11.697V43.9h11.698v20.69h11.698zm0 0" />
    </g>
  );
}

/**
 * Flat recreation of the open-source Chromium roundel (blue shades only —
 * never Chrome's red/yellow/green trademark colors).
 */
function ChromiumIcon() {
  const sector = "M12 12 L3.34 7 A10 10 0 0 1 20.66 7 Z";
  return (
    <>
      <path d={sector} fill="#7fa6ee" />
      <path d={sector} transform="rotate(120 12 12)" fill="#4577d6" />
      <path d={sector} transform="rotate(240 12 12)" fill="#2b57b7" />
      <circle cx="12" cy="12" r="4.7" fill="#e9eff9" />
      <circle cx="12" cy="12" r="3.5" fill="#4c7fdd" />
    </>
  );
}

/** Investment mark: rising bars, trend arrow, euro coin — own drawing. */
function FinanceIcon() {
  return (
    <>
      <rect x="3.2" y="15.2" width="4" height="6" rx="1" fill="#4f80d4" />
      <rect x="9.4" y="12" width="4" height="9.2" rx="1" fill="#a7cc4e" />
      <rect x="15.6" y="8" width="4" height="13.2" rx="1" fill="#7ba00f" />
      <path
        d="M3.8 11.5 L10 8.6 L14.6 9.8 L19.6 4.4"
        fill="none"
        stroke="#e8edf4"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16.6 3.4 L20.8 3.1 L20.5 7.3 Z" fill="#e8edf4" />
      <circle cx="7.3" cy="5.6" r="3.7" fill="#f4c542" />
      <circle
        cx="7.3"
        cy="5.6"
        r="3.7"
        fill="none"
        stroke="#c79a1f"
        strokeWidth="0.9"
      />
      <text
        x="7.3"
        y="7.5"
        textAnchor="middle"
        fontSize="5.4"
        fontWeight="700"
        fill="#6b4e0a"
      >
        €
      </text>
    </>
  );
}

function SettingsIcon() {
  return (
    <>
      <circle
        cx="12"
        cy="12"
        r="3.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
      />
      <g stroke="currentColor" strokeWidth="2.1" strokeLinecap="round">
        <path d="M12 2.6 V5.3" />
        <path d="M12 18.7 V21.4" />
        <path d="M2.6 12 H5.3" />
        <path d="M18.7 12 H21.4" />
        <path d="M5.35 5.35 L7.25 7.25" />
        <path d="M16.75 16.75 L18.65 18.65" />
        <path d="M18.65 5.35 L16.75 7.25" />
        <path d="M5.35 18.65 L7.25 16.75" />
      </g>
    </>
  );
}

/** Community-rebuilt VS Code ribbon from Devicon (MIT), flat variant. */
function VSCodeIcon() {
  return (
    <g transform="scale(0.1875)">
      <path
        fill="#007acc"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M90.767 127.126a7.968 7.968 0 0 0 6.35-.244l26.353-12.681a8 8 0 0 0 4.53-7.209V21.009a8 8 0 0 0-4.53-7.21L97.117 1.12a7.97 7.97 0 0 0-9.093 1.548l-50.45 46.026L15.6 32.013a5.328 5.328 0 0 0-6.807.302l-7.048 6.411a5.335 5.335 0 0 0-.006 7.888L20.796 64 1.74 81.387a5.336 5.336 0 0 0 .006 7.887l7.048 6.411a5.327 5.327 0 0 0 6.807.303l21.974-16.68 50.45 46.025a7.96 7.96 0 0 0 2.743 1.793Zm5.252-92.183L57.74 64l38.28 29.058V34.943Z"
      />
    </g>
  );
}

/** Harapan: a head-on camera lens — own drawing, olive glass on slate. */
function HarapanIcon() {
  return (
    <>
      <circle cx="12" cy="12" r="11.2" fill="#0b1220" />
      <circle
        cx="12"
        cy="12"
        r="11.2"
        fill="none"
        stroke="rgba(255, 255, 255, 0.16)"
        strokeWidth="0.8"
      />
      <circle cx="12" cy="12" r="8.9" fill="#5c7d0b" />
      <circle cx="12" cy="12" r="6.6" fill="#7ba00f" />
      <circle cx="12" cy="12" r="3.9" fill="#a7cc4e" />
      <circle cx="12" cy="12" r="1.8" fill="#4d6a0a" />
      <circle cx="15" cy="8.6" r="2.8" fill="rgba(255, 255, 255, 0.3)" />
      <circle cx="9.2" cy="15" r="0.9" fill="rgba(255, 255, 255, 0.22)" />
    </>
  );
}

/**
 * Official Spotify icon, unmodified, in brand green #1ED760 on the flat
 * dark tile — Spotify's design guidelines permit the standalone icon
 * featured as an app icon on a device screen interface, which this tile
 * is. Never recolor it to the site palette or add effects.
 */
function SpotifyIcon() {
  return (
    <path
      fill="#1ed760"
      d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
    />
  );
}

/**
 * GitHub mark via Devicon (MIT). GitHub's logo policy permits the mark on
 * a personal site strictly to link to a GitHub profile — that is its only
 * use here; don't reuse it for anything that isn't a link to GitHub.
 */
export function GitHubMarkIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 128 128" aria-hidden="true">
      <g fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
        />
        <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0" />
      </g>
    </svg>
  );
}

const APP_ICONS: Record<AppId, () => ReturnType<typeof AboutIcon>> = {
  about: AboutIcon,
  mango: AboutIcon,
  markdown: MarkdownIcon,
  chromium: ChromiumIcon,
  vscode: VSCodeIcon,
  harapan: HarapanIcon,
  spotify: SpotifyIcon,
  finance: FinanceIcon,
  settings: SettingsIcon,
  experience: ExperienceIcon,
  skills: SkillsIcon,
  projects: ProjectsIcon,
  terminal: TerminalIcon,
};

export function AppIcon({ id, size = 24 }: { id: AppId; size?: number }) {
  const Glyph = APP_ICONS[id];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <Glyph />
    </svg>
  );
}

/**
 * App tile: rounded-square icon with a per-app identity (used in dock and
 * Launchpad). The "Marco" notes app and About both use the avatar itself;
 * the rest pair a palette background with the app glyph.
 */
export function AppTile({ id, size }: { id: AppId; size?: number }) {
  return (
    <span
      className={`tile tile-${id}`}
      style={size ? { width: size, height: size } : undefined}
      aria-hidden="true"
    >
      {id === "about" || id === "mango" ? (
        <AvatarLogo size={size ?? 46} />
      ) : (
        <AppIcon id={id} size={size ? Math.round(size * 0.55) : 25} />
      )}
    </span>
  );
}

export function SearchIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
      <circle
        cx="7"
        cy="7"
        r="4.4"
        stroke="currentColor"
        strokeWidth="1.7"
        fill="none"
      />
      <path
        d="M10.4 10.4 L14 14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LaunchpadIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {[4.5, 12, 19.5].flatMap((y) =>
        [4.5, 12, 19.5].map((x) => (
          <rect
            key={`${x}-${y}`}
            x={x - 2.6}
            y={y - 2.6}
            width="5.2"
            height="5.2"
            rx="1.6"
            fill="currentColor"
          />
        )),
      )}
    </svg>
  );
}
