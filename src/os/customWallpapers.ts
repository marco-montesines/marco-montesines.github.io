/**
 * Visitor-added wallpapers, kept in this browser's IndexedDB only —
 * nothing is uploaded anywhere. Stored as blobs; surfaced to the UI as
 * object URLs.
 */
export interface CustomWallpaper {
  id: string;
  name: string;
  url: string;
}

const DB = "marcoos";
const STORE = "wallpapers";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE, { keyPath: "id" });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function loadCustomWallpapers(): Promise<CustomWallpaper[]> {
  try {
    const db = await openDb();
    return await new Promise((resolve, reject) => {
      const req = db.transaction(STORE).objectStore(STORE).getAll();
      req.onsuccess = () =>
        resolve(
          (req.result as { id: string; name: string; blob: Blob }[]).map(
            (r) => ({ id: r.id, name: r.name, url: URL.createObjectURL(r.blob) }),
          ),
        );
      req.onerror = () => reject(req.error);
    });
  } catch {
    return [];
  }
}

export async function addCustomWallpaper(
  file: File,
): Promise<CustomWallpaper | null> {
  try {
    const db = await openDb();
    const id = `custom-${Date.now()}`;
    const name = file.name.replace(/\.[^.]+$/, "") || "Custom";
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put({ id, name, blob: file });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    return { id, name, url: URL.createObjectURL(file) };
  } catch {
    return null;
  }
}

export async function removeCustomWallpaper(id: string): Promise<void> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    /* browser storage unavailable — nothing to remove */
  }
}
