/*
  Site-wide settings. Contact details, offices and the form service all live
  here, so a change of number or address never means touching a component.
*/

export type OfficeKey = 'madrid' | 'capetown'

export interface Office {
  key: OfficeKey
  city: string
  country: string
  /** Which travellers this office looks after. */
  role: string
  address: string[]
  /** International format, digits only — what wa.me needs. */
  whatsapp: string
  /** How the number is shown to people. */
  phone: string
}

const OFFICES: Office[] = [
  {
    key: 'madrid',
    city: 'Madrid',
    country: 'Spain',
    role: 'All enquiries — safaris & European adventures',
    address: ['Calle Puerto de Somosierra 11', 'Majadahonda, Madrid', 'Spain'],
    whatsapp: '34678704368',
    phone: '+34 678 704 368',
  },
  {
    key: 'capetown',
    city: 'Cape Town',
    country: 'South Africa',
    role: 'All enquiries — safaris & European adventures',
    address: ['Unit C6, The Exchange', '1 School Street, Milnerton', 'Cape Town, South Africa'],
    whatsapp: '27732502549',
    phone: '+27 73 250 2549',
  },
]

export const SITE = {
  name: 'Flexi Travel & Safari',
  domain: 'flexitravelandsafari.com',
  tagline: 'Rooted in Africa. Inspired by the world.',
  email: 'bookings@flexitravelandsafari.com',

  /*
    TODO(client): free access key from https://web3forms.com, created with
    bookings@flexitravelandsafari.com — every enquiry is then emailed there.
    Until it is set, forms hand the enquiry to the right office's WhatsApp,
    pre-filled, so no lead is ever lost.
  */
  web3formsKey: '',

  offices: OFFICES,
} as const

export const office = (key: OfficeKey) => OFFICES.find((o) => o.key === key)!

/*
  Both offices take all enquiries (client, Oct 2026). Where the site has to
  pick one — an enquiry handed to WhatsApp — it uses the office nearest the
  traveller: Cape Town for Southern Africa, Madrid for everyone else.
*/
const SOUTHERN_AFRICA = ['South Africa', 'Botswana', 'Namibia', 'Zimbabwe']
export const nearestOffice = (residence?: string) => office(residence && SOUTHERN_AFRICA.includes(residence) ? 'capetown' : 'madrid')

export function whatsappLink(message: string, to: OfficeKey = 'madrid') {
  return `https://wa.me/${office(to).whatsapp}?text=${encodeURIComponent(message)}`
}
