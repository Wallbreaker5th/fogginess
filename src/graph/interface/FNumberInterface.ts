import { markRaw } from "vue";
import { NodeInterface } from "baklavajs";
import FNumberInput from "../component/FNumberInput.vue";
import { FNumber } from "../../math/FNumber";

export class FNumberInterface extends NodeInterface<FNumber> {
  constructor(name: string, value: FNumber = FNumber.constant(0)) {
    super(name, value);
    this.setComponent(markRaw(FNumberInput));
    this.setPort(false);
  }
}
