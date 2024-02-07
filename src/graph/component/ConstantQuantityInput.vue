<script lang="ts">
import UnitInput from './UnitInput.vue';

import { FQuantity } from '../../math/FQuantity';


export default {
  props: {
    modelValue: {
      type: FQuantity,
      required: true
    },
  },
  data() {
    return {
      label: '',
      number_: 0,
      unit_: new FQuantity(1)
    }
  },
  components: {
    'unit-input': UnitInput
  },
  emits: ['update:modelValue'],
  computed: {
    number: {
      get() {
        return this.number_;
      },
      set(value: number) {
        this.number_ = value;
        this.$emit('update:modelValue', this.unit.mul(new FQuantity(value)));
      }
    },
    unit: {
      get() {
        return this.unit_;
      },
      set(value: FQuantity) {
        this.unit_ = value;
        this.$emit('update:modelValue', value.mul(new FQuantity(this.number)));
      }
    }
  },
  // watch: {
  //   modelValue: {
  //     immediate: true,
  //     handler(value: FQuantity) {
  //       this.number_ = value.number.v;
  //       this.unit_ = new FQuantity(1, value.unit);
  //     }
  //   }
  // }
}

</script>

<template>
  <div class="constant-quantity-input">
    <div v-if="label != ''" class="constant-quantity-input-label">{{ label }}</div>
    <div class="constant-quantity-input-boxes">
      <unit-input v-model="unit" />
      <input type="number" v-model="number" class="constant-quantity-input-box" data-test="constant-quantity-input-box"
        step="any" />
    </div>
  </div>
</template>

<style scoped>
.constant-quantity-input {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.constant-quantity-input-label {
  width: 1em;
  text-align: center;
}

.constant-quantity-input-box {
  width: 100%;
}
</style>
