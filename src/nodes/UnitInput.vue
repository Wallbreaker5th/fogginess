<!-- 
  This component is a custom input field for a unit.
  It contains seven input fields for the seven base units of the International System of Units (SI).
  It has also a text label to display the unit.
  So far its value can be 1 only.
 -->
<script lang="ts">
import { FUnit, BASIC_UNITS } from '../math/FUnit.ts';
import { FQuantity } from '../math/FQuantity.ts';

export default {
  props: {
    modelValue: {
      type: FQuantity,
      required: true
    },
  },
  data() {
    return {
      BASIC_UNITS: BASIC_UNITS
    }
  },
  computed: {
    exponents: {
      get() {
        return this.modelValue.unit.exponents;
      },
      set(value: Array<number>) {
        this.$emit('update:modelValue', new FQuantity(1, new FUnit(value)));
      }
    }
  }
}

</script>

<template>
  <div class="unit-input">
    <div class="unit-input-boxes">
      <div v-for="idx in 7" :key="idx" class="unit-input-box-container">
        <span class="unit-input-name">
          {{ BASIC_UNITS[idx - 1] }}
        </span>
        <input type="number" v-model="exponents[idx - 1]" class="unit-input-box" :data-test="'unit-input-box-' + idx" step="any"/>
      </div>
    </div>
    <div class="unit-label" data-test="unit-label">
      {{ modelValue.toString() }}
    </div>
  </div>
</template>

<style>
.unit-input-name {
  display: inline-block;
  font-size: 0.8em;
  width: 2em;
}
.unit-input-box {
  width: 3em;
}
.unit-input-box-container {
  display: inline-block;
  margin-left: 0.5em;
  margin-right: 0.5em;
}
</style>
