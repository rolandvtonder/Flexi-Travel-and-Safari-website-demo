import { Suspense, lazy, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import WhatsAppFloat from './components/WhatsAppFloat'

/* The home page ships in the first bundle; every other page loads on demand. */
const Safari = lazy(() => import('./pages/Safari'))
const Europe = lazy(() => import('./pages/Europe'))
const TourPage = lazy(() => import('./pages/TourPage'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const PaymentOptions = lazy(() => import('./pages/PaymentOptions'))
const TravelGuides = lazy(() => import('./pages/TravelGuides'))
const GuidePage = lazy(() => import('./pages/GuidePage'))
const NotFound = lazy(() => import('./pages/NotFound'))

/*
  Each section of the brief is its own page:

      /                the scroll-choreographed scene + the two journeys
      /safari                African Safaris — for Europe & America
      /europe                European Adventures — for Southern Africa
      /tours/:slug           every tour has its own page and enquiry form
      /payment-options       EFT, card and monthly instalments, with a calculator
      /about                 Our Story — the founder's story
      /travel-guides(/:slug) destination guides; one JSON file per guide
      /contact               Contact Us / plan a trip
*/

/** New page → top of the page (or the #anchor), and focus to main for screen readers. */
function RouteFocus() {
  const { pathname, hash } = useLocation()
  const first = useRef(true)
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      /* Pages load on demand, so the anchor may not exist yet: wait for it,
         jump, then correct once fonts and images above it have settled. */
      const timers: number[] = []
      const jump = () => {
        const el = document.getElementById(id)
        if (!el) return false
        const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - margin, behavior: 'instant' })
        return true
      }
      let tries = 0
      const attempt = () => {
        if (jump()) timers.push(window.setTimeout(jump, 450))
        else if (tries++ < 30) timers.push(window.setTimeout(attempt, 100))
      }
      timers.push(window.setTimeout(attempt, 30))
      return () => timers.forEach(clearTimeout)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
    if (first.current) {
      first.current = false
      return
    }
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <RouteFocus />
      <Nav />
      <main id="main" tabIndex={-1} style={{ outline: 'none' }}>
        <Suspense fallback={<div style={{ minHeight: '100svh' }} aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/safari" element={<Safari />} />
          <Route path="/europe" element={<Europe />} />
          <Route path="/tours/:slug" element={<TourPage />} />
          <Route path="/payment-options" element={<PaymentOptions />} />
          <Route path="/about" element={<About />} />
          <Route path="/travel-guides" element={<TravelGuides />} />
          <Route path="/travel-guides/:slug" element={<GuidePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
