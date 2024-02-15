<script lang="ts">
import { NodeInterface } from 'baklavajs';
import { el } from 'element-plus/es/locale/index.mjs';

export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    intf: {
      type: NodeInterface,
      required: true
    }
  },
  emits: ['update:modelValue'],
  computed: {
    checked: {
      get() {
        return this.modelValue;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', value);
      }
    },
    label() {
      return this.intf.name.split('/')[0];
    },
    description() {
      return this.intf.name.split('/')[1];
    }
  },
  components: { el }
}
</script>

<template>
  <el-checkbox v-model="checked" :label="label" :title="description" style="margin-top: -10px"/>
</template>
