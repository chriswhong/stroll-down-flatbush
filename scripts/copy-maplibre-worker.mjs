// MapLibre GL JS resolves its worker script relative to its own module URL
// at runtime, which breaks once Vite bundles it into the app's own JS file
// (that URL then points at a "maplibre-gl-worker.mjs" that doesn't exist in
// the output). Self-hosting a verbatim copy and pointing maplibregl.setWorkerUrl()
// at it (see src/MapLibreMap.jsx) works around this. Re-run automatically via
// the predev/prebuild npm scripts so it always matches the installed version.
import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const src = join(root, 'node_modules/maplibre-gl/dist')
const dest = join(root, 'public/vendor')

mkdirSync(dest, { recursive: true })
for (const file of ['maplibre-gl-worker.mjs', 'maplibre-gl-shared.mjs']) {
  copyFileSync(join(src, file), join(dest, file))
}

console.log('Copied maplibre-gl worker files to public/vendor/')
