import { Link, useParams } from 'react-router'
import { Reveal, TourCard, Eyebrow, usePageMeta } from '../components/ui'
import EnquiryForm from '../components/EnquiryForm'
import PaymentPlan from '../components/PaymentPlan'
import NotFound from './NotFound'
import { SITE, whatsappLink } from '../config'
import { TOURS, tourBySlug, priceRange, formatPrice, tourImage } from '../data/tours'
import Gallery from '../components/Gallery'
import { ArrowLeft, Check, Clock, Info, Pin, Sparkle, Users, Close, WhatsApp, Compass, Heart } from '../components/Icons'

const INCLUDES = {
  africa: {
    yes: ['Accommodation as described, sharing a double or twin room', 'Breakfast daily — other meals as noted for each lodge', 'Transport and transfers on the itinerary', 'Guided game drives and most activities named in the itinerary', 'A single point of contact before and during your trip'],
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
  const parent = africa ? { to: '/safari', label: 'African Safaris' } : { to: '/europe', label: 'European Adventures' }
  const related = TOURS.filter((t) => t.region === tour.region && t.slug !== tour.slug)
    .sort((a, b) => Number(b.country === tour.country) - Number(a.country === tour.country))
    .slice(0, 3)
  const inc = INCLUDES[tour.region]
  const perMonth = formatPrice(Math.ceil(tour.price[0] / 12), tour.currency)

  return (
    <>
      {/* ---- header ---- */}
      <section className="dark" style={{ position: 'relative', minHeight: 'min(calc(82svh - var(--header-h)), 740px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: '#111' }}>
        <img src={tourImage(tour)} alt="" fetchPriority="high" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.25) 58%, rgba(0,0,0,0.78) 100%)' }} />
        <div className="wrap" style={{ position: 'relative', paddingTop: 96, paddingBottom: 'clamp(40px, 7vh, 80px)' }}>
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
            <p style={{ margin: '18px 0 0', fontSize: 'clamp(16px, 1.5vw, 19px)', color: 'color-mix(in srgb, var(--color-bone) 88%, transparent)', maxWidth: 640 }}>{tour.summary}</p>
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

            {tour.highlights && (
              <>
                <h2 className="display" style={{ margin: '56px 0 18px', fontSize: 'clamp(28px, 3.2vw, 40px)' }}>
                  Tour <em>highlights</em>
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 12 }}>
                  {tour.highlights.map((h) => (
                    <li key={h} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '16px 18px', borderRadius: 16, background: 'var(--color-ink-2)', fontSize: 16, fontWeight: 600, color: 'var(--color-bone)' }}>
                      <span style={{ color: 'var(--color-gold)', flex: 'none', marginTop: 2 }}>
                        <Sparkle size={18} />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {tour.facts && (
              <>
                <h2 className="display" style={{ margin: '56px 0 18px', fontSize: 'clamp(28px, 3.2vw, 40px)' }}>
                  Good to <em>know</em>
                </h2>
                <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 1, background: 'var(--color-line)', border: '1px solid var(--color-line)', borderRadius: 20, overflow: 'hidden' }}>
                  {[
                    { k: 'Duration', v: tour.duration, icon: <Clock size={18} /> },
                    { k: 'Availability', v: tour.facts.availability, icon: <Compass size={18} /> },
                    { k: 'Group size', v: tour.facts.groupSize, icon: <Users size={18} /> },
                    { k: 'Minimum age', v: tour.facts.minAge, icon: <Heart size={18} /> },
                    { k: 'Your day', v: tour.facts.dayStarts, icon: <Clock size={18} /> },
                    { k: 'What to wear', v: tour.facts.wear, icon: <Info size={18} /> },
                  ].map((f) => (
                    <div key={f.k} style={{ background: 'var(--color-ink)', padding: '18px 20px', display: 'flex', gap: 12 }}>
                      <span style={{ color: 'var(--color-gold)', flex: 'none', marginTop: 2 }}>{f.icon}</span>
                      <div>
                        <dt className="label" style={{ color: 'var(--color-dim)', fontSize: 10.5 }}>
                          {f.k}
                        </dt>
                        <dd style={{ margin: '4px 0 0', fontSize: 15.5, color: 'var(--color-bone)' }}>{f.v}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </>
            )}

            <h2 className="display" style={{ margin: '56px 0 8px', fontSize: 'clamp(30px, 3.6vw, 44px)' }}>
              Your journey, <em>day by day</em>
            </h2>
            <p style={{ margin: 0, color: 'var(--color-dim)' }}>Simple, well-paced and adjustable — add nights, swap lodges or slow it down.</p>
            <ol style={{ listStyle: 'none', padding: 0, margin: '30px 0 0', position: 'relative' }}>
              <span aria-hidden="true" style={{ position: 'absolute', left: 11, top: 12, bottom: 12, width: 1, background: 'linear-gradient(180deg, var(--color-gold), color-mix(in srgb, var(--color-brand-gold) 10%, transparent))' }} />
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

            <Reveal style={{ marginTop: 16, padding: 'clamp(24px, 4vw, 36px)', borderRadius: 28, background: 'linear-gradient(140deg, color-mix(in srgb, var(--color-brand-gold) 16%, transparent), color-mix(in srgb, var(--color-brand-gold) 3%, transparent))', border: '1px solid color-mix(in srgb, var(--color-brand-gold) 35%, transparent)' }}>
              <Eyebrow>The special touch</Eyebrow>
              <p className="display" style={{ margin: '14px 0 0', fontSize: 'clamp(21px, 2.3vw, 26px)', fontWeight: 600, lineHeight: 1.35 }}>
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

            {tour.gallery && tour.gallery.length > 0 && (
              <>
                <h2 className="display" style={{ margin: '56px 0 8px', fontSize: 'clamp(30px, 3.6vw, 44px)' }}>
                  Photo <em>gallery</em>
                </h2>
                <p style={{ margin: '0 0 22px', color: 'var(--color-dim)' }}>Tap any photo to see it full size.</p>
                <Gallery keys={tour.gallery} label={`${tour.title} photos`} />
              </>
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

            <h2 className="display" style={{ margin: '56px 0 8px', fontSize: 'clamp(30px, 3.6vw, 44px)' }}>
              Pay for it <em>over time</em>
            </h2>
            <p style={{ margin: '0 0 26px', color: 'var(--color-dim)' }}>
              Set to this tour’s starting price — slide to choose how many months. <Link to="/payment-options" style={{ color: 'var(--color-gold)', textDecoration: 'underline', textUnderlineOffset: 3 }}>All payment options</Link>
            </p>
            <PaymentPlan currency={tour.currency} initialPrice={tour.price[0]} lockPrice />

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
            <div style={{ padding: 'clamp(22px, 3vw, 30px)', borderRadius: 28, border: '1px solid var(--color-line)', background: 'var(--color-ink)', boxShadow: '0 30px 60px -40px rgba(0,0,0,0.35)' }}>
              <div className="label" style={{ color: 'var(--color-dim)' }}>
                Indicative price per person
              </div>
              <div className="display tabular" style={{ fontSize: 36, marginTop: 6 }}>
                {priceRange(tour)}
              </div>
              <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--color-dim)' }}>
                {africa ? `Sharing · accommodation & transfers · flights excluded · or about ${perMonth}/month over 12 months` : `Sharing · land arrangements · or about ${perMonth}/month over 12 months`}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0', display: 'grid', gap: 10, fontSize: 14.5, color: 'var(--color-mist)' }}>
                {[tour.duration, africa ? 'Tailor the lodges, pace and extra nights' : 'Combine countries on request', 'Pay by EFT or card, over up to 12 months', 'Reply within one working day'].map((x) => (
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
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {SITE.offices.map((o) => (
                    <a
                      key={o.key}
                      href={whatsappLink(`Hi Flexi, I’m interested in “${tour.title}”. Could you tell me more?`, o.key)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost"
                      aria-label={`Ask about this ${africa ? 'safari' : 'trip'} on WhatsApp — ${o.city} office`}
                      style={{ padding: '0 10px', gap: 8, fontSize: 11 }}
                    >
                      <WhatsApp size={16} /> {o.city}
                    </a>
                  ))}
                </div>
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
