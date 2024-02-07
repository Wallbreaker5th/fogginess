<template>
  <baklava-editor :view-model="baklava" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BaklavaInterfaceTypes, EditorComponent, useBaklava } from "baklavajs";
import "@baklavajs/themes/dist/syrup-dark.css";
import ConstantQuantityInputNode from "./nodes/ConstantQuantityInputNode";
import { quantityType } from "./nodes/InterfaceTypes";

export default defineComponent({
  components: {
    "baklava-editor": EditorComponent,
  },
  setup() {
    const baklava = useBaklava();
    baklava.editor.registerNodeType(ConstantQuantityInputNode);
    const nodeInterfaceTypes = new BaklavaInterfaceTypes(baklava.editor, { viewPlugin: baklava });
    nodeInterfaceTypes.addTypes(quantityType);
    return { baklava };
  },
});
</script>