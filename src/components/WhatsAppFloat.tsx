import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { SITE, whatsappLink } from '../config'
import { WhatsApp, Close } from './Icons'

/*
  Two offices, two WhatsApp numbers. The floating button opens a small chooser
  so the visitor can message whichever office suits them — both take all
  enquiries.
*/
export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const root = useRef<HTMLDivElement>(null)
  const btn = useRef<HTMLButtonElement>(null)

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btn.current?.focus()
      }
    }
    const onDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  const offices = SITE.offices

  return (
    <div ref={root} style={{ position: 'fixed', right: 18, bottom: 18, zIndex: 30, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
      {open && (
        <div
          id="wa-menu"
          role="menu"
          aria-label="Choose an office to chat with"
          style={{
            width: 'min(300px, calc(100vw - 36px))',
            padding: 8,
            borderRadius: 22,
            background: '#fff',
            border: '1px solid var(--color-line)',
            boxShadow: '0 24px 50px -20px rgba(0,0,0,0.8)',
            backdropFilter: 'blur(14px)',
            animation: 'waIn 220ms cubic-bezier(.2,.7,.2,1) both',
          }}
        >
          <p className="label" style={{ margin: '8px 12px 6px', color: 'var(--color-dim)', fontSize: 10 }}>
            Chat with our team
          </p>
          {offices.map((o) => (
            <a
              key={o.key}
              role="menuitem"
              href={whatsappLink('Hi Flexi, I have a question about a trip.', o.key)}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-item"
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', borderRadius: 14, minHeight: 56 }}
            >
              <span style={{ width: 38, height: 38, borderRadius: '50%', display: 'grid', placeItems: 'center', background: '#25d366', color: '#fff', flex: 'none' }}>
                <WhatsApp size={20} />
              </span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: 'block', fontWeight: 700, fontSize: 15 }}>{o.city}</span>
                <span style={{ display: 'block', fontSize: 13, color: 'var(--color-dim)' }}>{o.role}</span>
              </span>
            </a>
          ))}
          <style>{`@keyframes waIn { from { opacity: 0; transform: translateY(8px) scale(.98) } to { opacity: 1; transform: none } }
            .wa-item:hover { background: color-mix(in srgb, var(--color-bone) 7%, transparent); }`}</style>
        </div>
      )}
      <button
        ref={btn}
        type="button"
        aria-label={open ? 'Close WhatsApp options' : 'Chat with us on WhatsApp'}
        aria-expanded={open}
        aria-controls="wa-menu"
        onClick={() => setOpen((v) => !v)}
        className="wa-float"
      >
        {open ? <Close size={24} /> : <WhatsApp size={26} />}
      </button>
    </div>
  )
}
