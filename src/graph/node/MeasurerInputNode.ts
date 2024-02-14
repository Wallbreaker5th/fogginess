import {
  defineNode,
  setType,
  NodeInterface,
  SelectInterface,
} from "baklavajs";
import { UnitInterface } from "../interface/UnitInterface";
import { NumberInterface } from "../interface/NumberInterface";
import { DistributionType, FMeasurer } from "../../math/FMeasurer";
import { measurerType } from "../InterfaceTypes";
import { FQuantity } from "../../math/FQuantity";

export default defineNode({
  type: "MeasurerInputNode",
  title: "📏测量仪器",
  inputs: {
    unit: () => new UnitInterface("单位", new FQuantity(1)).setPort(true),
    MPE: () => new NumberInterface("最大允差", 0).setPort(false),
    EE: () => new NumberInterface("估计误差", 0).setPort(false),
    distributionType: () =>
      new SelectInterface("分布类型", DistributionType.Normal, [
        { text: "正态分布", value: DistributionType.Normal },
        { text: "均匀分布", value: DistributionType.Uniform },
        { text: "三角分布", value: DistributionType.Triangular },
      ]).setPort(false),
  },
  outputs: {
    output: () =>
      new NodeInterface<FMeasurer>(
        "输出",
        new FMeasurer(new FQuantity(1), 0, 0, DistributionType.Normal, true)
      ).use(setType, measurerType),
  },
  calculate({ unit, MPE, EE, distributionType }) {
    let output: FMeasurer;
    output = new FMeasurer(unit, MPE, EE, distributionType, true);
    return { output };
  },
});
