import { Link } from 'react-router'
import HomeScene from '../home/HomeScene'
import { Reveal, SectionHead, TourCard, Eyebrow, usePageMeta } from '../components/ui'
import { TOURS, img, photo } from '../data/tours'
import { ArrowRight, Heart, Wallet, Globe, Compass } from '../components/Icons'

const JOURNEYS = [
  {
    to: '/safari',
    eyebrow: 'For Europe & America',
    title: 'African Safaris',
    line: 'Africa’s wild side, without the planning stress.',
    body: 'Eight signature safaris across South Africa, Zimbabwe, Kenya and Tanzania — designed for first-timers, couples, families and friends travelling together.',
    meta: '6–10 days · from €4,000 pp',
    image: photo('hwa-plains'),
    cta: 'Discover our safaris',
  },
  {
    to: '/europe',
    eyebrow: 'For Southern Africa',
    title: 'European Adventures',
    line: 'Your European dream, paid for over time.',
    body: 'Spain, Portugal, France and Italy for travellers from South Africa, Botswana and Namibia — paid monthly, by EFT or card, over up to twelve months before you fly.',
    meta: '7–8 days · from R36,000 pp',
    image: img('dolce-vita'),
    cta: 'Explore Europe',
  },
]

const POINTS = [
  {
    icon: Heart,
    title: 'A genuine African story',
    body: 'African-founded, with roots in Hwange, Zimbabwe, and a lifelong love of elephants. A personal passion — not a catalogue of packages.',
  },
  {
    icon: Wallet,
    title: 'Europe, made achievable',
    body: 'European holidays can be paid monthly over up to twelve months before departure, by EFT or card, with every due date agreed upfront.',
  },
  {
    icon: Globe,
    title: 'First-hand in both worlds',
    body: 'Born and raised in Africa, now living in Spain. We know what makes Africa magic for visitors — and what Africans need to know about Europe.',
  },
  {
    icon: Compass,
    title: 'Flexible, designed around you',
    body: 'Start from a signature itinerary or tailor the destinations, pace, accommodation and experiences to your dates and budget.',
  },
]

export default function Home() {
  usePageMeta('', 'African safaris for travellers from Europe and America, and European adventures with payment plans for travellers from South Africa, Botswana and Namibia.')
  const flagships = TOURS.filter((t) => t.flagship)

  return (
    <>
      <HomeScene />

      {/* ---- two journeys ---- */}
      <section aria-labelledby="journeys" style={{ padding: 'clamp(80px, 12vw, 150px) 0 40px', position: 'relative', zIndex: 1, background: 'var(--color-ink)' }}>
        <div className="wrap">
          <SectionHead
            id="journeys"
            eyebrow="Two journeys, one family"
            title={
              <>
                Where would you <em>like to go?</em>
              </>
            }
            intro="Flexi serves two kinds of traveller, and each has its own way in. Choose yours."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))', gap: 20, marginTop: 48 }}>
            {JOURNEYS.map((j, i) => (
              <Reveal key={j.to} delay={i * 0.08}>
                <Link to={j.to} className="journey-card dark" style={{ position: 'relative', display: 'block', minHeight: 560, borderRadius: 32, overflow: 'hidden', border: '1px solid var(--color-line)' }}>
                  <img src={j.image} alt="" loading="lazy" className="journey-img" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,10,7,0.15) 0%, rgba(8,10,7,0.45) 45%, rgba(8,10,7,0.94) 100%)' }} />
                  <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 'clamp(24px, 4vw, 40px)' }}>
                    <Eyebrow>{j.eyebrow}</Eyebrow>
                    <h3 className="display" style={{ margin: '14px 0 6px', fontSize: 'clamp(38px, 4.4vw, 56px)' }}>
                      {j.title}
                    </h3>
                    <p className="display" style={{ margin: 0, fontSize: 20, fontStyle: 'italic', fontWeight: 400, color: 'var(--color-gold-soft)' }}>
                      {j.line}
                    </p>
                    <p style={{ margin: '14px 0 22px', color: 'var(--color-mist)', maxWidth: 480 }}>{j.body}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                      <span className="btn btn-light">
                        {j.cta} <ArrowRight />
                      </span>
                      <span className="label tabular" style={{ color: 'var(--color-mist)' }}>
                        {j.meta}
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- founder teaser ---- */}
      <section aria-labelledby="story" style={{ padding: 'clamp(80px, 11vw, 140px) 0' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 'clamp(32px, 6vw, 80px)', alignItems: 'center' }}>
          <Reveal style={{ position: 'relative' }}>
            <div style={{ position: 'relative', aspectRatio: '4 / 5', borderRadius: 32, overflow: 'hidden' }}>
              <img src={photo('hwa-elephant-family')} alt="An elephant family in Hwange National Park, Zimbabwe" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="glass dark" style={{ position: 'absolute', right: 'clamp(-8px, -2vw, -24px)', bottom: 28, padding: '18px 22px', borderRadius: 22, maxWidth: 240 }}>
              <div className="label" style={{ color: 'var(--color-gold)', fontSize: 10 }}>
                Hwange, Zimbabwe
              </div>
              <div style={{ fontSize: 14, marginTop: 6, color: 'var(--color-bone)' }}>Where it began — elephants in the backyard.</div>
            </div>
          </Reveal>
          <div>
            <SectionHead
              id="story"
              eyebrow="Our story"
              title={
                <>
                  Africa isn’t just a destination. <em>It’s home.</em>
                </>
              }
            />
            <Reveal delay={0.1}>
              <p style={{ margin: '22px 0 0', fontSize: 18, color: 'var(--color-mist)' }}>
                Our founder grew up in Hwange, Zimbabwe, where elephants sometimes broke out of the reserve and wandered into her uncles’ fields to graze on their crops. Her uncles chased them away. She fell in love with them.
              </p>
              <p style={{ margin: '16px 0 0', fontSize: 18, color: 'var(--color-mist)' }}>
                Today, living in Spain, she shares the Africa she knows with travellers from Europe and America — and helps Africans discover the Europe she now calls home.
              </p>
              <Link to="/about" className="btn btn-ghost" style={{ marginTop: 30 }}>
                Read our story
                <span className="dot">
                  <ArrowRight size={14} />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- signature tours ---- */}
      <section aria-labelledby="signature" style={{ padding: '0 0 clamp(80px, 11vw, 140px)' }}>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
            <SectionHead id="signature" eyebrow="Start here" title={<>Our signature <em>journeys</em></>} intro="Four routes we’d recommend to almost anyone — two for each side of the family." />
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/safari#tours" className="btn btn-ghost" style={{ paddingRight: 22 }}>
                All safaris
              </Link>
              <Link to="/europe#tours" className="btn btn-ghost" style={{ paddingRight: 22 }}>
                All of Europe
              </Link>
            </div>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '44px 0 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 20 }}>
            {flagships.map((t, i) => (
              <Reveal as="li" key={t.slug} delay={i * 0.06}>
                <TourCard tour={t} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- why Flexi ---- */}
      <section aria-labelledby="why" style={{ padding: 'clamp(70px, 10vw, 120px) 0', background: 'var(--color-ink-2)', borderTop: '1px solid var(--color-line)', borderBottom: '1px solid var(--color-line)' }}>
        <div className="wrap">
          <SectionHead id="why" eyebrow="Why travel with Flexi" title={<>Rooted in Africa. <em>Inspired by the world.</em></>} center />
          <ul style={{ listStyle: 'none', padding: 0, margin: '56px 0 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 1, background: 'var(--color-line)', borderRadius: 28, overflow: 'hidden', border: '1px solid var(--color-line)' }}>
            {POINTS.map((pt, i) => (
              <Reveal as="li" key={pt.title} delay={i * 0.06} style={{ background: 'var(--color-ink-2)', padding: 'clamp(26px, 3vw, 38px)' }}>
                <span style={{ width: 48, height: 48, borderRadius: '50%', display: 'grid', placeItems: 'center', border: '1px solid color-mix(in srgb, var(--color-brand-gold) 45%, transparent)', color: 'var(--color-gold)' }}>
                  <pt.icon size={20} />
                </span>
                <div className="label tabular" style={{ marginTop: 26, color: 'var(--color-dim)' }}>
                  0{i + 1}
                </div>
                <h3 className="display" style={{ margin: '8px 0 10px', fontSize: 25 }}>
                  {pt.title}
                </h3>
                <p style={{ margin: 0, color: 'var(--color-mist)', fontSize: 15.5 }}>{pt.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
