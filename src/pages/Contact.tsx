import { useSearchParams } from 'react-router'
import { Reveal, Eyebrow, usePageMeta } from '../components/ui'
import EnquiryForm from '../components/EnquiryForm'
import { SITE, whatsappLink } from '../config'
import { tourBySlug, type Region } from '../data/tours'
import { Mail, Pin, WhatsApp, Clock } from '../components/Icons'

export default function Contact() {
  usePageMeta('Plan my trip', 'Tell us about the safari or European adventure you have in mind. We reply within one working day with ideas and an honest, itemised price.')
  const [params] = useSearchParams()
  const tour = tourBySlug(params.get('tour') ?? undefined)
  const j = params.get('journey')
  const region: Region | undefined = tour?.region ?? (j === 'africa' || j === 'europe' ? j : undefined)

  return (
    <section style={{ padding: 'clamp(130px, 16vw, 180px) 0 clamp(60px, 8vw, 100px)', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: '0 0 auto 0', height: 520, background: 'radial-gradient(60% 80% at 20% 0%, rgba(224,168,62,0.16), transparent 70%)' }} />
      <div className="wrap" style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 'clamp(40px, 6vw, 90px)', alignItems: 'start' }}>
        <div>
          <Reveal>
            <Eyebrow>Plan my trip</Eyebrow>
            <h1 className="display" style={{ margin: '18px 0 0', fontSize: 'clamp(42px, 6vw, 80px)' }}>
              Tell us what <em>you’re dreaming of.</em>
            </h1>
            <p style={{ margin: '22px 0 0', fontSize: 18, color: 'var(--color-mist)', maxWidth: 520 }}>
              A first safari, a milestone celebration or your family’s first trip to Europe — share a few details and we’ll reply within one working day with ideas, an honest itemised price and, for Europe, a payment schedule.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul style={{ listStyle: 'none', padding: 0, margin: '40px 0 0', display: 'grid', gap: 12 }}>
              <li>
                <a href={`mailto:${SITE.email}`} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 20px', borderRadius: 20, border: '1px solid var(--color-line)', background: 'var(--color-ink-2)' }}>
                  <span style={{ width: 46, height: 46, borderRadius: '50%', display: 'grid', placeItems: 'center', border: '1px solid rgba(224,168,62,0.45)', color: 'var(--color-gold)', flex: 'none' }}>
                    <Mail size={20} />
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <span style={{ display: 'block', fontWeight: 700 }}>Email our bookings team</span>
                    <span style={{ fontSize: 14, color: 'var(--color-dim)', overflowWrap: 'anywhere' }}>{SITE.email}</span>
                  </span>
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '10px 20px', color: 'var(--color-mist)' }}>
                <span style={{ color: 'var(--color-gold)', flex: 'none', width: 46, display: 'grid', placeItems: 'center' }}>
                  <Clock size={22} />
                </span>
                We reply within one working day — no obligation, no hard sell.
              </li>
            </ul>
          </Reveal>

          <div id="offices" style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 14, scrollMarginTop: 100 }}>
            {SITE.offices.map((o) => (
              <address key={o.key} style={{ fontStyle: 'normal', padding: 22, borderRadius: 22, border: '1px solid var(--color-line)', display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: 'var(--color-gold)' }}>
                  <Pin size={18} />
                </span>
                <span className="display" style={{ fontSize: 26, marginTop: 8 }}>
                  {o.city}
                </span>
                <span className="label" style={{ color: 'var(--color-gold-soft)', marginTop: 4, fontSize: 10 }}>
                  {o.role}
                </span>
                <span style={{ fontSize: 14.5, color: 'var(--color-mist)', marginTop: 12, lineHeight: 1.6 }}>
                  {o.address.map((l) => (
                    <span key={l} style={{ display: 'block' }}>
                      {l}
                    </span>
                  ))}
                </span>
                <a
                  href={whatsappLink('Hi Flexi, I’d like help planning a trip.', o.key)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 10, minHeight: 44, padding: '0 16px', borderRadius: 999, background: '#25d366', color: '#fff', fontWeight: 700, fontSize: 14.5, alignSelf: 'flex-start' }}
                >
                  <WhatsApp size={18} /> {o.phone}
                </a>
              </address>
            ))}
          </div>
        </div>

        <Reveal delay={0.12} style={{ padding: 'clamp(22px, 4vw, 40px)', borderRadius: 32, border: '1px solid var(--color-line)', background: 'linear-gradient(160deg, var(--color-ink-3), var(--color-ink-2))' }}>
          <h2 className="display" style={{ margin: '0 0 24px', fontSize: 30 }}>
            Your enquiry
          </h2>
          <EnquiryForm defaultRegion={region} defaultTour={tour?.slug} />
        </Reveal>
      </div>
    </section>
  )
}
