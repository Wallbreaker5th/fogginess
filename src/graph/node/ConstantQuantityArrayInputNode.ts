import {
  defineNode,
  setType,
  NodeInterface,
} from "baklavajs";
import { ConstantArrayInputInterface } from "../interface/ConstantArrayInputInterface";
import { UnitInterface } from "../interface/UnitInterface";
import { FQuantity } from "../../math/FQuantity";
import { measurerType, quantityArrayType } from "../InterfaceTypes";

export default defineNode({
  type: "ConstantQuantityArrayInputNode",
  title: "常量列表",
  inputs: {
    values: () => new ConstantArrayInputInterface("值", [0, 0, 0]),
    unit: () => new UnitInterface("单位", new FQuantity(1)),
  },
  outputs: {
    output: () =>
      new NodeInterface<FQuantity[]>("输出", [new FQuantity(1)]).use(
        setType,
        quantityArrayType
      ),
  },
  calculate({ values, unit }) {
    let output: FQuantity[];
    output = values.map((value) => unit.mul(new FQuantity(value)));
    return { output };
  },
});
