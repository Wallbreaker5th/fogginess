<script lang="ts">
import { NodeInterface } from 'baklavajs';

export default {
  props: {
    modelValue: {
      type: String,
      required: true
    },
    intf: {
      type: NodeInterface,
      required: true
    }
  },
  emits: ['update:modelValue'],
  computed: {
    text: {
      get() {
        return this.modelValue;
      },
      set(value: string) {
        this.$emit('update:modelValue', value);
      }
    }
  }
};
</script>

<template>
  <div class="text-input">
    <div class="text-label">
      {{ intf.name }}
    </div>
    <el-input size="small" class="text-input-text" title="" v-model="text" />
  </div>
</template>

<style scoped>
.text-input {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.text-label {
  margin-right: 5px;
}

.text-input-text {
  width: 60% !important;
}
</style>