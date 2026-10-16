/*
  Scroll choreography for the home scene.

  The structure is the Marlin one: the scrollbar is a clock, and every phase
  below is a window on that clock (0 = top of the scene, 1 = the end of it).
  Three content groups travel up as a vertical filmstrip with parallax — they
  never move as one block — while two clips are scrubbed underneath:

      clip A  africa.mp4   an elephant crossing golden savanna, from above
      clip B  europe.mp4   Positano and the Amalfi coast, from the air

  The story the scroll tells is the brand line itself: rooted in Africa
  (hero + "find your kind of Africa"), inspired by the world (Europe).

      phase        p            what happens
      hold         0.00–0.16    hero settled; intro plays on load, not on scroll
      move1        0.16–0.40    hero leaves, the audience tiles rise in
      hold         0.40–0.50
      move2        0.50–0.80    tiles leave, Europe rises in; footage crosses
                                from savanna to the Mediterranean at the seam
                                (0.60–0.72), once the Africa tiles have gone
      hold         0.80–1.00    settled Europe composition before the page

  Unlike the reference, the hero's word stagger is played on load (by time),
  not on the first 3% of scroll — a travel homepage cannot open on an empty
  frame waiting for the visitor to discover that scrolling reveals it.
*/

export const SCROLL_VH = 520

/** Phase windows as scroll progress. */
export const P = {
  move1: [0.16, 0.4],
  cardsIn: [0.18, 0.34],
  move2: [0.5, 0.8],
  europeIn: [0.58, 0.78],
} as const

/** Intro stagger, in seconds from mount: words 0 / 0.09 / 0.18, body after. */
export const INTRO = {
  eyebrow: [0.0, 0.5],
  word1: [0.1, 0.75],
  word2: [0.19, 0.84],
  word3: [0.28, 0.93],
  body1: [0.4, 1.0],
  body2: [0.48, 1.08],
  body3: [0.56, 1.16],
  cta: [0.7, 1.3],
  stat: [0.6, 2.4],
  total: 2.4,
} as const

/** Where each group sits on the artboard, per stage (design px). */
export const G = {
  desktop: {
    hero: { start: 168, end: -820 },
    cards: { enter: 900, mid: 104, end: -1060 },
    europe: { enter: 1180, mid: 960, end: 300 },
  },
  mobile: {
    hero: { start: 96, end: -760 },
    cards: { enter: 820, mid: 104, end: -760 },
    europe: { enter: 900, mid: 820, end: 112 },
  },
} as const

/** Clip A owns the scroll up to the seam, clip B the rest. */
export const VIDEO_SEAM = 0.66
/** Wider than the reference's shared-frame cut: these are two different
    places, so the hand-over is a deliberate dissolve, not an invisible seam. */
export const SEAM_BAND = 0.06

/** 0 before `a`, 1 after `b`, cubic-eased between. */
export function span(p: number, [a, b]: readonly [number, number]) {
  if (p <= a) return 0
  if (p >= b) return 1
  const t = (p - a) / (b - a)
  return 1 - Math.pow(1 - t, 3)
}

/** Linear ramp, for positions that should track the scrollbar exactly. */
export function ramp(p: number, [a, b]: readonly [number, number]) {
  if (p <= a) return 0
  if (p >= b) return 1
  return (p - a) / (b - a)
}

/** Smooth in-out, for group travel so it doesn't start or stop with a jolt. */
export const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
