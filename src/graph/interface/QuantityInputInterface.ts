import { markRaw } from "vue";
import { NodeInterface, setType } from "baklavajs";
// import ConstantQuantityInput from "../component/ConstantQuantityInput.vue";
import { quantityType } from "../InterfaceTypes";
import { FQuantity } from "../../math/FQuantity";

export class QuantityInputInterface extends NodeInterface<
  Array<FQuantity> | FQuantity
> {
  constructor(name: string, value: Array<FQuantity> | FQuantity = new FQuantity(1)) {
    super(name, value);
    // this.setComponent(markRaw(ConstantQuantityInput));
    this.use(setType, quantityType);
  }
}
