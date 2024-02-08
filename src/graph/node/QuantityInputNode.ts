import { defineNode, NodeInterface, NumberInterface, setType } from "baklavajs";
import { UnitInterface } from "../interface/UnitInterface.ts";
import { FQuantity } from "../../math/FQuantity.ts";
import { quantitySingleType } from "../InterfaceTypes.ts";
import { FNumber } from "../../math/FNumber.ts";

export default defineNode({
  type: "QuantityInputNode",
  title: "量",
  inputs: {
    value: () => new NumberInterface("值", 1).setPort(false),
    uncertainty: () => new NumberInterface("不确定度", 0).setPort(false),
    probabilyty: () => new NumberInterface("置信概率", 0.95).setPort(false),
    unit: () => new UnitInterface("单位", new FQuantity(1)).setPort(false),
  },
  outputs: {
    output: () =>
      new NodeInterface<FQuantity>("输出", new FQuantity(1)).use(
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
