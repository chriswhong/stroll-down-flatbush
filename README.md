# A Stroll Down Flatbush Avenue, circa 1914

An interactive "streetview" style stroll through ~65 historic photos taken along Flatbush Avenue in Brooklyn, sourced from the New York Historical Society's Subway Construction photograph collection. Built with React 19, Vite, Tailwind CSS v4, and MapLibre GL JS with an [OpenFreeMap](https://openfreemap.org/) basemap.

## Getting started

```
npm install
npm run dev
```

Open the printed local URL (typically [http://localhost:5173](http://localhost:5173)) to view it in the browser.

### Other scripts

- `npm run build` — builds the app for production into `dist/`
- `npm run preview` — serves the production build locally for a final check

## Stack

- [Vite](https://vite.dev/) for dev server and bundling
- [React](https://react.dev/) 19
- [Tailwind CSS](https://tailwindcss.com/) v4
- [MapLibre GL JS](https://maplibre.org/) + [OpenFreeMap](https://openfreemap.org/) for the locator map (no API key required)
- [Headless UI](https://headlessui.com/) for the About dialog
