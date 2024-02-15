import { defineNode, setType, NodeInterface, TextInterface } from "baklavajs";
import { markRaw } from "vue";
import { NumberInterface } from "../interface/NumberInterface";
import { ErrorDisplayInterface } from "../interface/ErrorDisplayInterface";
import { FQuantity } from "../../math/FQuantity";
import { leastSquare } from "../../math/LeastSquare";
import ExportTwoArrays from "../component/ExportTwoArrays.vue";
import { quantityArrayType, quantitySingleType } from "../InterfaceTypes";

export default defineNode({
  type: "LinearRegressionNode",
  title: "🧮线性回归",
  inputs: {
    x: () =>
      new NodeInterface("x", new Array<FQuantity>())
        .use(setType, quantityArrayType)
        .setPort(true),
    y: () =>
      new NodeInterface("y", new Array<FQuantity>())
        .use(setType, quantityArrayType)
        .setPort(true),
    confidence: () => new NumberInterface("置信度", 0.95).setPort(false),
  },
  outputs: {
    k: () =>
      new NodeInterface("k", new FQuantity(1))
        .use(setType, quantitySingleType)
        .setPort(true),
    b: () =>
      new NodeInterface("b", new FQuantity(0))
        .use(setType, quantitySingleType)
        .setPort(true),
    r2: () => new TextInterface("r^2", "").setPort(false),
    export: () =>
      new NodeInterface("导出", [[0], [0]])
        .setPort(false)
        .setComponent(markRaw(ExportTwoArrays)),
    error: () => new ErrorDisplayInterface("", "").setPort(false),
  },
  calculate({ x, y, confidence }) {
    const xn = x.map((v) => v.number.v);
    const yn = y.map((v) => v.number.v);
    try {
      const { k, b, r2 } = leastSquare(x, y, confidence);
      return { k, b, r2: "r^2="+r2.toFixed(4), export: [xn, yn], error: "" };
    } catch (e) {
      return {
        k: new FQuantity(1),
        b: new FQuantity(0),
        r2: "",
        export: [xn, yn],
        error: e,
      };
    }
  },
});
