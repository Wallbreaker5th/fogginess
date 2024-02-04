import { expect, test } from "vitest";
import { FNumber } from "./FNumber";
import { math } from "./math.ts";

test("Constant", () => {
  const a = FNumber.constant(3);
  expect(a.v).toEqual(3);
  expect(a.u).toEqual(0);
  expect(a.p).toEqual(1);

  const b = new FNumber(3, 0, 1);
  expect(a).toEqual(b);
});

test("Confidence probability in eval", () => {
  const a = FNumber.constant(3);
  const b = new FNumber(4, 1, 0.95);
  const c = new FNumber(5, 2, 0.95);
  const d = new FNumber(6, 3, 0.99);
  const vars: Map<string, FNumber> = new Map([
    ["a", a],
    ["b", b],
    ["c", c],
    ["d", d],
  ]);

  const expr1 = math.parse("a+b"); // p=0.95
  const expr2 = math.parse("a+2*b+c"); // p=0.95
  const expr3 = math.parse("a+b+c+d"); // throws Error
  const expr4 = math.parse("a+b*c-pow(a,b)"); // p=0.95
  const expr5 = math.parse("a+exp(d)+(a+d)"); // p=0.99

  // Check:
  // - confidence probability is right
  // - throws Error
  expect(FNumber.eval(expr1, vars).p).toEqual(0.95);
  expect(FNumber.eval(expr2, vars).p).toEqual(0.95);
  expect(() => FNumber.eval(expr3, vars)).toThrow();
  expect(FNumber.eval(expr4, vars).p).toEqual(0.95);
  expect(FNumber.eval(expr5, vars).p).toEqual(0.99);
});

test("Eval", () => {
  const eps = 1e-6;

  const a = FNumber.constant(3);
  const b = new FNumber(4, 1, 0.95);
  const c = new FNumber(5, 2, 0.95);
  const vars: Map<string, FNumber> = new Map([
    ["a", a],
    ["b", b],
    ["c", c],
  ]);

  expect(
    FNumber.eval(math.parse("a+b"), vars).equals(new FNumber(7, 1, 0.95), eps)
  ).toBeTruthy();
  expect(
    FNumber.eval(math.parse("a-b"), vars).equals(new FNumber(-1, 1, 0.95), eps)
  ).toBeTruthy();
  expect(
    FNumber.eval(math.parse("a*b"), vars).equals(new FNumber(12, 3, 0.95), eps)
  ).toBeTruthy();
  expect(
    FNumber.eval(math.parse("b+c"), vars).equals(
      new FNumber(9, Math.sqrt(5), 0.95),
      eps
    )
  ).toBeTruthy();
  expect(
    FNumber.eval(math.parse("(b*c)/2"), vars).equals(
      new FNumber(20 / 2, (Math.sqrt(1 / 16 + 4 / 25) * 20) / 2, 0.95),
      eps
    )
  ).toBeTruthy();
});
