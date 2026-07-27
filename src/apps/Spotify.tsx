/**
 * Real Spotify playback via Spotify's official embed player (an iframe
 * served by open.spotify.com): 30s previews logged out, full tracks when
 * the visitor is logged into Spotify in this browser.
 */
export function Spotify() {
  return (
    <iframe
      className="app-frame"
      src="https://open.spotify.com/embed/playlist/37i9dQZEVXbNBz9cRCSFkY"
      title="Spotify"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}
