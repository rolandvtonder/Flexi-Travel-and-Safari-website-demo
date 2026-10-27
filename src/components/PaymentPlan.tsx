import { useId, useState } from 'react'
import { toursIn, formatPrice } from '../data/tours'
import { Check } from './Icons'

type Currency = 'EUR' | 'ZAR'

/* Slider range per currency, around the tours' indicative prices. A typed
   custom amount can go beyond either end. */
const RANGE: Record<Currency, { min: number; max: number; step: number; minCustom: number }> = {
  EUR: { min: 3000, max: 9000, step: 100, minCustom: 100 },
  ZAR: { min: 36000, max: 60000, step: 1000, minCustom: 1000 },
}

/**
  The instalment calculator. As the client set it out: payments are flexible —
  by EFT or card — and the monthly amount follows from the price and the
  number of months, up to 12. Equal payments, no interest or fees assumed; the
  copy beneath says so rather than letting the number imply a promise.
*/
export default function PaymentPlan({
  currency = 'ZAR',
  initialPrice,
  lockPrice = false,
}: {
  currency?: Currency
  initialPrice?: number
  lockPrice?: boolean
}) {
  const uid = useId()
  const { min: MIN, max: MAX, step: STEP, minCustom: MIN_CUSTOM } = RANGE[currency]
  /* safaris are priced in euros, European adventures in rand */
  const europe = toursIn(currency === 'EUR' ? 'africa' : 'europe')
  initialPrice ??= europe.find((t) => t.flagship)?.price[0] ?? europe[0].price[0]
  const [price, setPrice] = useState(initialPrice)
  const [months, setMonths] = useState(12)
  /* What the dropdown shows is its own state — deriving it from the price
     made "Custom amount" snap straight back whenever the price matched a tour. */
  const [choice, setChoice] = useState(() => europe.find((t) => t.price[0] === initialPrice)?.slug ?? '')
  const [typed, setTyped] = useState(String(initialPrice))

  const monthly = Math.ceil(price / months)
  const priceFill = Math.min(100, Math.max(0, ((price - MIN) / (MAX - MIN)) * 100))
  const monthFill = ((months - 1) / 11) * 100

  const applyPrice = (n: number) => {
    setPrice(n)
    setTyped(String(n))
  }
  const onTyped = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 7)
    setTyped(digits)
    const n = Number(digits)
    if (n >= MIN_CUSTOM) setPrice(n)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 1, borderRadius: 32, overflow: 'hidden', border: '1px solid var(--color-line)', background: 'var(--color-line)' }}>
      <div style={{ background: 'var(--color-ink)', padding: 'clamp(24px, 4vw, 40px)', display: 'grid', gap: 30, alignContent: 'start' }}>
        {!lockPrice && (
          <div>
            <label htmlFor={`${uid}-tour`} className="field-label">
              Start from a tour
            </label>
            <select
              id={`${uid}-tour`}
              className="input"
              value={choice}
              onChange={(e) => {
                setChoice(e.target.value)
                const t = europe.find((x) => x.slug === e.target.value)
                if (t) applyPrice(t.price[0])
                else requestAnimationFrame(() => document.getElementById(`${uid}-amount`)?.focus())
              }}
            >
              <option value="">Custom amount</option>
              {europe.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.title}, from {formatPrice(t.price[0], currency)}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
            <label htmlFor={`${uid}-price`} className="field-label" style={{ margin: 0 }}>
              Holiday price per person
            </label>
            <output htmlFor={`${uid}-price`} className="display tabular" style={{ fontSize: 26 }}>
              {formatPrice(price, currency)}
            </output>
          </div>
          {lockPrice ? (
            <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--color-dim)' }}>This tour’s starting price.</p>
          ) : (
            <>
              {choice === '' && (
                <div style={{ marginTop: 12 }}>
                  <label htmlFor={`${uid}-amount`} className="field-label">
                    Your amount ({currency === 'EUR' ? '€' : 'R'})
                  </label>
                  <input
                    id={`${uid}-amount`}
                    className="input tabular"
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder={currency === 'EUR' ? 'e.g. 5000' : 'e.g. 50000'}
                    value={typed}
                    onChange={(e) => onTyped(e.target.value)}
                    onBlur={() => {
                      if (Number(typed) < MIN_CUSTOM) applyPrice(MIN_CUSTOM)
                    }}
                    aria-describedby={`${uid}-amount-hint`}
                  />
                  <p id={`${uid}-amount-hint`} style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--color-dim)' }}>
                    Type any amount (handy for combined or tailor-made trips) or use the slider.
                  </p>
                </div>
              )}
              <input
                id={`${uid}-price`}
                type="range"
                className="range"
                min={MIN}
                max={MAX}
                step={STEP}
                value={Math.min(MAX, Math.max(MIN, price))}
                onChange={(e) => {
                  setChoice('')
                  applyPrice(Number(e.target.value))
                }}
                style={{ ['--fill' as string]: `${priceFill}%`, marginTop: 10 }}
                aria-valuetext={formatPrice(price, currency)}
              />
              <div className="label tabular" style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-dim)', fontSize: 10 }}>
                <span>{formatPrice(MIN, currency)}</span>
                <span>{formatPrice(MAX, currency)}</span>
              </div>
            </>
          )}
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
            <label htmlFor={`${uid}-months`} className="field-label" style={{ margin: 0 }}>
              Pay over
            </label>
            <output htmlFor={`${uid}-months`} className="display tabular" style={{ fontSize: 26 }}>
              {months === 1 ? 'In full' : `${months} months`}
            </output>
          </div>
          <input
            id={`${uid}-months`}
            type="range"
            className="range"
            min={1}
            max={12}
            step={1}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            style={{ ['--fill' as string]: `${monthFill}%`, marginTop: 10 }}
            aria-valuetext={months === 1 ? 'Pay in full' : `${months} months`}
          />
          <div className="label tabular" style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-dim)', fontSize: 10 }}>
            <span>In full</span>
            <span>12 months</span>
          </div>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '10px 22px', flexWrap: 'wrap', fontSize: 14.5, color: 'var(--color-mist)' }}>
          {['Pay by EFT', 'or by card', 'Due dates agreed upfront'].map((x) => (
            <li key={x} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: 'var(--color-gold)' }}>
                <Check size={16} />
              </span>
              {x}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ background: 'var(--color-ink-2)', padding: 'clamp(24px, 4vw, 40px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 24 }}>
        <div>
          <div className="label" style={{ color: 'var(--color-gold)' }}>
            {months === 1 ? 'One payment' : 'Estimated monthly payment'}
          </div>
          <div aria-live="polite" className="display tabular" style={{ fontSize: 'clamp(54px, 7vw, 88px)', lineHeight: 1, marginTop: 12, fontWeight: 400 }}>
            {formatPrice(monthly, currency)}
          </div>
          <div style={{ color: 'var(--color-mist)', marginTop: 8 }}>{months === 1 ? 'per person, paid before departure' : `per person, per month, for ${months} months`}</div>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--color-dim)' }}>
          An estimate assuming equal payments with no interest or fees. Your schedule is agreed when you book and must finish before you travel, so a 12-month plan needs a departure at least 12 months away.
        </p>
      </div>
    </div>
  )
}
