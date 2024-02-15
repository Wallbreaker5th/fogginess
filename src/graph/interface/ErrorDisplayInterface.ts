import { markRaw } from "vue";
import { NodeInterface } from "baklavajs";
import ErrorDisplay from "../component/ErrorDisplay.vue";

export class ErrorDisplayInterface extends NodeInterface {
  constructor(name: string, value: any) {
    super(name, value);
    this.setComponent(markRaw(ErrorDisplay));
    this.setPort(false);
  }
}
