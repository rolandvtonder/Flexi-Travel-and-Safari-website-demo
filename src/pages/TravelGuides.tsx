import { Link, useSearchParams } from 'react-router'
import { Reveal, Eyebrow, Chips, usePageMeta } from '../components/ui'
import { GUIDES, formatDate, readMinutes, type Guide } from '../data/guides'
import { photo, img } from '../data/tours'
import { photoAlt } from '../components/Gallery'
import { ArrowUpRight, Clock } from '../components/Icons'

export const guideImage = (g: Guide, size: 'lg' | 'sm' = 'lg') => (g.hero.photo ? photo(g.hero.photo, size) : img(g.hero.image ?? 'viva-espana'))

const FILTERS = ['African Safaris', 'European Adventures']

export default function TravelGuides() {
  usePageMeta('Travel guides', 'Destination guides, packing lists and practical advice for African safaris and European adventures, from the Flexi Travel & Safari team.')
  const [params, setParams] = useSearchParams()
  const filter = params.get('topic') ?? 'All'
  const list = GUIDES.filter((g) => filter === 'All' || (filter === 'African Safaris' ? g.region === 'africa' : g.region === 'europe'))
  const [lead, ...rest] = list

  return (
    <>
      <section style={{ padding: 'clamp(48px, 7vw, 96px) 0 clamp(28px, 4vw, 48px)', background: 'var(--color-ink-2)', borderBottom: '1px solid var(--color-line)' }}>
        <div className="wrap">
          <Reveal style={{ maxWidth: 720 }}>
            <Eyebrow>Travel guides</Eyebrow>
            <h1 className="display" style={{ margin: '16px 0 0', fontSize: 'clamp(36px, 5.4vw, 64px)' }}>
              Know before <em>you go</em>
            </h1>
            <p style={{ margin: '18px 0 0', fontSize: 'clamp(16px, 1.4vw, 18px)', color: 'var(--color-mist)', maxWidth: 640 }}>
              Destination guides, packing lists and practical advice from our team in Madrid and Cape Town, with new guides added regularly.
            </p>
          </Reveal>
          <div style={{ marginTop: 28 }}>
            <Chips
              label="Filter guides"
              options={FILTERS}
              value={filter}
              onChange={(v) => {
                const next = new URLSearchParams(params)
                if (v === 'All') next.delete('topic')
                else next.set('topic', v)
                setParams(next, { replace: true, preventScrollReset: true })
              }}
            />
          </div>
        </div>
      </section>

      <section aria-label="Guides" style={{ padding: 'clamp(40px, 6vw, 72px) 0 clamp(70px, 10vw, 120px)' }}>
        <div className="wrap">
          <p role="status" aria-live="polite" style={{ margin: '0 0 22px', fontSize: 14, color: 'var(--color-dim)' }}>
            {list.length} {list.length === 1 ? 'guide' : 'guides'}
          </p>

          {lead && (
            <Reveal>
              <Link to={`/travel-guides/${lead.slug}`} className="tour-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', borderRadius: 28, overflow: 'hidden', border: '1px solid var(--color-line)', background: 'var(--color-ink)' }}>
                <div style={{ position: 'relative', minHeight: 320, overflow: 'hidden' }}>
                  <img src={guideImage(lead)} alt={lead.hero.photo ? photoAlt(lead.hero.photo) : ''} className="tour-card-img" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 'clamp(24px, 4vw, 44px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
                  <Meta g={lead} />
                  <h2 className="display" style={{ margin: 0, fontSize: 'clamp(28px, 3.4vw, 42px)' }}>
                    {lead.title}
                  </h2>
                  <p style={{ margin: 0, color: 'var(--color-mist)', fontSize: 17 }}>{lead.excerpt}</p>
                  <span className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--color-gold)' }}>
                    Read the guide <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 22 }}>
            {rest.map((g, i) => (
              <Reveal as="li" key={g.slug} delay={(i % 3) * 0.05}>
                <Link to={`/travel-guides/${g.slug}`} className="tour-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: 24, overflow: 'hidden', border: '1px solid var(--color-line)', background: 'var(--color-ink)' }}>
                  <div style={{ position: 'relative', aspectRatio: '3 / 2', overflow: 'hidden' }}>
                    <img src={guideImage(g, 'sm')} alt="" loading="lazy" className="tour-card-img" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                    <Meta g={g} />
                    <h3 className="display" style={{ margin: 0, fontSize: 22, lineHeight: 1.2 }}>
                      {g.title}
                    </h3>
                    <p style={{ margin: 0, color: 'var(--color-dim)', fontSize: 15 }}>{g.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export function Meta({ g }: { g: Guide }) {
  return (
    <span className="label" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px 14px', color: 'var(--color-dim)', fontSize: 10.5 }}>
      <span style={{ color: 'var(--color-gold)' }}>{g.region === 'africa' ? 'African Safaris' : 'European Adventures'}</span>
      <time dateTime={g.date}>{formatDate(g.date)}</time>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
        <Clock size={12} /> {readMinutes(g)} min read
      </span>
    </span>
  )
}
