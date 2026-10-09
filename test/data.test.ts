import { expect, test } from 'bun:test'
import data from '../data/events.json'
import { validate } from '../src/lib/guide.server'

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
