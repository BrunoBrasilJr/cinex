export function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function canUseDOM() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

export function storageGet<T>(key: string): T | null {
  if (!canUseDOM()) return null;
  const raw = window.localStorage.getItem(key);
  return safeJsonParse<T>(raw);
}

export function storageSet<T>(key: string, value: T) {
  if (!canUseDOM()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}
