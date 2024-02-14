import { FQuantity } from "./FQuantity";
import { FNumber } from "./FNumber";
import t from "@stdlib/stats/base/dists/t";

export function leastSquare(
  x: FQuantity[],
  y: FQuantity[],
  p: number
): { k: FQuantity; b: FQuantity; r2: number } {
  if (x.length !== y.length) {
    throw new Error("x and y must have the same length");
  }
  const n = x.length;
  let xn = x.map((xi) => xi.number.v);
  let yn = y.map((yi) => yi.number.v);
  let xSum = xn.reduce((a, b) => a + b, 0);
  let ySum = yn.reduce((a, b) => a + b, 0);
  let xySum = xn.reduce((a, b, i) => a + b * yn[i], 0);
  let x2Sum = xn.reduce((a, b) => a + b * b, 0);
  let y2Sum = yn.reduce((a, b) => a + b * b, 0);
  let kn = (n * xySum - xSum * ySum) / (n * x2Sum - xSum * xSum);
  let bn = (ySum - kn * xSum) / n;
  let r2 = Math.pow(
    (n * xySum - xSum * ySum) /
      Math.sqrt((n * x2Sum - xSum * xSum) * (n * y2Sum - ySum * ySum)),
    2
  );
  let ku =
    kn * Math.sqrt((1 / r2 - 1) / (n - 2)) * t.quantile(1 - (1 - p) / 2, n - 2);
  let bu = ku * Math.sqrt(x2Sum / n);
  return {
    k: new FQuantity(new FNumber(kn, ku, p), y[0].unit.div(x[0].unit)),
    b: new FQuantity(new FNumber(bn, bu, p), y[0].unit),
    r2: r2,
  };
}
