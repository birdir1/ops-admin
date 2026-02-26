export type OpsAuth = { ok: boolean; at: string };

const KEY = 'ops_auth';

export function getAuth(): OpsAuth | null {
  if (typeof window === 'undefined') return null;
  try {
    const s = localStorage.getItem(KEY);
    if (!s) return null;
    const parsed = JSON.parse(s) as OpsAuth;
    if (!parsed.ok) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setAuth(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify({ ok: true, at: new Date().toISOString() }));
}

export function clearAuth(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEY);
}
