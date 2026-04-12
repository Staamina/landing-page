/**
 * Auto-generates the `exports` field in package.json by scanning:
 *   src/atoms/ | src/molecules/ | src/organisms/
 *
 * Convention: any folder that contains an index.ts is auto-registered as a
 * subpath export → "@staamina/ui/<folder-name>"
 *
 * Special cases (no index.ts or custom path) are declared in STATIC_EXPORTS
 * below and always take precedence over auto-discovered entries.
 *
 * Usage:
 *   pnpm generate-exports
 */

import { readdirSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const srcDir = join(root, 'src');
const pkgPath = join(root, 'package.json');

// ─── Auto-discovery ──────────────────────────────────────────────────────────

const CATEGORIES = ['atoms', 'molecules', 'organisms'];

const discovered = {};

for (const category of CATEGORIES) {
  const categoryDir = join(srcDir, category);
  if (!existsSync(categoryDir)) continue;

  for (const entry of readdirSync(categoryDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const indexPath = join(categoryDir, entry.name, 'index.ts');
    if (existsSync(indexPath)) {
      discovered[`./${entry.name}`] =
        `./src/${category}/${entry.name}/index.ts`;
    }
  }
}

// ─── Static exports ───────────────────────────────────────────────────────────
// Add here anything that doesn't follow the "folder/index.ts" convention:
//   - CSS assets
//   - Files without index.ts
//   - Extra sub-paths (e.g. /table/table, /hooks/use-theme)

const STATIC_EXPORTS = {
  // Entry points
  '.': './src/index.ts',
  './utils': './src/utils.ts',
  './i18n': './src/i18n/index.ts',
  './hooks': './src/hooks/index.ts',
  './hooks/use-theme': './src/hooks/use-theme.ts',
  './feature-flags': './src/feature-flags/index.ts',
  './user-provider': './src/user-provider/index.ts',
  './molecules': './src/molecules/index.ts',

  // CSS assets
  './tokens': {
    style: './src/tokens/index.css',
    default: './src/tokens/index.css',
  },
  './tokens/index.css': './src/tokens/index.css',
  './landing-carousel/landing-carousel.css': {
    style: './src/organisms/landing-carousel/landing-carousel.css',
    default: './src/organisms/landing-carousel/landing-carousel.css',
  },

  // No index.ts — highlight-text
  './highlight-text': './src/atoms/highlight-text/highlight-text.tsx',
  './highlight-text/highlight-text':
    './src/atoms/highlight-text/highlight-text.tsx',

  // No index.ts — picker-utils
  './picker-utils': './src/molecules/picker-utils/picker-search-input.tsx',
  './picker-utils/picker-search-input':
    './src/molecules/picker-utils/picker-search-input.tsx',

  // No index.ts — splash-screen
  './splash-screen': './src/organisms/splash-screen/SplashScreen.tsx',
  './splash-screen/SplashScreen':
    './src/organisms/splash-screen/SplashScreen.tsx',

  // Extra sub-path inside table
  './table/table': './src/molecules/table/table.tsx',
};

// ─── Merge & sort ─────────────────────────────────────────────────────────────
// Static always wins. "." is kept first, rest is sorted alphabetically.

const { '.': main, ...rest } = { ...discovered, ...STATIC_EXPORTS };

const merged = {
  '.': main,
  ...Object.fromEntries(
    Object.entries(rest).sort(([a], [b]) => a.localeCompare(b))
  ),
};

// ─── Write ────────────────────────────────────────────────────────────────────

const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
pkg.exports = merged;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

const autoCount = Object.keys(discovered).length;
const totalCount = Object.keys(merged).length;

console.log(
  `✓ ${autoCount} exports auto-discovered (atoms / molecules / organisms)`
);
console.log(`✓ ${totalCount} exports total written to package.json`);
