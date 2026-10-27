import { SITE, whatsappLink, type OfficeKey } from '../config'

export type SubmitResult = { ok: true; via: 'email' | 'whatsapp' } | { ok: false; error: string }

/*
  One way out for every form on the site. With a Web3Forms key the enquiry is
  emailed to bookings@; without one (or if the request fails) it is handed to
  the nearest office's WhatsApp with the details pre-filled, so a lead is never
  dropped on the floor.

  `internal` fields (the lead score) go in the email only — never into the
  WhatsApp message the visitor sees and sends themselves.
*/
export async function submitEnquiry(
  subject: string,
  fields: Record<string, string>,
  opts: { office?: OfficeKey; internal?: Record<string, string> } = {},
): Promise<SubmitResult> {
  const lines = Object.entries(fields)
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}: ${v}`)

  if (!SITE.web3formsKey) {
    const text = `Hi Flexi, I’d like to enquire about a trip.\n\n${lines.join('\n')}`
    window.open(whatsappLink(text, opts.office), '_blank', 'noopener')
    return { ok: true, via: 'whatsapp' }
  }

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: SITE.web3formsKey,
        subject,
        from_name: SITE.name,
        replyto: fields.Email,
        ...opts.internal,
        ...fields,
      }),
    })
    const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
    if (res.ok && data.success) return { ok: true, via: 'email' }
    return { ok: false, error: data.message || 'We couldn’t send that just now.' }
  } catch {
    return { ok: false, error: 'You appear to be offline. Check your connection, or message us on WhatsApp instead.' }
  }
}
