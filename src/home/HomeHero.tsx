import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import { useReducedMotion } from 'motion/react'
import { photo, img } from '../data/tours'
import { ArrowRight } from '../components/Icons'

/*
  The home hero: two slides — African Safaris and European Adventures — that
  cross-fade every few seconds. It replaces the scroll-scrubbed video scene,
  which the client found sluggish: here nothing is tied to scrolling, and the
  only things that animate are opacity and a slow zoom (both GPU-cheap).

  Accessibility: labelled tabs to pick a slide, a pause button, rotation
  pauses while the pointer or keyboard focus is inside, and never starts for
  visitors who prefer reduced motion. Hidden slides are inert.
*/

type Slide = {
  key: string
  tab: string
  short: string
  image: string
  alt: string
  position: string
  /** How dark the left-hand shade behind the text is (0–1) — busier photos need more. */
  shade: number
  eyebrow: string
  title: ReactNode
  body: string
  primary: { to: string; label: string }
  secondary: { to: string; label: string }
}

const SLIDES: Slide[] = [
  {
    key: 'africa',
    tab: 'African Safaris',
    short: 'Safaris',
    image: photo('hwa-plains'),
    alt: 'Elephants crossing the plains of Hwange National Park, Zimbabwe',
    position: '62% 60%',
    shade: 0.62,
    eyebrow: 'African Safaris · For Europe & America',
    title: (
      <>
        Africa is calling. <em>Answer it in style.</em>
      </>
    ),
    body: 'Thoughtfully planned safaris in South Africa, Zimbabwe, Kenya and Tanzania — for first-timers, couples, families and friends.',
    primary: { to: '/safari', label: 'Explore African safaris' },
    secondary: { to: '/contact?journey=africa', label: 'Plan my safari' },
  },
  {
    key: 'europe',
    tab: 'European Adventures',
    short: 'Europe',
    image: img('europe-madrid-granvia'),
    alt: 'Gran Vía and the Metropolis building in Madrid at sunset',
    position: '60% 55%',
    shade: 0.8,
    eyebrow: 'European Adventures · For Southern Africa',
    title: (
      <>
        Europe is calling. <em>Let’s make it happen.</em>
      </>
    ),
    body: 'Spain, Portugal, France and Italy — planned with you, and paid for monthly over up to twelve months before you fly.',
    primary: { to: '/europe', label: 'Explore European adventures' },
    secondary: { to: '/payment-options', label: 'Payment options' },
  },
]

const INTERVAL = 7000

export default function HomeHero() {
  const reduce = !!useReducedMotion()
  const [at, setAt] = useState(0)
  const [paused, setPaused] = useState(false) // the visitor pressed pause
  const [held, setHeld] = useState(false) // pointer or focus inside
  const root = useRef<HTMLElement>(null)
  const running = !reduce && !paused && !held

  useEffect(() => {
    if (!running) return
    const id = window.setTimeout(() => setAt((i) => (i + 1) % SLIDES.length), INTERVAL)
    return () => window.clearTimeout(id)
  }, [running, at])

  return (
    <section
      ref={root}
      className="dark"
      aria-roledescription="carousel"
      aria-label="Our two journeys"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!root.current?.contains(e.relatedTarget as Node)) setHeld(false)
      }}
      style={{ position: 'relative', height: 'min(max(520px, calc(100svh - var(--header-full))), 860px)', overflow: 'hidden', background: '#111' }}
    >
      <h1 style={srOnly}>Flexi Travel &amp; Safari — African safaris and European adventures</h1>

      {SLIDES.map((s, i) => {
        const on = i === at
        return (
          <div
            key={s.key}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${SLIDES.length}: ${s.tab}`}
            aria-hidden={!on}
            inert={!on}
            style={{ position: 'absolute', inset: 0, opacity: on ? 1 : 0, transition: 'opacity 900ms ease', zIndex: on ? 1 : 0 }}
          >
            <img
              src={s.image}
              alt={s.alt}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              loading={i === 0 ? 'eager' : 'lazy'}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: s.position,
                transform: on && !reduce ? 'scale(1)' : 'scale(1.06)',
                transition: reduce ? 'none' : `transform ${INTERVAL + 1200}ms linear`,
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(90deg, rgba(0,0,0,${s.shade}) 0%, rgba(0,0,0,${s.shade / 2}) 42%, rgba(0,0,0,0) 70%), linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.55) 100%)`,
              }}
            />
            <div className="wrap" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 24, paddingBottom: 84 }}>
              <span className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: 'var(--color-gold)' }}>
                <span aria-hidden="true" style={{ width: 28, height: 1.5, background: 'currentColor' }} />
                {s.eyebrow}
              </span>
              <h2 className="display" style={{ margin: '14px 0 0', fontSize: 'clamp(36px, 5.4vw, 74px)', maxWidth: 780 }}>
                {s.title}
              </h2>
              <p style={{ margin: '20px 0 0', maxWidth: 560, fontSize: 'clamp(16px, 1.5vw, 19px)', color: 'var(--color-mist)' }}>{s.body}</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 30 }}>
                <Link to={s.primary.to} className="btn btn-gold">
                  {s.primary.label}
                </Link>
                <Link to={s.secondary.to} className="btn btn-ghost">
                  {s.secondary.label}
                  <span className="dot">
                    <ArrowRight size={14} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )
      })}

      {/* ---- controls ---- */}
      <div className="wrap" style={{ position: 'absolute', left: 0, right: 0, bottom: 24, zIndex: 2, display: 'flex', alignItems: 'center', gap: 10 }}>
        {SLIDES.map((s, i) => {
          const on = i === at
          return (
            <button
              key={s.key}
              type="button"
              aria-pressed={on}
              aria-label={`Show ${s.tab}`}
              onClick={() => setAt(i)}
              className="label"
              style={{
                position: 'relative',
                overflow: 'hidden',
                minHeight: 44,
                padding: '0 18px',
                borderRadius: 999,
                border: `1px solid ${on ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)'}`,
                background: on ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.25)',
                color: '#fff',
                cursor: 'pointer',
                backdropFilter: 'blur(6px)',
              }}
            >
              <span className="tab-long">{s.tab}</span>
              <span className="tab-short">{s.short}</span>
              {/* progress towards the next slide */}
              <span
                aria-hidden="true"
                key={`${at}-${running}`}
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  height: 3,
                  width: '100%',
                  background: 'var(--color-brand-gold)',
                  transformOrigin: 'left',
                  transform: `scaleX(${on ? (running ? 0 : 1) : 0})`,
                  animation: on && running ? `heroProgress ${INTERVAL}ms linear forwards` : undefined,
                }}
              />
            </button>
          )
        })}
        {!reduce && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
            style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.4)', background: 'rgba(0,0,0,0.25)', color: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer' }}
          >
            {paused ? (
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M3 1.5v11l9-5.5z" fill="currentColor" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M3 1.5h3v11H3zM8 1.5h3v11H8z" fill="currentColor" />
              </svg>
            )}
          </button>
        )}
      </div>
      <style>{`@keyframes heroProgress { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>
    </section>
  )
}

const srOnly = {
  position: 'absolute' as const,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap' as const,
  border: 0,
}
