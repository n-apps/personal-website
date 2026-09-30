export type ThemePreference = 'dark' | 'light' | null;
let currentPreference: ThemePreference | undefined;

export function readThemePreference(): ThemePreference {
  if (currentPreference !== undefined) return currentPreference;
  try {
    const value = window.localStorage.getItem('theme');
    currentPreference = value === 'dark' || value === 'light' ? value : null;
  } catch {
    currentPreference = null;
  }
  return currentPreference;
}

export function writeThemePreference(value: Exclude<ThemePreference, null>) {
  currentPreference = value;
  try {
    window.localStorage.setItem('theme', value);
  } catch {
    // The user's choice still applies in memory when persistence is unavailable.
  }
}

export function systemPrefersDark() {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function prefersDarkTheme() {
  const preference = readThemePreference();
  return preference === 'dark' || (preference === null && systemPrefersDark());
}
