<script lang="ts">
export default {
  props: {
    modelValue: {
      type: String,
      required: true
    }
  }
};
</script>

<template>
  <div class="text-display">
    {{ modelValue }}
  </div>
</template>
