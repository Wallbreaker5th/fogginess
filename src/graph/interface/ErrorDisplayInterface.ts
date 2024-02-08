import { markRaw } from "vue";
import { NodeInterface, setType } from "baklavajs";
import ErrorDisplay from "../component/ErrorDisplay.vue";

export class ErrorDisplayInterface extends NodeInterface<string> {
  constructor(name: string, value: string = "") {
    super(name, value);
    this.setComponent(markRaw(ErrorDisplay));
    this.setPort(false);
  }
}
