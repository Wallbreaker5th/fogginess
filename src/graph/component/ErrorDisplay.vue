<script lang="ts">
export default {
  props: {
    modelValue: {
      type: null,
      required: true
    }
  },
  computed: {
    message() {
      const e = this.modelValue;
      if (typeof e === 'string') {
        return e;
      } else if (e instanceof Error) {
        return e.message;
      } else {
        return "Unknown error";
      }
    }
  }
}

</script>

<template>
  <div class="error-display" v-if="modelValue">
    {{ message }}
  </div>
</template>

<style scoped>
.error-display {
  color: #ffcccc;
}
</style>

