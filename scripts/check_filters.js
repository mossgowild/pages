// Run with: node scripts/check_filters.js
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(root, 'assets/filters.js'), 'utf8'), context);
const data = JSON.parse(fs.readFileSync(path.join(root, 'data/events.json'), 'utf8'));
const events = data.events.map(event => ({ ...event,
  families: Object.entries(data.genre_families)
    .filter(([, genres]) => genres.some(genre => event.genres.includes(genre))).map(([name]) => name)
}));
const filter = values => events.filter(event => context.matchesEvent(event, values));
assert.equal(filter({}).length, events.length);
assert.equal(filter({ from: '2026-09-30', to: '2026-09-30' }).length, 8);
assert.equal(filter({ city: '香港', from: '2026-10-02', to: '2026-10-02', genre: 'genre:Hard Techno' }).length, 1);
assert.equal(filter({ city: '澳门', venue: '深圳|PLAY X' }).length, 0);
assert.equal(filter({ venue: '深圳|PLAY X' }).length, 7);
assert.deepEqual(filter({ from: '2026-10-07' }).map(event => event.id), []);
assert.equal(context.validRange({ from: '2026-10-04', to: '2026-10-01' }), false);
assert.equal(filter({ from: '2026-10-04', to: '2026-10-01' }).length, 0);
const verknipt = filter({ city: '香港', from: '2026-10-02', to: '2026-10-02', genre: 'genre:Hard Techno' })[0];
assert(context.matchesEvent(verknipt, { genre: 'family:Techno' }));
assert(!context.matchesEvent(verknipt, { genre: 'genre:Techno' }));
const psytrance = events.find(event => event.genres.includes('Psytrance'));
assert(context.matchesEvent(psytrance, { genre: 'family:Psytrance' }));
for (const [genre, family, excluded] of [
  ['Schranz', 'Techno', 'Hard Dance / Hardcore'],
  ['Hardstyle', 'Hard Dance / Hardcore', 'Techno'],
  ['Jungle', 'Drum & Bass / Jungle', 'Dubstep'],
  ['Forest Psytrance', 'Psytrance', 'Trance'],
  ['Afrobeats', 'Afrobeats', 'House'],
  ['Afro House', 'House', 'Afrobeats'],
  ['Gqom', 'Bass / Club', 'House'],
  ['UK Garage', 'UK Garage / Bassline', 'House'],
  ['TBA', null, 'Open Format / Multi-Genre']
]) {
  const sample = { genres: [genre], families: Object.entries(data.genre_families)
    .filter(([, members]) => members.includes(genre)).map(([name]) => name) };
  if (family) assert(context.matchesEvent(sample, { genre: `family:${family}` }), genre);
  assert(!context.matchesEvent(sample, { genre: `family:${excluded}` }), genre);
}
assert(!events.some(event => event.genres.includes('Live')), 'Live is a performance format');
const gxp = events.find(event => event.starts.includes(1020) && event.starts.includes(1320));
assert(gxp, 'Multi-session event must retain both start times');
assert(context.matchesEvent(gxp, { period: 'day' }));
assert(context.matchesEvent(gxp, { period: 'night' }));
const partial = filter({ venue: '深圳|PLAY X', from: '2026-10-06', to: '2026-10-06' })[0];
assert(context.matchesEvent(partial, { period: 'unknown' }));
assert(context.matchesEvent(partial, { period: 'night' }));
const unknown = filter({ venue: '深圳|PLAY X', to: '2026-09-30' })[0];
assert(context.matchesEvent(unknown, { period: 'unknown' }));
assert(!context.matchesEvent(unknown, { period: 'night' }));
assert(context.matchesEvent(verknipt, { from: '2026-10-02', to: '2026-10-02', period: 'day' }));
assert(!context.matchesEvent(verknipt, { from: '2026-10-03' }));
console.log(`OK: filters checked against ${events.length} actual events (combined facets, dates, genres, multi-session and unknown times)`);
