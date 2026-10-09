// The maps a venue opens in from the event sheet on touch screens (docs/event-browsing.md Q37–Q42), finding the place by
// text rather than coordinates (Q38) — its address and name within its city, or its name alone where no address is
// known. Apple Maps is listed only on Apple's phones and tablets, where its web link opens the Maps app. Amap, Baidu and
// Tencent open their apps through their own URL schemes from iOS and Android browsers (their web links stay on the web,
// F73); in WeChat, which does not let a page open other apps, they open their web maps.
export type MapLink = { name: string; url: string; app: boolean }
export type Platform = { apple: boolean; apps: 'ios' | 'android' | null }

const link = (base: string, params: Record<string, string>) =>
  `${base}?${Object.entries(params).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&')}`

// iPhones and iPads (an iPad asking for desktop sites calls itself a Mac but has touch points); apps open from iOS and
// Android browsers other than WeChat's.
export function platformOf(agent: string, touchPoints: number): Platform {
  const apple = /\b(iPhone|iPad|iPod)\b/.test(agent) || (/\bMacintosh\b/.test(agent) && touchPoints > 1)
  const apps = /\bMicroMessenger\//.test(agent) ? null : apple ? 'ios' : /\bAndroid\b/.test(agent) ? 'android' : null
  return { apple, apps }
}

export function mapLinks(city: string, place: string, address: string[], { apple, apps }: Platform): MapLink[] {
  const keyword = [...address, place].join(' ')
  const links: MapLink[] = apps ? [
    // Amap's scheme has no city, so the city leads the text; iOS calls the text name, Android keywords (F76).
    { name: '高德地图', url: link(`${apps === 'ios' ? 'iosamap' : 'androidamap'}://poi`, { sourceApplication: 'cardioravers', [apps === 'ios' ? 'name' : 'keywords']: `${city} ${keyword}` }), app: true },
    { name: '百度地图', url: link('baidumap://map/place/search', { query: keyword, region: city, src: `${apps === 'ios' ? 'ios' : 'andr'}.cardioravers.events` }), app: true },
    { name: '腾讯地图', url: link('qqmap://map/search', { keyword, region: city, referer: 'cardioravers' }), app: true },
  ] : [
    // callnative=1 has Amap's web map try its app; Baidu wants output=html and src as webapp.<company>.<app> (F62, F64).
    { name: '高德地图', url: link('https://uri.amap.com/search', { keyword, city, view: 'map', src: 'cardioravers', callnative: '1' }), app: false },
    { name: '百度地图', url: link('https://api.map.baidu.com/place/search', { query: keyword, region: city, output: 'html', src: 'webapp.cardioravers.events' }), app: false },
    { name: '腾讯地图', url: link('https://apis.map.qq.com/uri/v1/search', { keyword, region: city, referer: 'cardioravers' }), app: false },
  ]
  if (!apple) return links
  // Apple's unified Maps URLs (iOS 18.4 on, F63): an address shows as a place card under the venue's name.
  const url = address.length
    ? link('https://maps.apple.com/place', { address: [city, ...address].join(' '), name: place })
    : link('https://maps.apple.com/search', { query: `${city} ${place}` })
  return [{ name: 'Apple 地图', url, app: false }, ...links]
}
