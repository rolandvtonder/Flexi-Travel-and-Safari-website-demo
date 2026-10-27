import { useEffect, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router'
import { motion, useReducedMotion } from 'motion/react'
import { type Tour, tourImage, priceFrom } from '../data/tours'
import { ArrowUpRight, Clock, Pin } from './Icons'
import { SITE } from '../config'

/** Sets the document title and meta description for a route. */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE.name}` : `${SITE.name} | ${SITE.tagline}`
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}

/** Rises into place once, when scrolled into view. Final state under reduced motion. */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  style,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  style?: CSSProperties
  as?: 'div' | 'li' | 'section'
}) {
  const reduce = useReducedMotion()
  const M = as === 'li' ? motion.li : as === 'section' ? motion.section : motion.div
  return (
    <M
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </M>
  )
}

export function Eyebrow({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: 'var(--color-gold)', ...style }}>
      <span aria-hidden="true" style={{ width: 28, height: 1.5, background: 'var(--color-gold)' }} />
      {children}
    </span>
  )
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  center = false,
  id,
}: {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  center?: boolean
  id?: string
}) {
  return (
    <Reveal style={{ maxWidth: center ? 760 : 720, margin: center ? '0 auto' : undefined, textAlign: center ? 'center' : undefined }}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className="display" style={{ margin: '16px 0 0', fontSize: 'clamp(34px, 5vw, 60px)' }}>
        {title}
      </h2>
      {intro && (
        <p style={{ margin: '18px 0 0', fontSize: 'clamp(16px, 1.4vw, 18px)', color: 'var(--color-mist)', maxWidth: 640, marginInline: center ? 'auto' : undefined }}>
          {intro}
        </p>
      )}
    </Reveal>
  )
}

/** Full-bleed photographic page header, under the fixed nav. */
export function PageHero({
  image,
  eyebrow,
  title,
  intro,
  children,
  position = 'center',
  titleMax = 1000,
}: {
  image: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  children?: ReactNode
  position?: string
  /** Narrow the headline to keep it clear of the photo's subject. */
  titleMax?: number
}) {
  const reduce = useReducedMotion()
  return (
    <section className="dark" style={{ position: 'relative', minHeight: 'min(calc(88svh - var(--header-h)), 820px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: '#111' }}>
      <motion.img
        src={image}
        alt=""
        fetchPriority="high"
        initial={reduce ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.2, 0.7, 0.2, 1] }}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: position }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0) 32%, rgba(0,0,0,0.2) 58%, rgba(0,0,0,0.7) 100%), linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 62%)',
        }}
      />
      <div className="wrap" style={{ position: 'relative', paddingTop: 96, paddingBottom: 'clamp(48px, 8vh, 96px)' }}>
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="display" style={{ margin: '18px 0 0', fontSize: 'clamp(42px, 7.2vw, 104px)', maxWidth: titleMax }}>
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.16}>
            <p style={{ margin: '22px 0 0', fontSize: 'clamp(16px, 1.5vw, 19px)', color: 'color-mix(in srgb, var(--color-bone) 86%, transparent)', maxWidth: 620 }}>{intro}</p>
          </Reveal>
        )}
        {children && <Reveal delay={0.24}>{children}</Reveal>}
      </div>
    </section>
  )
}

/** A tour tile: the photograph does the selling, the facts sit underneath. */
export function TourCard({ tour, priority = false }: { tour: Tour; priority?: boolean }) {
  return (
    <Link
      to={`/tours/${tour.slug}`}
      className="tour-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: 28,
        overflow: 'hidden',
        background: 'var(--color-ink)',
        border: '1px solid var(--color-line)',
      }}
    >
      <div className="dark" style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden' }}>
        <img
          src={tourImage(tour, 'sm')}
          alt=""
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          width={800}
          height={600}
          className="tour-card-img"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,15,11,0.55) 0%, rgba(12,15,11,0) 42%)' }} />
        <span className="label" style={{ position: 'absolute', left: 18, top: 18, display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--color-bone)' }}>
          <Pin size={14} /> {tour.country}
        </span>
        {tour.flagship && (
          <span className="label" style={{ position: 'absolute', right: 16, top: 14, padding: '6px 10px', borderRadius: 999, background: 'var(--color-gold)', color: 'var(--color-ink)', fontSize: 10 }}>
            Signature
          </span>
        )}
        <span
          aria-hidden="true"
          className="tour-card-go"
          style={{
            position: 'absolute',
            right: 16,
            bottom: 16,
            width: 52,
            height: 52,
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            background: 'color-mix(in srgb, var(--color-bone) 20%, transparent)',
            border: '1px solid color-mix(in srgb, var(--color-bone) 40%, transparent)',
            backdropFilter: 'blur(8px)',
            color: 'var(--color-bone)',
          }}
        >
          <ArrowUpRight size={20} />
        </span>
      </div>
      <div style={{ padding: '22px 24px 24px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <h3 className="display" style={{ margin: 0, fontSize: 25, lineHeight: 1.12 }}>
          {tour.title}
        </h3>
        <p style={{ margin: 0, fontSize: 15, color: 'var(--color-dim)', flex: 1 }}>{tour.summary}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, paddingTop: 14, borderTop: '1px solid var(--color-line)' }}>
          <span className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--color-mist)' }}>
            <Clock size={14} /> {tour.duration}
          </span>
          <span className="tabular" style={{ fontWeight: 700, fontSize: 15, color: 'var(--color-gold)' }}>
            {priceFrom(tour)}
            <span style={{ fontWeight: 500, fontSize: 12, color: 'var(--color-dim)' }}> pp</span>
          </span>
        </div>
      </div>
    </Link>
  )
}

/** Filter chips — real buttons with pressed state. */
export function Chips({
  options,
  value,
  onChange,
  label,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
  label: string
}) {
  return (
    <div role="group" aria-label={label} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {['All', ...options].map((o) => {
        const on = value === o
        return (
          <button
            key={o}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o)}
            className="label"
            style={{
              minHeight: 44,
              padding: '0 18px',
              borderRadius: 999,
              cursor: 'pointer',
              border: `1px solid ${on ? 'var(--color-gold)' : 'color-mix(in srgb, var(--color-bone) 20%, transparent)'}`,
              background: on ? 'var(--color-gold)' : 'transparent',
              color: on ? 'var(--color-ink)' : 'var(--color-bone)',
              transition: 'all 200ms ease',
            }}
          >
            {o}
          </button>
        )
      })}
    </div>
  )
}

/** Questions & answers — native <details>, so it works without JavaScript and with any keyboard. */
export function Faq({ id, title, items }: { id: string; title: ReactNode; items: { q: string; a: ReactNode }[] }) {
  return (
    <section aria-labelledby={id} style={{ padding: '0 0 clamp(80px, 11vw, 140px)' }}>
      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: 'clamp(28px, 5vw, 80px)', alignItems: 'start' }}>
        <SectionHead id={id} eyebrow="Good to know" title={title} />
        <div style={{ borderTop: '1px solid var(--color-line)' }}>
          {items.map((it) => (
            <details key={it.q} className="faq" style={{ borderBottom: '1px solid var(--color-line)' }}>
              <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, minHeight: 64, padding: '16px 0', cursor: 'pointer', fontSize: 18, fontWeight: 600 }}>
                {it.q}
                <span aria-hidden="true" className="faq-icon" style={{ flex: 'none', width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--color-line)', display: 'grid', placeItems: 'center', color: 'var(--color-gold)', fontSize: 20, lineHeight: 1 }}>
                  +
                </span>
              </summary>
              <div style={{ padding: '0 0 22px', color: 'var(--color-mist)', fontSize: 16, maxWidth: 640 }}>{it.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
