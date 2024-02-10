import { markRaw } from "vue";
import { NodeInterface } from "baklavajs";
import ConstantArrayInput from "../component/ConstantArrayInput.vue";

export class ConstantArrayInputInterface extends NodeInterface<Array<number>> {
  constructor(name: string, value: Array<number> = [0]) {
    super(name, value);
    this.setComponent(markRaw(ConstantArrayInput));
    this.setPort(false);
  }
}
