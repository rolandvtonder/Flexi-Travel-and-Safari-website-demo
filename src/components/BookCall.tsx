/*
  "Book a call" with the founder, through Calendly. Calendly's script is only
  fetched when someone clicks, so it costs nothing on page load; it then opens
  as a pop-up over the page. The control is a real link to the booking page,
  so it still works (in a new tab) if the script is blocked or fails.

  Until SITE.calendlyUrl is set, the same control opens WhatsApp instead,
  asking to book a call, so the button is never a dead end.
*/
import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import { SITE, whatsappLink } from '../config'

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (opts: { url: string }) => void }
  }
}

const SCRIPT = 'https://assets.calendly.com/assets/external/widget.js'
const STYLES = 'https://assets.calendly.com/assets/external/widget.css'

let loading: Promise<void> | null = null
function loadCalendly() {
  loading ??= new Promise<void>((resolve, reject) => {
    const css = document.createElement('link')
    css.rel = 'stylesheet'
    css.href = STYLES
    document.head.append(css)
    const js = document.createElement('script')
    js.src = SCRIPT
    js.async = true
    js.onload = () => resolve()
    js.onerror = () => {
      loading = null
      reject(new Error('Calendly failed to load'))
    }
    document.head.append(js)
  })
  return loading
}

/** The booking page, in the brand gold and without Calendly's cookie banner. */
function bookingUrl() {
  const u = new URL(SITE.calendlyUrl)
  u.searchParams.set('primary_color', 'ac8d2d')
  u.searchParams.set('hide_gdpr_banner', '1')
  return u.toString()
}

type Props = { className?: string; style?: CSSProperties; children: ReactNode }

export function BookCallLink({ className, style, children }: Props) {
  if (!SITE.calendlyUrl)
    return (
      <a href={whatsappLink('Hi Flexi, I’d like to book a call to talk about a trip.')} target="_blank" rel="noopener noreferrer" className={className} style={style}>
        {children}
      </a>
    )

  const url = bookingUrl()
  const onClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return // let "open in new tab" work
    e.preventDefault()
    try {
      await loadCalendly()
      window.Calendly!.initPopupWidget({ url })
    } catch {
      window.open(url, '_blank', 'noopener')
    }
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className} style={style}>
      {children}
    </a>
  )
}
