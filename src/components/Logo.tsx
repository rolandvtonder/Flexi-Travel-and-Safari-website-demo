import { asset } from '../data/tours'

/*
  The client's logo: the acacia and two elephants with FLEXI TRAVEL & SAFARI.
  public/assets/brand/logo.png is the supplied artwork with its white
  background keyed out, so it sits cleanly on white and on the warm surfaces.
  Its black lettering needs a light background — it is never placed on
  photography.
*/
const RATIO = 1118 / 356

export function Logo({ height = 48 }: { height?: number }) {
  return (
    <img
      src={asset('assets/brand/logo.png')}
      alt="Flexi Travel & Safari"
      width={Math.round(height * RATIO)}
      height={height}
      style={{ display: 'block', height, width: 'auto' }}
    />
  )
}

/** The acacia on its own, for tight spots such as the pinned menu bar. */
export function Mark({ size = 32 }: { size?: number }) {
  return (
    <img
      src={asset('favicon.png')}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      style={{ display: 'block', width: size, height: size }}
    />
  )
}
