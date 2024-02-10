<script lang="ts">
import { NodeInterface } from 'baklavajs';

export default {
  props: {
    modelValue: {
      type: Number,
      required: true
    },
    intf: {
      type: NodeInterface,
      required: true
    }
  },
  emits: ['update:modelValue'],
  computed: {
    number: {
      get() {
        return this.modelValue;
      },
      set(value: number) {
        this.$emit('update:modelValue', value);
      }
    }
  }
};
</script>

<template>
  <div class="number-input">
    <div class="number-label">
      {{ intf.name }}
    </div>
    <el-input-number v-model="number" :controls="false" size="small" class="number-input-number" title=""/>
  </div>
</template>

<style scoped>
.number-input {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.number-label {
  margin-right: 5px;
}

.number-input-number {
  width: 60% !important;
}
</style>