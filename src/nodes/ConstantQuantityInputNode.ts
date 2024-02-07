import { defineNode, NodeInterface, NumberInterface, setType } from "baklavajs";
import { UnitInterface } from "./UnitInterface.ts";
import { FQuantity } from "../math/FQuantity.ts";
import { FNumber } from "../math/FNumber.ts";
import { quantityType } from "./InterfaceTypes.ts";
import { math } from "../math/math.ts";

export default defineNode({
  type: "ConstantQuantityInputNode",
  title: "Constant Quantity",
  inputs: {
    value: () => new NumberInterface("Value", 1).setPort(false),
    unit: () => new UnitInterface("Unit", new FQuantity(1)).setPort(false),
  },
  outputs: {
    output: () =>
      new NodeInterface<FQuantity>("Output", new FQuantity(1)).use(
        setType,
        quantityType
      ),
  },
  calculate({ value, unit }) {
    let output: FQuantity;
    output = unit.mul(new FQuantity(value));
    return { output };
  },
});
