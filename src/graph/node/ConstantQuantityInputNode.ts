import { defineNode, NodeInterface, setType } from "baklavajs";
import { UnitInterface } from "../interface/UnitInterface.ts";
import { NumberInterface } from "../interface/BasicInterfaces.js";
import { FQuantity } from "../../math/FQuantity.ts";
import { quantitySingleType } from "../InterfaceTypes.ts";

export default defineNode({
  type: "ConstantQuantityInputNode",
  title: "✏常量",
  inputs: {
    value: () => new NumberInterface("值", 1).setPort(false),
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
