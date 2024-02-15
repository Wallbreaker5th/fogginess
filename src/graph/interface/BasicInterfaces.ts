import { markRaw } from "vue";
import { NodeInterface } from "baklavajs";
import NumberInput from "../component/NumberInput.vue";
import TextInput from "../component/TextInput.vue";
import SelectInput from "../component/SelectInput.vue";
import TextDisplay from "../component/TextDisplay.vue";

export class NumberInterface extends NodeInterface<number> {
  constructor(name: string, value: number = 0) {
    super(name, value);
    this.setComponent(markRaw(NumberInput));
    this.setPort(false);
  }
}

export class TextInputInterface extends NodeInterface<string> {
  constructor(name: string, value: string = "") {
    super(name, value);
    this.setComponent(markRaw(TextInput));
    this.setPort(false);
  }
}

export class SelectInterface<T> extends NodeInterface<T> {
  options: Array<{ text: string; value: T }>;
  valueKey: string;
  constructor(name: string, value: T, options: Array<{ text: string; value: T }>, valueKey: string = "") {
    super(name, value);
    this.setComponent(markRaw(SelectInput));
    this.setPort(false);
    this.options = options;
    this.valueKey = valueKey;
  }
}

export class TextInterface extends NodeInterface<string> {
  constructor(name: string, value: string = "") {
    super(name, value);
    this.setComponent(markRaw(TextDisplay));
    this.setPort(false);
  }
}
