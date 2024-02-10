import { expect, test } from "vitest";
import { DistributionType, calculateKp, getUA, FMeasurer } from "./FMeasurer";
import { FQuantity } from "./FQuantity";
import { FNumber } from "./FNumber";
import { FUnit } from "./FUnit";

test("calculateKp", () => {
  expect(calculateKp(0.95, DistributionType.Normal)).toBeCloseTo(1.96, 2);
  expect(calculateKp(0.95, DistributionType.Uniform)).toBeCloseTo(1.645, 2);
  expect(calculateKp(0.95, DistributionType.Triangular)).toBeCloseTo(1.901, 2);
});

const data = [
  12.337, 12.349, 12.333, 12.353, 12.339, 12.352, 12.345, 12.348, 12.356, 12.34,
];

test("getUA", () => {
  expect(getUA(data, 0.95)).toBeCloseTo((0.008 / Math.sqrt(10)) * 2.26, 2);
});

const measurer = new FMeasurer(
  new FQuantity(0.001, new FUnit(new Map([["m", 1]]))),
  0.004,
  0,
  DistributionType.Normal,
  true
);

test("getUB", () => {
  expect(measurer.getUB(0.95)).toBeCloseTo((0.004 / Math.sqrt(3)) * 1.96, 2);
});

test("Measurer", () => {
  const res = measurer.measure(data, 0.95);
  const expected = new FQuantity(new FNumber(12.345, 0.007, 0.95)).mul(
    new FQuantity(0.001, new FUnit(new Map([["m", 1]])))
  );
  console.log(res, expected);
  expect(res.equals(expected)).toBe(true);
});
