import type { Place } from './photos'
import { PHOTOS } from './photos'

/*
  Travel guides. Each guide is one JSON file in src/content/guides/ — the site
  picks up every file in that folder at build time, newest first. Publishing a
  new guide (by hand, or by the planned daily automation) is just adding a
  file and pushing; no code changes.

  Body blocks:  { "h": "Heading" }  { "p": "Paragraph" }  { "ul": ["item", …] }
  Hero:         { "photo": "<client photo key>" } or { "image": "<stock image name>" }
  Gallery:      { "places": ["cpt", …] } and/or { "keys": ["photo-key", …] }
*/

export type Block = { h: string } | { p: string } | { ul: string[] }

export interface Guide {
  slug: string
  title: string
  region: 'africa' | 'europe'
  /** ISO date, e.g. 2026-10-23 — guides are listed newest first. */
  date: string
  excerpt: string
  hero: { photo?: string; image?: string }
  body: Block[]
  gallery?: { places?: Place[]; keys?: string[] }
  /** Tour slugs to recommend at the end. */
  tours?: string[]
}

const files = import.meta.glob<{ default: Guide }>('../content/guides/*.json', { eager: true })

export const GUIDES: Guide[] = Object.values(files)
  .map((m) => m.default)
  .sort((a, b) => b.date.localeCompare(a.date))

export const guideBySlug = (slug: string | undefined) => GUIDES.find((g) => g.slug === slug)

/** Every photo key for a guide's gallery, in manifest order, without repeats. */
export function galleryKeys(g: Guide) {
  const places = new Set(g.gallery?.places ?? [])
  const keys = [...(g.gallery?.keys ?? []), ...PHOTOS.filter((p) => places.has(p.place)).map((p) => p.key)]
  return [...new Set(keys)]
}

export function readMinutes(g: Guide) {
  const words = g.body.map((b) => ('h' in b ? b.h : 'p' in b ? b.p : b.ul.join(' '))).join(' ').split(/\s+/).length
  return Math.max(2, Math.round(words / 220))
}

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
