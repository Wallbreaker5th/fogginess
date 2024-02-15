import {
  defineNode,
  setType,
  NodeInterface,
} from "baklavajs";
import { NumberInterface } from "../interface/NumberInterface";
import { UnitInterface } from "../interface/UnitInterface";
import { FQuantity } from "../../math/FQuantity";
import { quantityArrayType } from "../InterfaceTypes";

export default defineNode({
  type: "ArithmeticSequenceNode",
  title: "✏等差数列",
  inputs: {
    a1: () =>
      new NumberInterface("首项", 0).setPort(false),
    d: () =>
      new NumberInterface("公差", 1).setPort(false),
    n: () =>
      new NumberInterface("项数", 3).setPort(false),
    unit: () =>
      new UnitInterface("单位", new FQuantity(1)).setPort(true),
  },
  outputs: {
    sequence: () =>
      new NodeInterface("序列", new Array<FQuantity>())
        .use(setType, quantityArrayType)
        .setPort(true),
  },
  calculate({ a1, d, n, unit }) {
    let res: FQuantity[] = [];
    for (let i = 0; i < n; i++) {
      res.push(new FQuantity(a1 + i * d).mul(unit));
    }
    return { sequence: res };
  },
});
