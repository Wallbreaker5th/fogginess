<template>
    <baklava-editor :view-model="baklava" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { EditorComponent, useBaklava } from "@baklavajs/renderer-vue";
import "@baklavajs/themes/dist/syrup-dark.css";

export default defineComponent({
    components: {
        "baklava-editor": EditorComponent,
    },
    setup() {
        const baklava = useBaklava();
        return { baklava };
    },
});
</script>