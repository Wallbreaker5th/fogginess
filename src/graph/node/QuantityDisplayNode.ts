import { defineNode, setType } from "baklavajs";
import { QuantityInputInterface } from "../interface/QuantityInputInterface";
import { QuantityDisplayInterface } from "../interface/QuantityDisplayInterface";
import { FQuantity } from "../../math/FQuantity";

export default defineNode({
  type: "QuantityDisplayNode",
  title: "显示量",
  inputs: {
    input: () => new QuantityInputInterface("输入", new FQuantity(1)),
  },
  outputs: {
    output: () => new QuantityDisplayInterface("输出", new FQuantity(1)),
  },
  calculate({ input }) {
    return { output: input };
  },
});
