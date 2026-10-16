import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { TOURS, SAFARI_COUNTRIES, EUROPE_COUNTRIES, type Region } from '../data/tours'
import { submitEnquiry } from '../lib/submit'
import { officeFor, whatsappLink } from '../config'
import { ArrowLeft, ArrowRight, Check, WhatsApp } from './Icons'

/*
  The lead pre-qualification form — one form, used on the contact page,
  both journey pages and every tour page.

  Three short steps rather than one long page (progressive disclosure): the
  trip, then budget & style, then the person. Each step validates before the
  next, errors sit under their field and a linked summary takes focus.

  On submit every lead is scored from budget fit and booking timeline:

      HOT       budget within/above the range AND booking within 3 months
      WARM      budget within/above the range, or not sure yet
      NURTURE   budget below the range, or just researching

  The score travels in the email subject and an internal field only; the
  visitor never sees it.
*/

type Journey = '' | Region | 'unsure'

type Values = {
  journey: Journey
  tour: string
  countries: string[]
  month: string
  flexible: boolean
  adults: string
  children: string
  budget: string
  style: string
  occasion: string
  pay: string
  months: string
  method: string
  visa: string
  name: string
  email: string
  phone: string
  residence: string
  contactBy: string
  timeline: string
  source: string
  message: string
  consent: boolean
}

type Key = keyof Values
type Errors = Partial<Record<Key, string>>

/* Budget bands per person; `fit` 0 = below the range, 1 = in it, 2 = above. */
const BUDGETS: Record<'africa' | 'europe', { label: string; fit: number }[]> = {
  africa: [
    { label: 'Under €3,000', fit: 0 },
    { label: '€3,000 – €4,000', fit: 0 },
    { label: '€4,000 – €6,000', fit: 1 },
    { label: '€6,000 or more', fit: 2 },
  ],
  europe: [
    { label: 'Under R30,000', fit: 0 },
    { label: 'R30,000 – R36,000', fit: 0 },
    { label: 'R36,000 – R60,000', fit: 1 },
    { label: 'R60,000 or more', fit: 2 },
  ],
}
const NOT_SURE = 'Not sure yet'

const TIMELINES = ['Within the next month', 'In 1–3 months', 'In 3–6 months', 'Just researching for now']
const STYLES = ['Comfortable', 'Premium', 'Luxury']
const OCCASIONS = ['A holiday', 'Honeymoon or anniversary', 'Milestone birthday', 'Family trip', 'Friends / girls’ trip', 'Something else']
const RESIDENCE = ['Spain', 'United Kingdom', 'Ireland', 'Germany', 'Netherlands', 'Portugal', 'France', 'Italy', 'Other Europe', 'United States', 'Canada', 'South Africa', 'Botswana', 'Namibia', 'Zimbabwe', 'Other']
const SOURCES = ['Google', 'Instagram', 'Facebook', 'TikTok', 'A friend or family member', 'Other']

const STEPS = ['Your trip', 'Budget & style', 'About you'] as const

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(step: number, v: Values): Errors {
  const e: Errors = {}
  if (step === 0) {
    if (!v.journey) e.journey = 'Choose the kind of journey you’re planning.'
    if (!v.month) e.month = 'Pick a rough month — it can change later.'
    const a = Number(v.adults)
    if (!v.adults || a < 1 || a > 30) e.adults = 'Enter between 1 and 30 adults.'
    const c = Number(v.children || 0)
    if (c < 0 || c > 20) e.children = 'Enter between 0 and 20 children.'
  }
  if (step === 1) {
    if (!v.budget) e.budget = 'Choose a budget per person — it helps us suggest the right lodges and hotels.'
    if (v.journey === 'europe' && !v.pay) e.pay = 'Tell us whether you’d like to pay in full or monthly.'
  }
  if (step === 2) {
    if (!v.name.trim()) e.name = 'Tell us your name so we know who to reply to.'
    if (!v.email.trim()) e.email = 'Add an email address so we can send your itinerary.'
    else if (!EMAIL.test(v.email.trim())) e.email = 'That email looks incomplete — use the form name@example.com.'
    if (v.phone.replace(/\D/g, '').length < 8) e.phone = 'Add a phone or WhatsApp number, including the country code.'
    if (!v.residence) e.residence = 'Tell us where you live — it affects routes, visas and pricing.'
    if (!v.timeline) e.timeline = 'Let us know when you’d like to book.'
    if (!v.consent) e.consent = 'Please agree so we can contact you about this enquiry.'
  }
  return e
}

function score(v: Values): 'HOT' | 'WARM' | 'NURTURE' {
  const region = v.journey === 'europe' ? 'europe' : 'africa'
  const band = BUDGETS[region].find((b) => b.label === v.budget)
  const soon = v.timeline === TIMELINES[0] || v.timeline === TIMELINES[1]
  if (v.timeline === TIMELINES[3]) return 'NURTURE'
  if (band && band.fit === 0) return 'NURTURE'
  if (band && band.fit >= 1 && soon) return 'HOT'
  return 'WARM'
}

const blank = (journey: Journey, tour: string): Values => ({
  journey,
  tour,
  countries: [],
  month: '',
  flexible: false,
  adults: '2',
  children: '0',
  budget: '',
  style: '',
  occasion: '',
  pay: '',
  months: '12',
  method: '',
  visa: '',
  name: '',
  email: '',
  phone: '',
  residence: '',
  contactBy: 'WhatsApp',
  timeline: '',
  source: '',
  message: '',
  consent: false,
})

export default function EnquiryForm({
  defaultRegion,
  defaultTour,
  compact = false,
}: {
  defaultRegion?: Region
  defaultTour?: string
  compact?: boolean
}) {
  const uid = useId()
  const id = (k: string) => `${uid}-${k}`
  const [v, setV] = useState<Values>(() => blank(defaultRegion ?? '', defaultTour ?? ''))
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<Key, boolean>>>({})
  const [summary, setSummary] = useState(false)
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle')
  const [via, setVia] = useState<'email' | 'whatsapp'>('email')
  const [failure, setFailure] = useState('')
  const summaryRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLHeadingElement>(null)
  const moved = useRef(false)
  const [focusTick, setFocusTick] = useState(0)

  /* Move focus to the error summary once it has actually rendered. */
  useEffect(() => {
    if (focusTick) summaryRef.current?.focus()
  }, [focusTick])

  /* After a step change, put focus on the new step's heading. */
  useEffect(() => {
    if (!moved.current) return
    headRef.current?.focus()
  }, [step])

  const set = <K extends Key>(k: K, val: Values[K]) => {
    const next = { ...v, [k]: val }
    if (k === 'journey') {
      next.tour = ''
      next.countries = []
      next.budget = ''
    }
    setV(next)
    if (touched[k]) setErrors(validate(step, next))
  }
  const blur = (k: Key) => {
    setTouched((t) => ({ ...t, [k]: true }))
    setErrors(validate(step, v))
  }
  const err = (k: Key) => (touched[k] || summary ? errors[k] : undefined)

  const region: 'africa' | 'europe' = v.journey === 'europe' ? 'europe' : 'africa'
  const europe = v.journey === 'europe'
  const tours = TOURS.filter((t) => !v.journey || v.journey === 'unsure' || t.region === v.journey)
  const countryOptions = v.journey === 'africa' ? SAFARI_COUNTRIES : v.journey === 'europe' ? EUROPE_COUNTRIES : []

  const fail = (found: Errors) => {
    setErrors(found)
    setTouched(Object.fromEntries(Object.keys(found).map((k) => [k, true])))
    setSummary(true)
    setFocusTick((t) => t + 1)
  }

  const next = () => {
    const found = validate(step, v)
    if (Object.keys(found).length) return fail(found)
    setErrors({})
    setSummary(false)
    moved.current = true
    setStep((s) => s + 1)
  }
  const back = () => {
    setErrors({})
    setSummary(false)
    moved.current = true
    setStep((s) => s - 1)
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (step < STEPS.length - 1) return next()
    const found = validate(step, v)
    if (Object.keys(found).length) return fail(found)
    setSummary(false)
    setState('sending')

    const tour = TOURS.find((t) => t.slug === v.tour)
    const journeyLabel = v.journey === 'africa' ? 'African safari' : v.journey === 'europe' ? 'European adventure' : 'Not sure yet'
    const lead = score(v)
    const [y, m] = v.month.split('-')
    const monthLabel = v.month ? new Date(Number(y), Number(m) - 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : ''

    const fields: Record<string, string> = {
      Name: v.name.trim(),
      Email: v.email.trim(),
      'Phone / WhatsApp': v.phone.trim(),
      'Lives in': v.residence,
      'Prefers contact by': v.contactBy,
      Journey: journeyLabel,
      Tour: tour ? tour.title : 'Tailor-made',
      Countries: v.countries.join(', '),
      'Travel month': monthLabel + (v.flexible ? ' (flexible)' : ''),
      Travellers: `${v.adults} adult${v.adults === '1' ? '' : 's'}${Number(v.children) ? `, ${v.children} child${v.children === '1' ? '' : 'ren'}` : ''}`,
      'Budget per person': v.budget,
      Style: v.style,
      Occasion: v.occasion,
      Payment: europe ? (v.pay === 'monthly' ? `Monthly over ${v.months} months` : v.pay === 'full' ? 'Pay in full' : '') : '',
      'Payment method': v.method,
      'Schengen visa': europe ? v.visa : '',
      'Ready to book': v.timeline,
      'Heard about us': v.source,
      Message: v.message.trim(),
    }
    const r = await submitEnquiry(`[${lead}] ${journeyLabel} — ${tour ? tour.title : 'tailor-made'} — ${v.name.trim()}`, fields, {
      region: europe ? 'europe' : 'africa',
      internal: { 'Lead score': lead },
    })
    if (r.ok) {
      setVia(r.via)
      setState('done')
    } else {
      setFailure(r.error)
      setState('failed')
    }
  }

  if (state === 'done') {
    const o = officeFor(europe ? 'europe' : 'africa')
    return (
      <div role="status" style={{ padding: compact ? 24 : 36, borderRadius: 24, border: '1px solid var(--color-line)', background: 'var(--color-ink-2)' }}>
        <span style={{ width: 48, height: 48, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'var(--color-gold)', color: 'var(--color-ink)' }}>
          <Check size={22} />
        </span>
        <h3 className="display" style={{ margin: '18px 0 8px', fontSize: 30 }}>
          {via === 'email' ? `Thank you, ${v.name.trim().split(' ')[0]}.` : 'Almost there.'}
        </h3>
        <p style={{ margin: 0, color: 'var(--color-mist)' }}>
          {via === 'email'
            ? `Our ${o.city} team will reply within one working day by ${v.contactBy.toLowerCase()}.`
            : `We opened WhatsApp with your details filled in — just press send and our ${o.city} team will take it from there.`}
        </p>
        <ol style={{ margin: '22px 0 0', paddingLeft: 20, color: 'var(--color-mist)', display: 'grid', gap: 6 }}>
          <li>We review your trip, dates and budget.</li>
          <li>You receive a suggested route with an itemised, honest price.</li>
          <li>{europe ? 'We agree a payment schedule — EFT or card, up to 12 months.' : 'We fine-tune lodges and pace until it feels right.'}</li>
        </ol>
      </div>
    )
  }

  const errorList = (Object.keys(errors) as Key[]).filter((k) => errors[k])
  const grid2 = { display: 'grid', gridTemplateColumns: compact ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18 }
  const bands = v.journey === 'europe' ? BUDGETS.europe : BUDGETS.africa
  const descr = (k: Key, hint?: boolean) => [err(k) ? id(`${k}-err`) : '', hint && !err(k) ? id(`${k}-hint`) : ''].filter(Boolean).join(' ') || undefined

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Plan your trip" style={{ display: 'grid', gap: 22 }}>
      {/* ---- progress ---- */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
          <h3 ref={headRef} tabIndex={-1} className="display" style={{ margin: 0, fontSize: 24, outline: 'none' }}>
            {STEPS[step]}
          </h3>
          <span className="label tabular" style={{ color: 'var(--color-dim)' }}>
            Step {step + 1} of {STEPS.length}
          </span>
        </div>
        <div aria-hidden="true" style={{ display: 'grid', gridTemplateColumns: `repeat(${STEPS.length}, 1fr)`, gap: 6, marginTop: 14 }}>
          {STEPS.map((s, i) => (
            <span key={s} style={{ height: 4, borderRadius: 999, background: i <= step ? 'var(--color-gold)' : 'rgba(245,239,227,0.14)', transition: 'background-color 300ms ease' }} />
          ))}
        </div>
      </div>

      {summary && errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" style={{ padding: '16px 18px', borderRadius: 14, border: '1px solid var(--color-danger)', background: 'rgba(255,138,122,0.08)' }}>
          <p style={{ margin: '0 0 6px', fontWeight: 700 }}>Please check {errorList.length === 1 ? 'one thing' : `${errorList.length} things`}:</p>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {errorList.map((k) => (
              <li key={k}>
                <a href={`#${id(k)}`} style={{ color: 'var(--color-danger)', textDecoration: 'underline' }}>
                  {errors[k]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ================= step 1 — the trip ================= */}
      {step === 0 && (
        <>
          <Group legend="I’m planning" required error={err('journey')} errId={id('journey-err')} firstId={id('journey')}>
            <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
              {[
                { val: 'africa', t: 'An African safari' },
                { val: 'europe', t: 'A European adventure' },
                { val: 'unsure', t: 'Not sure yet' },
              ].map((o, i) => (
                <label key={o.val} className="choice">
                  <input type="radio" name={id('journey')} id={i === 0 ? id('journey') : undefined} value={o.val} checked={v.journey === o.val} onChange={() => set('journey', o.val as Journey)} onBlur={() => blur('journey')} aria-describedby={descr('journey')} />
                  {o.t}
                </label>
              ))}
            </div>
          </Group>

          <Field id={id('tour')} label="A tour that caught your eye" hint="Optional — or leave it to us and we’ll suggest a route">
            <select id={id('tour')} className="input" value={v.tour} onChange={(e) => set('tour', e.target.value)} aria-describedby={id('tour-hint')}>
              <option value="">Something tailor-made</option>
              {tours.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.country} — {t.title}
                </option>
              ))}
            </select>
          </Field>

          {countryOptions.length > 0 && (
            <Group legend={europe ? 'Countries you’d love to see' : 'Where in Africa?'} hint={europe ? 'Pick one, or combine a few — we’ll plan the route' : 'Optional — pick any that appeal'} hintId={id('countries-hint')}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {countryOptions.map((c) => (
                  <label key={c} className="choice choice-chip">
                    <input
                      type="checkbox"
                      checked={v.countries.includes(c)}
                      onChange={(e) => set('countries', e.target.checked ? [...v.countries, c] : v.countries.filter((x) => x !== c))}
                      aria-describedby={id('countries-hint')}
                    />
                    {c}
                  </label>
                ))}
              </div>
            </Group>
          )}

          <div style={grid2}>
            <Field id={id('month')} label="When would you like to travel?" required error={err('month')} hint="Month and year is plenty">
              <input id={id('month')} className="input" type="month" value={v.month} onChange={(e) => set('month', e.target.value)} onBlur={() => blur('month')} aria-invalid={!!err('month')} aria-describedby={descr('month', true)} aria-required />
            </Field>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <label className="choice" style={{ width: '100%' }}>
                <input type="checkbox" checked={v.flexible} onChange={(e) => set('flexible', e.target.checked)} />
                My dates are flexible
              </label>
            </div>
          </div>

          <div style={grid2}>
            <Field id={id('adults')} label="Adults" required error={err('adults')}>
              <input id={id('adults')} className="input" type="number" inputMode="numeric" min={1} max={30} value={v.adults} onChange={(e) => set('adults', e.target.value)} onBlur={() => blur('adults')} aria-invalid={!!err('adults')} aria-describedby={descr('adults')} aria-required />
            </Field>
            <Field id={id('children')} label="Children (under 16)" error={err('children')}>
              <input id={id('children')} className="input" type="number" inputMode="numeric" min={0} max={20} value={v.children} onChange={(e) => set('children', e.target.value)} onBlur={() => blur('children')} aria-invalid={!!err('children')} aria-describedby={descr('children')} />
            </Field>
          </div>
        </>
      )}

      {/* ================= step 2 — budget & style ================= */}
      {step === 1 && (
        <>
          <Group legend="Budget per person" required error={err('budget')} errId={id('budget-err')} firstId={id('budget')} hint={europe ? 'Land arrangements — flights from home are quoted separately' : 'Accommodation and transfers — international flights are separate'} hintId={id('budget-hint')}>
            <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
              {[...bands.map((b) => b.label), NOT_SURE].map((b, i) => (
                <label key={b} className="choice">
                  <input type="radio" name={id('budget')} id={i === 0 ? id('budget') : undefined} checked={v.budget === b} onChange={() => set('budget', b)} onBlur={() => blur('budget')} aria-describedby={descr('budget', true)} />
                  <span className="tabular">{b}</span>
                </label>
              ))}
            </div>
          </Group>

          <div style={grid2}>
            <Field id={id('style')} label="Accommodation style">
              <select id={id('style')} className="input" value={v.style} onChange={(e) => set('style', e.target.value)}>
                <option value="">No preference</option>
                {STYLES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
            <Field id={id('occasion')} label="What’s the occasion?">
              <select id={id('occasion')} className="input" value={v.occasion} onChange={(e) => set('occasion', e.target.value)}>
                <option value="">Choose…</option>
                {OCCASIONS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
          </div>

          {europe && (
            <>
              <Group legend="How would you like to pay?" required error={err('pay')} errId={id('pay-err')} firstId={id('pay')}>
                <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
                  {[
                    { val: 'monthly', t: 'Monthly instalments' },
                    { val: 'full', t: 'Pay in full' },
                  ].map((o, i) => (
                    <label key={o.val} className="choice">
                      <input type="radio" name={id('pay')} id={i === 0 ? id('pay') : undefined} checked={v.pay === o.val} onChange={() => set('pay', o.val)} onBlur={() => blur('pay')} aria-describedby={descr('pay')} />
                      {o.t}
                    </label>
                  ))}
                </div>
              </Group>
              {v.pay === 'monthly' && (
                <Field id={id('months')} label="Over how many months?" hint="Up to 12 months, finishing before you travel">
                  <select id={id('months')} className="input" value={v.months} onChange={(e) => set('months', e.target.value)} aria-describedby={id('months-hint')}>
                    {Array.from({ length: 11 }, (_, i) => i + 2).map((n) => (
                      <option key={n} value={n}>
                        {n} months
                      </option>
                    ))}
                  </select>
                </Field>
              )}
              <Field id={id('visa')} label="Do you have a valid Schengen visa?" hint="Most Southern African passports need one — we explain the process">
                <select id={id('visa')} className="input" value={v.visa} onChange={(e) => set('visa', e.target.value)} aria-describedby={id('visa-hint')}>
                  <option value="">Choose…</option>
                  <option>Yes, I have a valid visa</option>
                  <option>No, I’ll need to apply</option>
                  <option>My passport doesn’t need one</option>
                  <option>Not sure</option>
                </select>
              </Field>
            </>
          )}

          <Field id={id('method')} label="Preferred payment method">
            <select id={id('method')} className="input" value={v.method} onChange={(e) => set('method', e.target.value)}>
              <option value="">No preference</option>
              <option>EFT / bank transfer</option>
              <option>Card</option>
            </select>
          </Field>
        </>
      )}

      {/* ================= step 3 — about you ================= */}
      {step === 2 && (
        <>
          <div style={grid2}>
            <Field id={id('name')} label="Your name" required error={err('name')}>
              <input id={id('name')} className="input" autoComplete="name" value={v.name} onChange={(e) => set('name', e.target.value)} onBlur={() => blur('name')} aria-invalid={!!err('name')} aria-describedby={descr('name')} aria-required />
            </Field>
            <Field id={id('email')} label="Email" required error={err('email')}>
              <input id={id('email')} className="input" type="email" inputMode="email" autoComplete="email" value={v.email} onChange={(e) => set('email', e.target.value)} onBlur={() => blur('email')} aria-invalid={!!err('email')} aria-describedby={descr('email')} aria-required />
            </Field>
          </div>
          <div style={grid2}>
            <Field id={id('phone')} label="Phone / WhatsApp" required error={err('phone')} hint="Include the country code, e.g. +34 or +27">
              <input id={id('phone')} className="input" type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={(e) => set('phone', e.target.value)} onBlur={() => blur('phone')} aria-invalid={!!err('phone')} aria-describedby={descr('phone', true)} aria-required />
            </Field>
            <Field id={id('residence')} label="Where do you live?" required error={err('residence')}>
              <select id={id('residence')} className="input" autoComplete="country-name" value={v.residence} onChange={(e) => set('residence', e.target.value)} onBlur={() => blur('residence')} aria-invalid={!!err('residence')} aria-describedby={descr('residence')} aria-required>
                <option value="">Choose a country…</option>
                {RESIDENCE.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
          </div>

          <Group legend="When are you hoping to book?" required error={err('timeline')} errId={id('timeline-err')} firstId={id('timeline')}>
            <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
              {TIMELINES.map((t, i) => (
                <label key={t} className="choice">
                  <input type="radio" name={id('timeline')} id={i === 0 ? id('timeline') : undefined} checked={v.timeline === t} onChange={() => set('timeline', t)} onBlur={() => blur('timeline')} aria-describedby={descr('timeline')} />
                  {t}
                </label>
              ))}
            </div>
          </Group>

          <div style={grid2}>
            <Field id={id('contactBy')} label="Best way to reach you">
              <select id={id('contactBy')} className="input" value={v.contactBy} onChange={(e) => set('contactBy', e.target.value)}>
                <option>WhatsApp</option>
                <option>Email</option>
                <option>Phone call</option>
              </select>
            </Field>
            <Field id={id('source')} label="How did you hear about us?">
              <select id={id('source')} className="input" value={v.source} onChange={(e) => set('source', e.target.value)}>
                <option value="">Choose…</option>
                {SOURCES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field id={id('message')} label="Anything else we should know?" hint="Must-sees, pace, dietary or mobility needs — the more we know, the better the route">
            <textarea id={id('message')} className="input" rows={compact ? 3 : 4} value={v.message} onChange={(e) => set('message', e.target.value)} aria-describedby={id('message-hint')} style={{ resize: 'vertical' }} />
          </Field>

          <div>
            <label className="choice" style={{ alignItems: 'flex-start' }}>
              <input id={id('consent')} type="checkbox" checked={v.consent} onChange={(e) => set('consent', e.target.checked)} onBlur={() => blur('consent')} aria-invalid={!!err('consent')} aria-describedby={descr('consent')} style={{ marginTop: 3 }} />
              <span style={{ fontSize: 14.5 }}>
                I agree to Flexi Travel &amp; Safari contacting me about this enquiry. <span aria-hidden="true" style={{ color: 'var(--color-gold)' }}>*</span>
              </span>
            </label>
            {err('consent') && (
              <p id={id('consent-err')} style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--color-danger)' }}>
                {errors.consent}
              </p>
            )}
          </div>
        </>
      )}

      {state === 'failed' && (
        <p role="alert" style={{ margin: 0, color: 'var(--color-danger)' }}>
          {failure}{' '}
          <a href={whatsappLink(`Hi Flexi, I tried to send an enquiry from the website. My name is ${v.name}.`, europe ? 'europe' : 'africa')} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
            Message us on WhatsApp
          </a>{' '}
          or try again.
        </p>
      )}

      {/* ---- controls ---- */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        {step > 0 && (
          <button type="button" onClick={back} className="btn btn-ghost" style={{ padding: '0 22px' }}>
            <ArrowLeft size={14} /> Back
          </button>
        )}
        <button type="submit" className="btn btn-gold" disabled={state === 'sending'} aria-busy={state === 'sending'} style={{ opacity: state === 'sending' ? 0.65 : 1, minWidth: 180 }}>
          {step < STEPS.length - 1 ? (
            <>
              Continue <ArrowRight size={14} />
            </>
          ) : state === 'sending' ? (
            'Sending…'
          ) : (
            'Send my enquiry'
          )}
        </button>
        {step === 0 && (
          <a href={whatsappLink('Hi Flexi, I’d like help planning a trip.', region)} target="_blank" rel="noopener noreferrer" className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 44, color: 'var(--color-mist)' }}>
            <WhatsApp /> Rather chat on WhatsApp
          </a>
        )}
      </div>
      <p style={{ margin: 0, fontSize: 13, color: 'var(--color-dim)' }}>
        <span aria-hidden="true">*</span> Required. Takes about two minutes. No obligation — we reply within one working day.
      </p>
    </form>
  )
}

function Field({ id, label, hint, error, required, children }: { id: string; label: string; hint?: string; error?: string; required?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span aria-hidden="true" style={{ color: 'var(--color-gold)' }}> *</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--color-dim)' }}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--color-danger)' }}>
          {error}
        </p>
      )}
    </div>
  )
}

/** A fieldset of radio/checkbox choices with a visible legend. */
function Group({
  legend,
  required,
  error,
  errId,
  hint,
  hintId,
  firstId,
  children,
}: {
  legend: string
  required?: boolean
  error?: string
  errId?: string
  hint?: string
  hintId?: string
  firstId?: string
  children: ReactNode
}) {
  return (
    <fieldset id={firstId ? `${firstId}-group` : undefined} style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
      <legend className="field-label" style={{ padding: 0 }}>
        {legend}
        {required && <span aria-hidden="true" style={{ color: 'var(--color-gold)' }}> *</span>}
      </legend>
      {children}
      {hint && !error && (
        <p id={hintId} style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--color-dim)' }}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errId} style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--color-danger)' }}>
          {error}
        </p>
      )}
    </fieldset>
  )
}
