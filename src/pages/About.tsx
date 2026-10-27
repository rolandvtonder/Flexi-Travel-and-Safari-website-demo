import { Link } from 'react-router'
import { PageHero, Reveal, SectionHead, Eyebrow, usePageMeta } from '../components/ui'
import { img, photo } from '../data/tours'
import Gallery from '../components/Gallery'
import { SITE } from '../config'
import { ArrowRight, Heart, Wallet, Globe, Compass, Pin } from '../components/Icons'

const POINTS = [
  { icon: Heart, t: 'A genuine African story', b: 'African-founded, with roots in Hwange, Zimbabwe, and a lifelong connection to Africa’s wildlife. A personal passion, not simply a business selling safari packages.' },
  { icon: Wallet, t: 'Europe made more achievable', b: 'For travellers from South Africa, Botswana and Namibia, European holidays can be paid in monthly instalments over up to twelve months before departure, by EFT or card.' },
  { icon: Globe, t: 'First-hand experience of both worlds', b: 'Born and raised in Africa, now living in Spain. We understand the appeal of Africa for international visitors, and the practical considerations Southern African travellers face when planning Europe.' },
  { icon: Compass, t: 'Flexible adventures, designed around you', b: 'Choose a signature itinerary or tailor the destinations, pace, accommodation and experiences to your interests, dates and budget.' },
]

export default function About() {
  usePageMeta('Our story', 'Flexi Travel & Safari was born in Hwange, Zimbabwe, from a childhood among elephants, and grew into a travel company connecting Africa and Europe, from Madrid and Cape Town.')

  return (
    <>
      <PageHero
        image={photo('hwa-plains')}
        position="center 40%"
        eyebrow="Our story"
        title={
          <>
            From Africa to Europe, <em>and back to what matters.</em>
          </>
        }
        intro="Flexi Travel & Safari was born from a love of travel, a deep connection to Africa and a belief that extraordinary journeys should be easier to experience."
      />

      {/* ---- the Hwange story ---- */}
      <section aria-labelledby="hwange" style={{ padding: 'clamp(80px, 11vw, 140px) 0' }}>
        <div className="wrap" style={{ maxWidth: 880 }}>
          <Reveal>
            <Eyebrow>Hwange, Zimbabwe</Eyebrow>
            <h2 id="hwange" className="display" style={{ margin: '18px 0 0', fontSize: 'clamp(34px, 5vw, 58px)' }}>
              Elephants were never just animals on a screen. <em>They were neighbours.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p style={{ margin: '34px 0 0', fontSize: 'clamp(18px, 1.6vw, 21px)', lineHeight: 1.7, color: 'var(--color-mist)' }}>
              Our founder grew up in Hwange, where wildlife was woven into everyday life. Sometimes elephants would break out of the reserve and wander into her uncles’ fields, grazing on their crops and vegetables. Her uncles would chase them away while she watched, completely captivated by these magnificent animals.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <blockquote style={{ margin: '44px 0', padding: '0 0 0 28px', borderLeft: '2px solid var(--color-gold)' }}>
              <p className="display" style={{ margin: 0, fontSize: 'clamp(26px, 3.2vw, 38px)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.25 }}>
                Africa is our heritage. Sharing it with you is our passion.
              </p>
            </blockquote>
          </Reveal>
          <Reveal delay={0.08}>
            <p style={{ margin: 0, fontSize: 'clamp(18px, 1.6vw, 21px)', lineHeight: 1.7, color: 'var(--color-mist)' }}>
              That childhood connection grew into a lifelong passion for Africa’s wildlife, landscapes and natural heritage. Today, living in Spain, she brings together two worlds she knows personally: the richness and wonder of Africa, and the diversity, culture and adventure of Europe.
            </p>
            <p style={{ margin: '22px 0 0', fontSize: 'clamp(18px, 1.6vw, 21px)', lineHeight: 1.7, color: 'var(--color-mist)' }}>
              We use that perspective to help travellers discover destinations with more confidence, whether they’re coming from Europe or America for an African safari, or travelling from Southern Africa to explore Europe. Some want a luxurious safari with exceptional wildlife encounters. Others want a practical, exciting European holiday they can plan and pay for well in advance. That’s why flexibility sits at the heart of everything we do.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Hwange in pictures ---- */}
      <section aria-labelledby="hwange-photos" style={{ padding: '0 0 clamp(70px, 10vw, 120px)' }}>
        <div className="wrap">
          <h2 id="hwange-photos" className="display" style={{ margin: '0 0 22px', fontSize: 'clamp(26px, 3vw, 36px)' }}>
            Hwange, <em>in pictures</em>
          </h2>
          <Gallery keys={['hwa-elephant-family', 'hwa-lodge-waterhole', 'hwa-plains', 'safari-elephant-calves', 'safari-elephant-family', 'vic-full-flow']} label="Hwange and Victoria Falls photos" />
        </div>
      </section>

      {/* ---- two worlds ---- */}
      <section aria-labelledby="worlds" style={{ padding: '0 0 clamp(80px, 11vw, 140px)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 20 }}>
            {[
              { to: '/safari', image: photo('east-elephants-acacias'), eyebrow: 'For Europe & America', t: 'We share the Africa we grew up in', cta: 'African Safaris' },
              { to: '/europe', image: img('viva-espana'), eyebrow: 'For Southern Africa', t: 'We open the Europe we now call home', cta: 'European Adventures' },
            ].map((w, i) => (
              <Reveal key={w.to} delay={i * 0.08}>
                <Link to={w.to} className="journey-card dark" style={{ position: 'relative', display: 'block', minHeight: 420, borderRadius: 32, overflow: 'hidden', border: '1px solid var(--color-line)' }}>
                  <img src={w.image} alt="" loading="lazy" className="journey-img" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,10,7,0.1) 25%, rgba(8,10,7,0.92) 100%)' }} />
                  <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 32 }}>
                    <Eyebrow>{w.eyebrow}</Eyebrow>
                    <h2 id={i === 0 ? 'worlds' : undefined} className="display" style={{ margin: '14px 0 18px', fontSize: 'clamp(28px, 3vw, 40px)' }}>
                      {w.t}
                    </h2>
                    <span className="btn btn-light">
                      {w.cta} <ArrowRight />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- four selling points ---- */}
      <section aria-labelledby="why" style={{ padding: 'clamp(70px, 10vw, 120px) 0', background: 'var(--color-ink-2)', borderTop: '1px solid var(--color-line)', borderBottom: '1px solid var(--color-line)' }}>
        <div className="wrap">
          <SectionHead id="why" eyebrow="What makes us different" title={<>We don’t just connect destinations. <em>We connect people with places.</em></>} />
          <ul style={{ listStyle: 'none', padding: 0, margin: '50px 0 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 18 }}>
            {POINTS.map((pt, i) => (
              <Reveal as="li" key={pt.t} delay={i * 0.06} style={{ padding: 30, borderRadius: 26, border: '1px solid var(--color-line)', background: 'var(--color-ink)' }}>
                <span style={{ width: 48, height: 48, borderRadius: '50%', display: 'grid', placeItems: 'center', border: '1px solid color-mix(in srgb, var(--color-brand-gold) 45%, transparent)', color: 'var(--color-gold)' }}>
                  <pt.icon size={20} />
                </span>
                <h3 className="display" style={{ margin: '22px 0 10px', fontSize: 24 }}>
                  {pt.t}
                </h3>
                <p style={{ margin: 0, color: 'var(--color-mist)', fontSize: 15.5 }}>{pt.b}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- offices ---- */}
      <section aria-labelledby="offices" style={{ padding: 'clamp(80px, 11vw, 140px) 0 clamp(40px, 6vw, 80px)' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <SectionHead id="offices" eyebrow="Two bases, two continents" title={<>Madrid <em>&amp;</em> Cape Town</>} center />
          <ul style={{ listStyle: 'none', padding: 0, margin: '44px auto 0', maxWidth: 820, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 18, textAlign: 'left' }}>
            {SITE.offices.map((o) => (
              <Reveal as="li" key={o.key} style={{ padding: 28, borderRadius: 24, border: '1px solid var(--color-line)' }}>
                <span style={{ color: 'var(--color-gold)' }}>
                  <Pin size={22} />
                </span>
                <h3 className="display" style={{ margin: '12px 0 4px', fontSize: 30 }}>
                  {o.city}
                </h3>
                <p className="label" style={{ margin: 0, color: 'var(--color-dim)' }}>
                  {o.country}
                </p>
                <p style={{ margin: '12px 0 0', color: 'var(--color-mist)' }}>{o.role}</p>
                <p style={{ margin: '10px 0 0', fontSize: 14.5, color: 'var(--color-dim)' }}>{o.address.join(', ')}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <p className="display" style={{ margin: '64px 0 0', fontSize: 'clamp(24px, 2.6vw, 32px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--color-gold-soft)' }}>
              Rooted in Africa. Inspired by the world. Designed around you.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
