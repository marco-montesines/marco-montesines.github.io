/**
 * Lets any app send a URL to the Chromium window: the URL is parked here,
 * the app window is opened via an `os-open-url` DOM event handled in App,
 * and Chromium picks the URL up on mount or via the navigate signal.
 */
const bus = new EventTarget();
let pending: string | null = null;

export function openInBrowser(url: string) {
  pending = url;
  window.dispatchEvent(new CustomEvent("os-open-url"));
  bus.dispatchEvent(new Event("navigate"));
}

export function consumePendingUrl(): string | null {
  const p = pending;
  pending = null;
  return p;
}

export function onBrowserNavigate(fn: () => void): () => void {
  bus.addEventListener("navigate", fn);
  return () => bus.removeEventListener("navigate", fn);
}
