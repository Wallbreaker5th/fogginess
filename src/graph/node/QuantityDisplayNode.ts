import { defineNode, setType } from "baklavajs";
import { QuantityInputInterface } from "../interface/QuantityInputInterface";
import { QuantityDisplayInterface } from "../interface/QuantityDisplayInterface";
import { FQuantity } from "../../math/FQuantity";
import { quantityType } from "../InterfaceTypes";

export default defineNode({
  type: "QuantityDisplayNode",
  title: "Quantity Display",
  inputs: {
    input: () => new QuantityInputInterface("Input", new FQuantity(1)),
  },
  outputs: {
    output: () => new QuantityDisplayInterface("Output", new FQuantity(1)),
  },
  calculate({ input }) {
    return { output: input };
  },
});
