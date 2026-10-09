import { expect, test } from 'bun:test'
import data from '../data/events.json'
import { guideDays, validate } from '../src/lib/guide.server'

test('the data keeps every rule', () => validate())

// A few broken copies, so the rules are known to bite.
const broken = (change: (copy: typeof data) => void) => {
  const copy = structuredClone(data)
  change(copy)
  return () => validate(copy)
}

test('placeholders, unassigned genres and duplicate IDs fail', () => {
  expect(broken(copy => { copy.events[0].time = ['未知'] })).toThrow('placeholder')
  expect(broken(copy => { (copy.events[0].genres as string[]).push('Unheard Of') })).toThrow('Assign every known genre')
  expect(broken(copy => { copy.events[1].id = copy.events[0].id })).toThrow('Duplicate event IDs')
  expect(broken(copy => { copy.events[0].starts = [1440] })).toThrow('start minutes out of range')
})

// The days run from the earliest event to the latest, empty days included (docs/guide-identity.md Q2).
test('the days follow the events', () => {
  const dates = data.events.map(event => event.date)
  expect(guideDays(dates)).toEqual(['2026-09-30', '2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04', '2026-10-05', '2026-10-06'])
  const later = guideDays([...dates, '2026-10-09'])
  expect([later[0], later.at(-1), later.length]).toEqual(['2026-09-30', '2026-10-09', 10])
})
