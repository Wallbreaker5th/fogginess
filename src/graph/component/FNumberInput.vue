<script lang="ts">
import { FNumber } from '../../math/FNumber';

export default {
  props: {
    modelValue: {
      type: FNumber,
      required: true
    }
  },
  emits: ['update:modelValue'],
  computed: {
    number: {
      get() {
        return this.modelValue.v;
      },
      set(value: number) {
        this.$emit('update:modelValue', new FNumber(value, this.modelValue.u, this.modelValue.p));
      }
    },
    uncertainty: {
      get() {
        return this.modelValue.u;
      },
      set(value: number) {
        this.$emit('update:modelValue', new FNumber(this.modelValue.v, value, this.modelValue.p));
      }
    },
    probability: {
      get() {
        return this.modelValue.p;
      },
      set(value: number) {
        this.$emit('update:modelValue', new FNumber(this.modelValue.v, this.modelValue.u, value));
      }
    }
  }
};

</script>

<template>
  <div class="number-input">
    <el-input-number v-model="number" :controls="false" size="small" class="number-input-number" title="" />
    <div class="uncertainty-label">±</div>
    <el-input-number v-model="uncertainty" :controls="false" size="small" class="number-input-uncertainty" title="" />
    <div class="probability-label">P=</div>
    <el-input-number v-model="probability" :controls="false" size="small" class="number-input-probability" title="" />
  </div>
</template>

<style scoped>
.number-input {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.number-input-number {
  width: 3em;
}

.number-input-uncertainty {
  width: 3em;
}

.number-input-probability {
  width: 3em;
}

.uncertainty-label {
  font-size: 0.8em;
}

.probability-label {
  font-size: 0.8em;
}
</style>
