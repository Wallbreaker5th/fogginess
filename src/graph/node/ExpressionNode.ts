import {
  defineDynamicNode,
  NodeInterface,
  TextInputInterface,
  setType,
} from "baklavajs";
import { QuantityInputInterface } from "../interface/QuantityInputInterface";
import { FQuantity } from "../../math/FQuantity";
import { quantityType } from "../InterfaceTypes";
import { math } from "../../math/math";
import { ErrorDisplayInterface } from "../interface/ErrorDisplayInterface";
import { string } from "mathjs";

export default defineDynamicNode({
  type: "ExpressionNode",
  title: "表达式求值",
  inputs: {
    expression: () =>
      new TextInputInterface<string>("表达式", "x").setPort(false),
  },
  outputs: {
    result: () =>
      new NodeInterface<FQuantity | Array<FQuantity>>(
        "Result",
        new FQuantity(1)
      ).use(setType, quantityType),
    error: () => new ErrorDisplayInterface("Error", ""),
  },
  onUpdate({ expression }) {
    const symbols = new Set<string>();
    // Find all alphabets of length 1
    const matched = new Array<boolean>();
    for (let i = 0; i < expression.length; i++) {
      if (expression[i].match(/[a-zA-Z]/)) {
        matched.push(true);
      } else {
        matched.push(false);
      }
    }
    for (let i = 0; i < matched.length; i++) {
      if (
        matched[i] &&
        (i == 0 || !matched[i - 1]) &&
        (i == matched.length - 1 || !matched[i + 1])
      ) {
        symbols.add(expression[i]);
      }
    }

    const symbols_sorted = Array.from(symbols).sort();
    const inputs_map = new Map<string, () => QuantityInputInterface>();
    for (const symbol of symbols_sorted) {
      inputs_map.set(
        symbol,
        () => new QuantityInputInterface(symbol, new FQuantity(0))
      );
    }
    return {
      inputs: Object.fromEntries(inputs_map),
    };
  },
  calculate(inputs) {
    // filter the inputs that are `expression`
    try {
      const vars = new Map<string, FQuantity>(
        Object.entries(inputs)
          .filter(([key, value]) => key !== "expression")
          .map(([key, value]) => [key, value as FQuantity])
      );
      return {
        result: FQuantity.evalArray(
          math.parse((inputs as { expression: string }).expression),
          vars
        ),
        error: "",
      };
    } catch (e) {
      if(e instanceof string){
        return {
          result: [],
          error: e,
        };
      } else if (e instanceof Error) {
        return {
          result: [],
          error: e.message,
        };
      } else {
        return {
          result: [],
          error: "Unknown error",
        };
      }
    }
  },
});
