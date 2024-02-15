<template>
  <baklava-editor :view-model="baklava" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BaklavaInterfaceTypes, EditorComponent, useBaklava, DependencyEngine, applyResult } from "baklavajs";
import "@baklavajs/themes/dist/syrup-dark.css";
import { quantityType, quantitySingleType, quantityArrayType, measurerType } from "./graph/InterfaceTypes";
import ConstantQuantityInputNode from "./graph/node/ConstantQuantityInputNode";
import ConstantQuantityArrayInputNode from "./graph/node/ConstantQuantityArrayInputNode";
import ExpressionNode from "./graph/node/ExpressionNode";
import QuantityDisplayNode from "./graph/node/QuantityDisplayNode";
import QuantityInputNode from "./graph/node/QuantityInputNode";
import MeasurerInputNode from "./graph/node/MeasurerInputNode";
import MeasureNode from "./graph/node/MeasureNode";
import LinearRegressionNode from "./graph/node/LinearRegressionNode";
import { FNumber } from "./math/FNumber";
import { FUnit } from "./math/FUnit";
import { FQuantity } from "./math/FQuantity";
import { FMeasurer } from "./math/FMeasurer";

function foggify(json: any) {
  if (json.__FType) {
    switch (json.__FType) {
      case "FQuantity":
        return FQuantity.fromJSON(json);
      case "FMeasurer":
        return FMeasurer.fromJSON(json);
      case "FUnit":
        return FUnit.fromJSON(json);
      case "FNumber":
        return FNumber.fromJSON(json);
      default:
        return json;
    }
  } else if (Array.isArray(json)) {
    for (let i = 0; i < json.length; i++) {
      json[i] = foggify(json[i]);
    }
    return json;
  } else if (typeof json === "object") {
    for (let key in json) {
      json[key] = foggify(json[key]);
    }
    return json;
  } else {
    return json;
  }
}

function download(text: string) {
  const blob = new Blob([text], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "foginess-" + new Date().toISOString().replace(/:/g, "-") + ".json";
  a.click();
  window.URL.revokeObjectURL(url);
}

export default defineComponent({
  components: {
    "baklava-editor": EditorComponent,
  },
  methods: {
    save() {
      download(JSON.stringify(this.baklava.editor.save()));
    },
    load(obj: any) {
      this.baklava.editor.load(foggify(obj));
      console.log("Loaded");
    }
  },
  setup() {
    const baklava = useBaklava();
    const engine = new DependencyEngine(baklava.editor);

    const s_input="\u200b\u200b\u200b\u200b输入";
    const s_output="\u200b\u200b\u200b显示";
    const s_calculate="\u200b\u200b计算";
    const s_measure="\u200b测量";
    baklava.editor.registerNodeType(ConstantQuantityInputNode, {category: s_input});
    baklava.editor.registerNodeType(ConstantQuantityArrayInputNode, {category: s_input});
    baklava.editor.registerNodeType(QuantityInputNode, {category: s_input});

    baklava.editor.registerNodeType(QuantityDisplayNode, {category: s_output});

    baklava.editor.registerNodeType(ExpressionNode, {category: s_calculate});
    baklava.editor.registerNodeType(LinearRegressionNode, {category: s_calculate});

    baklava.editor.registerNodeType(MeasurerInputNode, {category: s_measure});
    baklava.editor.registerNodeType(MeasureNode, {category: s_measure});

    const nodeInterfaceTypes = new BaklavaInterfaceTypes(baklava.editor, { viewPlugin: baklava });
    nodeInterfaceTypes.addTypes(quantityType, quantitySingleType, quantityArrayType, measurerType);

    if (localStorage.getItem("foginess")) {
      let json = JSON.parse(localStorage.getItem("foginess")!);
      // Recursively check json, and replace any object with a __FType property with the correct type
      json = foggify(json);
      baklava.editor.load(json);
    }

    const token = Symbol();
    engine.events.afterRun.subscribe(token, (result) => {
      engine.pause();
      applyResult(result, baklava.editor);
      engine.resume();
    });
    engine.start();

    // Add auto-save every 2 seconds
    setInterval(() => {
      localStorage.setItem("foginess", JSON.stringify(baklava.editor.save()));
    }, 2000);

    return { baklava };
  },
});
</script>

<style>
.baklava-node-palette h1 {
  font-size: 1em;
  margin-top: 0.5em;
  margin-bottom: 0;
  text-align: left;
  font-weight: 400;
}
</style>