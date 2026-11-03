/*
  The legal pages, linked from the footer and the enquiry form. The privacy
  policy is the client's own wording (Nov 2026); the legal notice identifies
  the company; the cookie policy describes what the site actually does, which
  is set no cookies of its own.
*/
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Eyebrow, usePageMeta } from '../components/ui'
import { SITE } from '../config'

const UPDATED = 'November 2026'

function LegalPage({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children: ReactNode }) {
  return (
    <>
      <section style={{ padding: 'clamp(48px, 7vw, 96px) 0 clamp(28px, 4vw, 48px)', background: 'var(--color-ink-2)', borderBottom: '1px solid var(--color-line)' }}>
        <div className="wrap" style={{ maxWidth: 820 }}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="display" style={{ margin: '16px 0 0', fontSize: 'clamp(36px, 5.4vw, 60px)' }}>
            {title}
          </h1>
          <p style={{ margin: '14px 0 0', color: 'var(--color-dim)' }}>Last updated: {UPDATED}</p>
        </div>
      </section>
      <div className="wrap prose" style={{ maxWidth: 820, padding: 'clamp(36px, 5vw, 64px) 20px clamp(70px, 10vw, 120px)' }}>
        {children}
      </div>
    </>
  )
}

const mail = (address: string) => <a href={`mailto:${address}`}>{address}</a>

export function Privacy() {
  usePageMeta('Privacy policy', `How ${SITE.legal.name} handles the personal information you share through this website.`)
  const { legal } = SITE
  return (
    <LegalPage eyebrow="Legal" title={<>Privacy <em>policy</em></>}>
      <h2>1. Who is responsible for your personal data?</h2>
      <p>The company responsible for processing your personal data is:</p>
      <ul>
        <li><strong>Company:</strong> {legal.name}</li>
        <li><strong>Trading name:</strong> {SITE.name}</li>
        <li><strong>NIF/CIF:</strong> {legal.cif}</li>
        <li><strong>Registered address:</strong> {legal.address}</li>
        <li><strong>Travel agency licence:</strong> {legal.licence}</li>
        <li><strong>Email:</strong> {mail(SITE.email)}</li>
      </ul>

      <h2>2. What personal information do we collect?</h2>
      <p>When you contact us through our website, we may collect the following information:</p>
      <ul>
        <li>Full name</li>
        <li>Email address</li>
        <li>Telephone number, if provided</li>
        <li>Travel destination and preferences</li>
        <li>Any additional information you include in your enquiry</li>
      </ul>
      <p>We only collect information that is necessary to respond to your enquiry and provide the services you request.</p>

      <h2>3. How do we use your information?</h2>
      <p>We use your personal information for the following purposes:</p>
      <ul>
        <li>To respond to enquiries submitted through our website.</li>
        <li>To prepare personalised travel quotations and itineraries.</li>
        <li>To communicate with you regarding travel services you have requested.</li>
        <li>To manage potential business relationships and customer requests.</li>
        <li>To comply with applicable legal obligations.</li>
      </ul>
      <p>We do not use information submitted through our contact form to send unsolicited newsletters or marketing communications.</p>

      <h2>4. Legal basis for processing</h2>
      <p>We process your personal data on the following legal grounds:</p>
      <ul>
        <li><strong>Pre-contractual measures:</strong> to respond to enquiries and prepare quotations at your request.</li>
        <li><strong>Legitimate interests:</strong> to manage general communications and respond to business enquiries.</li>
        <li><strong>Legal obligations:</strong> where processing is necessary to comply with applicable Spanish or European legislation.</li>
      </ul>

      <h2>5. Sharing your personal information</h2>
      <p>We do not sell, rent or commercially distribute your personal information.</p>
      <p>Your information may be shared with trusted service providers where necessary to operate our website, manage communications or respond to your travel enquiry.</p>
      <p>If you request a travel quotation or itinerary, relevant information may be shared with hotels, tour operators, transport providers and other travel suppliers where necessary to prepare the requested proposal.</p>

      <h2>6. International transfers</h2>
      <p>As a travel company offering services in different countries, certain service providers or travel suppliers may operate outside the European Economic Area.</p>
      <p>Where personal data is transferred internationally, we will ensure that the transfer complies with applicable GDPR requirements and appropriate safeguards are in place.</p>

      <h2>7. How long do we retain your information?</h2>
      <p>Personal information submitted through our contact form will be retained for as long as necessary to respond to and manage your enquiry.</p>
      <p>Where an enquiry develops into a business or contractual relationship, information may be retained for the periods required by applicable legal and accounting obligations.</p>
      <p>Information that is no longer necessary will be deleted or securely restricted, subject to applicable legal retention requirements.</p>

      <h2>8. Your data protection rights</h2>
      <p>Under the General Data Protection Regulation (GDPR), you have the right to:</p>
      <ul>
        <li>Access your personal information.</li>
        <li>Request correction of inaccurate information.</li>
        <li>Request deletion of your personal information.</li>
        <li>Request restriction of processing.</li>
        <li>Object to certain types of processing.</li>
        <li>Request data portability, where applicable.</li>
        <li>Withdraw consent where processing is based on consent.</li>
      </ul>
      <p>To exercise these rights, please contact us at {mail(SITE.email)}.</p>
      <p>
        You also have the right to lodge a complaint with the Spanish Data Protection Authority (Agencia Española de Protección de Datos, AEPD) at{' '}
        <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>.
      </p>

      <h2>9. Website security</h2>
      <p>We take appropriate technical and organisational measures to protect personal information against unauthorised access, alteration, disclosure or destruction.</p>

      <h2>10. Changes to this privacy policy</h2>
      <p>{legal.name} reserves the right to update this privacy policy to reflect changes in applicable legislation, business operations or website functionality.</p>
      <p>The latest version will always be published on this website.</p>

      <h2>11. Contact</h2>
      <p>For any questions concerning this privacy policy or the processing of your personal information, please contact:</p>
      <p>
        {legal.name}
        <br />
        Email: {mail(SITE.email)}
        <br />
        Website: <Link to="/">www.{SITE.domain}</Link>
      </p>
      <p>
        See also our <Link to="/legal-notice">legal notice</Link> and <Link to="/cookie-policy">cookie policy</Link>.
      </p>
    </LegalPage>
  )
}

export function LegalNotice() {
  usePageMeta('Legal notice', `Who runs ${SITE.domain}: ${SITE.legal.name}, a registered travel agency in Madrid.`)
  const { legal } = SITE
  const madrid = SITE.offices.find((o) => o.key === 'madrid')!
  return (
    <LegalPage eyebrow="Legal" title={<>Legal <em>notice</em></>}>
      <h2>Website owner</h2>
      <p>This website is owned and run by:</p>
      <ul>
        <li><strong>Company:</strong> {legal.name}</li>
        <li><strong>Trading name:</strong> {SITE.name}</li>
        <li><strong>NIF/CIF:</strong> {legal.cif}</li>
        <li><strong>Registered address:</strong> {legal.address}</li>
        <li><strong>Travel agency licence:</strong> {legal.licence}</li>
        <li><strong>Registered in:</strong> {legal.registry}</li>
        <li><strong>Email:</strong> {mail(SITE.email)}</li>
        <li><strong>Telephone:</strong> {madrid.phone}</li>
      </ul>

      <h2>Purpose of this website</h2>
      <p>
        This website describes the African safaris and European tours we offer and lets you send us an enquiry. Nothing is booked or paid for through the website.
      </p>

      <h2>Prices and bookings</h2>
      <p>
        Prices shown on this website are indicative, per person, and confirmed on quotation. International flights are not included unless stated. The terms and conditions of each booking are provided with your quotation and invoice.
      </p>

      <h2>Content and images</h2>
      <p>
        The text, photographs, logo and design of this website belong to {legal.name} or are used with permission. Please do not copy or reuse them without our written consent.
      </p>

      <h2>Links to other websites</h2>
      <p>
        This website links to other services, such as WhatsApp, Facebook and Instagram. We are not responsible for their content or how they handle your information.
      </p>

      <h2>Applicable law</h2>
      <p>This legal notice is governed by Spanish law.</p>
      <p>
        See also our <Link to="/privacy-policy">privacy policy</Link> and <Link to="/cookie-policy">cookie policy</Link>.
      </p>
    </LegalPage>
  )
}

export function Cookies() {
  usePageMeta('Cookie policy', `Which cookies ${SITE.domain} uses: none of its own, and no tracking or advertising cookies.`)
  return (
    <LegalPage eyebrow="Legal" title={<>Cookie <em>policy</em></>}>
      <h2>Does this website use cookies?</h2>
      <p>
        No. This website does not place cookies of its own on your device. We do not use analytics, advertising or tracking cookies, which is why you are not shown a cookie banner.
      </p>

      <h2>Content from other services</h2>
      <p>To work properly, some parts of the website load content from other services. When they do, those services receive basic technical information, such as your IP address and browser type, so they can deliver the content:</p>
      <ul>
        <li><strong>Google Fonts</strong>, for the typefaces used on the site.</li>
        <li><strong>Soro</strong>, which publishes the articles on our blog.</li>
        <li><strong>Web3Forms</strong>, which emails us the details you send through our enquiry forms.</li>
      </ul>
      <p>
        Links to WhatsApp, Facebook and Instagram take you to those services, which have their own cookie and privacy policies.
      </p>

      <h2>Links from our adverts</h2>
      <p>
        If you reach us from one of our adverts, the web address may include a short label naming that advert. If you then send an enquiry, the label is included with it so we know which advert you saw. Nothing is stored on your device.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we start using cookies in future, for example to measure our adverts, we will update this page and ask for your consent before any non-essential cookies are used.
      </p>
      <p>
        For more about how we handle your personal information, see our <Link to="/privacy-policy">privacy policy</Link>, or email {mail(SITE.email)}.
      </p>
    </LegalPage>
  )
}
