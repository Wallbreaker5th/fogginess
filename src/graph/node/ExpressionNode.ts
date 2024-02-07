import { defineDynamicNode, NodeInterface, TextInputInterface, setType } from "baklavajs";
import { QuantityInputInterface } from "../interface/QuantityInputInterface";
import { FQuantity } from "../../math/FQuantity";
import { quantityType } from "../InterfaceTypes";
import { math } from "../../math/math";

export default defineDynamicNode({
  type: "ExpressionNode",
  title: "Expression Evaluation",
  inputs: {
    expression: () =>
      new TextInputInterface<string>("Expression", "x").setPort(false),
  },
  outputs: {
    result: () =>
      new NodeInterface<FQuantity | Array<FQuantity>>(
        "Result",
        new FQuantity(1)
      ).use(setType, quantityType),
  },
  onUpdate({ expression }) {
    const parsed = math.parse(expression);
    const symbols = new Set<string>();
    parsed.traverse((node) => {
      if (node.type == "SymbolNode") {
        symbols.add((node as math.SymbolNode).name);
      }
    });
    const symbols_sorted = Array.from(symbols).sort();
    const inputs_map = new Map<string, () => QuantityInputInterface>();
    for (const symbol of symbols_sorted) {
      inputs_map.set(symbol, () => new QuantityInputInterface(symbol, new FQuantity(0), symbol));
    }
    return {
      inputs: Object.fromEntries(inputs_map),
    };
  },
  calculate({ expression, inputs }) {
    // filter the inputs that are `expression`
    const vars = new Map<string, FQuantity>(
      Object.entries(inputs)
        .filter(([key, value]) => key !== "expression")
        .map(([key, value]) => [key, value as FQuantity])
    );
    return {
      result: FQuantity.evalArray(math.parse(expression), vars),
    }
  },
});
