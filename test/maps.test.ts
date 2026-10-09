// The venue's map links (src/lib/maps.ts, docs/event-browsing.md Q37–Q42).
import { expect, test } from 'bun:test'
import { mapLinks, platformOf } from '../src/lib/maps'

const params = (url: string) => Object.fromEntries(new URL(url).searchParams)
const base = (url: string) => url.slice(0, url.indexOf('?'))
const agents = {
  iphone: 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1',
  wechat: 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.60(0x18003c2f) NetType/WIFI Language/zh_CN',
  ipad: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15',
  android: 'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36',
}

test('Apple devices list Apple Maps; apps open from iOS and Android browsers, not from WeChat', () => {
  expect(platformOf(agents.iphone, 5)).toEqual({ apple: true, apps: 'ios' })
  expect(platformOf(agents.wechat, 5)).toEqual({ apple: true, apps: null })
  expect(platformOf(agents.ipad, 5)).toEqual({ apple: true, apps: 'ios' })
  expect(platformOf(agents.ipad, 0)).toEqual({ apple: false, apps: null })
  expect(platformOf(agents.android, 5)).toEqual({ apple: false, apps: 'android' })
})

test('on an iPhone: Apple Maps shows the address as a place card, the other maps open their apps', () => {
  const links = mapLinks('深圳', 'OIL', ['福田区泰然八路泰然大厦首层 11A'], platformOf(agents.iphone, 5))
  expect(links.map(({ name, app }) => [name, app])).toEqual([['Apple 地图', false], ['高德地图', true], ['百度地图', true], ['腾讯地图', true]])
  const [apple, amap, baidu, tencent] = links.map(link => link.url)
  expect(base(apple)).toBe('https://maps.apple.com/place')
  expect(params(apple)).toEqual({ address: '深圳 福田区泰然八路泰然大厦首层 11A', name: 'OIL' })
  expect(base(amap)).toBe('iosamap://poi')
  expect(params(amap)).toEqual({ sourceApplication: 'cardioravers', name: '深圳 福田区泰然八路泰然大厦首层 11A OIL' })
  expect(base(baidu)).toBe('baidumap://map/place/search')
  expect(params(baidu)).toEqual({ query: '福田区泰然八路泰然大厦首层 11A OIL', region: '深圳', src: 'ios.cardioravers.events' })
  expect(base(tencent)).toBe('qqmap://map/search')
  expect(params(tencent)).toEqual({ keyword: '福田区泰然八路泰然大厦首层 11A OIL', region: '深圳', referer: 'cardioravers' })
  // Spaces are written as %20, not +, which not every map reads as a space.
  expect(amap).not.toContain('+')
})

test('on Android the apps take their Android parameters; a place without an address searches for its name', () => {
  const [amap, baidu] = mapLinks('广州', '陀地士多', [], platformOf(agents.android, 5)).map(link => link.url)
  expect(base(amap)).toBe('androidamap://poi')
  expect(params(amap)).toEqual({ sourceApplication: 'cardioravers', keywords: '广州 陀地士多' })
  expect(params(baidu).src).toBe('andr.cardioravers.events')
  const [search] = mapLinks('广州', '陀地士多', [], platformOf(agents.iphone, 5))
  expect(base(search.url)).toBe('https://maps.apple.com/search')
  expect(params(search.url)).toEqual({ query: '广州 陀地士多' })
})

test('in WeChat the other maps open their web maps', () => {
  const links = mapLinks('香港', 'Ciclo', ['铜锣湾霎东街 15 号 Oliv 4 楼'], platformOf(agents.wechat, 5))
  expect(links.every(link => !link.app)).toBe(true)
  const [, amap, baidu, tencent] = links.map(link => link.url)
  expect(base(amap)).toBe('https://uri.amap.com/search')
  expect(params(amap)).toEqual({ keyword: '铜锣湾霎东街 15 号 Oliv 4 楼 Ciclo', city: '香港', view: 'map', src: 'cardioravers', callnative: '1' })
  expect(base(baidu)).toBe('https://api.map.baidu.com/place/search')
  expect(params(baidu)).toEqual({ query: '铜锣湾霎东街 15 号 Oliv 4 楼 Ciclo', region: '香港', output: 'html', src: 'webapp.cardioravers.events' })
  expect(base(tencent)).toBe('https://apis.map.qq.com/uri/v1/search')
  expect(params(tencent)).toEqual({ keyword: '铜锣湾霎东街 15 号 Oliv 4 楼 Ciclo', region: '香港', referer: 'cardioravers' })
})
