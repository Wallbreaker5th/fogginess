<script setup lang="ts">
import { Check } from '@element-plus/icons-vue'
</script>
<script lang="ts">
import { FQuantity } from '../../math/FQuantity';
import { parseUnit } from '../../math/ParseUnit';

export default {
  props: {
    modelValue: {
      type: FQuantity,
      required: true
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      input: ''
    };
  },
  methods: {
    updateModelValue() {
      this.$emit('update:modelValue', parseUnit(this.input));
    }
  },
}
</script>

<template>
  <div class="unit-input">
    <div class="unit-input-row">
      <el-input v-model="input" class="unit-input-box" placeholder="例: um^-1 kOhm/kg^2" size="small"
        @keyup.enter="updateModelValue" />
      <el-button @click="updateModelValue" :icon="Check" size="small" class="unit-input-button" />
    </div>
    <div class="unit-label" data-test="unit-label">
      <span style="font-size: 0.8em;">单位:</span>
      {{ modelValue.toString() }}
    </div>
  </div>
</template>

<style scoped>
.unit-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 0.3em;
}

.unit-input-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.unit-input-box {
  width: 1fr;
  margin-right: 0pt;
}

.unit-input-button {
  width: 1em;
}
</style>
