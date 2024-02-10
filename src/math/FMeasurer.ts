import { FQuantity } from "./FQuantity";
import normal from "@stdlib/stats/base/dists/normal";
import t from "@stdlib/stats/base/dists/t";
import mean from "@stdlib/stats/base/mean";
import stdev from "@stdlib/stats/base/stdev";
import { FNumber } from "./FNumber";

/**
 * A enum class for the distribution type
 */
export enum DistributionType {
  Normal = "Normal",
  Uniform = "Uniform",
  Triangular = "Triangular",
}

/**
 * Calculate k_p for the given confidence level and distribution type
 */
export function calculateKp(
  confidenceLevel: number,
  distributionType: DistributionType
): number {
  switch (distributionType) {
    case DistributionType.Normal:
      return normal.quantile(1 - (1 - confidenceLevel) / 2, 0, 1);
    case DistributionType.Uniform:
      return Math.sqrt(3) * confidenceLevel;
    case DistributionType.Triangular:
      return Math.sqrt(6) * (1 - Math.sqrt(1 - confidenceLevel));
    default:
      return NaN;
  }
}

/**
 * Get u_A of the given list of numbers
 */
export function getUA(data: number[], p: number): number {
  const n = data.length;
  const std = stdev(n, 1, data, 1);
  return (std / Math.sqrt(n)) * t.quantile(1 - (1 - p) / 2, n - 1);
}

const C = new Map([
  [DistributionType.Normal, 3],
  [DistributionType.Uniform, Math.sqrt(3)],
  [DistributionType.Triangular, Math.sqrt(6)],
]);

export class FMeasurer {
  unit: FQuantity = new FQuantity(1);
  MPE: number = 0; // Maximum Permissible Error, （仪器的）最大允许误差
  EE: number = 0; // 估计误差
  distributionType: DistributionType = DistributionType.Normal;
  estimateDeltaB: boolean = true; // 若 MPE 与 EE 之中较大者超过较小者的 3 倍，取较大者

  constructor(
    unit: FQuantity,
    MPE: number,
    EE: number,
    distributionType: DistributionType,
    estimateDeltaB: boolean
  ) {
    this.unit = unit;
    this.MPE = MPE;
    this.EE = EE;
    this.distributionType = distributionType;
    this.estimateDeltaB = estimateDeltaB;
  }

  /**
   * Get Delta_B
   * @returns Delta_B
   */
  getDeltaB(): number {
    if (
      this.estimateDeltaB &&
      Math.max(this.MPE, this.EE) > 3 * Math.min(this.MPE, this.EE)
    ) {
      return Math.max(this.MPE, this.EE);
    } else {
      return Math.sqrt(Math.pow(this.MPE, 2) + Math.pow(this.EE, 2));
    }
  }

  /**
   * Get u_B under the given confidence level
   */
  getUB(p: number): number {
    return (
      (this.getDeltaB() / C.get(this.distributionType)!) *
      calculateKp(p, this.distributionType)
    );
  }

  /**
   * Give the result of the measurement
   * @param data - the list of numbers
   * @param p - the confidence level
   * @returns the result of the measurement
   */
  measure(data: number[], p: number): FQuantity {
    const uA = getUA(data, p);
    const uB = this.getUB(p);
    const u = Math.sqrt(Math.pow(uA, 2) + Math.pow(uB, 2));
    const v = mean(data.length, data, 1);
    return this.unit.mul(new FQuantity(new FNumber(v, u, p)));
  }
}
