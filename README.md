# 🌿 Verdana — Nature Retreats

> Seamless booking for curated cabins, lodges, and forest hideaways — designed to reconnect you with the wild while keeping comfort front of mind.

**Live site →** [verdana-three.vercel.app](https://verdana-three.vercel.app)

---

## Overview

Verdana is a modern, nature-first retreat booking platform built with Next.js. It surfaces handpicked destinations across India — from misty forest reserves in Coorg to glamping domes under the Milky Way — alongside flexible membership plans and rental options.

---

## Features

### 🗺️ Spots
Six curated destinations across India with per-night pricing and quick-explore cards:

| Destination | Location | From |
|---|---|---|
| Misty Forest Reserve | Coorg, Karnataka | ₹4,200/night |
| Alpine Summit Hideaway | Manali, Himachal | ₹6,800/night |
| Crystal Lake Retreat | Kodaikanal, Tamil Nadu | ₹5,500/night |
| Sacred Valley Sanctuary | Munnar, Kerala | ₹3,900/night |
| Golden Dune Escape | Jaisalmer, Rajasthan | ₹7,200/night |
| Coastal Cliffs Perch | Varkala, Kerala | ₹5,100/night |

### 🏡 Rooms
Four accommodation types for every kind of traveller:

- **Treehouse Suite** — Suspended 30 ft in the canopy · 2 guests · 480 sq ft
- **Riverside Cabin** — Private deck over a rushing stream · 4 guests · 680 sq ft
- **Glamping Dome** — Transparent geodesic dome under the stars · 2 guests · 320 sq ft
- **Mountain Lodge** — Panoramic Himalayan views · 6 guests · 1,100 sq ft

### 💳 Plans
Three membership tiers with monthly billing:

| Plan | Price | Highlights |
|---|---|---|
| **Explorer** | ₹999/mo | 20+ curated spots, basic listings, trail maps |
| **Wanderer** ⭐ Most Popular | ₹2,499/mo | 100+ premium spots, priority bookings, 10% off rentals |
| **Serenity** | ₹5,999/mo | Unlimited access, private retreats, personal guide, 20% off rentals |

### 🏕️ Rents
Flexible rental durations to suit any schedule:

| Type | Starting From |
|---|---|
| Per Night | ₹2,800 |
| Weekend (2N) | ₹5,200 |
| Week-Long | ₹18,000 |
| Monthly | ₹65,000 |

**Seasonal Offer:** Monsoon Magic — 30% off all retreats (valid until Aug 31, 2025)

### 📬 Newsletter
Stay-in-the-loop section with 12,000+ subscribers, 340+ retreats listed, and a 4.9★ average retreat rating.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Language | React 19 / JavaScript |
| Fonts | Cormorant Garamond (display) + custom CSS vars |
| Deployment | Vercel |

---

## Project Structure

```
verdana/
├── src/
│   ├── app/                  # Next.js App Router routes & global layout
│   └── Components/           # UI components grouped by feature
│       ├── Spots/
│       ├── Rooms/
│       ├── Plans/
│       └── Rents/
├── public/                   # Static assets
├── utils/
│   └── data.js               # Centralised sample data (spots, rooms, plans, rents)
├── tailwind.config.js
└── package.json
```

---

## Requirements

- Node.js 18+
- npm or yarn

---

## Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm start
```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Starts the Next.js dev server |
| `npm run build` | Builds the app for production |
| `npm start` | Starts the production server |
| `npm run lint` | Runs ESLint |

---

## Data

All page content (spots, rooms, plans, rents) is driven by `utils/data.js`. Edit the arrays in that file to update listings, pricing, perks, and icons across the entire site without touching any component.

---

## Deployment

The project is deployed on **Vercel**. Push to `main` to trigger an automatic deployment.

If deploying from a new machine, ensure a remote is configured:

```bash
git remote -v
# if missing:
git remote add origin <your-repo-url>
```

---

## License

MIT
