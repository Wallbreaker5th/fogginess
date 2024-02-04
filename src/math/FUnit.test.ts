import { expect, test } from 'vitest'
import { FUnit } from './FUnit'

test('Equality', () => {
  let a = new FUnit(new Map([["m", 1], ["s", -2]]));
  let b = new FUnit(new Map([["s", -2], ["m", 1]]));
  expect(a).toEqual(b);
});

test('Multiplication', () => {
  let a = new FUnit(new Map([["m", 1], ["s", -2]]));
  let b = new FUnit(new Map([["kg", 1], ["s", -1]]));
  let c = new FUnit(new Map([["m", 1], ["kg", 1], ["s", -3]]));
  expect(a.mul(b)).toEqual(c);
});

test('Division', () => {
  let a = new FUnit(new Map([["m", 1], ["s", -2]]));
  let b = new FUnit(new Map([["kg", 1], ["s", -1]]));
  let c = new FUnit(new Map([["m", 1], ["kg", -1], ["s", -1]]));
  expect(a.div(b)).toEqual(c);
});
