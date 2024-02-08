<script lang="ts">
import { FQuantity } from '../../math/FQuantity';


export default {
  props: {
    quantity: {
      type: FQuantity,
      required: true
    },
  }
}

</script>

<template>
  <div class="single-quantity-display">
    {{ quantity.toString() }}
  </div>
</template>
