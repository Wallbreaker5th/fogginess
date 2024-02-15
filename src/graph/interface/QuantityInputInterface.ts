import { NodeInterface, setType } from "baklavajs";
import { quantityType } from "../InterfaceTypes";
import { FQuantity } from "../../math/FQuantity";

export class QuantityInputInterface extends NodeInterface<
  Array<FQuantity> | FQuantity
> {
  constructor(name: string, value: Array<FQuantity> | FQuantity = new FQuantity(1)) {
    super(name, value);
    this.use(setType, quantityType);
  }
}
