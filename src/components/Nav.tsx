import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Logo } from './Logo'
import { Close, Menu, ArrowRight } from './Icons'
import { SITE } from '../config'

export const NAV = [
  { to: '/safari', label: 'Safari Africa' },
  { to: '/europe', label: 'European Adventures' },
  { to: '/europe#payment-plans', label: 'Payment plans' },
  { to: '/about', label: 'Our story' },
  { to: '/contact', label: 'Contact' },
]

/*
  Which link is "here". Router matching ignores the #hash, so on /europe both
  "European Adventures" and "Payment plans" would claim the page. A link with
  a hash is current only when that hash is in the address; a plain link is
  current on its path unless a hash link has claimed it.
*/
function isCurrent(to: string, pathname: string, hash: string) {
  const [path, anchor] = to.split('#')
  if (pathname !== path) return false
  if (anchor) return hash === `#${anchor}`
  return !NAV.some((n) => n.to.startsWith(`${path}#`) && hash === `#${n.to.split('#')[1]}`)
}

/*
  The bar is viewport-level chrome, as in the reference: a tint that fades to
  nothing rather than a solid bar, so it never draws a seam across footage.
  Once the page has scrolled it firms up so links stay legible over any photo.
*/
export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const loc = useLocation()
  const burger = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => setOpen(false), [loc.pathname, loc.hash])

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

  return (
    <>
      <header
        style={{
          position: 'fixed',
          inset: '0 0 auto 0',
          zIndex: 40,
          height: scrolled ? 76 : 112,
          transition: 'height 300ms ease',
          pointerEvents: 'none',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: scrolled
              ? 'linear-gradient(180deg, rgba(12,15,11,0.92) 0%, rgba(12,15,11,0.78) 70%, rgba(12,15,11,0) 100%)'
              : 'linear-gradient(180deg, rgba(8,10,7,0.72) 0%, rgba(8,10,7,0.38) 50%, rgba(8,10,7,0) 100%)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            maskImage: 'linear-gradient(180deg, #000 0%, #000 55%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(180deg, #000 0%, #000 55%, transparent 100%)',
            transition: 'background 300ms ease',
          }}
        />
        <nav
          aria-label="Main"
          className="wrap"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            height: scrolled ? 64 : 88,
            transition: 'height 300ms ease',
            maxWidth: 1440,
            pointerEvents: 'auto',
          }}
        >
          <Link to="/" aria-label={`${SITE.name} — home`} style={{ display: 'inline-flex', minHeight: 44, alignItems: 'center' }}>
            <Logo />
          </Link>

          <ul className="nav-links" style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 34, listStyle: 'none', margin: 0, padding: 0 }}>
            {NAV.map((n) => {
              const on = isCurrent(n.to, loc.pathname, loc.hash)
              return (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="label"
                    aria-current={on ? 'page' : undefined}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      minHeight: 44,
                      whiteSpace: 'nowrap',
                      color: on ? 'var(--color-gold)' : 'rgba(245,239,227,0.82)',
                      transition: 'color 200ms ease',
                    }}
                  >
                    {n.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Link to="/contact" className="btn btn-gold nav-cta" style={{ height: 44 }} aria-label="Plan my trip">
              <span className="cta-long">Plan my trip</span>
              <span className="cta-short" aria-hidden="true">Enquire</span>
            </Link>
            <button
              ref={burger}
              type="button"
              className="nav-burger"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="menu-sheet"
              onClick={() => setOpen((o) => !o)}
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: '1px solid rgba(245,239,227,0.3)',
                background: 'rgba(12,15,11,0.4)',
                color: 'var(--color-bone)',
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
              }}
            >
              {open ? <Close /> : <Menu />}
            </button>
          </div>
        </nav>
      </header>

      {/* Menu sheet for phones and tablets */}
      <div
        id="menu-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 39,
          background: 'rgba(12,15,11,0.97)',
          backdropFilter: 'blur(14px)',
          paddingTop: 110,
          overflowY: 'auto',
        }}
      >
        <ul className="wrap" style={{ listStyle: 'none', margin: 0 }}>
          {[{ to: '/', label: 'Home' }, ...NAV].map((n, i) => (
            <li key={n.to} style={{ borderBottom: '1px solid var(--color-line)' }}>
              <Link
                to={n.to}
                className="display"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  minHeight: 64,
                  fontSize: 30,
                  animation: open ? `sheetIn 420ms ${i * 45}ms both cubic-bezier(.2,.7,.2,1)` : undefined,
                }}
              >
                {n.label}
                <ArrowRight size={20} />
              </Link>
            </li>
          ))}
        </ul>
        <div className="wrap" style={{ marginTop: 28, display: 'flex', gap: 24, flexWrap: 'wrap', color: 'var(--color-dim)', fontSize: 14 }}>
          {SITE.offices.map((o) => (
            <span key={o.city}>
              <span className="label" style={{ color: 'var(--color-gold)' }}>{o.city}</span> · {o.role}
            </span>
          ))}
        </div>
        <style>{`@keyframes sheetIn { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }`}</style>
      </div>
    </>
  )
}
