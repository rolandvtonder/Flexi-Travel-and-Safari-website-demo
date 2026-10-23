import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router'
import { useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react'
import { SCROLL_VH, P, G, INTRO, VIDEO_SEAM, SEAM_BAND, span, ramp, ease, lerp } from '../scroll'
import { ArrowRight, ArrowUpRight } from '../components/Icons'
import { photo, asset } from '../data/tours'

/*
  The home scene — the Marlin pattern, re-told for Flexi.

  The page is drawn on a fixed artboard with every element absolutely
  positioned at its design coordinates, then scaled as one piece. Scrolling
  drives a timeline (see scroll.ts) rather than moving the page.

  Two deliberate departures from the reference, both for a travel site whose
  visitors are as likely to be on a phone as on a desktop:

  1. Two artboards. A 1440x810 landscape stage, and a 390x760 portrait stage
     with its own coordinates for phones and portrait tablets. Scaling the
     landscape stage down to 375px would render body copy at 4px.
  2. The stage is FIT, not width-locked: scale = min(vw/W, vh/H), centred.
     Everything full-bleed (footage, scrims) is viewport-level, outside the
     artboard, so fitting never shows bars — but it does guarantee the CTAs
     are never cropped below the fold on a short laptop window.
*/

const STAGES = {
  desktop: { W: 1440, H: 810, SAFE: 96 },
  mobile: { W: 390, H: 760, SAFE: 22 },
} as const

type StageKey = keyof typeof STAGES

const box = (x: number, y: number, w?: number, h?: number): CSSProperties => ({
  position: 'absolute',
  left: x,
  top: y,
  ...(w != null ? { width: w } : null),
  ...(h != null ? { height: h } : null),
})

/** Reveals behind a clip mask, rising. */
function Mask({ t, children, style }: { t: number; children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ ...style, overflow: 'hidden' }}>
      <div style={{ height: '100%', transform: `translateY(${(1 - t) * 112}%)`, willChange: 'transform' }}>{children}</div>
    </div>
  )
}

const AUDIENCES = [
  { label: ['For', 'couples'], art: 'pnr-blyde-couple' },
  { label: ['For', 'families'], art: 'safari-elephant-calves' },
  { label: ['Women', 'together'], art: 'cpt-quad-friends' },
  { label: ['Well-', 'travelled'], art: 'vic-dinner-cruise' },
]

const CHAPTERS = [
  { n: '01', t: 'Rooted', at: 0 },
  { n: '02', t: 'Your Africa', at: 0.44 },
  { n: '03', t: 'Europe', at: 0.86 },
]

function useStage() {
  const [s, setS] = useState({ key: 'desktop' as StageKey, scale: 1, ox: 0, oy: 0 })
  useLayoutEffect(() => {
    const fit = () => {
      /* clientWidth, not innerWidth: the latter includes the scrollbar, which
         would push the right edge of the artboard under it */
      const vw = document.documentElement.clientWidth
      /* the scene pins below the header bar, so it has that much less height */
      const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 0
      const vh = window.innerHeight - headerH
      const key: StageKey = vw < 760 || vw / vh < 0.95 ? 'mobile' : 'desktop'
      const { W, H } = STAGES[key]
      const scale = Math.min(vw / W, vh / H)
      setS({ key, scale, ox: (vw - W * scale) / 2, oy: Math.max(0, (vh - H * scale) / 2) })
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])
  return s
}

export default function HomeScene() {
  const wrap = useRef<HTMLDivElement>(null)
  const vidA = useRef<HTMLVideoElement>(null)
  const vidB = useRef<HTMLVideoElement>(null)
  const prog = useRef(0)
  const reduce = !!useReducedMotion()
  const stage = useStage()
  const mobile = stage.key === 'mobile'
  const { W, H, SAFE } = STAGES[stage.key]
  const GW = W - SAFE * 2
  const g = G[stage.key]

  const [p, setP] = useState(0)
  const [t, setT] = useState(0) // seconds since mount, for the intro
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setP(v))
  prog.current = p

  /* The intro plays by time, once, on load. */
  useEffect(() => {
    if (reduce) {
      setT(INTRO.total)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const s = (now - t0) / 1000
      setT(Math.min(s, INTRO.total))
      if (s < INTRO.total) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduce])
  const it = (k: keyof typeof INTRO) => (k === 'total' ? 1 : span(t, INTRO[k] as readonly [number, number]))

  /*
    Scrub both clips. Writing currentTime straight from the scroll handler
    stutters, so scroll sets a target and a rAF loop eases each playhead toward
    it. A muted inline play()+pause() primes mobile Safari, which otherwise
    paints nothing until a video has played once. The clips are re-encoded
    with a keyframe every 8 frames so seeking lands quickly.
  */
  useEffect(() => {
    const els = [vidA.current, vidB.current].filter(Boolean) as HTMLVideoElement[]
    if (els.length < 2 || reduce) return
    for (const v of els) {
      const prime = () => {
        v.play()
          .then(() => v.pause())
          .catch(() => {
            try {
              v.currentTime = 0.01
            } catch {
              /* not seekable yet */
            }
          })
      }
      if (v.readyState >= 1) prime()
      else v.addEventListener('loadedmetadata', prime, { once: true })
    }
    let raf = 0
    const tick = () => {
      const q = prog.current
      const seek = (v: HTMLVideoElement, want01: number) => {
        const d = v.duration
        if (!d || !Number.isFinite(d) || v.seeking) return
        const want = Math.max(0, Math.min(want01, 1)) * (d - 0.05)
        const now = v.currentTime
        if (Math.abs(want - now) > 0.02) v.currentTime = now + (want - now) * 0.24
      }
      seek(els[0], q / (VIDEO_SEAM + SEAM_BAND))
      seek(els[1], (q - (VIDEO_SEAM - SEAM_BAND)) / (1 - (VIDEO_SEAM - SEAM_BAND)))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduce])

  /* group positions — eased travel, unless motion is reduced, in which case
     the groups hold their settled positions and cross-fade instead */
  const m1 = ease(ramp(p, P.move1))
  const m2 = ease(ramp(p, P.move2))
  const yHero = reduce ? g.hero.start : lerp(g.hero.start, g.hero.end, m1)
  const yCards = reduce ? g.cards.mid : lerp(lerp(g.cards.enter, g.cards.mid, m1), g.cards.end, m2)
  const yEurope = reduce ? g.europe.end : lerp(lerp(g.europe.enter, g.europe.mid, m1), g.europe.end, m2)
  const oHero = reduce ? 1 - ramp(p, [0.2, 0.28]) : 1
  const oCards = reduce ? ramp(p, [0.26, 0.34]) * (1 - ramp(p, [0.6, 0.68])) : 1
  const oEurope = reduce ? ramp(p, [0.64, 0.72]) : 1
  const eIn = (i: number) => (reduce ? 1 : span(p, [P.europeIn[0] + i * 0.02, P.europeIn[1] + i * 0.02]))

  /* the hand-over: a dissolve from savanna to the Mediterranean */
  const bMix = ramp(p, [VIDEO_SEAM - SEAM_BAND, VIDEO_SEAM + SEAM_BAND])
  const chapter = p < 0.3 ? 0 : p < 0.66 ? 1 : 2

  /* Keyboard users tabbing into a group that is off-stage get the scene
     advanced to where that group is settled. */
  const goTo = (at: number) => {
    const el = wrap.current
    if (!el) return
    const top = el.offsetTop + at * (el.offsetHeight - window.innerHeight)
    window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
  }
  const focusTo = (at: number) => () => {
    if (Math.abs(prog.current - at) > 0.15) goTo(at)
  }

  const vStyle: CSSProperties = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }

  /* ---------- copy, per stage ---------- */
  const heroLines = mobile ? ['Rooted in', 'Africa.', 'Inspired by', 'the world.'] : ['Rooted in Africa.', 'Inspired by', 'the world.']
  const heroBody = mobile
    ? ['Authentic African safaris and', 'European adventures, planned', 'around you.']
    : ['Authentic African safaris and unforgettable', 'European adventures — thoughtfully planned', 'around you, from Madrid and Cape Town.']
  const H1 = mobile ? { size: 52, line: 56, step: 56, top: 28, w: 346 } : { size: 84, line: 92, step: 88, top: 34, w: 860 }
  const bodyTop = H1.top + heroLines.length * H1.step + (mobile ? 28 : 30)
  const bodyStep = mobile ? 24 : 29
  const ctaTop = bodyTop + heroBody.length * bodyStep + (mobile ? 22 : 30)
  const wordKeys = ['word1', 'word2', 'word3', 'word3'] as const
  const bodyKeys = ['body1', 'body2', 'body3'] as const

  const stat = it('stat')
  const tiles = mobile
    ? AUDIENCES.map((a, i) => ({ ...a, x: (i % 2) * 178, y: Math.floor(i / 2) * 160, w: 168, h: 150 }))
    : AUDIENCES.map((a, i) => ({ ...a, x: [0, GW - 255, 116, GW - 371][i], y: [0, 0, 240, 240][i], w: 255, h: 215 }))

  return (
    <div ref={wrap} className="dark" style={{ height: `${SCROLL_VH}vh`, background: '#111', position: 'relative' }}>
      <h1 className="sr-only" style={srOnly}>
        Flexi Travel &amp; Safari — African safaris and European adventures
      </h1>
      <div style={{ position: 'sticky', top: 'var(--header-h)', height: 'calc(100svh - var(--header-h))', overflow: 'hidden' }}>
        <video ref={vidA} muted playsInline preload="auto" poster={asset('assets/video/africa-poster.jpg')} aria-hidden="true" tabIndex={-1} style={{ ...vStyle, opacity: 1 - bMix }}>
          <source src={asset('assets/video/africa.mp4')} type="video/mp4" />
        </video>
        <video ref={vidB} muted playsInline preload="auto" poster={asset('assets/video/europe-poster.jpg')} aria-hidden="true" tabIndex={-1} style={{ ...vStyle, opacity: bMix }}>
          <source src={asset('assets/video/europe.mp4')} type="video/mp4" />
        </video>

        {/* ---- section scrims: viewport-wide, so they never leave bare strips
             of footage at the edges of a fitted artboard ---- */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: mobile
              ? 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.7) 100%)'
              : 'linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.4) 34%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.18) 100%)',
            opacity: 1 - (reduce ? ramp(p, [0.2, 0.28]) : m1),
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(70% 55% at 50% 82%, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 58%, rgba(0,0,0,0) 100%)',
            opacity: (reduce ? oCards : m1 * (1 - m2)),
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: mobile
              ? 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.85) 100%)'
              : 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 32%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0.88) 100%)',
            opacity: reduce ? oEurope : m2,
            pointerEvents: 'none',
          }}
        />

        {/* ---- scroll cue ---- */}
        <div
          aria-hidden="true"
          className="label"
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 22,
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            fontSize: 10,
            color: 'var(--color-mist)',
            opacity: it('cta') * (1 - ramp(p, [0.01, 0.05])),
            pointerEvents: 'none',
          }}
        >
          Scroll to explore
          <span style={{ width: 1, height: 34, background: 'linear-gradient(180deg, var(--color-gold), transparent)', animation: reduce ? undefined : 'cue 1.8s ease-in-out infinite' }} />
          <style>{`@keyframes cue { 0%,100% { transform: scaleY(.4); transform-origin: top } 50% { transform: scaleY(1); transform-origin: top } }`}</style>
        </div>

        {/* ---- the artboard ---- */}
        <div
          style={{
            position: 'absolute',
            left: stage.ox,
            top: stage.oy,
            width: W,
            height: H,
            transform: `scale(${stage.scale})`,
            transformOrigin: 'top left',
          }}
        >
          {/* ---- chapter rail ---- */}
          {!mobile && (
            <nav aria-label="Scene chapters" style={box(W - 64, 330, 40, 200)}>
              {CHAPTERS.map((c, i) => (
                <button
                  key={c.n}
                  type="button"
                  onClick={() => goTo(c.at)}
                  aria-label={`Chapter ${c.n}: ${c.t}`}
                  aria-current={chapter === i ? 'step' : undefined}
                  className="label"
                  style={{
                    position: 'absolute',
                    top: i * 64,
                    right: 0,
                    width: 44,
                    height: 44,
                    padding: 0,
                    background: 'none',
                    border: 0,
                    cursor: 'pointer',
                    fontSize: 15,
                    textAlign: 'right',
                    color: chapter === i ? 'var(--color-gold)' : 'color-mix(in srgb, var(--color-bone) 42%, transparent)',
                    transition: 'color 300ms ease',
                    opacity: it('cta'),
                  }}
                >
                  {c.n}
                </button>
              ))}
            </nav>
          )}

          {/* ================= 01 — the hero ================= */}
          <section aria-label="Rooted in Africa" onFocus={focusTo(0)} style={{ ...box(SAFE, 0, GW, mobile ? 660 : 600), transform: `translateY(${yHero}px)`, opacity: oHero, willChange: 'transform' }}>
            <div
              className="label"
              style={{ ...box(0, 0), display: 'flex', alignItems: 'center', gap: 10, fontSize: mobile ? 10 : 11.5, color: 'var(--color-mist)', opacity: it('eyebrow'), whiteSpace: 'nowrap' }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--color-gold)' }} />
              {mobile ? 'Madrid · Cape Town' : 'African safaris · European adventures · Madrid & Cape Town'}
            </div>

            {heroLines.map((line, i) => (
              <Mask key={line} t={it(wordKeys[i])} style={box(0, H1.top + i * H1.step, H1.w, H1.line + 8)}>
                <div className="display" aria-hidden="true" style={{ fontSize: H1.size, lineHeight: `${H1.line}px`, whiteSpace: 'nowrap' }}>
                  {line.startsWith('the world') ? <em>{line}</em> : line}
                </div>
              </Mask>
            ))}
            <p style={srOnly}>Rooted in Africa. Inspired by the world.</p>

            {heroBody.map((line, i) => (
              <Mask key={line} t={it(bodyKeys[i])} style={box(0, bodyTop + i * bodyStep, mobile ? 346 : 560, bodyStep + 6)}>
                <div aria-hidden="true" style={{ fontSize: mobile ? 16 : 18.5, lineHeight: `${bodyStep}px`, color: 'color-mix(in srgb, var(--color-bone) 86%, transparent)', whiteSpace: 'nowrap' }}>
                  {line}
                </div>
              </Mask>
            ))}
            <p style={srOnly}>{heroBody.join(' ')}</p>

            <div
              style={{
                ...box(0, ctaTop),
                display: 'flex',
                flexDirection: mobile ? 'column' : 'row',
                alignItems: 'flex-start',
                gap: mobile ? 10 : 14,
                opacity: it('cta'),
                transform: `translateY(${(1 - it('cta')) * 14}px)`,
              }}
            >
              <Link to="/safari" className="btn btn-light">
                Plan my safari
              </Link>
              <Link to="/europe" className="btn btn-ghost">
                Explore Europe
                <span className="dot">
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>

            {/* The collection card — the reference's efficiency card, carrying
                the safari collection as readouts that count up on load. */}
            <Link
              to="/safari#tours"
              className="glass"
              aria-label="View the safari collection: 8 signature safaris across 4 countries, 6 to 10 days, from €4,000 per person"
              style={{
                ...(mobile ? box(0, ctaTop + 128, 346, 150) : box(GW - 440, 250, 440, 318)),
                borderRadius: mobile ? 30 : 48,
                opacity: stat,
                transform: `translateY(${(1 - stat) * 28}px)`,
                display: 'block',
              }}
            >
              <div aria-hidden="true" style={{ position: 'absolute', inset: mobile ? '20px 22px' : '34px 38px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: mobile ? 15 : 17, lineHeight: 1.35, color: 'color-mix(in srgb, var(--color-bone) 90%, transparent)' }}>
                    Signature
                    <br />
                    safaris
                  </div>
                  <div className="display tabular" style={{ fontSize: mobile ? 52 : 80, lineHeight: 0.9, fontWeight: 300 }}>
                    {Math.round(8 * stat)}
                  </div>
                </div>

                {!mobile && (
                  <>
                    <div style={{ position: 'absolute', left: 0, right: 0, top: 100, height: 5, borderRadius: 999, background: 'color-mix(in srgb, var(--color-bone) 16%, transparent)', overflow: 'hidden' }}>
                      <div style={{ width: `${100 * stat}%`, height: '100%', borderRadius: 999, background: 'var(--color-gold)', boxShadow: '0 0 14px var(--color-gold)' }} />
                    </div>
                    <div className="label" style={{ position: 'absolute', left: 0, top: 116, fontSize: 9.5, color: 'color-mix(in srgb, var(--color-bone) 55%, transparent)' }}>
                      South Africa · Zimbabwe · Kenya · Tanzania
                    </div>
                    <div style={{ position: 'absolute', left: 0, right: 0, top: 148, height: 1, background: 'color-mix(in srgb, var(--color-bone) 14%, transparent)' }} />
                  </>
                )}

                <div style={{ position: 'absolute', left: 0, right: 0, top: mobile ? 66 : 170, display: 'flex' }}>
                  {[
                    ['Countries', `${Math.round(4 * stat)}`, ''],
                    ['Up to', `${Math.round(10 * stat)}`, 'days'],
                    ['From', `€${Math.round(4 * stat)}k`, 'pp'],
                  ].map(([k, v, u], i) => (
                    <div key={k} style={{ flex: 1, paddingLeft: i ? (mobile ? 14 : 20) : 0, borderLeft: i ? '1px solid color-mix(in srgb, var(--color-bone) 14%, transparent)' : undefined }}>
                      <div className="display tabular" style={{ fontSize: mobile ? 22 : 26, fontWeight: 500 }}>
                        {v}
                        <span style={{ fontSize: 12, opacity: 0.6, fontFamily: 'var(--font-sans)' }}> {u}</span>
                      </div>
                      <div className="label" style={{ marginTop: 6, fontSize: 9.5, color: 'color-mix(in srgb, var(--color-bone) 55%, transparent)' }}>
                        {k}
                      </div>
                    </div>
                  ))}
                </div>

                {!mobile && (
                  <div className="label" style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-gold-soft)' }}>
                    View the collection <ArrowRight size={14} />
                  </div>
                )}
              </div>
            </Link>
          </section>

          {/* ================= 02 — find your kind of Africa ================= */}
          <section aria-labelledby="scene-africa" onFocus={focusTo(0.44)} style={{ ...box(SAFE, 0, GW, 640), transform: `translateY(${yCards}px)`, opacity: oCards, willChange: 'transform' }}>
            {tiles.map((c, i) => {
              const o = reduce ? 1 : span(p, [P.cardsIn[0] + i * 0.012, P.cardsIn[1] + i * 0.012])
              return (
                <Link
                  key={c.art}
                  to="/safari#audience"
                  aria-label={`Safaris ${c.label.join(' ').replace('- ', '-').toLowerCase()}`}
                  className="scene-tile"
                  style={{ ...box(c.x, c.y, c.w, c.h), opacity: o, transform: `translateY(${(1 - o) * 30}px)`, display: 'block' }}
                >
                  <div style={{ position: 'absolute', inset: 0, borderRadius: mobile ? 30 : 46, overflow: 'hidden' }}>
                    <img src={photo(c.art, 'sm')} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    {/* the label sits on a photograph, so it gets its own ground */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(150deg, rgba(8,10,7,0.84) 0%, rgba(8,10,7,0.32) 55%, rgba(8,10,7,0.05) 100%)' }} />
                  </div>
                  <div style={{ position: 'absolute', inset: 0, borderRadius: mobile ? 30 : 46, border: '1px solid color-mix(in srgb, var(--color-bone) 28%, transparent)', pointerEvents: 'none' }} />
                  <div className="display" aria-hidden="true" style={{ position: 'absolute', left: mobile ? 16 : 24, top: mobile ? 18 : 28, fontSize: mobile ? 19 : 24, lineHeight: 1.1 }}>
                    {c.label[0]}
                    <br />
                    <em>{c.label[1]}</em>
                  </div>
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      right: mobile ? 12 : 16,
                      bottom: mobile ? 12 : 16,
                      width: mobile ? 40 : 58,
                      height: mobile ? 40 : 58,
                      borderRadius: '50%',
                      background: 'color-mix(in srgb, var(--color-bone) 22%, transparent)',
                      border: '1px solid color-mix(in srgb, var(--color-bone) 40%, transparent)',
                      display: 'grid',
                      placeItems: 'center',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--color-bone)',
                    }}
                  >
                    <ArrowUpRight size={mobile ? 16 : 20} />
                  </span>
                </Link>
              )
            })}

            <h2
              id="scene-africa"
              className="display"
              style={{ ...box(0, mobile ? 334 : 470, GW), margin: 0, textAlign: 'center', fontSize: mobile ? 40 : 70, lineHeight: 1.05 }}
            >
              Find your kind <em>of Africa</em>
            </h2>
            <p
              style={{
                ...box((GW - (mobile ? 346 : 700)) / 2, mobile ? 436 : 560, mobile ? 346 : 700),
                margin: 0,
                fontSize: mobile ? 16 : 20,
                lineHeight: mobile ? '25px' : '31px',
                textAlign: 'center',
                color: 'color-mix(in srgb, var(--color-bone) 86%, transparent)',
              }}
            >
              Wake to elephants at the waterhole, follow lions across the plains and end the day with dinner under the stars — at your own pace.
            </p>
          </section>

          {/* ================= 03 — Europe ================= */}
          <section aria-labelledby="scene-europe" onFocus={focusTo(0.86)} style={{ ...box(SAFE, 0, GW, 640), transform: `translateY(${yEurope}px)`, opacity: oEurope, willChange: 'transform' }}>
            <div style={{ ...box(0, 0, 56, 2), background: 'var(--color-gold)', transform: `scaleX(${eIn(0)})`, transformOrigin: 'left' }} />
            <div className="label" style={{ ...box(0, 18, mobile ? 346 : 640), fontSize: mobile ? 10 : 11.5, color: 'var(--color-mist)', opacity: eIn(0) }}>
              For travellers from South Africa, Botswana &amp; Namibia
            </div>
            <h2
              id="scene-europe"
              className="display"
              style={{ ...box(0, mobile ? 60 : 56, mobile ? 346 : 620), margin: 0, fontSize: mobile ? 42 : 66, lineHeight: mobile ? '46px' : '70px', opacity: eIn(1), transform: `translateY(${(1 - eIn(1)) * 24}px)` }}
            >
              Europe is calling. <em>Let’s make it happen.</em>
            </h2>
            <p
              style={{
                ...box(mobile ? 0 : GW - 470, mobile ? 262 : 60, mobile ? 346 : 470),
                margin: 0,
                fontSize: mobile ? 16 : 17.5,
                lineHeight: mobile ? '25px' : '29px',
                color: 'color-mix(in srgb, var(--color-bone) 84%, transparent)',
                opacity: eIn(2),
                transform: `translateY(${(1 - eIn(2)) * 24}px)`,
              }}
            >
              {mobile
                ? 'Spain, Portugal, France and Italy — planned with a founder who knows both worlds, and paid monthly over up to a year.'
                : 'Spain’s sunshine, Portugal’s coastline, Paris and the Amalfi Coast — planned with a founder who was born in Africa and lives in Spain, and paid monthly — by EFT or card — over up to twelve months before you fly.'}
            </p>
            <div
              className="glass"
              style={{
                ...(mobile ? box(0, 428, 346, 84) : box(GW - 470, 240, 470, 96)),
                borderRadius: mobile ? 22 : 26,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: mobile ? '0 18px' : '0 26px',
                opacity: eIn(3),
                transform: `translateY(${(1 - eIn(3)) * 24}px)`,
              }}
            >
              <div>
                <div className="label" style={{ fontSize: 9.5, color: 'color-mix(in srgb, var(--color-bone) 60%, transparent)' }}>
                  A R45 000 adventure
                </div>
                <div style={{ fontSize: 14, color: 'color-mix(in srgb, var(--color-bone) 82%, transparent)', marginTop: 4 }}>over 12 months</div>
              </div>
              <div className="display tabular" style={{ fontSize: mobile ? 32 : 40, fontWeight: 400 }}>
                R3 750
                <span style={{ fontSize: 13, fontFamily: 'var(--font-sans)', color: 'color-mix(in srgb, var(--color-bone) 60%, transparent)' }}> /month</span>
              </div>
            </div>
            <div
              style={{
                ...box(mobile ? 0 : GW - 470, mobile ? 530 : 362),
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
                opacity: eIn(4),
                transform: `translateY(${(1 - eIn(4)) * 24}px)`,
              }}
            >
              <Link to="/europe" className="btn btn-light">
                {mobile ? 'Explore Europe' : 'Explore adventures'}
              </Link>
              {!mobile && (
                <Link to="/europe#payment-plans" className="btn btn-ghost">
                  Payment plans
                  <span className="dot">
                    <ArrowRight size={14} />
                  </span>
                </Link>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

const srOnly: CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
  border: 0,
}
