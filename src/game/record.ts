export const RECORD_KEY = 'corre-pacheco.record.v1';

type RecordStorage = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
};

type StorageFactory = () => RecordStorage;

const browserStorage: StorageFactory = () => window.localStorage;

export function readRecord(
  getStorage: StorageFactory = browserStorage,
): number {
  try {
    const raw = getStorage().getItem(RECORD_KEY);

    if (raw === null || !/^\d+$/.test(raw)) return 0;

    const value = Number(raw);
    return Number.isSafeInteger(value) && value >= 0 ? value : 0;
  } catch {
    return 0;
  }
}

export function saveRecord(
  value: number,
  getStorage: StorageFactory = browserStorage,
): boolean {
  if (!Number.isSafeInteger(value) || value < 0) return false;

  try {
    getStorage().setItem(RECORD_KEY, String(value));
    return true;
  } catch {
    return false;
  }
}
