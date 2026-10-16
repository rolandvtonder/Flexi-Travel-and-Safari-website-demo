# Flexi Travel & Safari — flexitravelandsafari.com

Vite 6 + React 19 + TypeScript, Tailwind v4 (`@tailwindcss/vite`), `motion`, `react-router`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint     # tsc --noEmit
npm run build    # → dist/
```

## Pages

| Route | What it is |
|---|---|
| `/` | Scroll-choreographed scene (Africa → Europe footage), then the two journeys, founder teaser, signature tours |
| `/safari` | Safari Africa — for Europe & America. Audiences, 8 safaris (2 each: South Africa, Zimbabwe, Kenya, Tanzania) with country filter, FAQ, enquiry |
| `/europe` | European Adventures — for South Africa, Botswana & Namibia. 4 tours (Spain, Portugal, France, Italy), combine-countries option, payment calculator (up to 12 months, EFT or card), FAQ, enquiry |
| `/tours/:slug` | One page per tour (12), with itinerary, inclusions, enquiry form |
| `/about` | The founder's Hwange story |
| `/contact` | Plan my trip (accepts `?journey=africa\|europe` and `?tour=<slug>`) |

## Contacts & enquiries

All in **`src/config.ts`**: bookings@ email, and both offices (Madrid and Cape Town) with address and WhatsApp number.
Safari leads go to Madrid, European-adventure leads to Cape Town.

The enquiry form is a 3-step lead pre-qualification form (trip → budget & style → contact). Every lead is scored
`HOT` / `WARM` / `NURTURE` from budget fit and booking timeline; the score is in the email subject, never shown to the visitor.

**Still to do before launch:** set `web3formsKey` (free at web3forms.com, created with bookings@flexitravelandsafari.com).
Until then, forms open WhatsApp to the right office with the enquiry pre-filled.

## Swapping brand & content

- **Logo**: `src/components/Logo.tsx` (`Mark`) and `public/favicon.svg` are placeholders.
- **Colours & fonts**: the `@theme` block at the top of `src/index.css`.
- **Tours & prices**: `src/data/tours.ts` — cards, tour pages and form dropdowns all read from it. Prices are indicative per the brief.
- **Photos**: `public/assets/img/*.webp` (Pexels licence, free for commercial use, no attribution required).
- **Hero footage**: `public/assets/video/africa.mp4` and `europe.mp4` (Pexels). Replacements should be re-encoded with a short keyframe interval so scroll-scrubbing stays smooth, e.g.
  `ffmpeg -i in.mp4 -t 12 -an -vf scale=1280:-2,fps=24 -c:v libx264 -crf 30 -g 8 -keyint_min 8 -movflags +faststart out.mp4`
- **Scroll timing**: `src/scroll.ts` holds every phase of the home scene.

## Hosting

It's a single-page app: `public/_redirects` (Netlify) and `vercel.json` (Vercel) send every route to `index.html`. On other hosts, configure the same fallback.
