export const BASIC_UNITS = ["m", "s", "kg", "A", "K", "mol", "cd"];

/**
 * Represents a unit with exponents for basic units.
 */
export class FUnit {
  /**
   * The exponents for the basic units.
   */
  exponents: Array<number>;

  /**
   * Creates a new FUnit instance.
   * @param exponents - The exponents for the basic units.
   */
  constructor(exponents: Map<string, number> | Array<number>) {
    if (exponents instanceof Array) {
      this.exponents = exponents;
      return;
    } else {
      this.exponents = [];
      for (let i in BASIC_UNITS) {
        let s: string = BASIC_UNITS[i];
        this.exponents.push(exponents.get(s) || 0);
      }
    }
  }

  /**
   * Creates a new FUnit instance with all exponents set to 0.
   * @returns A new FUnit instance.
   */
  static one(): FUnit {
    return new FUnit(new Map());
  }

  /**
   * Checks if this unit is dimensionless.
   * @returns True if this unit is dimensionless, false otherwise.
   */
  isOne(): boolean {
    for (let i in BASIC_UNITS) {
      if (this.exponents[i] != 0) {
        return false;
      }
    }
    return true;
  }

  /**
   * Checks if this unit is equal to another unit.
   * @param b - The unit to compare with.
   * @returns True if the units are equal, false otherwise.
   */
  equals(b: FUnit): boolean {
    for (let i in BASIC_UNITS) {
      if (this.exponents[i] != b.exponents[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Multiplies this unit with another unit.
   * @param b - The unit to multiply with.
   * @returns The result of the multiplication.
   */
  mul(b: FUnit): FUnit {
    let res: FUnit = new FUnit(new Map());
    for (let i in BASIC_UNITS) {
      res.exponents[i] = this.exponents[i] + b.exponents[i];
    }
    return res;
  }

  /**
   * Divides this unit by another unit.
   * @param b - The unit to divide by.
   * @returns The result of the division.
   */
  div(b: FUnit): FUnit {
    let res: FUnit = new FUnit(new Map());
    for (let i in BASIC_UNITS) {
      res.exponents[i] = this.exponents[i] - b.exponents[i];
    }
    return res;
  }

  /**
   * Gets the power of this unit.
   * @param n - The power to raise to.
   * @returns The result of the power.
   */
  pow(n: number): FUnit {
    let res: FUnit = new FUnit(new Map());
    for (let i in BASIC_UNITS) {
      res.exponents[i] = this.exponents[i] * n;
    }
    return res;
  }

  /**
   * Convert the Unit into a string
   * @returns The string representation of the unit.
   */
  toString(): string {
    let res: string = "";
    for (let i in BASIC_UNITS) {
      if (this.exponents[i] != 0) {
        if (res != "") {
          res += " ";
        }
        res += BASIC_UNITS[i];
        if (this.exponents[i] != 1) {
          res += "^" + this.exponents[i];
        }
      }
    }
    return res;
  }
}
