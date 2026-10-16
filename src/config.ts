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
    role: 'African safaris for Europe & America',
    address: ['Calle Puerto de Somosierra 11', 'Majadahonda, Madrid', 'Spain'],
    whatsapp: '34678704368',
    phone: '+34 678 704 368',
  },
  {
    key: 'capetown',
    city: 'Cape Town',
    country: 'South Africa',
    role: 'European adventures for Southern Africa',
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
  Safari travellers are in Europe and America, so Madrid answers them;
  European-adventure travellers are in Southern Africa, so Cape Town does.
*/
export const officeFor = (region?: 'africa' | 'europe') => office(region === 'europe' ? 'capetown' : 'madrid')

export function whatsappLink(message: string, to: OfficeKey | 'africa' | 'europe' = 'madrid') {
  const o = to === 'africa' || to === 'europe' ? officeFor(to) : office(to)
  return `https://wa.me/${o.whatsapp}?text=${encodeURIComponent(message)}`
}
