import { markRaw } from "vue";
import { NodeInterface, setType } from "baklavajs";
import QuantityDisplay from "../component/QuantityDisplay.vue";
import { quantityType } from "../InterfaceTypes";
import { FQuantity } from "../../math/FQuantity";

export class QuantityDisplayInterface extends NodeInterface<
  Array<FQuantity> | FQuantity
> {
  constructor(name: string, value: Array<FQuantity> | FQuantity = new FQuantity(1)) {
    super(name, value);
    this.setComponent(markRaw(QuantityDisplay));
    this.use(setType, quantityType);
  }
}
