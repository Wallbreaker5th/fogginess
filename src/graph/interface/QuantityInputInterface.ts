import { markRaw } from "vue";
import { NodeInterface, setType } from "baklavajs";
import ConstantQuantityInput from "../component/ConstantQuantityInput.vue";
import { quantityType } from "../InterfaceTypes";
import { FQuantity } from "../../math/FQuantity";

export class QuantityInputInterface extends NodeInterface<
  Array<FQuantity> | FQuantity
> {
  constructor(name: string, value: Array<FQuantity> | FQuantity = new FQuantity(1), label: string = "") {
    super(name, value);
    ConstantQuantityInput.data = () => ({
      label: label,
      unit_: value instanceof FQuantity ? new FQuantity(1, value.unit) : new FQuantity(1),
      number_: value instanceof FQuantity ? value.number.v : 0
    });
    this.setComponent(markRaw(ConstantQuantityInput));
    this.use(setType, quantityType);
  }
}
