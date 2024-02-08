import { NodeInterfaceType } from "baklavajs";
import { FQuantity } from "../math/FQuantity";

export const quantityType = new NodeInterfaceType<FQuantity | Array<FQuantity>>(
  "quantity"
);
export const quantitySingleType = new NodeInterfaceType<FQuantity>(
  "quantitySingle"
);
export const quantityArrayType = new NodeInterfaceType<Array<FQuantity>>(
  "quantityArray"
);

quantityType.addConversion(quantitySingleType, (value) =>
  value instanceof FQuantity ? value : value[0]
);
quantitySingleType.addConversion(quantityType, (value) => [value]);
quantityType.addConversion(quantityArrayType, (value) =>
  value instanceof FQuantity ? [value] : value
);
quantityArrayType.addConversion(quantityType, (value) => value);
