import { expect, test } from "vitest";
import { FUnit } from "./FUnit";
import { FQuantity } from "./FQuantity";
import { FNumber } from "./FNumber";
import { leastSquare } from "./LeastSquare";

test("LeastSquare", () => {
  let x = [1, 2, 4, 5].map(
    (v) => new FQuantity(v, new FUnit(new Map([["m", 1]])))
  );
  let y = [1, 3, 3, 5].map(
    (v) => new FQuantity(v, new FUnit(new Map([["kg", 1]])))
  );
  let { k, b, r2 } = leastSquare(x, y, 0.95);
  let k0 = new FNumber(0.8, 1.216, 0.95);
  let b0 = new FNumber(0.6, 4.124, 0.95);
  let r20 = 0.8;

  console.log(k.toString());
  console.log(b.toString());
  console.log(r2);

  expect(r2).toBeCloseTo(r20, 2);

  expect(k.number.v).toBeCloseTo(k0.v, 2);
  expect(k.number.u).toBeCloseTo(k0.u, 2);
  expect(k.number.p).toBeCloseTo(k0.p, 2);
  expect(k.unit).toEqual(
    new FUnit(
      new Map([
        ["kg", 1],
        ["m", -1],
      ])
    )
  );

  expect(b.number.v).toBeCloseTo(b0.v, 2);
  expect(b.number.u).toBeCloseTo(b0.u, 2);
  expect(b.number.p).toBeCloseTo(b0.p, 2);
  expect(b.unit).toEqual(new FUnit(new Map([["kg", 1]])));
});
