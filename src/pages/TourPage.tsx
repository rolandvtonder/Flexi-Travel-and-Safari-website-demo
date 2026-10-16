import { Link, useParams } from 'react-router'
import { Reveal, TourCard, Eyebrow, usePageMeta } from '../components/ui'
import EnquiryForm from '../components/EnquiryForm'
import PaymentPlan from '../components/PaymentPlan'
import NotFound from './NotFound'
import { whatsappLink } from '../config'
import { TOURS, tourBySlug, priceRange, formatPrice, img } from '../data/tours'
import { ArrowLeft, Check, Clock, Info, Pin, Sparkle, Users, Close, WhatsApp } from '../components/Icons'

const INCLUDES = {
  africa: {
    yes: ['Accommodation as described, sharing a double or twin room', 'Transfers and in-country connections on the itinerary', 'Guided game drives and activities named in the itinerary', 'A single point of contact before and during your trip'],
    no: ['International flights', 'Travel insurance and visas', 'Optional activities and spa treatments', 'Personal expenses and gratuities'],
  },
  europe: {
    yes: ['Hotels as described, sharing a double or twin room', 'Planned transport between cities (train or road)', 'Guided tours and experiences named in the itinerary', 'Monthly payments over up to 12 months, by EFT or card'],
    no: ['International flights from South Africa, Botswana or Namibia', 'Schengen visa fees and travel insurance', 'Meals and activities not listed in the itinerary', 'Personal expenses and city taxes'],
  },
} as const

export default function TourPage() {
  const { slug } = useParams()
  const tour = tourBySlug(slug)
  usePageMeta(tour?.title ?? 'Tour not found', tour ? `${tour.duration} in ${tour.country}. ${tour.summary}` : undefined)
  if (!tour) return <NotFound />

  const africa = tour.region === 'africa'
  const parent = africa ? { to: '/safari', label: 'Safari Africa' } : { to: '/europe', label: 'European Adventures' }
  const related = TOURS.filter((t) => t.region === tour.region && t.slug !== tour.slug)
    .sort((a, b) => Number(b.country === tour.country) - Number(a.country === tour.country))
    .slice(0, 3)
  const inc = INCLUDES[tour.region]
  const perMonth = Math.ceil(tour.price[0] / 12)

  return (
    <>
      {/* ---- header ---- */}
      <section style={{ position: 'relative', minHeight: 'min(86svh, 780px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <img src={img(tour.image)} alt="" fetchPriority="high" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,15,11,0.6) 0%, rgba(12,15,11,0.1) 30%, rgba(12,15,11,0.6) 64%, rgba(12,15,11,0.98) 100%)' }} />
        <div className="wrap" style={{ position: 'relative', paddingTop: 140, paddingBottom: 'clamp(40px, 7vh, 80px)' }}>
          <nav aria-label="Breadcrumb">
            <ol className="label" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: 10, color: 'var(--color-mist)' }}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to={parent.to}>{parent.label}</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" style={{ color: 'var(--color-gold-soft)' }}>
                {tour.country}
              </li>
            </ol>
          </nav>
          <Reveal>
            <h1 className="display" style={{ margin: '20px 0 0', fontSize: 'clamp(40px, 6.4vw, 92px)', maxWidth: 1050 }}>
              {tour.title}
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p style={{ margin: '18px 0 0', fontSize: 'clamp(16px, 1.5vw, 19px)', color: 'rgba(245,239,227,0.88)', maxWidth: 640 }}>{tour.summary}</p>
          </Reveal>
          <Reveal delay={0.14}>
            <ul style={{ listStyle: 'none', padding: 0, margin: '30px 0 0', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {[
                { icon: <Pin />, t: tour.country },
                { icon: <Clock />, t: tour.duration },
                { icon: <Sparkle />, t: `${priceRange(tour)} pp` },
              ].map((f) => (
                <li key={f.t} className="glass label tabular" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderRadius: 999 }}>
                  {f.icon}
                  {f.t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---- body ---- */}
      <section style={{ padding: 'clamp(50px, 7vw, 90px) 0' }}>
        <div className="wrap tour-layout">
          <div style={{ minWidth: 0 }}>
            <Link to={`${parent.to}#tours`} className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 44, color: 'var(--color-mist)' }}>
              <ArrowLeft size={14} /> All {africa ? 'safaris' : 'adventures'}
            </Link>

            <Reveal style={{ marginTop: 22, padding: 26, borderRadius: 24, border: '1px solid var(--color-line)', background: 'var(--color-ink-2)', display: 'flex', gap: 16 }}>
              <span style={{ color: 'var(--color-gold)', flex: 'none', marginTop: 2 }}>
                <Users size={22} />
              </span>
              <div>
                <h2 className="label" style={{ margin: 0, color: 'var(--color-gold)' }}>
                  Best for
                </h2>
                <p style={{ margin: '6px 0 0', fontSize: 17 }}>{tour.bestFor}</p>
              </div>
            </Reveal>

            <h2 className="display" style={{ margin: '56px 0 8px', fontSize: 'clamp(30px, 3.6vw, 44px)' }}>
              Your journey, <em>day by day</em>
            </h2>
            <p style={{ margin: 0, color: 'var(--color-dim)' }}>Simple, well-paced and adjustable — add nights, swap lodges or slow it down.</p>
            <ol style={{ listStyle: 'none', padding: 0, margin: '30px 0 0', position: 'relative' }}>
              <span aria-hidden="true" style={{ position: 'absolute', left: 11, top: 12, bottom: 12, width: 1, background: 'linear-gradient(180deg, var(--color-gold), rgba(224,168,62,0.1))' }} />
              {tour.itinerary.map((d, i) => (
                <Reveal as="li" key={d.when} delay={i * 0.05} style={{ position: 'relative', paddingLeft: 48, paddingBottom: 30 }}>
                  <span aria-hidden="true" style={{ position: 'absolute', left: 4, top: 6, width: 15, height: 15, borderRadius: '50%', background: 'var(--color-ink)', border: '2px solid var(--color-gold)' }} />
                  <div className="label tabular" style={{ color: 'var(--color-gold-soft)' }}>
                    {d.when}
                  </div>
                  <p style={{ margin: '6px 0 0', fontSize: 17.5, color: 'var(--color-bone)' }}>{d.what}</p>
                </Reveal>
              ))}
            </ol>

            <Reveal style={{ marginTop: 16, padding: 'clamp(24px, 4vw, 36px)', borderRadius: 28, background: 'linear-gradient(140deg, rgba(224,168,62,0.16), rgba(224,168,62,0.03))', border: '1px solid rgba(224,168,62,0.35)' }}>
              <Eyebrow>The special touch</Eyebrow>
              <p className="display" style={{ margin: '14px 0 0', fontSize: 'clamp(22px, 2.4vw, 28px)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.3 }}>
                “{tour.touch}”
              </p>
            </Reveal>

            {tour.note && (
              <p style={{ display: 'flex', gap: 10, margin: '24px 0 0', fontSize: 15, color: 'var(--color-mist)' }}>
                <span style={{ flex: 'none', marginTop: 3, color: 'var(--color-gold)' }}>
                  <Info />
                </span>
                {tour.note}
              </p>
            )}

            <h2 className="display" style={{ margin: '56px 0 22px', fontSize: 'clamp(30px, 3.6vw, 44px)' }}>
              What’s <em>included</em>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 16 }}>
              {[
                { h: 'Typically included', items: inc.yes, icon: <Check size={18} />, c: 'var(--color-gold)' },
                { h: 'Not included', items: inc.no, icon: <Close size={18} />, c: 'var(--color-dim)' },
              ].map((col) => (
                <div key={col.h} style={{ padding: 24, borderRadius: 24, border: '1px solid var(--color-line)' }}>
                  <h3 className="label" style={{ margin: '0 0 14px', color: 'var(--color-mist)' }}>
                    {col.h}
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
                    {col.items.map((x) => (
                      <li key={x} style={{ display: 'flex', gap: 10, fontSize: 15.5, color: 'var(--color-mist)' }}>
                        <span style={{ color: col.c, flex: 'none', marginTop: 3 }}>{col.icon}</span>
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p style={{ margin: '14px 0 0', fontSize: 13.5, color: 'var(--color-dim)' }}>
              Exact inclusions, group-size limits and cancellation terms are confirmed in your written quote before any deposit is taken.
            </p>

            {!africa && (
              <>
                <h2 className="display" style={{ margin: '56px 0 8px', fontSize: 'clamp(30px, 3.6vw, 44px)' }}>
                  Pay for it <em>over time</em>
                </h2>
                <p style={{ margin: '0 0 26px', color: 'var(--color-dim)' }}>Set to this tour’s starting price — adjust the deposit and plan length.</p>
                <PaymentPlan initialPrice={tour.price[0]} lockPrice />
              </>
            )}

            <div id="enquire" style={{ marginTop: 64, padding: 'clamp(22px, 4vw, 40px)', borderRadius: 32, border: '1px solid var(--color-line)', background: 'linear-gradient(160deg, var(--color-ink-3), var(--color-ink-2))', scrollMarginTop: 96 }}>
              <Eyebrow>No obligation</Eyebrow>
              <h2 className="display" style={{ margin: '14px 0 24px', fontSize: 'clamp(28px, 3.2vw, 40px)' }}>
                Enquire about <em>{tour.title}</em>
              </h2>
              <EnquiryForm defaultRegion={tour.region} defaultTour={tour.slug} key={tour.slug} />
            </div>
          </div>

          {/* ---- price rail: short enough to stay sticky without hiding anything ---- */}
          <aside aria-label="Price and enquiry" className="tour-aside">
            <div style={{ padding: 'clamp(22px, 3vw, 30px)', borderRadius: 28, border: '1px solid var(--color-line)', background: 'var(--color-ink-2)' }}>
              <div className="label" style={{ color: 'var(--color-dim)' }}>
                Indicative price per person
              </div>
              <div className="display tabular" style={{ fontSize: 36, marginTop: 6 }}>
                {priceRange(tour)}
              </div>
              <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--color-dim)' }}>
                {africa ? 'Sharing · accommodation & transfers · flights excluded' : `Sharing · land arrangements · or about ${formatPrice(perMonth, 'ZAR')}/month over 12 months`}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0', display: 'grid', gap: 10, fontSize: 14.5, color: 'var(--color-mist)' }}>
                {[tour.duration, africa ? 'Tailor the lodges, pace and extra nights' : 'Pay monthly over up to 12 months', 'Reply within one working day'].map((x) => (
                  <li key={x} style={{ display: 'flex', gap: 10 }}>
                    <span style={{ color: 'var(--color-gold)', flex: 'none', marginTop: 2 }}>
                      <Check size={16} />
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
              <div style={{ display: 'grid', gap: 10, marginTop: 24 }}>
                <a href="#enquire" className="btn btn-gold">
                  Enquire about this {africa ? 'safari' : 'trip'}
                </a>
                <a
                  href={whatsappLink(`Hi Flexi, I’m interested in “${tour.title}”. Could you tell me more?`, tour.region)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  style={{ padding: '0 22px' }}
                >
                  <WhatsApp /> Ask on WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ---- related ---- */}
      <section aria-labelledby="related" style={{ padding: '0 0 clamp(70px, 10vw, 120px)' }}>
        <div className="wrap">
          <h2 id="related" className="display" style={{ margin: '0 0 30px', fontSize: 'clamp(30px, 3.6vw, 44px)' }}>
            You might <em>also love</em>
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 20 }}>
            {related.map((t) => (
              <li key={t.slug}>
                <TourCard tour={t} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
