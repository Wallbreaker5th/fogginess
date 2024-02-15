<script lang="ts">
import { NodeInterface } from 'baklavajs';
import type { SelectInterface } from '../interface/BasicInterfaces';
import { PropType } from 'vue';

export default {
  props: {
    modelValue: {
      type: null,
      required: true,
    },
    intf: {
      type: NodeInterface as PropType<SelectInterface<any>>,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    options() {
      console.log(this.intf.options)
      return this.intf.options;
    },
    value: {
      get() {
        return this.modelValue;
      },
      set(value: any) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>
<template>
  <el-select v-model="value" size="small" :value-key="intf.valueKey">
    <el-option v-for="option in options" :label="option.text" :value="option.value" />
  </el-select>
</template>
