import { markRaw } from "vue";
import { NodeInterface } from "baklavajs";
import NumberInput from "../component/NumberInput.vue";

export class NumberInterface extends NodeInterface<number> {
  constructor(name: string, value: number = 0) {
    super(name, value);
    this.setComponent(markRaw(NumberInput));
    this.setPort(false);
  }
}
