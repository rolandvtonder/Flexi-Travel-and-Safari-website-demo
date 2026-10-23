import { Link, useParams } from 'react-router'
import { Reveal, TourCard, Eyebrow, usePageMeta } from '../components/ui'
import Gallery from '../components/Gallery'
import NotFound from './NotFound'
import { GUIDES, guideBySlug, galleryKeys } from '../data/guides'
import { tourBySlug, type Tour } from '../data/tours'
import { guideImage, Meta } from './TravelGuides'
import { ArrowLeft, ArrowRight } from '../components/Icons'

export default function GuidePage() {
  const { slug } = useParams()
  const g = guideBySlug(slug)
  usePageMeta(g?.title ?? 'Guide not found', g?.excerpt)
  if (!g) return <NotFound />

  const keys = galleryKeys(g)
  const tours = (g.tours ?? []).map((s) => tourBySlug(s)).filter(Boolean) as Tour[]
  const more = GUIDES.filter((x) => x.slug !== g.slug && x.region === g.region).slice(0, 3)

  return (
    <article>
      <header className="dark" style={{ position: 'relative', minHeight: 'min(calc(70svh - var(--header-h)), 620px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: '#111' }}>
        <img src={guideImage(g)} alt="" fetchPriority="high" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.78) 100%)' }} />
        <div className="wrap" style={{ position: 'relative', paddingTop: 80, paddingBottom: 'clamp(36px, 6vh, 64px)', maxWidth: 1000 }}>
          <Link to="/travel-guides" className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 44, color: 'var(--color-mist)' }}>
            <ArrowLeft size={14} /> All travel guides
          </Link>
          <h1 className="display" style={{ margin: '12px 0 16px', fontSize: 'clamp(34px, 5.2vw, 64px)' }}>
            {g.title}
          </h1>
          <Meta g={g} />
        </div>
      </header>

      <div className="wrap" style={{ maxWidth: 820, padding: 'clamp(40px, 6vw, 72px) 20px 0' }}>
        <p className="display" style={{ margin: '0 0 32px', fontSize: 'clamp(20px, 2.2vw, 24px)', fontWeight: 600, lineHeight: 1.45, color: 'var(--color-bone)' }}>
          {g.excerpt}
        </p>
        <div className="prose">
          {g.body.map((b, i) =>
            'h' in b ? (
              <h2 key={i}>{b.h}</h2>
            ) : 'p' in b ? (
              <p key={i}>{b.p}</p>
            ) : (
              <ul key={i}>
                {b.ul.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            ),
          )}
        </div>
      </div>

      {keys.length > 0 && (
        <section aria-labelledby="guide-photos" className="wrap" style={{ paddingTop: 'clamp(40px, 6vw, 64px)' }}>
          <h2 id="guide-photos" className="display" style={{ margin: '0 0 8px', fontSize: 'clamp(28px, 3.2vw, 40px)' }}>
            Photo <em>gallery</em>
          </h2>
          <p style={{ margin: '0 0 22px', color: 'var(--color-dim)' }}>
            {keys.length} photos · tap any photo to see it full size.
          </p>
          <Gallery keys={keys} label={`${g.title} photos`} />
        </section>
      )}

      {tours.length > 0 && (
        <section aria-labelledby="guide-tours" style={{ padding: 'clamp(56px, 8vw, 96px) 0 0' }}>
          <div className="wrap">
            <Eyebrow>Travel with us</Eyebrow>
            <h2 id="guide-tours" className="display" style={{ margin: '14px 0 28px', fontSize: 'clamp(28px, 3.2vw, 40px)' }}>
              Trips that <em>go there</em>
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 20 }}>
              {tours.map((t) => (
                <li key={t.slug}>
                  <TourCard tour={t} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {more.length > 0 && (
        <section aria-labelledby="guide-more" style={{ padding: 'clamp(56px, 8vw, 96px) 0 clamp(70px, 10vw, 120px)' }}>
          <div className="wrap">
            <h2 id="guide-more" className="display" style={{ margin: '0 0 22px', fontSize: 'clamp(26px, 3vw, 36px)' }}>
              More <em>guides</em>
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
              {more.map((m) => (
                <Reveal as="li" key={m.slug}>
                  <Link to={`/travel-guides/${m.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 18, padding: 14, borderRadius: 18, border: '1px solid var(--color-line)' }}>
                    <img src={guideImage(m, 'sm')} alt="" loading="lazy" style={{ width: 96, height: 72, objectFit: 'cover', borderRadius: 12, flex: 'none' }} />
                    <span style={{ flex: 1, fontWeight: 700, fontSize: 17 }}>{m.title}</span>
                    <span style={{ color: 'var(--color-gold)' }}>
                      <ArrowRight />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  )
}
