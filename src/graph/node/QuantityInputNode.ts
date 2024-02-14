import { defineNode, NodeInterface, setType } from "baklavajs";
import { UnitInterface } from "../interface/UnitInterface.ts";
import { FQuantity } from "../../math/FQuantity.ts";
import { FNumber } from "../../math/FNumber.ts";
import { quantitySingleType } from "../InterfaceTypes.ts";
import { FNumberInterface } from "../interface/FNumberInterface.ts";

export default defineNode({
  type: "QuantityInputNode",
  title: "✏量",
  inputs: {
    value: () => new FNumberInterface("值", FNumber.constant(0)).setPort(false),
    unit: () => new UnitInterface("单位", new FQuantity(1)).setPort(false),
  },
  outputs: {
    output: () =>
      new NodeInterface<FQuantity>("输出", new FQuantity(1)).use(
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
