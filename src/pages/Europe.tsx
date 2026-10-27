import { Link } from 'react-router'
import { PageHero, Reveal, SectionHead, TourCard, Eyebrow, Faq, usePageMeta } from '../components/ui'
import EnquiryForm from '../components/EnquiryForm'
import { toursIn, img } from '../data/tours'
import { ArrowRight, Check, Info } from '../components/Icons'

export default function Europe() {
  usePageMeta('European Adventures', 'Spain, Portugal, France and Italy for travellers from South Africa, Botswana and Namibia. 7 to 8 day adventures from R36,000, payable monthly over up to 12 months.')
  const tours = toursIn('europe')

  return (
    <>
      <PageHero
        image={img('europe-paris-dawn')}
        position="center 62%"
        titleMax={620}
        eyebrow="European Adventures · For South Africa, Botswana & Namibia"
        title={
          <>
            Europe is calling. <em>Let’s make it happen.</em>
          </>
        }
        intro="Your European dream, planned with you and paid for over time. Famous cities, beautiful coastlines, local food and iconic landmarks, without organising every hotel, transfer and activity yourself."
      >
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 30 }}>
          <a href="#tours" className="btn btn-gold">
            Explore the tours
          </a>
          <Link to="/payment-options" className="btn btn-ghost">
            Payment options
            <span className="dot">
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </PageHero>

      <div style={{ borderTop: '1px solid var(--color-line)', borderBottom: '1px solid var(--color-line)', background: 'var(--color-ink-2)' }}>
        <ul className="wrap" style={{ listStyle: 'none', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '14px 36px', justifyContent: 'space-between', padding: '22px 20px' }}>
          {['Pay monthly, up to 12 months', 'Hotels & transfers arranged', 'Signature or tailor-made', 'Flights & visas quoted separately'].map((s) => (
            <li key={s} className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: 'var(--color-mist)' }}>
              <span style={{ color: 'var(--color-gold)' }}>
                <Check size={16} />
              </span>
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* ---- the dream + founder ---- */}
      <section aria-labelledby="dream" style={{ padding: 'clamp(80px, 11vw, 140px) 0' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 'clamp(32px, 6vw, 90px)', alignItems: 'start' }}>
          <SectionHead id="dream" eyebrow="Your dream · Your timeline · Your Europe" title={<>A holiday is about more than <em>money or miles.</em></>} />
          <Reveal delay={0.1}>
            <p style={{ margin: 0, fontSize: 18, color: 'var(--color-mist)' }}>
              Perhaps you’ve imagined walking through Barcelona, discovering the streets of Paris or eating real Italian food with your family or friends. It’s about the experiences you’ve dreamed of and the memories you want to make.
            </p>
            <p style={{ margin: '16px 0 0', fontSize: 18, color: 'var(--color-mist)' }}>
              Our founder was born and raised in Africa and now lives in Spain. We understand the excitement of travelling to Europe, and the practical questions that come with planning your first visit. The cost of a holiday shouldn’t mean giving up on the dream.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- the collection ---- */}
      <section id="tours" aria-labelledby="tours-h" style={{ padding: 'clamp(70px, 10vw, 120px) 0', background: 'var(--color-ink-2)', borderTop: '1px solid var(--color-line)', scrollMarginTop: 70 }}>
        <div className="wrap">
          <SectionHead id="tours-h" eyebrow="The adventure collection" title={<>Four countries. <em>One signature route each.</em></>} intro="Seven or eight days, well-paced, with time to enjoy each place instead of racing through it." />
          <ul style={{ listStyle: 'none', padding: 0, margin: '40px 0 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 20 }}>
            {tours.map((t) => (
              <li key={t.slug}>
                <TourCard tour={t} />
              </li>
            ))}
          </ul>
          <Reveal style={{ marginTop: 20, padding: 'clamp(22px, 3vw, 32px)', borderRadius: 28, border: '1px solid color-mix(in srgb, var(--color-brand-gold) 35%, transparent)', background: 'linear-gradient(140deg, color-mix(in srgb, var(--color-brand-gold) 14%, transparent), color-mix(in srgb, var(--color-brand-gold) 2%, transparent))', display: 'flex', gap: 24, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 640 }}>
              <h3 className="display" style={{ margin: 0, fontSize: 'clamp(24px, 2.6vw, 32px)' }}>
                Two countries, <em>one trip?</em>
              </h3>
              <p style={{ margin: '8px 0 0', color: 'var(--color-mist)' }}>
                Madrid and Lisbon, Paris and Rome: combine any of our countries and we’ll tailor the route, the hotels and the monthly payments around you.
              </p>
            </div>
            <a href="#plan" className="btn btn-light">
              Plan a combined trip <ArrowRight />
            </a>
          </Reveal>
          <p style={{ display: 'flex', gap: 10, margin: '28px 0 0', fontSize: 14, color: 'var(--color-dim)', maxWidth: 860 }}>
            <span style={{ flex: 'none', marginTop: 3 }}>
              <Info />
            </span>
            Prices are indicative targets in South African rand, per person sharing, for land arrangements. International flights, visas, travel insurance and any excluded meals or activities are quoted separately. Final pricing depends on dates, group size, room type and availability.
          </p>
        </div>
      </section>

      {/* ---- payment plans ---- */}
      <section id="payment-plans" aria-labelledby="plans-h" style={{ padding: 'clamp(70px, 10vw, 120px) 0', scrollMarginTop: 'calc(var(--header-h) + 16px)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 'clamp(28px, 5vw, 64px)', alignItems: 'center' }}>
            <SectionHead id="plans-h" eyebrow="Book early · Pay over time" title={<>Your Europe <em>holiday fund</em></>} intro="Reserve your place and work towards it with monthly payments over up to twelve months, by EFT or card, whichever suits you." />
            <Reveal delay={0.1} style={{ padding: 'clamp(24px, 3vw, 34px)', borderRadius: 26, background: 'var(--color-ink-2)', border: '1px solid var(--color-line)' }}>
              <div className="label" style={{ color: 'var(--color-dim)' }}>
                For example
              </div>
              <div className="display tabular" style={{ fontSize: 'clamp(40px, 5vw, 56px)', margin: '8px 0 4px' }}>
                R3 750<span style={{ fontSize: 18, color: 'var(--color-dim)', fontFamily: 'var(--font-sans)', fontWeight: 500 }}> / month</span>
              </div>
              <p style={{ margin: '0 0 20px', color: 'var(--color-mist)' }}>for a R45 000 adventure over 12 months, with no interest added.</p>
              <Link to="/payment-options#calculator" className="btn btn-light">
                Work out your payments <ArrowRight />
              </Link>
            </Reveal>
          </div>

          <Reveal>
            <p style={{ display: 'flex', gap: 12, margin: '36px 0 0', padding: '18px 22px', borderRadius: 18, background: 'var(--color-ink-2)', border: '1px solid var(--color-line)', color: 'var(--color-mist)', fontSize: 15 }}>
              <span style={{ flex: 'none', marginTop: 3, color: 'var(--color-gold)' }}>
                <Info />
              </span>
              <span>
                <strong style={{ color: 'var(--color-bone)' }}>About visas.</strong> Visa requirements depend on your nationality, residence status and destination. We help you understand the planning process, but travel permission must be confirmed through the relevant authorities.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      <Faq
        id="europe-faq"
        title={<>Your Europe <em>questions</em></>}
        items={[
          { q: 'How do the payment plans work?', a: 'Choose your trip and departure, then pay monthly by EFT or card over up to twelve months. The amount follows from the price and the number of months, every due date is agreed upfront, and the balance is settled before you travel.' },
          { q: 'Do I need a visa?', a: 'Most South African, Botswana and Namibian passport holders need a Schengen visa for Spain, Portugal, France and Italy. Requirements depend on your nationality and residence, so we explain what you need and when to apply. The visa itself is issued by the relevant embassy or consulate.' },
          { q: 'Are flights included?', a: 'Our prices cover the land arrangements: hotels, planned transport between cities and the experiences in the itinerary. International flights, visa fees and travel insurance are quoted separately.' },
          { q: 'Can I visit more than one country?', a: 'Yes. Combine Spain and Portugal, or Paris and Rome, and we’ll tailor the route, the hotels and the payment plan around it.' },
          { q: 'Can I travel before I’ve finished paying?', a: 'Your plan is set up to finish before departure, so a twelve-month plan needs a departure at least twelve months away. Booking later? We’ll shorten the plan to fit.' },
        ]}
      />

      {/* ---- start planning ---- */}
      <section id="plan" aria-labelledby="plan-h" style={{ padding: '0 0 clamp(60px, 8vw, 100px)', scrollMarginTop: 90 }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 'clamp(32px, 5vw, 72px)', padding: 'clamp(26px, 5vw, 60px)', borderRadius: 36, border: '1px solid var(--color-line)', background: 'linear-gradient(160deg, var(--color-ink-3), var(--color-ink-2))' }}>
            <div>
              <Eyebrow>Start planning my Europe trip</Eyebrow>
              <h2 id="plan-h" className="display" style={{ margin: '16px 0 0', fontSize: 'clamp(34px, 4.4vw, 54px)' }}>
                Your European adventure <em>starts today.</em>
              </h2>
              <p style={{ margin: '18px 0 0', color: 'var(--color-mist)', fontSize: 17 }}>
                Tell us where you’d love to go, when, and how you’d like to pay. We’ll come back with a route, a clear list of what’s included and a payment schedule you can plan around.
              </p>
              <Link to="/about" className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 24, minHeight: 44, color: 'var(--color-gold-soft)' }}>
                Meet the founder <ArrowRight size={14} />
              </Link>
            </div>
            <EnquiryForm defaultRegion="europe" />
          </div>
        </div>
      </section>
    </>
  )
}
