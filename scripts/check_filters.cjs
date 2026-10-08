// Run with: node scripts/check_filters.cjs
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(root, 'public/assets/filters.js'), 'utf8'), context);
const data = JSON.parse(fs.readFileSync(path.join(root, 'data/events.json'), 'utf8'));
const events = data.events.map(event => ({ ...event,
  families: Object.entries(data.genre_families)
    .filter(([, genres]) => genres.some(genre => event.genres.includes(genre))).map(([name]) => name)
}));
const filter = values => events.filter(event => context.matchesEvent(event, values));
assert.equal(filter({}).length, events.length);
assert.equal(filter({ from: '2026-09-30', to: '2026-09-30' }).length, 8);
assert.equal(filter({ city: ['香港'], from: '2026-10-02', to: '2026-10-02', genres: ['Hard Techno'] }).length, 1);
assert.equal(filter({ city: ['澳门'], venue: ['深圳|PLAY X'] }).length, 0);
assert.equal(filter({ venue: ['深圳|PLAY X'] }).length, 7);
assert.deepEqual(filter({ from: '2026-10-07' }).map(event => event.id), []);
assert.equal(context.validRange({ from: '2026-10-04', to: '2026-10-01' }), false);
assert.equal(filter({ from: '2026-10-04', to: '2026-10-01' }).length, 0);
const verknipt = filter({ city: ['香港'], from: '2026-10-02', to: '2026-10-02', genres: ['Hard Techno'] })[0];
assert(context.matchesEvent(verknipt, { families: ['Techno'] }));
assert(!context.matchesEvent(verknipt, { genres: ['Techno'] }));
const psytrance = events.find(event => event.genres.includes('Psytrance'));
assert(context.matchesEvent(psytrance, { families: ['Trance'] }));
for (const [genre, family, excluded] of [
  ['Schranz', 'Techno', 'Hard Dance'],
  ['Hardstyle', 'Hard Dance', 'Techno'],
  ['Jungle', 'Bass', 'Techno'],
  ['Forest Psytrance', 'Trance', 'Techno'],
  ['Afrobeats', 'Open Format', 'House'],
  ['Afro House', 'House', 'Open Format'],
  ['Gqom', 'Bass', 'House'],
  ['UK Garage', 'Bass', 'House'],
  ['Psychedelic', null, 'Trance'],
  ['Hypnotic', null, 'Techno']
]) {
  const sample = { genres: [genre], families: Object.entries(data.genre_families)
    .filter(([, members]) => members.includes(genre)).map(([name]) => name) };
  if (family) assert(context.matchesEvent(sample, { families: [family] }), genre);
  assert(!context.matchesEvent(sample, { families: [excluded] }), genre);
}
// Multi-select: any value within a facet, every facet with values.
const count = values => filter(values).length;
const byCity = city => events.filter(event => event.city === city).length;
assert.equal(count({ city: ['广州', '深圳'] }), byCity('广州') + byCity('深圳'));
const techno = events.filter(event => event.families.includes('Techno'));
assert.equal(count({ city: ['广州', '深圳'], families: ['Techno'] }),
  techno.filter(event => ['广州', '深圳'].includes(event.city)).length);
assert.equal(count({ families: ['Techno', 'House'] }),
  events.filter(event => event.families.includes('Techno') || event.families.includes('House')).length);
assert.equal(count({ families: ['Techno'], genres: ['Trap'] }),
  events.filter(event => event.families.includes('Techno') || event.genres.includes('Trap')).length);
assert.equal(count({ period: ['day', 'night'] }), events.filter(event => event.starts.length).length,
  'Events with an unknown start match no period');
assert.equal(count({ venue: ['深圳|PLAY X', '深圳|OIL'] }), count({ venue: ['深圳|PLAY X'] }) + count({ venue: ['深圳|OIL'] }));
assert.equal(count({ city: [], families: [], genres: [], period: [], venue: [] }), events.length);
assert(!events.some(event => event.genres.includes('Live')), 'Live is a performance format');
const gxp = events.find(event => event.starts.includes(1020) && event.starts.includes(1320));
assert(gxp, 'Multi-session event must retain both start times');
assert(context.matchesEvent(gxp, { period: ['day'] }));
assert(context.matchesEvent(gxp, { period: ['night'] }));
const partial = filter({ venue: ['深圳|PLAY X'], from: '2026-10-06', to: '2026-10-06' })[0];
assert(context.matchesEvent(partial, { period: ['night'] }));
const unknown = filter({ venue: ['深圳|PLAY X'], to: '2026-09-30' })[0];
assert(!unknown.starts.length && !context.matchesEvent(unknown, { period: ['night'] }) && !context.matchesEvent(unknown, { period: ['day'] }));
assert(!events.some(event => !event.venues.length && context.matchesEvent(event, { venue: [`${event.city}|`] })), 'An unknown venue is not a venue');
assert(context.matchesEvent(verknipt, { from: '2026-10-02', to: '2026-10-02', period: ['day'] }));
assert(!context.matchesEvent(verknipt, { from: '2026-10-03' }));
console.log(`OK: filters checked against ${events.length} actual events (multi-select facets, combined facets, dates, genres, multi-session times; unknowns are not filters)`);
