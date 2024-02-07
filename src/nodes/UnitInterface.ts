import { markRaw } from "vue";
import { NodeInterface, setType } from "baklavajs";
import UnitInput from "./UnitInput.vue";
import { quantityType } from "./InterfaceTypes";
import { FQuantity } from "../math/FQuantity";

export class UnitInterface extends NodeInterface {
  constructor(name: string, value: FQuantity = new FQuantity(1)) {
    super(name, value);
    this.setComponent(markRaw(UnitInput));
    this.use(setType, quantityType);
  }
}
