import { Link } from 'react-router'
import { usePageMeta, Eyebrow } from '../components/ui'

export default function NotFound() {
  usePageMeta('Page not found')
  return (
    <section style={{ minHeight: '80svh', display: 'grid', placeItems: 'center', padding: '160px 0 80px' }}>
      <div className="wrap" style={{ textAlign: 'center' }}>
        <Eyebrow>404</Eyebrow>
        <h1 className="display" style={{ fontSize: 'clamp(40px, 7vw, 84px)', margin: '18px 0 12px' }}>
          Off the beaten <em>track.</em>
        </h1>
        <p style={{ color: 'var(--color-mist)', margin: '0 auto 30px', maxWidth: 460 }}>
          That page doesn’t exist — but plenty of extraordinary places do.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/safari" className="btn btn-gold">
            Safari Africa
          </Link>
          <Link to="/europe" className="btn btn-ghost" style={{ paddingRight: 22 }}>
            European Adventures
          </Link>
        </div>
      </div>
    </section>
  )
}
