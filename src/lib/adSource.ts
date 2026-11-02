/*
  Which ad brought this visitor. Ad links carry utm_ tags, so we read them on
  arrival, before the visitor moves to another page, and submit.ts adds them
  to the enquiry email. Nothing is stored, so no cookie banner is needed.
*/
const params = new URLSearchParams(window.location.search)

export const AD_SOURCE = ['utm_source', 'utm_campaign', 'utm_content']
  .map((key) => (params.get(key) ?? '').trim().slice(0, 80))
  .filter(Boolean)
  .join(' / ')
