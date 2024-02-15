import { FMeasurer, DistributionType } from "./FMeasurer";
import { FQuantity } from "./FQuantity";
import { FUnit } from "./FUnit";

export default [
  {
    name: "钢卷尺 1m/1mm",
    unitName: "m",
    measurer: new FMeasurer(
      new FQuantity(1, new FUnit(new Map([["m", 1]]))),
      0.8,
      0,
      DistributionType.Normal,
      true
    ),
  },
  {
    name: "钢卷尺 2m/1mm",
    unitName: "m",
    measurer: new FMeasurer(
      new FQuantity(1, new FUnit(new Map([["m", 1]]))),
      1.2,
      0,
      DistributionType.Normal,
      true
    ),
  },
  {
    name: "游标卡尺 125mm/0.02mm",
    unitName: "mm",
    measurer: new FMeasurer(
      new FQuantity(1e-3, new FUnit(new Map([["m", 1]]))),
      0.02,
      0,
      DistributionType.Uniform,
      true
    ),
  },
  {
    name: "游标卡尺 300mm/0.02mm",
    unitName: "mm",
    measurer: new FMeasurer(
      new FQuantity(1e-3, new FUnit(new Map([["m", 1]]))),
      0.05,
      0,
      DistributionType.Uniform,
      true
    ),
  },
  {
    name: "螺旋测微器 25mm/0.01mm",
    unitName: "mm",
    measurer: new FMeasurer(
      new FQuantity(1e-3, new FUnit(new Map([["m", 1]]))),
      0.004,
      0,
      DistributionType.Normal,
      true
    ),
  },
  {
    name: "秒表",
    unitName: "s",
    measurer: new FMeasurer(
      new FQuantity(1, new FUnit(new Map([["s", 1]]))),
      0.01,
      0.2,
      DistributionType.Normal,
      true
    ),
  }
];
