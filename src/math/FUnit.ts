const BASIC_UNITS = ["m", "s", "kg", "A", "K", "mol", "cd"];

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
  constructor(exponents: Map<String, number>) {
    this.exponents = [];
    for (let i in BASIC_UNITS) {
      let s: string = BASIC_UNITS[i];
      this.exponents.push(exponents.get(s) || 0);
    }
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
}
