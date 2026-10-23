import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Logo, Mark } from './Logo'
import { Close, Menu, ArrowRight, WhatsApp, Mail } from './Icons'
import { SITE, whatsappLink } from '../config'
import { SAFARI_COUNTRIES, toursIn, tourBySlug } from '../data/tours'

type Item = { to: string; label: string; sub?: { to: string; label: string }[] }

/* The menu, as the client specified it. */
export const MENU: Item[] = [
  { to: '/', label: 'Home' },
  {
    to: '/safari',
    label: 'African Safaris',
    sub: [
      { to: '/safari', label: 'All African safaris' },
      ...SAFARI_COUNTRIES.map((c) => ({ to: `/safari?country=${encodeURIComponent(c)}#tours`, label: c })),
    ],
  },
  {
    to: '/europe',
    label: 'European Adventures',
    sub: [
      { to: '/europe', label: 'All European adventures' },
      ...toursIn('europe').map((t) => ({ to: `/tours/${t.slug}`, label: t.country })),
    ],
  },
  { to: '/payment-options', label: 'Payment Options' },
  { to: '/about', label: 'Our Story' },
  { to: '/travel-guides', label: 'Travel Guides' },
  { to: '/contact', label: 'Contact Us' },
]

/** Which top-level item is "here" — tour pages belong to their region. */
function isCurrent(to: string, pathname: string) {
  if (to === '/') return pathname === '/'
  if (pathname === to || pathname.startsWith(`${to}/`)) return true
  const tour = pathname.startsWith('/tours/') ? tourBySlug(pathname.slice(7)) : undefined
  return !!tour && to === (tour.region === 'africa' ? '/safari' : '/europe')
}

const Chevron = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
    <path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Nav() {
  const { pathname, hash } = useLocation()
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [stuck, setStuck] = useState(false)
  const burger = useRef<HTMLButtonElement>(null)
  const topRows = useRef<HTMLDivElement>(null)

  /* Once the contact strip and logo row have scrolled away, the pinned bar
     shows the acacia mark and its own Plan-a-trip button. */
  useEffect(() => {
    const on = () => setStuck(window.scrollY > (topRows.current?.offsetHeight ?? 130) - 2)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    setOpen(false)
    setExpanded(null)
  }, [pathname, hash])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        burger.current?.focus()
      }
    }
    window.addEventListener('keydown', key)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', key)
    }
  }, [open])

  const [madrid, capetown] = SITE.offices

  return (
    <>
      {/* ================= desktop: contact strip + logo row (scroll away) ================= */}
      <div ref={topRows} className="hdr-desktop">
        <div style={{ background: 'var(--color-black)', color: 'rgba(255,255,255,0.86)', fontSize: 13 }}>
          <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, height: 38 }}>
            <div style={{ display: 'flex', gap: 26 }}>
              {[madrid, capetown].map((o) => (
                <a key={o.key} href={whatsappLink('Hi Flexi, I’d like help planning a trip.', o.key)} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#25d366', display: 'inline-flex' }}>
                    <WhatsApp size={15} />
                  </span>
                  <span>
                    <strong style={{ color: '#fff', fontWeight: 600 }}>{o.city}</strong> {o.phone}
                  </span>
                </a>
              ))}
            </div>
            <a href={`mailto:${SITE.email}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Mail size={15} /> {SITE.email}
            </a>
          </div>
        </div>
        <div style={{ background: '#fff' }}>
          <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, height: 96 }}>
            <Link to="/" aria-label={`${SITE.name} — home`} style={{ display: 'inline-flex' }}>
              <Logo height={62} />
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
              <span className="label" style={{ color: 'var(--color-dim)', fontSize: 11 }}>
                {SITE.tagline}
              </span>
              <Link to="/contact" className="btn btn-gold">
                Plan a trip
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================= desktop: the pinned menu bar ================= */}
      <nav aria-label="Main" className="hdr-desktop" style={{ position: 'sticky', top: 0, zIndex: 40, background: 'var(--color-black)', boxShadow: stuck ? '0 10px 30px -18px rgba(0,0,0,0.6)' : 'none' }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', gap: 20, height: 'var(--header-h)' }}>
          <Link
            to="/"
            aria-label={`${SITE.name} — home`}
            tabIndex={stuck ? 0 : -1}
            style={{ display: 'inline-flex', width: stuck ? 34 : 0, opacity: stuck ? 1 : 0, overflow: 'hidden', transition: 'width 250ms ease, opacity 250ms ease', background: '#fff', borderRadius: 8 }}
          >
            <Mark size={34} />
          </Link>
          <ul style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, listStyle: 'none', margin: 0, padding: 0, flex: 1, maxWidth: 1080 }}>
            {MENU.map((m) => (
              <li key={m.to} className="menu-item" style={{ position: 'relative' }}>
                <Link to={m.to} className="menu-link" aria-current={isCurrent(m.to, pathname) ? 'page' : undefined}>
                  {m.label}
                  {m.sub && <Chevron />}
                </Link>
                {m.sub && (
                  <ul className="submenu" aria-label={m.label}>
                    {m.sub.map((s) => (
                      <li key={s.to}>
                        <Link to={s.to}>
                          {s.label}
                          <ArrowRight size={14} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            className="btn btn-gold pin-cta"
            tabIndex={stuck ? 0 : -1}
            aria-hidden={!stuck}
            style={{ height: 38, padding: '0 18px', fontSize: 11, opacity: stuck ? 1 : 0, pointerEvents: stuck ? 'auto' : 'none', transition: 'opacity 250ms ease' }}
          >
            Plan a trip
          </Link>
        </div>
      </nav>

      {/* ================= phones & tablets: one white bar ================= */}
      <header className="hdr-mobile" style={{ position: 'sticky', top: 0, zIndex: 40, background: '#fff', borderBottom: '1px solid var(--color-line)', boxShadow: '0 8px 24px -20px rgba(0,0,0,0.5)' }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', gap: 12, height: 'var(--header-h)' }}>
          <Link to="/" aria-label={`${SITE.name} — home`} style={{ display: 'inline-flex', marginRight: 'auto' }}>
            <Logo height={40} />
          </Link>
          <Link to="/contact" className="btn btn-gold" style={{ height: 40, padding: '0 16px', fontSize: 11 }}>
            Enquire
          </Link>
          <button
            ref={burger}
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="menu-sheet"
            onClick={() => setOpen((o) => !o)}
            style={{ width: 44, height: 44, borderRadius: 12, border: 0, background: 'var(--color-black)', color: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer', flex: 'none' }}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Menu sheet */}
      <div
        id="menu-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        style={{ position: 'fixed', inset: 'var(--header-h) 0 0 0', zIndex: 39, background: '#fff', overflowY: 'auto', paddingBottom: 40 }}
      >
        <ul className="wrap" style={{ listStyle: 'none', margin: 0, paddingTop: 8 }}>
          {MENU.map((m) => {
            const on = isCurrent(m.to, pathname)
            const exp = expanded === m.to
            return (
              <li key={m.to} style={{ borderBottom: '1px solid var(--color-line)' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Link
                    to={m.to}
                    aria-current={on ? 'page' : undefined}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', minHeight: 58, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, color: on ? 'var(--color-gold)' : 'var(--color-bone)' }}
                  >
                    {m.label}
                  </Link>
                  {m.sub && (
                    <button
                      type="button"
                      aria-expanded={exp}
                      aria-label={`${exp ? 'Hide' : 'Show'} ${m.label} options`}
                      onClick={() => setExpanded(exp ? null : m.to)}
                      style={{ width: 48, height: 48, border: 0, background: 'var(--color-ink-2)', borderRadius: 12, display: 'grid', placeItems: 'center', cursor: 'pointer', color: 'var(--color-bone)', transform: exp ? 'rotate(180deg)' : undefined, transition: 'transform 200ms ease' }}
                    >
                      <Chevron />
                    </button>
                  )}
                </div>
                {m.sub && exp && (
                  <ul style={{ listStyle: 'none', margin: '0 0 12px', padding: 0 }}>
                    {m.sub.map((s) => (
                      <li key={s.to}>
                        <Link to={s.to} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 46, padding: '0 14px', borderRadius: 10, fontWeight: 600, color: 'var(--color-mist)' }}>
                          {s.label}
                          <ArrowRight size={14} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
        <div className="wrap" style={{ marginTop: 22, display: 'grid', gap: 10 }}>
          {SITE.offices.map((o) => (
            <a key={o.key} href={whatsappLink('Hi Flexi, I’d like help planning a trip.', o.key)} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, padding: '0 16px', borderRadius: 14, background: 'var(--color-ink-2)' }}>
              <span style={{ color: '#1a9e4b', display: 'inline-flex' }}>
                <WhatsApp size={20} />
              </span>
              <span style={{ fontWeight: 600 }}>{o.city}</span>
              <span style={{ color: 'var(--color-dim)', marginLeft: 'auto' }}>{o.phone}</span>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

