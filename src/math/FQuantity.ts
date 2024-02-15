import { math } from "./math.ts";
import { FNumber } from "./FNumber.ts";
import { FUnit } from "./FUnit.ts";

function getExponent(n: number): number {
  if (n === 0) {
    return 0;
  }
  const abs_n = Math.abs(n);
  if (abs_n > 1e-3 && abs_n < 1e4) {
    return 0;
  }
  return Math.floor(Math.log10(abs_n));
}

/**
 * Represents a quantity combined by a number and a unit.
 */
export class FQuantity {
  number: FNumber = FNumber.constant(0);
  unit: FUnit = FUnit.one();
  __FType = "FQuantity";

  /**
   * Creates a new FQuantity instance.
   * @param number - The number of the quantity. If a number is given, it is considered a constant.
   * @param unit - The unit of the quantity. If null, the unit is dimensionless.
   */
  constructor(number: FNumber | number, unit: FUnit = FUnit.one()) {
    if (number instanceof FNumber) {
      this.number = number;
    } else {
      this.number = FNumber.constant(number);
    }
    this.unit = unit;
  }

  static fromJSON(json: any): FQuantity {
    return new FQuantity(FNumber.fromJSON(json.number), FUnit.fromJSON(json.unit));
  }

  /**
   * Give a Node of mathjs and a Map<String, FQuantity>, evaluates the node and returns an FQuantity.
   * @param node - The node to evaluate.
   * @param vars - The variables to use in the evaluation.
   * @returns The result of the evaluation.
   * @throws Error if there's error in the evaluation of the number
   * @throws Error if the unit is not consistent in addition or subtraction
   * @throws Error if the unit is not dimensionless in certain operations
   */
  static eval(node: math.MathNode, vars: Map<string, FQuantity>): FQuantity {
    let vars_dimensionless: Map<string, FNumber> = new Map();
    vars.forEach((v: FQuantity, k: string) => {
      vars_dimensionless.set(k, v.number);
    });
    let vars_constant_part: Map<string, number> = new Map();
    vars.forEach((v: FQuantity, k: string) => {
      vars_constant_part.set(k, v.number.v);
    });

    // Calculate the final unit first
    function GetUnit(node: math.MathNode): FUnit {
      if (!node.isNode) {
        throw new Error("Node expected");
      } else if (node.type == "ConstantNode") {
        return FUnit.one();
      } else if (node.type == "OperatorNode") {
        const onode = node as math.OperatorNode;
        if (onode.isUnary()) {
          return GetUnit(onode.args[0]);
        } else {
          switch (onode.op) {
            case "+":
            case "-": {
              const u: FUnit = GetUnit(onode.args[0]);
              const v: FUnit = GetUnit(onode.args[1]);
              if (!u.equals(v)) {
                throw new Error("Unit mismatch");
              }
              return u;
            }
            case "*":
              return GetUnit(onode.args[0]).mul(GetUnit(onode.args[1]));
            case "/":
              return GetUnit(onode.args[0]).div(GetUnit(onode.args[1]));
            case "^": {
              const u: FUnit = GetUnit(onode.args[0]);
              const v: FUnit = GetUnit(onode.args[1]);
              if (!v.isOne()) {
                throw new Error("Exponent unit must be dimensionless");
              }
              return u.pow(onode.args[1].evaluate(vars_constant_part));
              // It can be optimized, but such operation is not frequent after all
            }
            default:
              throw new Error("Unsupported operator");
          }
        }
      } else if (node.type == "FunctionNode") {
        const fnode = node as math.FunctionNode;
        switch (fnode.fn.toString()) {
          case "abs":
            return GetUnit(fnode.args[0]);
          case "cbrt":
            return GetUnit(fnode.args[0]).pow(1 / 3);
          case "cube":
            return GetUnit(fnode.args[0]).pow(3);
          case "pow":
            return GetUnit(fnode.args[0]).pow(
              fnode.args[1].evaluate(vars_constant_part)
            );
          case "sqrt":
            return GetUnit(fnode.args[0]).pow(0.5);
          case "square":
            return GetUnit(fnode.args[0]).pow(2);
          default:
            fnode.args.forEach((arg: math.MathNode) => {
              if (!GetUnit(arg).isOne()) {
                throw new Error("Argument unit must be dimensionless");
              }
            });
            return FUnit.one();
        }
      } else if (node.type == "ParenthesisNode") {
        return GetUnit((node as math.ParenthesisNode).content);
      } else if (node.type == "SymbolNode") {
        let v: FQuantity | undefined = vars.get((node as math.SymbolNode).name);
        if (v == undefined) {
          throw new Error("Unknown variable");
        }
        return v.unit;
      } else {
        throw new Error("Unsupported node type");
      }
    }

    let u: FUnit = GetUnit(node);
    let v: FNumber = FNumber.eval(node, vars_dimensionless);

    return new FQuantity(v, u);
  }

  /**
   * Evaluates the given expression.
   * The inputs might be arrays of FQuantity, or FQuantity.
   * @param node - The expression to evaluate.
   * @param vars - The inputs to use in the evaluation.
   * @returns The result of the evaluation.
   * @throws Error if the lengths of the inputs are not consistent
   * @throws Error if there's error in the evaluation of the expression
   */
  static evalArray(
    node: math.MathNode,
    vars: Map<string, FQuantity | Array<FQuantity>>
  ): FQuantity | Array<FQuantity> {
    let array_length: number = -1;
    for (const [, value] of vars) {
      if (value instanceof Array) {
        if (array_length === -1) {
          array_length = value.length;
        } else if (array_length !== value.length) {
          throw new Error("Array inputs must have the same length");
        }
      }
    }
    if (array_length === -1) {
      return FQuantity.eval(node, vars as Map<string, FQuantity>);
    } else {
      const result = new Array<FQuantity>();
      for (let i = 0; i < array_length; i++) {
        const vars_i = new Map<string, FQuantity>();
        for (const [key, value] of vars) {
          vars_i.set(key, value instanceof Array ? value[i] : value);
        }
        result.push(FQuantity.eval(node, vars_i));
      }
      return result;
    }
  }

  /**
   * Checks if this quantity is dimensionless.
   * @returns True if this quantity is dimensionless, false otherwise.
   */
  isOne(): boolean {
    return this.unit.isOne();
  }

  /**
   * Checks if this quantity is equal to another number within the given epsilon.
   * @param b - The quantity to compare with.
   * @param epsilon - The maximum difference between the numbers.
   * @returns True if the numbers are equal, false otherwise.
   */
  equals(b: FQuantity, epsilon: number = 1e-3): boolean {
    return this.unit.equals(b.unit) && this.number.equals(b.number, epsilon);
  }

  /**
   * Converts this quantity to a string.
   */
  toString(): string {
    if (this.number.isConstant()) {
      // return `${this.number.v.toPrecision(4)} ${this.unit.toString()}`;
      const exp = getExponent(this.number.v);
      if (exp === 0) {
        return `${this.number.v.toPrecision(4)} ${this.unit.toString()}`;
      } else {
        return `${(this.number.v / Math.pow(10, exp)).toPrecision(
          4
        )}×10^${exp} ${this.unit.toString()}`;
      }
    } else {
      const exp = getExponent(this.number.v);
      if (exp === 0) {
        return `${this.number.v.toPrecision(4)}±${this.number.u.toPrecision(
          4
        )} ${this.unit.toString()} (P=${this.number.p.toPrecision(3)})`;
      } else {
        return `(${(this.number.v / Math.pow(10, exp)).toPrecision(4)}±${(
          this.number.u / Math.pow(10, exp)
        ).toPrecision(
          4
        )})×10^${exp} ${this.unit.toString()} (P=${this.number.p.toPrecision(
          3
        )})`;
      }
    }
  }

  /**
   * Multiplies this quantity by another quantity.
   * This function is mainly for calculations about units.
   * @param b - The quantity to multiply by.
   * @returns The result of the multiplication.
   */
  mul(b: FQuantity): FQuantity {
    return FQuantity.eval(
      math.parse("a*b"),
      new Map([
        ["a", this],
        ["b", b],
      ])
    );
  }

  /**
   * Divides this quantity by another quantity.
   * This function is mainly for calculations about units.
   * @param b - The quantity to divide by.
   * @returns The result of the division.
   */
  div(b: FQuantity): FQuantity {
    return FQuantity.eval(
      math.parse("a/b"),
      new Map([
        ["a", this],
        ["b", b],
      ])
    );
  }
}
