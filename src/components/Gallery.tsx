import { useEffect, useRef, useState } from 'react'
import { PHOTOS } from '../data/photos'
import { photo } from '../data/tours'
import { ArrowLeft, ArrowRight, Close } from './Icons'

const byKey = new Map(PHOTOS.map((p) => [p.key, p]))
export const photoAlt = (key: string) => byKey.get(key)?.alt ?? ''

/**
  A photo grid with a full-screen viewer. The viewer is a native <dialog>
  opened with showModal(), so focus is trapped, Escape closes it and focus
  returns to the thumbnail that opened it. Arrow keys step through.
*/
export default function Gallery({ keys, label }: { keys: string[]; label: string }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLButtonElement | null>(null)
  const [at, setAt] = useState<number | null>(null)
  const list = keys.filter((k) => byKey.has(k))

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (at !== null && !d.open) d.showModal()
    if (at === null && d.open) d.close()
  }, [at])

  const step = (dir: number) => setAt((i) => (i === null ? i : (i + dir + list.length) % list.length))

  if (!list.length) return null
  const current = at === null ? null : byKey.get(list[at])!

  return (
    <>
      <ul className="gallery" aria-label={label} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {list.map((k, i) => {
          const p = byKey.get(k)!
          const shape = list.length > 4 && i % 7 === 0 ? 'wide' : p.h > p.w * 1.15 && i % 3 === 1 ? 'tall' : ''
          return (
            <li key={k} className={shape} style={{ display: 'contents' }}>
              <button
                type="button"
                className={shape}
                onClick={(e) => {
                  opener.current = e.currentTarget
                  setAt(i)
                }}
                aria-label={`View photo ${i + 1} of ${list.length}: ${p.alt}`}
              >
                <img src={photo(k, 'sm')} alt="" loading="lazy" decoding="async" width={p.w} height={p.h} />
              </button>
            </li>
          )
        })}
      </ul>

      <dialog
        ref={dialog}
        aria-label={`${label}: photo viewer`}
        onClose={() => {
          setAt(null)
          opener.current?.focus()
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setAt(null)
        }}
        style={{ width: '100vw', height: '100dvh', maxWidth: 'none', maxHeight: 'none', margin: 0, padding: 0, border: 0, background: 'rgba(10,10,10,0.94)', color: '#fff' }}
      >
        {current && (
          <div className="dark" style={{ position: 'relative', width: '100%', height: '100%', display: 'grid', gridTemplateRows: '1fr auto', placeItems: 'center', padding: '56px 16px 16px', boxSizing: 'border-box' }}>
            <img
              src={photo(current.key)}
              alt={current.alt}
              style={{ maxWidth: '100%', maxHeight: 'calc(100dvh - 140px)', objectFit: 'contain', borderRadius: 10 }}
            />
            <p style={{ margin: '14px 0 0', textAlign: 'center', color: 'rgba(255,255,255,0.88)' }}>
              {current.alt}
              <span className="tabular" style={{ marginLeft: 12, color: 'rgba(255,255,255,0.6)' }}>
                {at! + 1} / {list.length}
              </span>
            </p>
            {[
              { dir: -1, label: 'Previous photo', icon: <ArrowLeft size={20} />, side: { left: 12 } },
              { dir: 1, label: 'Next photo', icon: <ArrowRight size={20} />, side: { right: 12 } },
            ].map((b) => (
              <button
                key={b.label}
                type="button"
                aria-label={b.label}
                onClick={() => step(b.dir)}
                style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', ...b.side, width: 52, height: 52, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(0,0,0,0.45)', color: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer' }}
              >
                {b.icon}
              </button>
            ))}
            <button
              type="button"
              aria-label="Close photo viewer"
              autoFocus
              onClick={() => setAt(null)}
              style={{ position: 'absolute', top: 10, right: 12, width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(0,0,0,0.45)', color: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer' }}
            >
              <Close size={20} />
            </button>
          </div>
        )}
      </dialog>
    </>
  )
}
