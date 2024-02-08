import { markRaw } from "vue";
import { NodeInterface, setType } from "baklavajs";
import UnitInput from "../component/UnitInput.vue";
import { quantitySingleType } from "../InterfaceTypes";
import { FQuantity } from "../../math/FQuantity";

export class UnitInterface extends NodeInterface<FQuantity> {
  constructor(name: string, value: FQuantity = new FQuantity(1)) {
    super(name, value);
    this.setComponent(markRaw(UnitInput));
    this.use(setType, quantitySingleType);
  }
}
