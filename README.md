# Verdana 

A modern Next.js UI for listing rooms, rents and spots — a clean landing and planning layout.

## Features
- Next.js app using TailwindCSS and custom components
- Pages for rooms, plans, rents, and spots
- Reusable components in `src/Components`

## Requirements
- Node.js 18+ recommended
- npm or yarn

## Install

1. Install dependencies

```bash
npm install
# or
yarn
```

2. Run development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
npm start
```

## Available scripts

Extracted from `package.json`:

- `dev`: starts the Next.js dev server (`next dev`)
- `build`: builds the app for production (`next build`)
- `start`: starts the production server (`next start`)
- `lint`: runs `eslint`

## Project Structure (key files)

- `src/app` — Next.js app routes and global layout
- `src/Components` — UI components grouped by feature
- `public/` — static assets
- `utils/data.js` — sample data used by components

## Notes
- This repo targets Next.js 16 and React 19 per `package.json`.
- If you plan to push to GitHub from this machine, ensure a remote is configured (`git remote -v`).

## License
MIT

---
If you'd like a longer README (architecture, deployment, screenshots), tell me what to include.
