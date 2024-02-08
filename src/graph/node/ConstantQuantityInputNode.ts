import { defineNode, NodeInterface, NumberInterface, setType } from "baklavajs";
import { UnitInterface } from "../interface/UnitInterface.ts";
import { FQuantity } from "../../math/FQuantity.ts";
import { quantitySingleType } from "../InterfaceTypes.ts";

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
        quantitySingleType
      ),
  },
  calculate({ value, unit }) {
    let output: FQuantity;
    output = unit.mul(new FQuantity(value));
    return { output };
  },
});
