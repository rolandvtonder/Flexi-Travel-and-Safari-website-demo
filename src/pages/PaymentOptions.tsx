import { useState } from 'react'
import { Link } from 'react-router'
import { PageHero, Reveal, SectionHead, Eyebrow, Faq, usePageMeta } from '../components/ui'
import PaymentPlan from '../components/PaymentPlan'
import EnquiryForm from '../components/EnquiryForm'
import { photo } from '../data/tours'
import { ArrowRight, Check, Wallet, Globe, Clock } from '../components/Icons'

/*
  Payment options, as the client set them out: payments are flexible — by
  EFT or by card — and the amount follows from the price and the number of
  months, up to twelve. Instalments are invoiced by the team, not taken
  online; the site explains the options and estimates the monthly figure.
*/

const WAYS = [
  { icon: Wallet, t: 'EFT / bank transfer', b: 'Pay directly into our account. We send banking details and a reference with your invoice.' },
  { icon: Globe, t: 'Card', b: 'Pay by debit or credit card. Ideal if you are paying from abroad.' },
  { icon: Clock, t: 'Monthly instalments', b: 'Spread the cost over up to twelve months before you travel. The monthly amount depends on the price and how many months you choose.' },
]

const STEPS = [
  { t: 'Choose your trip', b: 'Pick a signature safari or European adventure (or ask us to tailor one) and a departure date.' },
  { t: 'Agree your plan', b: 'We confirm the price, then agree whether you pay in full or monthly, how many months, and your due dates.' },
  { t: 'Pay your way', b: 'Pay each instalment by EFT or card. We confirm every payment and keep you up to date on your balance.' },
  { t: 'Travel with confidence', b: 'Your plan finishes before departure, your documents are sent, and the adventure begins.' },
]

export default function PaymentOptions() {
  usePageMeta('Payment options', 'Pay for your African safari or European adventure by EFT or card, in full or in monthly instalments over up to twelve months before you travel.')
  const [which, setWhich] = useState<'europe' | 'africa'>('europe')

  return (
    <>
      <PageHero
        image={photo('vic-dinner-cruise')}
        eyebrow="Payment options"
        title={
          <>
            Travel now. <em>Pay over time.</em>
          </>
        }
        intro="Pay by EFT or card, in full or in monthly instalments over up to twelve months before you travel. Flexible payments for African safaris and European adventures."
      >
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 30 }}>
          <a href="#calculator" className="btn btn-gold">
            Work out my payments
          </a>
          <Link to="/contact" className="btn btn-ghost">
            Talk to us
            <span className="dot">
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </PageHero>

      {/* ---- ways to pay ---- */}
      <section aria-labelledby="ways" style={{ padding: 'clamp(70px, 10vw, 120px) 0' }}>
        <div className="wrap">
          <SectionHead id="ways" eyebrow="Ways to pay" title={<>Simple, flexible, <em>your way</em></>} intro="However you choose to pay, every amount and due date is agreed upfront and confirmed in writing." />
          <ul style={{ listStyle: 'none', padding: 0, margin: '44px 0 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 18 }}>
            {WAYS.map((w, i) => (
              <Reveal as="li" key={w.t} delay={i * 0.06} style={{ padding: 30, borderRadius: 24, border: '1px solid var(--color-line)', background: 'var(--color-ink)', boxShadow: '0 24px 50px -40px rgba(0,0,0,0.4)' }}>
                <span style={{ width: 52, height: 52, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'var(--color-brand-gold)', color: 'var(--color-black)' }}>
                  <w.icon size={22} />
                </span>
                <h3 className="display" style={{ margin: '20px 0 8px', fontSize: 22 }}>
                  {w.t}
                </h3>
                <p style={{ margin: 0, color: 'var(--color-mist)' }}>{w.b}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- calculator ---- */}
      <section id="calculator" aria-labelledby="calc-h" style={{ padding: 'clamp(70px, 10vw, 120px) 0', background: 'var(--color-ink-2)', borderTop: '1px solid var(--color-line)', borderBottom: '1px solid var(--color-line)', scrollMarginTop: 'calc(var(--header-h) + 16px)' }}>
        <div className="wrap">
          <SectionHead id="calc-h" eyebrow="Payment calculator" title={<>What would it <em>cost a month?</em></>} intro="Choose a trip or type any amount, then slide to the number of months that suits you." />
          <div role="radiogroup" aria-label="Type of trip" style={{ display: 'inline-flex', gap: 6, padding: 5, marginTop: 30, borderRadius: 999, border: '1px solid var(--color-line)', background: 'var(--color-ink)' }}>
            {(
              [
                ['europe', 'European adventure (R)'],
                ['africa', 'African safari (€)'],
              ] as const
            ).map(([v, l]) => (
              <button
                key={v}
                type="button"
                role="radio"
                aria-checked={which === v}
                onClick={() => setWhich(v)}
                className="label"
                style={{ minHeight: 44, padding: '0 18px', borderRadius: 999, border: 0, cursor: 'pointer', background: which === v ? 'var(--color-black)' : 'transparent', color: which === v ? '#fff' : 'var(--color-bone)' }}
              >
                {l}
              </button>
            ))}
          </div>
          <Reveal style={{ marginTop: 22 }}>
            <PaymentPlan key={which} currency={which === 'europe' ? 'ZAR' : 'EUR'} />
          </Reveal>
        </div>
      </section>

      {/* ---- how it works ---- */}
      <section aria-labelledby="how" style={{ padding: 'clamp(70px, 10vw, 120px) 0' }}>
        <div className="wrap">
          <SectionHead id="how" eyebrow="How it works" title={<>Four steps to <em>your trip</em></>} />
          <ol style={{ listStyle: 'none', padding: 0, margin: '44px 0 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 18 }}>
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 0.06} style={{ padding: 26, borderRadius: 24, border: '1px solid var(--color-line)' }}>
                <span className="display tabular" style={{ fontSize: 40, color: 'var(--color-em)', lineHeight: 1 }}>
                  {i + 1}
                </span>
                <h3 className="display" style={{ margin: '14px 0 6px', fontSize: 21 }}>
                  {s.t}
                </h3>
                <p style={{ margin: 0, color: 'var(--color-mist)', fontSize: 15.5 }}>{s.b}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal>
            <ul style={{ listStyle: 'none', margin: '36px 0 0', padding: '22px 24px', borderRadius: 18, background: 'var(--color-ink-2)', display: 'grid', gap: 10, color: 'var(--color-mist)', fontSize: 15 }}>
              {[
                'Your plan must be completed before departure, so a twelve-month plan needs a departure at least twelve months away.',
                'The calculator shows equal monthly payments with no interest or fees; your final schedule is confirmed in writing.',
                'International flights, visas and travel insurance are paid separately unless we include them in your quote.',
              ].map((x) => (
                <li key={x} style={{ display: 'flex', gap: 10 }}>
                  <span style={{ color: 'var(--color-gold)', flex: 'none', marginTop: 3 }}>
                    <Check size={16} />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Faq
        id="pay-faq"
        title={<>Payment <em>questions</em></>}
        items={[
          { q: 'Can I pay in instalments for an African safari too?', a: 'Yes. Payments are flexible for every trip. Choose to pay in full or spread the cost over up to twelve months, by EFT or card.' },
          { q: 'Do I pay online through the website?', a: 'No. Once your trip is confirmed we send you an invoice and a payment schedule, and you pay each amount by EFT or card. Every payment is confirmed by our team.' },
          { q: 'How is the monthly amount worked out?', a: 'It is simply the price of your trip divided by the number of months you choose, up to twelve. The calculator above gives you an estimate; your exact schedule is agreed when you book.' },
          { q: 'What if I book less than twelve months before travelling?', a: 'No problem. We shorten the plan so it finishes before you go. For example, booking seven months ahead could mean six monthly payments.' },
          { q: 'Which currency do I pay in?', a: 'African safaris are priced in euros and European adventures in South African rand. If you would like to pay in another currency, ask us and we will confirm the options.' },
        ]}
      />

      <section id="plan" aria-labelledby="plan-h" style={{ padding: '0 0 clamp(60px, 8vw, 100px)', scrollMarginTop: 'calc(var(--header-h) + 16px)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 'clamp(32px, 5vw, 72px)', padding: 'clamp(26px, 5vw, 60px)', borderRadius: 36, border: '1px solid var(--color-line)', background: 'var(--color-ink-2)' }}>
            <div>
              <Eyebrow>Start planning</Eyebrow>
              <h2 id="plan-h" className="display" style={{ margin: '16px 0 0', fontSize: 'clamp(30px, 4vw, 48px)' }}>
                Let’s plan your trip, <em>and your payments.</em>
              </h2>
              <p style={{ margin: '18px 0 0', color: 'var(--color-mist)', fontSize: 17 }}>
                Tell us where you’d like to go and how you’d like to pay. We’ll reply within one working day with a route, an itemised price and a payment schedule.
              </p>
            </div>
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  )
}
