/*
  The tour collection, from the client's content brief.

  Launch line-up, as confirmed by the client: two safaris each in South
  Africa, Zimbabwe, Kenya and Tanzania, and one European adventure each in
  Spain, Portugal, France and Italy (combinations are tailored on request).

  Prices are indicative launch targets, not supplier-confirmed quotes — the
  brief is explicit about that, and every page that shows a price says so.
  Edit a tour here and its card, its own page and the enquiry dropdowns all
  follow.
*/

export type Region = 'africa' | 'europe'

export interface Tour {
  slug: string
  region: Region
  country: string
  /** Every country the route touches, for filtering. */
  countries: string[]
  title: string
  duration: string
  days: number
  /** Price range per person sharing, in the region's currency. */
  price: [number, number]
  currency: 'EUR' | 'ZAR'
  summary: string
  bestFor: string
  itinerary: { when: string; what: string }[]
  touch: string
  note?: string
  image: string
  /** One of the four launch flagships the brief recommends leading with. */
  flagship?: boolean
}

export const TOURS: Tour[] = [
  /* ---------------- Safari Africa ---------------- */
  {
    slug: 'big-five-and-beautiful-cape',
    region: 'africa',
    country: 'South Africa',
    countries: ['South Africa'],
    title: 'The Big Five & Beautiful Cape',
    duration: '7 days / 6 nights',
    days: 7,
    price: [4000, 5000],
    currency: 'EUR',
    summary: 'Wildlife plus a world-class city: Cape Town, the penguins at Boulders Beach and Greater Kruger game drives.',
    bestFor: 'First-time safari couples, families and travellers who want wildlife plus a world-class city.',
    itinerary: [
      { when: 'Days 1–2', what: 'Arrive in Cape Town, explore the waterfront and enjoy a guided city experience.' },
      { when: 'Day 3', what: 'Discover Cape Point and the penguins at Boulders Beach.' },
      { when: 'Days 4–6', what: 'Fly to the Greater Kruger region for guided game drives and lodge relaxation.' },
      { when: 'Day 7', what: 'Breakfast, transfer and departure.' },
    ],
    touch: 'A sunset drink overlooking the bush, with time built in to enjoy the lodge instead of rushing between attractions.',
    image: 'big-five-cape',
    flagship: true,
  },
  {
    slug: 'wild-africa-wine-and-wellness',
    region: 'africa',
    country: 'South Africa',
    countries: ['South Africa'],
    title: 'Wild Africa, Wine & Wellness',
    duration: '8 days / 7 nights',
    days: 8,
    price: [4800, 6000],
    currency: 'EUR',
    summary: 'Cape Town, a private-reserve safari and a slow day in the Winelands. Adventure without sacrificing comfort.',
    bestFor: 'Couples, milestone celebrations and small groups of friends.',
    itinerary: [
      { when: 'Days 1–3', what: 'Cape Town, scenic drives, fine dining and an optional spa treatment.' },
      { when: 'Days 4–6', what: 'Private-reserve safari with morning and afternoon game drives.' },
      { when: 'Day 7', what: 'Winelands scenery, a cellar visit and a leisurely lunch.' },
      { when: 'Day 8', what: 'Transfer and departure.' },
    ],
    touch: 'A safari morning followed by a slow afternoon of wine, good food or wellness. Adventure without sacrificing comfort.',
    image: 'wine-wellness',
  },
  {
    slug: 'the-falls-and-the-wild-zambezi',
    region: 'africa',
    country: 'Zimbabwe',
    countries: ['Zimbabwe'],
    title: 'The Falls & The Wild Zambezi',
    duration: '6 days / 5 nights',
    days: 6,
    price: [4000, 5000],
    currency: 'EUR',
    summary: 'Victoria Falls, a Zambezi sunset cruise and a gentle introduction to safari near Hwange.',
    bestFor: 'First-time visitors who want a dramatic natural wonder and a manageable safari introduction.',
    itinerary: [
      { when: 'Days 1–2', what: 'Arrive in Victoria Falls, settle in and take a guided falls visit.' },
      { when: 'Day 3', what: 'Choose a sunset Zambezi River cruise or a guided cultural experience.' },
      { when: 'Days 4–5', what: 'Transfer to a wildlife lodge near the Zambezi or Hwange area, depending on the confirmed itinerary, for game drives.' },
      { when: 'Day 6', what: 'Transfer and departure.' },
    ],
    touch: 'Combine the power of the falls with the quiet magic of a safari, rather than trying to fit in too many destinations.',
    image: 'falls-zambezi',
    flagship: true,
  },
  {
    slug: 'into-the-elephant-kingdom',
    region: 'africa',
    country: 'Zimbabwe',
    countries: ['Zimbabwe'],
    title: 'Into the Elephant Kingdom',
    duration: '8 days / 7 nights',
    days: 8,
    price: [4500, 6000],
    currency: 'EUR',
    summary: 'Four unhurried days in Hwange — our founder’s home — learning about elephants, not just ticking off sightings.',
    bestFor: 'Wildlife enthusiasts, adventurous couples and small women’s groups.',
    itinerary: [
      { when: 'Days 1–2', what: 'Victoria Falls and a guided exploration of the area.' },
      { when: 'Days 3–6', what: 'Stay in the Hwange region, with guided game drives and time at the lodge.' },
      { when: 'Day 7', what: 'A relaxed final wildlife experience or an optional community-led activity.' },
      { when: 'Day 8', what: 'Transfer and departure.' },
    ],
    touch: 'More time in one wildlife area, with opportunities to learn about elephants and conservation rather than simply ticking off sightings.',
    image: 'elephant-kingdom',
  },
  {
    slug: 'first-safari-full-of-wonder',
    region: 'africa',
    country: 'Kenya',
    countries: ['Kenya'],
    title: 'First Safari, Full of Wonder',
    duration: '7 days / 6 nights',
    days: 7,
    price: [4000, 5000],
    currency: 'EUR',
    summary: 'The classic Maasai Mara safari: wide-open plains, expert guiding and iconic wildlife.',
    bestFor: 'First-time safari travellers who dream of classic African wildlife.',
    itinerary: [
      { when: 'Day 1', what: 'Arrive in Nairobi and overnight.' },
      { when: 'Days 2–5', what: 'Travel to the Maasai Mara area for guided game drives and time to enjoy the landscape.' },
      { when: 'Day 6', what: 'Return towards Nairobi, with an overnight stay as required by the transport plan.' },
      { when: 'Day 7', what: 'Departure.' },
    ],
    touch: 'A classic safari with expert guiding, wide-open plains and the possibility of seeing lions, elephants, giraffes and other iconic wildlife.',
    note: 'Seasonal migration crossings are not guaranteed and depend on wildlife movements.',
    image: 'first-safari',
  },
  {
    slug: 'the-mara-the-mountains-and-the-coast',
    region: 'africa',
    country: 'Kenya',
    countries: ['Kenya'],
    title: 'The Mara, The Mountains & The Coast',
    duration: '9 days / 8 nights',
    days: 9,
    price: [4800, 6000],
    currency: 'EUR',
    summary: 'Wildlife first, warm coastal evenings afterwards. A safari that feels like a complete holiday.',
    bestFor: 'Couples, families and groups who want wildlife and a few days of relaxation.',
    itinerary: [
      { when: 'Days 1–2', what: 'Arrive in Nairobi, rest and explore with a local guide.' },
      { when: 'Days 3–5', what: 'Safari in the Maasai Mara region.' },
      { when: 'Days 6–8', what: 'Fly to Kenya’s coast for beach time and optional cultural or marine activities.' },
      { when: 'Day 9', what: 'Transfer and departure.' },
    ],
    touch: 'Wildlife first, warm coastal evenings afterwards. A safari that feels like a complete holiday.',
    image: 'mara-coast',
  },
  {
    slug: 'serengeti-and-the-crater',
    region: 'africa',
    country: 'Tanzania',
    countries: ['Tanzania'],
    title: 'Serengeti & The Crater',
    duration: '8 days / 7 nights',
    days: 8,
    price: [4500, 5800],
    currency: 'EUR',
    summary: 'Two legendary wildlife landscapes on a manageable route, with no unnecessary hotel changes.',
    bestFor: 'Couples and families seeking a classic, wildlife-rich safari.',
    itinerary: [
      { when: 'Day 1', what: 'Arrive in Arusha and rest.' },
      { when: 'Days 2–4', what: 'Explore the Serengeti with a guide and stay in a well-located lodge or tented camp.' },
      { when: 'Days 5–6', what: 'Travel to the Ngorongoro area and enjoy a crater safari.' },
      { when: 'Day 7', what: 'Return towards Arusha, with an overnight stay if needed.' },
      { when: 'Day 8', what: 'Departure.' },
    ],
    touch: 'Two legendary wildlife landscapes, with a manageable route and no unnecessary hotel changes.',
    image: 'serengeti-crater',
  },
  {
    slug: 'safari-to-sea-serengeti-and-zanzibar',
    region: 'africa',
    country: 'Tanzania',
    countries: ['Tanzania'],
    title: 'Safari to Sea: Serengeti & Zanzibar',
    duration: '10 days / 9 nights',
    days: 10,
    price: [5000, 6000],
    currency: 'EUR',
    summary: 'One journey, two moods: the thrill of the Serengeti, then barefoot luxury on Zanzibar.',
    bestFor: 'Honeymooners, couples celebrating a milestone and travellers who want adventure followed by relaxation.',
    itinerary: [
      { when: 'Day 1', what: 'Arrive in Arusha.' },
      { when: 'Days 2–5', what: 'Explore the Serengeti with guided game drives.' },
      { when: 'Day 6', what: 'Transfer or fly to Zanzibar, subject to the confirmed routing.' },
      { when: 'Days 7–9', what: 'Enjoy the beach, explore Stone Town or choose a local excursion.' },
      { when: 'Day 10', what: 'Departure.' },
    ],
    touch: 'One journey, two moods: the thrill of the wild followed by barefoot luxury beside the Indian Ocean.',
    image: 'safari-to-sea',
  },

  /* ---------------- European Adventures ---------------- */
  {
    slug: 'viva-espana',
    region: 'europe',
    country: 'Spain',
    countries: ['Spain'],
    title: 'Viva España: Madrid, Barcelona & Seville',
    duration: '8 days / 7 nights',
    days: 8,
    price: [45000, 55000],
    currency: 'ZAR',
    summary: 'Three very different Spanish personalities in one holiday — royal Madrid, Gaudí’s Barcelona and flamenco Seville.',
    bestFor: 'First-time European travellers, couples, friends and families with older children.',
    itinerary: [
      { when: 'Days 1–2', what: 'Madrid — royal sights, historic streets, tapas and a guided city tour.' },
      { when: 'Days 3–4', what: 'Barcelona — Gaudí architecture, the waterfront and time to explore.' },
      { when: 'Days 5–6', what: 'Seville — beautiful squares, Andalusian culture and an evening flamenco experience.' },
      { when: 'Days 7–8', what: 'Return to Madrid by planned transport and depart.' },
    ],
    touch: 'Three very different Spanish personalities in one holiday, with time to enjoy each city instead of racing through it.',
    image: 'viva-espana',
    flagship: true,
  },
  {
    slug: 'portugal-in-colour',
    region: 'europe',
    country: 'Portugal',
    countries: ['Portugal'],
    title: 'Portugal in Colour: Lisbon & Porto',
    duration: '7 days / 6 nights',
    days: 7,
    price: [36000, 45000],
    currency: 'ZAR',
    summary: 'A relaxed first taste of Europe: Lisbon’s viewpoints and Porto’s riverside, linked by train.',
    bestFor: 'First-time Europe visitors, couples and friends who enjoy food, history and scenic cities.',
    itinerary: [
      { when: 'Days 1–3', what: 'Lisbon — old neighbourhoods, viewpoints, local food and Belém.' },
      { when: 'Day 4', what: 'Travel north by train to Porto.' },
      { when: 'Days 5–6', what: 'Porto — riverside walks, historic streets and an optional Douro Valley excursion.' },
      { when: 'Day 7', what: 'Departure.' },
    ],
    touch: 'A relaxed introduction to Europe with beautiful scenery and two distinctive cities, without changing hotels every night.',
    image: 'portugal-in-colour',
    flagship: true,
  },
  {
    slug: 'bonjour-paris',
    region: 'europe',
    country: 'France',
    countries: ['France'],
    title: 'Bonjour Paris: The Classic French Escape',
    duration: '7 days / 6 nights',
    days: 7,
    price: [42000, 52000],
    currency: 'ZAR',
    summary: 'A well-paced Paris — the Eiffel Tower, the Seine, the Louvre and Versailles, with time for café terraces.',
    bestFor: 'First-time visitors, couples and travellers who want the iconic Paris experience.',
    itinerary: [
      { when: 'Days 1–3', what: 'Paris — Eiffel Tower area, the Seine, historic neighbourhoods and a guided city tour.' },
      { when: 'Day 4', what: 'Explore the Louvre or another major museum, subject to ticket availability.' },
      { when: 'Day 5', what: 'Optional day trip to Versailles.' },
      { when: 'Days 6–7', what: 'Enjoy a flexible final day and depart.' },
    ],
    touch: 'A well-paced Paris experience with time for café terraces, shopping and discovering the city beyond the famous landmarks.',
    image: 'bonjour-paris',
  },
  {
    slug: 'ciao-italia',
    region: 'europe',
    country: 'Italy',
    countries: ['Italy'],
    title: 'Ciao Italia: Rome, Florence & Venice',
    duration: '8 days / 7 nights',
    days: 8,
    price: [45000, 55000],
    currency: 'ZAR',
    summary: 'Three legendary Italian cities linked by planned rail travel, with the essentials arranged in advance.',
    bestFor: 'First-time European visitors, couples and culture lovers.',
    itinerary: [
      { when: 'Days 1–3', what: 'Rome — the Colosseum area, ancient sights and Italian dining.' },
      { when: 'Days 4–5', what: 'Florence — art, architecture and Tuscan food.' },
      { when: 'Days 6–7', what: 'Venice — canals, bridges and time to explore.' },
      { when: 'Day 8', what: 'Departure.' },
    ],
    touch: 'Three legendary Italian cities linked by planned rail travel, with the essentials arranged in advance.',
    image: 'ciao-italia',
  },
]

export const SAFARI_COUNTRIES = ['South Africa', 'Zimbabwe', 'Kenya', 'Tanzania']
export const EUROPE_COUNTRIES = ['Spain', 'Portugal', 'France', 'Italy']

export const toursIn = (region: Region) => TOURS.filter((t) => t.region === region)
export const tourBySlug = (slug: string | undefined) => TOURS.find((t) => t.slug === slug)

const fmt = (currency: 'EUR' | 'ZAR', n: number) =>
  currency === 'EUR'
    ? `€${n.toLocaleString('en-IE')}`
    : `R${n.toLocaleString('en-ZA').replace(/ /g, ' ')}`

export const formatPrice = (n: number, currency: 'EUR' | 'ZAR') => fmt(currency, n)
export const priceRange = (t: Tour) => `${fmt(t.currency, t.price[0])} – ${fmt(t.currency, t.price[1])}`
export const priceFrom = (t: Tour) => `From ${fmt(t.currency, t.price[0])}`

export const img = (name: string) => `/assets/img/${name}.webp`
