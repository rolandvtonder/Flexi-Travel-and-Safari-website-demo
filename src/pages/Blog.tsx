/*
  The blog: articles written and published by Soro, the client's SEO tool.
  Soro's script draws them into #soro-blog and opens each one in place at
  /blog?post=slug. It is written for ordinary pages, so on mount we fetch and
  run it fresh (it looks for the container when it runs) and on unmount we
  undo what it leaves behind: its back-button listener, which would otherwise
  rename other pages, and its canonical / JSON-LD tags. Its styles are re-dressed in
  the site's look in index.css. Until Soro has a published article, a short
  note points to the travel guides instead of Soro's own empty message.
*/
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { Reveal, Eyebrow, usePageMeta } from '../components/ui'
import { ArrowRight } from '../components/Icons'
import { SITE } from '../config'

type Listener = Parameters<typeof window.addEventListener>[1]

export default function Blog() {
  usePageMeta('Blog', 'Travel stories, tips and ideas for African safaris and European adventures from Flexi Travel & Safari.')
  const box = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'loading' | 'ready' | 'empty'>('loading')
  // While an article is open, its title is the page's h1, so ours steps down.
  const [reading, setReading] = useState(false)

  useEffect(() => {
    const el = box.current!
    const check = () => {
      setReading(!!el.querySelector('.soro-blog-article'))
      if (el.querySelector('.soro-blog-card, .soro-blog-article')) setState('ready')
      else if (el.querySelector('.soro-blog-empty')) setState('empty')
    }
    const seen = new MutationObserver(check)
    seen.observe(el, { childList: true, subtree: true })

    // Run Soro's script against a stand-in window that notes the back-button
    // listener it adds, so it can be taken off again when the page closes.
    const added: Listener[] = []
    const shim = new Proxy(window, {
      get(w, key) {
        if (key === 'addEventListener')
          return (type: string, fn: Listener, opts?: boolean | AddEventListenerOptions) => {
            if (type === 'popstate') added.push(fn)
            w.addEventListener(type, fn, opts)
          }
        const v = Reflect.get(w, key)
        return typeof v === 'function' ? v.bind(w) : v
      },
    })
    let closed = false
    fetch(SITE.soroEmbed)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(`Soro ${r.status}`))))
      .then((code) => {
        if (!closed) new Function('window', code)(shim)
      })
      .catch(() => !closed && setState('empty'))
    const wait = window.setTimeout(() => setState((s) => (s === 'loading' ? 'empty' : s)), 8000)

    return () => {
      closed = true
      added.forEach((fn) => window.removeEventListener('popstate', fn))
      seen.disconnect()
      window.clearTimeout(wait)
      document.querySelector('link[rel="canonical"][data-soro]')?.remove()
      document.getElementById('soro-blog-jsonld')?.remove()
      el.replaceChildren()
    }
  }, [])

  const Heading = reading ? 'p' : 'h1'

  return (
    <>
      <section style={{ padding: 'clamp(48px, 7vw, 96px) 0 clamp(28px, 4vw, 48px)', background: 'var(--color-ink-2)', borderBottom: '1px solid var(--color-line)' }}>
        <div className="wrap">
          <Reveal style={{ maxWidth: 720 }}>
            <Eyebrow>Blog</Eyebrow>
            <Heading className="display" style={{ margin: '16px 0 0', fontSize: 'clamp(36px, 5.4vw, 64px)' }}>
              Stories &amp; <em>ideas</em>
            </Heading>
            <p style={{ margin: '18px 0 0', fontSize: 'clamp(16px, 1.4vw, 18px)', color: 'var(--color-mist)', maxWidth: 640 }}>
              Travel tips, destination ideas and news from our team in Madrid and Cape Town.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-label="Articles" aria-busy={state === 'loading'} style={{ padding: 'clamp(40px, 6vw, 72px) 0 clamp(70px, 10vw, 120px)' }}>
        <div className="wrap">
          <div id="soro-blog" ref={box} hidden={state === 'empty'} />
          {state === 'empty' && (
            <div style={{ maxWidth: 560 }}>
              <p style={{ margin: 0, fontSize: 17, color: 'var(--color-mist)' }}>New articles are on their way. In the meantime, our travel guides cover what to know before you go.</p>
              <Link to="/travel-guides" className="btn btn-ghost" style={{ marginTop: 20 }}>
                Read the travel guides <ArrowRight />
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
