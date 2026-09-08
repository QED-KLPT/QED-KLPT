// Small cross-platform launcher for `npm run codegen`.
// Reads KLPT_BASE_URL from .env (via dotenv) and passes it to `playwright codegen`,
// avoiding shell-specific env-var syntax differences (bash `$VAR` vs cmd/PowerShell `%VAR%`/`$env:VAR`).
const path = require('path');
const { spawnSync } = require('child_process');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env'), quiet: true });

const baseUrl = process.env.KLPT_BASE_URL;
if (!baseUrl) {
  console.error(
    'KLPT_BASE_URL is not set. Copy .env.example to .env and set a real KLPT URL before running codegen.',
  );
  process.exit(1);
}

const result = spawnSync('npx', ['playwright', 'codegen', baseUrl], {
  stdio: 'inherit',
  shell: true,
});

process.exit(result.status ?? 1);
