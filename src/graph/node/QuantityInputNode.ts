import { defineNode, NodeInterface, NumberInterface, setType } from "baklavajs";
import { UnitInterface } from "../interface/UnitInterface.ts";
import { FQuantity } from "../../math/FQuantity.ts";
import { quantitySingleType } from "../InterfaceTypes.ts";
import { FNumber } from "../../math/FNumber.ts";

export default defineNode({
  type: "QuantityInputNode",
  title: "Quantity (With Uncertainty)",
  inputs: {
    value: () => new NumberInterface("Value", 1).setPort(false),
    uncertainty: () => new NumberInterface("Uncertainty", 0).setPort(false),
    probabilyty: () => new NumberInterface("Probabilyty", 0.95).setPort(false),
    unit: () => new UnitInterface("Unit", new FQuantity(1)).setPort(false),
  },
  outputs: {
    output: () =>
      new NodeInterface<FQuantity>("Output", new FQuantity(1)).use(
        setType,
        quantitySingleType
      ),
  },
  calculate({ value, uncertainty, probabilyty, unit }) {
    let output: FQuantity;
    output = unit.mul(new FQuantity(new FNumber(value, uncertainty, probabilyty)));
    return { output };
  },
});
