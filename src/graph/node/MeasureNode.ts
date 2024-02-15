import {
  defineNode,
  setType,
  NodeInterface,
} from "baklavajs";
import { ConstantArrayInputInterface } from "../interface/ConstantArrayInputInterface";
import { NumberInterface, SelectInterface } from "../interface/BasicInterfaces";
import { FQuantity } from "../../math/FQuantity";
import { FMeasurer } from "../../math/FMeasurer";
import CommonMeasurers from "../../math/CommonMeasurers";
import { measurerType, quantitySingleType } from "../InterfaceTypes";

export default defineNode({
  type: "MeasureNode",
  title: "📏测量",
  inputs: {
    values: () => new ConstantArrayInputInterface("度数", [0, 0, 0]),
    measurer: () => new SelectInterface<FMeasurer>("仪器", CommonMeasurers[0].measurer, CommonMeasurers.map((measurer) => ({
      text: measurer.name+" "+measurer.unitName,
      value: measurer.measurer,
    })), 'uniqueKey').setPort(true).use(setType, measurerType),
    p: () => new NumberInterface("置信度", 0.95).setPort(false),
  },
  outputs: {
    output: () =>
      new NodeInterface<FQuantity>(
        "结果",
        new FQuantity(0)
      ).use(setType, quantitySingleType),
  },
  calculate({ values, measurer, p }) {
    let output;
    output = measurer.measure(values, p);
    return { output };
  },
});
