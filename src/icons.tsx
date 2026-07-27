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
      <rect
        x="3.5"
        y="4.5"
        width="17"
        height="15"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M7.5 9.5L10.5 12L7.5 14.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12.5 15.5H16.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  );
}

function SulatIcon() {
  return (
    <>
      <path
        d="M5 19 L6.2 14.8 L16.5 4.5 C17.3 3.7 18.6 3.7 19.4 4.5 C20.2 5.3 20.2 6.6 19.4 7.4 L9.1 17.7 Z"
        fill="currentColor"
      />
      <path
        d="M5 19 L9.1 17.7 L6.2 14.8 Z"
        fill="currentColor"
        opacity="0.55"
      />
      <path
        d="M4.5 21 H19.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </>
  );
}

function HanapIcon() {
  return (
    <>
      <circle
        cx="10.5"
        cy="10.5"
        r="5.6"
        stroke="currentColor"
        strokeWidth="2.4"
        fill="none"
      />
      <path
        d="M14.8 14.8 L19.8 19.8"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </>
  );
}

function LikhaIcon() {
  return (
    <g
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d="M8 7 L3.5 12 L8 17" />
      <path d="M16 7 L20.5 12 L16 17" />
      <path d="M13.2 5 L10.8 19" />
    </g>
  );
}

function HarapanIcon() {
  return (
    <>
      <rect
        x="2.5"
        y="6"
        width="13"
        height="12"
        rx="3"
        fill="currentColor"
      />
      <path
        d="M16.5 10.5 L20.5 8 C21.1 7.6 21.5 7.9 21.5 8.5 V15.5 C21.5 16.1 21.1 16.4 20.5 16 L16.5 13.5 Z"
        fill="currentColor"
      />
    </>
  );
}

function BrowserIcon() {
  return (
    <g stroke="currentColor" strokeWidth="1.8" fill="none">
      <circle cx="12" cy="12" r="8.2" />
      <ellipse cx="12" cy="12" rx="3.7" ry="8.2" />
      <path d="M4.4 9.3 H19.6 M4.4 14.7 H19.6" />
    </g>
  );
}

function SpotifyIcon() {
  return (
    <>
      <path
        d="M10.6 17.5 V6.4 L19.4 4.4 V15.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="8" cy="17.5" r="2.7" fill="currentColor" />
      <circle cx="16.8" cy="15.5" r="2.7" fill="currentColor" />
    </>
  );
}

export function GitBranchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2" fill="none">
        <circle cx="7" cy="5.5" r="2.4" />
        <circle cx="7" cy="18.5" r="2.4" />
        <circle cx="17.5" cy="8" r="2.4" />
        <path d="M7 8 V16" />
        <path d="M17.5 10.5 C17.5 14 14 14.5 9.5 15.5" />
      </g>
    </svg>
  );
}

const APP_ICONS: Record<AppId, () => ReturnType<typeof AboutIcon>> = {
  about: AboutIcon,
  mango: AboutIcon,
  sulat: SulatIcon,
  hanap: HanapIcon,
  likha: LikhaIcon,
  harapan: HarapanIcon,
  browser: BrowserIcon,
  spotify: SpotifyIcon,
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
