import { defineNode, setType, NodeInterface, TextInterface } from "baklavajs";
import { FQuantity } from "../../math/FQuantity";
import { quantitySingleType } from "../InterfaceTypes";
import { ErrorDisplayInterface } from "../interface/ErrorDisplayInterface";
import { math } from "../../math/math";

export default defineNode({
  type: "ErrorNode",
  title: "👀误差",
  inputs: {
    exact: () =>
      new NodeInterface<FQuantity>("精确值", new FQuantity(1)).use(
        setType,
        quantitySingleType
      ),
    approximate: () =>
      new NodeInterface<FQuantity>("近似值", new FQuantity(1)).use(
        setType,
        quantitySingleType
      ),
  },
  outputs: {
    absolute: () => new TextInterface("绝对误差", "").setPort(false),
    relative: () => new TextInterface("相对误差", "").setPort(false),
    inRange: () => new TextInterface("", "在/不在近似值范围内").setPort(false),
    error: () => new ErrorDisplayInterface("", "").setPort(false),
  },
  calculate({ exact, approximate }) {
    try{
      const map = new Map<string, FQuantity>([
        ["e", exact],
        ["a", new FQuantity(approximate.number.v, approximate.unit)],
      ]);
      const absolute = FQuantity.eval(math.parse("a-e"), map);
      const relative = FQuantity.eval(math.parse("(a-e)/e"), map);
      const relativeNum = relative.number.v;
      const inRange =
        Math.abs(approximate.number.v - exact.number.v) <= approximate.number.u;
      return {
        absolute: absolute.toString(),
        relative: `${(relativeNum * 100).toFixed(3)}%`,
        inRange: inRange ? "在范围内" : "不在范围内",
        error: "",
      };
    } catch (e) {
      return {
        absolute: "",
        relative: "",
        inRange: "",
        error: e,
      };
    }
  },
});
