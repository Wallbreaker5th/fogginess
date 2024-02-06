import { expect, test } from "vitest";
import { FNumber } from "./FNumber";
import { FUnit } from "./FUnit";
import { FQuantity } from "./FQuantity.ts";
import { math } from "./math.ts";

test("Equality", () => {
  const a = new FQuantity(3, new FUnit(new Map([["m", 1]])));
  const b = new FQuantity(new FNumber(3, 0, 1), new FUnit(new Map([["m", 1]])));
  const c = new FQuantity(3, new FUnit(new Map([["s", 1]])));

  expect(a).toEqual(b);
  expect(a).not.toEqual(c);
});

test("Eval with constants", () => {
  const a = new FQuantity(3, new FUnit(new Map([["m", 1]])));
  const b = new FQuantity(4, new FUnit(new Map([["m", 1]])));
  const c = new FQuantity(
    5,
    new FUnit(
      new Map([
        ["m", 1],
        ["s", -1],
      ])
    )
  );
  const d = new FQuantity(6, new FUnit(new Map([["s", 1]])));

  const vars: Map<string, FQuantity> = new Map([
    ["a", a],
    ["b", b],
    ["c", c],
    ["d", d],
  ]);

  expect(FQuantity.eval(math.parse("a+b"), vars)).toEqual(
    new FQuantity(7, new FUnit(new Map([["m", 1]])))
  );
  expect(FQuantity.eval(math.parse("a*c"), vars)).toEqual(
    new FQuantity(
      15,
      new FUnit(
        new Map([
          ["m", 2],
          ["s", -1],
        ])
      )
    )
  );
  expect(FQuantity.eval(math.parse("c * d + a"), vars)).toEqual(
    new FQuantity(33, new FUnit(new Map([["m", 1]])))
  );
  expect(FQuantity.eval(math.parse("a^2/b+a"), vars)).toEqual(
    new FQuantity(9 / 4 + 3, new FUnit(new Map([["m", 1]])))
  );
  expect(FQuantity.eval(math.parse("sqrt(a^2+b^2)+pow(a,2-1)"), vars)).toEqual(
    new FQuantity(8, new FUnit(new Map([["m", 1]])))
  );

  expect(() => FQuantity.eval(math.parse("a+d"), vars)).toThrow();
  expect(() => FQuantity.eval(math.parse("a^d"), vars)).toThrow();
});
