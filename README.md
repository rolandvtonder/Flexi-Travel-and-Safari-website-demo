# Flexi Travel & Safari — flexitravelandsafari.com

Vite 6 + React 19 + TypeScript, Tailwind v4 (`@tailwindcss/vite`), `motion`, `react-router`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint     # tsc --noEmit
npm run build    # → dist/
```

## Pages

The menu (as the client specified): Home · African Safaris · European Adventures · Payment Options · Our Story · Travel Guides · Contact Us.

| Route | What it is |
|---|---|
| `/` | Two-slide hero carousel (African Safaris / European Adventures), the two journeys, find-your-kind-of-Africa tiles, founder story, signature tours |
| `/safari` | African Safaris — 8 safaris (2 each: South Africa, Zimbabwe, Kenya, Tanzania), destination guides, FAQ, enquiry |
| `/europe` | European Adventures — 4 tours (Spain, Portugal, France, Italy), combine-countries option, FAQ, enquiry |
| `/tours/:slug` | One page per tour: highlights, good-to-know facts, itinerary, photo gallery, inclusions, payment calculator, enquiry |
| `/payment-options` | EFT, card and monthly instalments up to 12 months; calculator in € (safaris) or R (Europe) |
| `/about` | Our Story — the founder's Hwange story |
| `/travel-guides`, `/travel-guides/:slug` | Destination and practical guides with photo galleries |
| `/contact` | Contact Us / plan a trip (accepts `?journey=africa\|europe` and `?tour=<slug>`) |

## Brand

White page, client colours: gold `#AC8D2D`, grey `#837E7C`, black — all as tokens at the top of `src/index.css`.
Areas where text sits on a photo use the `.dark` class, which inverts the same tokens. Logo: `public/assets/brand/logo.png`
(the supplied artwork with its white background removed); favicon and touch icon are cut from its acacia.

## Photos

The client's 168 photos (from `Media/extra-images`, minus old logos, template placeholders and duplicates) live in
`public/assets/photos` as `<key>.webp` (1600px) and `<key>-sm.webp` (720px). `src/data/photos.ts` lists every key with
its place and alt text. Tours reference keys (`photo`, `gallery`); each travel guide's gallery pulls every photo for its
places, so every photo appears on the site. `Media/` itself is git-ignored.

## Travel guides — adding one

Add a JSON file to `src/content/guides/` (copy an existing one) and push — the guide list and page pick it up
automatically, newest `date` first. This is the hook for the planned daily auto-posting.

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
- **Home hero slides**: `src/home/HomeHero.tsx` (image, headline, buttons per slide).

## Hosting

**Demo — GitHub Pages:** every push to `main` runs `.github/workflows/deploy.yml`, which type-checks, builds
with `BASE_PATH=/Flexi-Travel-and-Safari-website-demo/` and publishes to
https://rolandvtonder.github.io/Flexi-Travel-and-Safari-website-demo/
(one-time setup: repo **Settings → Pages → Source: GitHub Actions**).

The build also writes `dist/404.html` (a copy of `index.html`) so deep links like `/europe` survive a refresh on Pages.
All public files are referenced through `asset()` in `src/data/tours.ts`, so they resolve under any base path.

**Live site — custom domain:** build with no `BASE_PATH` (base `/`). `public/_redirects` (Netlify) and `vercel.json`
(Vercel) send every route to `index.html`; on other hosts configure the same fallback.
