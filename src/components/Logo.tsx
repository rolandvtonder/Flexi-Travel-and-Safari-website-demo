/*
  Placeholder brand mark: an umbrella acacia on a low savanna sun. It stands in
  until the client supplies a logo — swap the <svg> and keep the component.
*/
export function Mark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="var(--color-gold)" />
      <path d="M5.5 13.2Q16 7.4 26.5 13.2Q16 15.6 5.5 13.2Z" fill="var(--color-ink)" />
      <path d="M15.1 14.2 14.4 24h3.2l-.7-9.8z" fill="var(--color-ink)" />
      <path d="M15.6 17.2 11.2 14.6M16.4 16.4l4.2-2.2" stroke="var(--color-ink)" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="5" y="23.4" width="22" height="1.8" rx=".9" fill="var(--color-ink)" />
    </svg>
  )
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 11 }}>
      <Mark />
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span className="display" style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1 }}>
          Flexi
        </span>
        {!compact && (
          <span className="label" style={{ fontSize: 8.5, letterSpacing: '0.16em', color: 'var(--color-mist)', marginTop: 3, whiteSpace: 'nowrap' }}>
            Travel &amp; Safari
          </span>
        )}
      </span>
    </span>
  )
}
