<template>
  <baklava-editor :view-model="baklava" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BaklavaInterfaceTypes, EditorComponent, useBaklava, DependencyEngine, applyResult } from "baklavajs";
import "@baklavajs/themes/dist/syrup-dark.css";
import ConstantQuantityInputNode from "./graph/node/ConstantQuantityInputNode";
import ExpressionNode from "./graph/node/ExpressionNode";
import { quantityType, quantitySingleType, measurerType } from "./graph/InterfaceTypes";
import QuantityDisplayNode from "./graph/node/QuantityDisplayNode";
import QuantityInputNode from "./graph/node/QuantityInputNode";
import MeasurerInputNode from "./graph/node/MeasurerInputNode";
import MeasureNode from "./graph/node/MeasureNode";

export default defineComponent({
  components: {
    "baklava-editor": EditorComponent,
  },
  setup() {
    const baklava = useBaklava();
    const engine = new DependencyEngine(baklava.editor);

    baklava.editor.registerNodeType(ConstantQuantityInputNode);
    baklava.editor.registerNodeType(QuantityInputNode);
    baklava.editor.registerNodeType(QuantityDisplayNode);
    baklava.editor.registerNodeType(ExpressionNode);
    baklava.editor.registerNodeType(MeasurerInputNode);
    baklava.editor.registerNodeType(MeasureNode);

    const nodeInterfaceTypes = new BaklavaInterfaceTypes(baklava.editor, { viewPlugin: baklava });
    nodeInterfaceTypes.addTypes(quantityType, quantitySingleType, measurerType);
    
    const token = Symbol();
    engine.events.afterRun.subscribe(token, (result) => {
      engine.pause();
      applyResult(result, baklava.editor);
      engine.resume();
    });
    engine.start();
    return { baklava };
  },
});
</script>