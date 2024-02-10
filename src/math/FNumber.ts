import { math } from "./math.ts";

/**
 * Represents a number with uncertainty and confidence probability.
 * If u=0 and p=1, the number is a constant.
 */
export class FNumber {
  v: number; // value
  u: number; // uncertainty
  p: number; // confidence probability

  constructor(v: number, u: number, p: number) {
    this.v = v;
    this.u = u;
    this.p = p;
  }

  /**
   * Creates an FNumber with a constant value and no uncertainty.
   * @param v The constant value.
   * @returns An FNumber object.
   */
  static constant(v: number): FNumber {
    return new FNumber(v, 0, 1);
  }

  /**
   * Checks if this number is a constant.
   * @returns True if the number is a constant, false otherwise.
   */
  isConstant(): boolean {
    return this.u == 0 && this.p == 1;
  }

  /**
   * Give a Node of mathjs and a Map<String, FNumber>, evaluates the node and returns an FNumber.
   * @param node The node to evaluate.
   * @param vars The variables to use in the evaluation.
   * @returns The result of the evaluation.
   * @throws Error if the node contains unsupported elements or if the variables are unknown.
   * @throws Error if the confidence probability of the result is not consistent.
   */
  static eval(node: math.MathNode, vars: Map<string, FNumber>): FNumber {
    // Check the confidence probability first
    function GetConfidenceProbability(node: math.MathNode): number {
      if (!node.isNode) {
        throw new Error("Node expected");
      } else if (node.type == "ConstantNode") {
        return 1;
      } else if (node.type == "OperatorNode" || node.type == "FunctionNode") {
        let p: number = 1;
        (node as math.OperatorNode | math.FunctionNode).args.forEach(
          (arg: math.MathNode) => {
            let tmp: number = GetConfidenceProbability(arg);
            if (p == 1 || tmp == 1) {
              p = p == 1 ? tmp : p;
            } else if (p != tmp) {
              throw new Error("Confidence probability mismatch");
            }
          }
        );
        return p;
      } else if (node.type == "ParenthesisNode") {
        return GetConfidenceProbability((node as math.ParenthesisNode).content);
      } else if (node.type == "SymbolNode") {
        let v: FNumber | undefined = vars.get((node as math.SymbolNode).name);
        if (v == undefined) {
          throw new Error("Unknown variable");
        }
        return v.p;
      } else {
        throw new Error("Unsupported node type");
      }
    }
    let p: number = GetConfidenceProbability(node);

    // Evaluate the node
    let vars_no_uncertainty: Map<string, number> = new Map();
    for (let [k, v] of vars.entries()) {
      vars_no_uncertainty.set(k, v.v);
    }
    let v: number = node.evaluate(vars_no_uncertainty);

    // Calculate the uncertainty
    let u_squared: number = 0;
    for (let [k, v] of vars.entries()) {
      if (v.u == 0) {
        continue;
      }
      let d: number = math
        .derivative(node, k.toString())
        .evaluate(vars_no_uncertainty);
      u_squared += d * d * v.u * v.u;
    }
    let u: number = Math.sqrt(u_squared);

    return new FNumber(v, u, p);
  }

  /**
   * Checks if this number is equal to another number within the given epsilon.
   * @param b The number to compare with.
   * @param epsilon The maximum difference between the numbers.
   * @returns True if the numbers are equal, false otherwise.
   */
  equals(b: FNumber, epsilon: number = 1e-3): boolean {
    return (
      Math.abs(this.v - b.v) <= epsilon &&
      Math.abs(this.u - b.u) <= epsilon &&
      this.p == b.p
    );
  }
}
