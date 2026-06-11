# Athena Data — Website

Data migration and modernization consultancy. Built with React 19, Vite, TypeScript, Tailwind CSS v4, and shadcn/ui.

## Getting Started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → /dist
npm run preview   # preview production build
```

## Deployment

### Vercel (recommended)
1. Push to GitHub
2. Import repo at https://vercel.com/new
3. Vercel auto-detects Vite → click Deploy

### Netlify
1. Push to GitHub
2. New site → Import from Git
3. Build: `npm run build` | Publish: `dist`

## Project Structure

```
src/
├── assets/          # hero.jpg, athena-data-logo.png
├── components/
│   ├── Logo.tsx     # Athena Data brand mark
│   └── ui/          # shadcn/ui base components
├── hooks/
├── lib/
├── pages/
│   └── Index.tsx    # Main page (edit content here)
├── App.tsx
├── main.tsx
└── styles.css       # Tailwind + design tokens
```

## Editing Content

All page content (text, services, nav links) lives in `src/pages/Index.tsx`.
To add your logo image, drop it in `src/assets/` and update `src/components/Logo.tsx`.

## License

All rights reserved — Athena Data.
