#!/usr/bin/env node
// Tell IndexNow engines (Bing, which ChatGPT search reads, plus Yandex, Seznam,
// Naver) that this site's pages changed. Run it after every production deploy:
//
//   node scripts/indexnow.mjs            submit every URL in the live sitemap
//   node scripts/indexnow.mjs /pricing   submit only these paths or URLs
//   node scripts/indexnow.mjs --dry      print what would be sent
//
// The key is public by design: it is served at /<key>.txt (public/<key>.txt)
// and IndexNow fetches it to confirm the request comes from the site owner.
// Nothing is sent unless the live key file answers with the key.

const HOST = 'react-hooks.danixsoft.com'
const KEY = 'f7d3e2ff555bb6f473276d46e7916a5a'
const ORIGIN = `https://${HOST}`
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`

const args = process.argv.slice(2)
const dry = args.includes('--dry')
const explicit = args.filter((a) => !a.startsWith('--'))

async function sitemapUrls(url, seen = new Set()) {
  if (seen.has(url)) return []
  seen.add(url)
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) })
  if (!res.ok) throw new Error(`${url} answered ${res.status}`)
  const xml = await res.text()
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&'))
  // A sitemap index lists more sitemaps; follow them.
  if (/<sitemapindex/i.test(xml)) {
    const nested = await Promise.all(locs.map((l) => sitemapUrls(l, seen)))
    return nested.flat()
  }
  return locs
}

const toUrl = (p) => (p.startsWith('http') ? p : `${ORIGIN}${p.startsWith('/') ? '' : '/'}${p}`)

const urls = [...new Set(explicit.length ? explicit.map(toUrl) : await sitemapUrls(`${ORIGIN}/sitemap.xml`))]
  .filter((u) => new URL(u).host === HOST)

if (!urls.length) {
  console.error('indexnow: no URLs to submit')
  process.exit(1)
}

const keyRes = await fetch(KEY_LOCATION, { signal: AbortSignal.timeout(20000) })
const served = keyRes.ok ? (await keyRes.text()).trim() : ''
if (served !== KEY) {
  console.error(`indexnow: ${KEY_LOCATION} does not serve the key (status ${keyRes.status}); not sending`)
  process.exit(1)
}

if (dry) {
  console.log(`indexnow: would submit ${urls.length} URLs for ${HOST}`)
  for (const u of urls) console.log(`  ${u}`)
  process.exit(0)
}

// IndexNow accepts up to 10,000 URLs per request.
for (let i = 0; i < urls.length; i += 10000) {
  const urlList = urls.slice(i, i + 10000)
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
    signal: AbortSignal.timeout(30000),
  })
  // 200 = accepted, 202 = accepted, key validation pending.
  console.log(`indexnow: ${HOST} ${urlList.length} URLs -> ${res.status} ${res.statusText}`)
  if (res.status !== 200 && res.status !== 202) process.exit(1)
}
