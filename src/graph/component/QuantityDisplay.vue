<script lang="ts">
import { FQuantity } from '../../math/FQuantity';
import SingleQuantityDisplay from './SingleQuantityDisplay.vue';

export default {
  props: {
    modelValue: {
      type: [FQuantity, Array<FQuantity>],
      required: true
    },
  },
  data() {
    return {
      FQuantity: FQuantity
    }
  },
  components: {
    'single-quantity-display': SingleQuantityDisplay
  }
}

</script>

<template>
  <div class="quantity-display">
    <div v-if="modelValue instanceof FQuantity" class="quantity-display-single">
      <single-quantity-display :quantity="modelValue"></single-quantity-display>
    </div>
    <div v-else-if="modelValue instanceof Array" class="quantity-display-array">
      <div v-for="q in modelValue" class="quantity-display-array-item">
        <single-quantity-display :quantity="q"></single-quantity-display>
      </div>
    </div>
  </div>
</template>
