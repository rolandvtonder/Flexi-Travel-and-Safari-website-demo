import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router'
import { PageHero, Reveal, SectionHead, TourCard, Chips, Eyebrow, Faq, usePageMeta } from '../components/ui'
import EnquiryForm from '../components/EnquiryForm'
import { SAFARI_COUNTRIES, toursIn, photo } from '../data/tours'
import { GUIDES } from '../data/guides'
import { guideImage } from './TravelGuides'
import { ArrowRight, Check, Info } from '../components/Icons'

const AUDIENCES = [
  { title: 'For couples', body: 'Romantic lodges, private moments and unforgettable wildlife encounters.', image: 'pnr-canyon-couple', pick: 'Wild Africa, Wine & Wellness' },
  { title: 'For families', body: 'Exciting wildlife, comfortable stays and sensible travel days.', image: 'sun-elephant-family', pick: 'The Big Five & Beautiful Cape' },
  { title: 'For women travelling together', body: 'Shared adventures, trusted local guides and a little more courage in the itinerary.', image: 'cpt-quad-friends', pick: 'Into the Elephant Kingdom' },
  { title: 'For the well-travelled', body: 'Unhurried days, exceptional hospitality and experiences worth travelling for.', image: 'vic-dinner-cruise', pick: 'Serengeti & The Crater' },
]

const WAY = [
  { t: 'Made for you', b: 'Choose from our signature safaris or customise your own itinerary.' },
  { t: 'First-hand understanding', b: 'Plan with a founder who grew up in Africa and now lives in Europe.' },
  { t: 'Adventure with comfort', b: 'Exciting wildlife experiences alongside carefully selected accommodation and practical transfers.' },
  { t: 'More than a holiday', b: 'Discover the people, places, wildlife and stories that make Africa unforgettable.' },
]

const PROMISES = [
  'One itinerary, clear inclusions and a single point of contact.',
  'Well-reviewed accommodation, sensible transfers and realistic travel days.',
  'Add private guiding, extra nights or special experiences where they make sense.',
  'We explain what is included, what is optional and what to expect, before you pay.',
]

export default function Safari() {
  usePageMeta('African Safaris', 'Thoughtfully planned African safaris in South Africa, Zimbabwe, Kenya and Tanzania for travellers from Europe and America. €4,000–€6,000 per person, flights excluded.')
  const [params, setParams] = useSearchParams()
  const country = params.get('country') ?? 'All'
  const tours = useMemo(() => toursIn('africa').filter((t) => country === 'All' || t.countries.includes(country)), [country])

  const setCountry = (c: string) => {
    const next = new URLSearchParams(params)
    if (c === 'All') next.delete('country')
    else next.set('country', c)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  return (
    <>
      <PageHero
        image={photo('safari-waterhole-mix')}
        eyebrow="African Safaris · For Europe & America"
        title={
          <>
            Africa is more than a destination. <em>It’s home.</em>
          </>
        }
        intro="Wake to elephants at the waterhole, follow lions across the plains and end the day with dinner under the stars. Thoughtfully planned safaris for travellers who want the extraordinary without the stress of organising every detail."
      >
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 30 }}>
          <a href="#tours" className="btn btn-gold">
            Discover our safaris
          </a>
          <Link to="/contact?journey=africa" className="btn btn-ghost">
            Plan your African adventure
            <span className="dot">
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </PageHero>

      {/* ---- trust strip ---- */}
      <div style={{ borderTop: '1px solid var(--color-line)', borderBottom: '1px solid var(--color-line)', background: 'var(--color-ink-2)' }}>
        <ul className="wrap" style={{ listStyle: 'none', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '14px 36px', justifyContent: 'space-between', padding: '22px 20px' }}>
          {['Personalised itineraries', 'Carefully selected lodges', 'Transfers arranged', 'International flights excluded'].map((s) => (
            <li key={s} className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: 'var(--color-mist)' }}>
              <span style={{ color: 'var(--color-gold)' }}>
                <Check size={16} />
              </span>
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* ---- founder intro ---- */}
      <section aria-labelledby="born" style={{ padding: 'clamp(80px, 11vw, 140px) 0' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 'clamp(32px, 6vw, 90px)', alignItems: 'start' }}>
          <SectionHead
            id="born"
            eyebrow="Born in Africa · Inspired by elephants"
            title={
              <>
                Africa is our heritage. <em>Sharing it is our passion.</em>
              </>
            }
          />
          <Reveal delay={0.1}>
            <p style={{ margin: 0, fontSize: 18, color: 'var(--color-mist)' }}>
              Our story begins in Hwange, Zimbabwe, where elephants were never just animals seen on a screen or from a safari vehicle. They were part of everyday life. Our founder grew up watching them roam near home, sometimes breaking out of the reserve to graze in her uncles’ fields.
            </p>
            <p style={{ margin: '16px 0 0', fontSize: 18, color: 'var(--color-mist)' }}>
              That childhood connection became a lifelong passion for Africa’s wildlife, landscapes and people. Today, living in Spain, she helps travellers from Europe, America and beyond discover the Africa she knows and loves.
            </p>
            <Link to="/about" className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 24, minHeight: 44, color: 'var(--color-gold-soft)' }}>
              Read the full story <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---- audiences ---- */}
      <section id="audience" aria-labelledby="audience-h" style={{ padding: '0 0 clamp(80px, 11vw, 140px)', scrollMarginTop: 90 }}>
        <div className="wrap">
          <SectionHead id="audience-h" eyebrow="First safari? Perfect." title={<>Find your <em>kind of Africa</em></>} intro="Whether it’s your first safari, a special anniversary, a family adventure or a trip with your closest friends, every journey is built for first-timers to enjoy." />
          <ul style={{ listStyle: 'none', padding: 0, margin: '44px 0 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 18 }}>
            {AUDIENCES.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 0.06}>
                <article className="dark" style={{ position: 'relative', minHeight: 400, borderRadius: 32, overflow: 'hidden', border: '1px solid var(--color-line)', height: '100%' }}>
                  <img src={photo(a.image, 'sm')} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,10,7,0.1) 20%, rgba(8,10,7,0.92) 100%)' }} />
                  <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 26 }}>
                    <h3 className="display" style={{ margin: 0, fontSize: 28 }}>
                      {a.title}
                    </h3>
                    <p style={{ margin: '8px 0 14px', color: 'var(--color-mist)', fontSize: 15.5 }}>{a.body}</p>
                    <p className="label" style={{ margin: 0, fontSize: 10, color: 'var(--color-gold-soft)' }}>
                      We’d suggest · {a.pick}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- destination guides ---- */}
      <section aria-labelledby="dest-h" style={{ padding: '0 0 clamp(80px, 11vw, 140px)' }}>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
            <SectionHead id="dest-h" eyebrow="Destination guides" title={<>Where we <em>travel</em></>} intro="From the Cape to the Serengeti, read up on each destination before you choose." />
            <Link to="/travel-guides?topic=African%20Safaris" className="btn btn-ghost" style={{ paddingRight: 22 }}>
              All travel guides
            </Link>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '36px 0 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))', gap: 16 }}>
            {GUIDES.filter((g) => g.region === 'africa').slice(0, 6).map((g, i) => (
              <Reveal as="li" key={g.slug} delay={(i % 3) * 0.05}>
                <Link to={`/travel-guides/${g.slug}`} className="journey-card dark" style={{ position: 'relative', display: 'block', aspectRatio: '4 / 3', borderRadius: 22, overflow: 'hidden' }}>
                  <img src={guideImage(g, 'sm')} alt="" loading="lazy" className="journey-img" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%)' }} />
                  <span className="display" style={{ position: 'absolute', left: 18, right: 18, bottom: 16, fontSize: 19, lineHeight: 1.2 }}>
                    {g.title}
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- the collection ---- */}
      <section id="tours" aria-labelledby="tours-h" style={{ padding: 'clamp(70px, 10vw, 120px) 0', background: 'var(--color-ink-2)', borderTop: '1px solid var(--color-line)', scrollMarginTop: 70 }}>
        <div className="wrap">
          <SectionHead id="tours-h" eyebrow="The signature collection" title={<>Four countries. <em>Eight ways to experience Africa.</em></>} intro="Every route balances wildlife, scenery, comfort and a hint of adventure. You don’t need to be an experienced safari traveller to enjoy any of them." />
          <div style={{ marginTop: 36 }}>
            <Chips label="Filter safaris by country" options={SAFARI_COUNTRIES} value={country} onChange={setCountry} />
          </div>
          <p role="status" aria-live="polite" style={{ margin: '18px 0 0', fontSize: 14, color: 'var(--color-dim)' }}>
            {tours.length} {tours.length === 1 ? 'safari' : 'safaris'}
            {country !== 'All' ? ` in ${country}` : ''}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '22px 0 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: 20 }}>
            {tours.map((t) => (
              <li key={t.slug}>
                <TourCard tour={t} />
              </li>
            ))}
          </ul>
          <p style={{ display: 'flex', gap: 10, margin: '28px 0 0', fontSize: 14, color: 'var(--color-dim)', maxWidth: 820 }}>
            <span style={{ flex: 'none', marginTop: 3 }}>
              <Info />
            </span>
            Prices are indicative per person sharing a double or twin room, excluding international flights. Final quotes depend on dates, lodge availability, group size and seasonal rates.
          </p>
        </div>
      </section>

      {/* ---- your way ---- */}
      <section aria-labelledby="way" style={{ padding: 'clamp(80px, 11vw, 140px) 0' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 'clamp(32px, 6vw, 90px)' }}>
          <div>
            <SectionHead id="way" eyebrow="Tailored safaris" title={<>Your Africa. Your adventure. <em>Your way.</em></>} intro="Every traveller is different, so every safari can be tailored to your interests, travel style, comfort level and budget." />
            <Reveal delay={0.1}>
              <ul style={{ listStyle: 'none', padding: 0, margin: '32px 0 0', display: 'grid', gap: 14 }}>
                {PROMISES.map((s) => (
                  <li key={s} style={{ display: 'flex', gap: 12, color: 'var(--color-mist)' }}>
                    <span style={{ color: 'var(--color-gold)', flex: 'none', marginTop: 4 }}>
                      <Check size={18} />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 14 }}>
            {WAY.map((w, i) => (
              <Reveal as="li" key={w.t} delay={i * 0.06} style={{ display: 'flex', gap: 22, padding: 26, borderRadius: 24, border: '1px solid var(--color-line)', background: 'var(--color-ink-2)' }}>
                <span className="display tabular" style={{ fontSize: 34, color: 'var(--color-gold)', lineHeight: 1, fontWeight: 300 }}>
                  0{i + 1}
                </span>
                <div>
                  <h3 className="display" style={{ margin: 0, fontSize: 23 }}>
                    {w.t}
                  </h3>
                  <p style={{ margin: '6px 0 0', color: 'var(--color-mist)', fontSize: 15.5 }}>{w.b}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <Faq
        id="safari-faq"
        title={<>Your safari <em>questions</em></>}
        items={[
          { q: 'Is a safari right for a first-timer?', a: 'Absolutely. Every route in our collection is designed with first-time safari travellers in mind: sensible travel days, guided activities and comfortable lodges, so you can simply enjoy it.' },
          { q: 'Are safaris safe?', a: 'Game drives are led by trained, experienced guides who read animal behaviour and keep a respectful distance. We work with well-reviewed lodges, and the golden rule is simple: follow your guide’s instructions.' },
          { q: 'What does the price include?', a: 'Our indicative prices cover accommodation and transfers on the itinerary, plus the guided activities it names. International flights, travel insurance and visas are not included. Your written quote lists exactly what is and isn’t included before you pay anything.' },
          { q: 'How far ahead should I book?', a: 'For peak safari season, six to twelve months ahead is ideal, as the best lodges have only a handful of rooms. Shorter notice is sometimes possible, so ask us.' },
          { q: 'How do I pay?', a: 'Payments are flexible: by EFT or by card, on a schedule we agree with you in your quote.' },
          { q: 'Can I change the itinerary?', a: 'Yes. Add nights, swap lodges, slow the pace or combine countries. Every signature safari is a starting point, not a fixed package.' },
        ]}
      />

      {/* ---- start the conversation ---- */}
      <section id="plan" aria-labelledby="plan-h" style={{ padding: '0 0 clamp(60px, 8vw, 100px)', scrollMarginTop: 90 }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 'clamp(32px, 5vw, 72px)', padding: 'clamp(26px, 5vw, 60px)', borderRadius: 36, border: '1px solid var(--color-line)', background: 'linear-gradient(160deg, var(--color-ink-3), var(--color-ink-2))' }}>
            <div>
              <Eyebrow>Plan my safari</Eyebrow>
              <h2 id="plan-h" className="display" style={{ margin: '16px 0 0', fontSize: 'clamp(34px, 4.4vw, 54px)' }}>
                Your safari should start <em>with a conversation.</em>
              </h2>
              <p style={{ margin: '18px 0 0', color: 'var(--color-mist)', fontSize: 17 }}>
                Tell us what Africa means to you. Whether it’s your first safari, a celebration or your favourite people gathered for an adventure, we’ll help you find the right route.
              </p>
              <div style={{ marginTop: 28, padding: '20px 22px', borderRadius: 22, background: 'var(--color-ink)', border: '1px solid var(--color-line)', boxShadow: '0 24px 50px -40px rgba(0,0,0,0.4)' }}>
                <div className="label" style={{ fontSize: 10, color: 'var(--color-gold)' }}>
                  Typical safari budget
                </div>
                <div className="display tabular" style={{ fontSize: 34, marginTop: 6 }}>
                  €4,000 to €6,000
                </div>
                <div style={{ fontSize: 14, color: 'var(--color-dim)' }}>per person · 6 to 10 days · accommodation and transfers · flights excluded</div>
              </div>
            </div>
            <EnquiryForm defaultRegion="africa" />
          </div>
        </div>
      </section>
    </>
  )
}
