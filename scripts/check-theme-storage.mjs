import assert from 'node:assert/strict';

const cases = [
  { name: 'saved dark', saved: 'dark', systemDark: false, expectedDark: true },
  { name: 'saved light', saved: 'light', systemDark: true, expectedDark: false },
  { name: 'system fallback', saved: null, systemDark: true, expectedDark: true },
  { name: 'invalid saved value', saved: 'invalid', systemDark: false, expectedDark: false },
  { name: 'blocked reads and writes', blockedRead: true, blockedWrite: true, systemDark: true, expectedDark: true },
  { name: 'quota-limited writes', saved: null, blockedWrite: true, systemDark: false, expectedDark: false },
  { name: 'blocked storage getter', blockedGetter: true, systemDark: false, expectedDark: false },
];

try {
  for (const [index, scenario] of cases.entries()) {
    let saved = scenario.saved ?? null;
    globalThis.window = {
      matchMedia: () => ({ matches: scenario.systemDark }),
      get localStorage() {
        if (scenario.blockedGetter) throw new DOMException('Storage disabled', 'SecurityError');
        return {
          getItem() {
            if (scenario.blockedRead) throw new DOMException('Storage disabled', 'SecurityError');
            return saved;
          },
          setItem(_, value) {
            if (scenario.blockedWrite) throw new DOMException('Storage full', 'QuotaExceededError');
            saved = value;
          },
        };
      },
    };
    // Separate module instances prevent preferences leaking between independent browser scenarios.
    const theme = await import(`../src/lib/theme.ts?scenario=${index}`);
    assert.equal(theme.prefersDarkTheme(), scenario.expectedDark, scenario.name);
    for (const choice of ['light', 'dark']) {
      theme.writeThemePreference(choice);
      assert.equal(theme.readThemePreference(), choice, `${scenario.name}: in-memory choice`);
      assert.equal(theme.prefersDarkTheme(), choice === 'dark', `${scenario.name}: applied choice`);
      if (!scenario.blockedWrite && !scenario.blockedGetter) assert.equal(saved, choice);
    }
  }
  console.log(`Verified ${cases.length} theme scenarios: saved/system choices, invalid values, denied storage, quota failures and in-memory persistence.`);
} finally {
  delete globalThis.window;
}
