<script lang="ts">
export default {
  props: {
    modelValue: String,
  },
}

</script>

<template>
  <div class="error-display" v-if="modelValue">
    {{ modelValue }}
  </div>
</template>

<style scoped>
.error-display {
  color: #ffcccc;
}
</style>

