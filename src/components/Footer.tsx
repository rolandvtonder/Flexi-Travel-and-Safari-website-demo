/*
  Footer, after the reference: a CTA band with the newsletter on the right, a
  rule, the brand column beside three link columns and a legal bar.
  Ordinary responsive flow.
*/
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { Logo } from './Logo'
import { SITE, whatsappLink } from '../config'
import { WhatsApp, ArrowRight, Pin } from './Icons'
import { submitEnquiry } from '../lib/submit'

const COLUMNS = [
  {
    head: 'African Safaris',
    links: [
      { t: 'All African safaris', to: '/safari' },
      { t: 'South Africa', to: '/safari?country=South%20Africa#tours' },
      { t: 'Zimbabwe', to: '/safari?country=Zimbabwe#tours' },
      { t: 'Kenya', to: '/safari?country=Kenya#tours' },
      { t: 'Tanzania', to: '/safari?country=Tanzania#tours' },
    ],
  },
  {
    head: 'European Adventures',
    links: [
      { t: 'All European adventures', to: '/europe' },
      { t: 'Spain', to: '/tours/viva-espana' },
      { t: 'Portugal', to: '/tours/portugal-in-colour' },
      { t: 'France', to: '/tours/bonjour-paris' },
      { t: 'Italy', to: '/tours/ciao-italia' },
    ],
  },
  {
    head: 'Flexi Travel & Safari',
    links: [
      { t: 'Payment options', to: '/payment-options' },
      { t: 'Our story', to: '/about' },
      { t: 'Travel guides', to: '/travel-guides' },
      { t: 'Plan a trip', to: '/contact' },
      { t: 'Contact us', to: '/contact#offices' },
    ],
  },
]

function Newsletter() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState('error')
      setError('Enter an email address like name@example.com.')
      return
    }
    setState('sending')
    const r = await submitEnquiry('Newsletter sign-up', { Email: email })
    if (r.ok) setState('done')
    else {
      setState('error')
      setError(r.error)
    }
  }

  if (state === 'done')
    return (
      <p role="status" style={{ margin: 0, color: 'var(--color-gold-soft)', fontSize: 15 }}>
        You’re on the list — first departures and new routes will come to your inbox.
      </p>
    )

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor="nl-email" className="label" style={{ display: 'block', color: 'var(--color-mist)', marginBottom: 12 }}>
        New routes &amp; early departures
      </label>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <input
          id="nl-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={state === 'error'}
          aria-describedby={state === 'error' ? 'nl-err' : undefined}
          style={{ flex: '1 1 200px', width: 'auto' }}
        />
        <button className="btn btn-gold" disabled={state === 'sending'} style={{ opacity: state === 'sending' ? 0.6 : 1 }}>
          {state === 'sending' ? 'Sending…' : 'Subscribe'}
        </button>
      </div>
      {state === 'error' && (
        <p id="nl-err" role="alert" style={{ margin: '8px 0 0', fontSize: 13, color: 'var(--color-danger)' }}>
          {error}
        </p>
      )}
    </form>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-ink-2)', borderTop: '4px solid var(--color-brand-gold)', padding: '64px 16px 0', position: 'relative', zIndex: 1 }}>
      <div
        style={{
          maxWidth: 1312,
          margin: '0 auto',
          border: '1px solid color-mix(in srgb, var(--color-bone) 10%, transparent)',
          borderRadius: 28,
          background: 'var(--color-ink)',
          boxShadow: '0 30px 60px -40px rgba(0,0,0,0.25)',
          padding: 'clamp(28px, 5vw, 56px) clamp(22px, 5vw, 56px) 0',
          overflow: 'hidden',
        }}
      >
        {/* ---- CTA band ---- */}
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 420px' }}>
            <span
              className="label"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '7px 14px',
                borderRadius: 999,
                border: '1px solid color-mix(in srgb, var(--color-bone) 16%, transparent)',
                color: 'var(--color-mist)',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-gold)' }} />
              Madrid · Cape Town
            </span>
            <h2 className="display" style={{ margin: '20px 0 0', fontSize: 'clamp(28px, 3.6vw, 40px)' }}>
              Your journey starts <em>with a conversation</em>
            </h2>
            <p style={{ margin: '14px 0 22px', fontSize: 16, color: 'var(--color-dim)', maxWidth: 440 }}>
              Tell us where you dream of going. We’ll shape the route, the pace and — for Europe — the payment plan around you.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-light">
                Start planning <ArrowRight />
              </Link>
            </div>
          </div>
          <div style={{ flex: '0 1 380px' }}>
            <Newsletter />
          </div>
        </div>

        <div style={{ height: 1, background: 'color-mix(in srgb, var(--color-bone) 10%, transparent)', margin: '44px 0 40px' }} />

        {/* ---- brand + link columns ---- */}
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px' }}>
            <Logo height={64} />
            <p style={{ margin: '16px 0 0', fontSize: 14, lineHeight: '22px', color: 'var(--color-dim)', maxWidth: 300 }}>
              {SITE.tagline} Authentic African safaris and unforgettable European adventures, thoughtfully planned around you.
            </p>
            <p style={{ margin: '14px 0 0', fontSize: 14 }}>
              <a href={`mailto:${SITE.email}`} style={{ color: 'var(--color-mist)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                {SITE.email}
              </a>
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.head} aria-label={col.head} style={{ flex: '0 1 180px' }}>
              <div className="label" style={{ color: 'var(--color-dim)', marginBottom: 12 }}>
                {col.head}
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {col.links.map((l) => (
                  <li key={l.t}>
                    <Link to={l.to} style={{ display: 'inline-block', padding: '7px 0', fontSize: 14.5, color: 'color-mix(in srgb, var(--color-bone) 80%, transparent)' }}>
                      {l.t}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ---- offices ---- */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 16, marginTop: 40 }}>
          {SITE.offices.map((o) => (
            <address key={o.key} style={{ fontStyle: 'normal', padding: 22, borderRadius: 20, border: '1px solid color-mix(in srgb, var(--color-bone) 10%, transparent)', display: 'flex', gap: 14 }}>
              <span style={{ color: 'var(--color-gold)', flex: 'none', marginTop: 2 }}>
                <Pin size={18} />
              </span>
              <span style={{ fontSize: 14, lineHeight: '22px', color: 'var(--color-dim)' }}>
                <span className="label" style={{ display: 'block', color: 'var(--color-bone)', marginBottom: 6 }}>
                  {o.city} · {o.role}
                </span>
                {o.address.join(', ')}
                <br />
                <a href={whatsappLink('Hi Flexi, I’d like to plan a trip.', o.key)} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 6, color: 'var(--color-mist)', minHeight: 32 }}>
                  <WhatsApp size={15} /> {o.phone}
                </a>
              </span>
            </address>
          ))}
        </div>

        {/* ---- legal bar ---- */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
            fontSize: 13,
            color: 'var(--color-dim)',
            borderTop: '1px solid color-mix(in srgb, var(--color-bone) 10%, transparent)',
            marginTop: 40,
            padding: '22px 0 26px',
          }}
        >
          <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          <span>Prices are indicative and confirmed on quotation. International flights excluded.</span>
        </div>
      </div>
      <div style={{ height: 16 }} />
    </footer>
  )
}
