<script setup lang="ts">
import { Delete, Plus } from '@element-plus/icons-vue'
</script>
<script lang="ts">
export default {
  props: {
    modelValue: {
      type: Array<Number>,
      required: true
    }
  },
  emits: ['update:modelValue'],
  computed: {
    array: {
      get() {
        return this.modelValue;
      },
      set(value: Array<Number>) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  methods: {
    updateItem(index: number, value: number) {
      const newArray = this.modelValue.slice(0);
      newArray[index] = value;
      this.array = newArray;
    },
    removeItem(index: number) {
      const newArray = this.modelValue.slice(0);
      newArray.splice(index, 1);
      this.array = newArray;
    },
    addItem() {
      const newArray = this.modelValue.slice(0);
      newArray.push(0);
      this.array = newArray;
    },
    moveFocus(index: number) {
      if (index === this.modelValue.length + 1) {
        this.addItem();
      }
      this.$nextTick(() => {
        const input = (this.$refs['input' + index] as Array<any>)[0];
        if (input) {
          console.log(input as HTMLInputElement);
          (input as HTMLInputElement).focus();
        }
      });
    }
  }
}

</script>

<template>
  <div class="constant-array-input-table">
    <div v-for="index in modelValue.length" :key="index" class="constant-array-input-cell">
      <el-input-number :modelValue="modelValue[index - 1]" @update:modelValue="updateItem(index - 1, $event)" size="small"
        class="constant-array-input-box" :controls="false" title="" :ref="'input' + index" @keydown.enter="moveFocus(index+1)"
        @keydown.tab="moveFocus(index+1)" />
      <el-button type="danger" :icon="Delete" size="small" class="constant-array-input-delete"
        @click="removeItem(index - 1)" circle />
    </div>
    <div class="constant-array-input-cell">
      <el-button type="primary" :icon="Plus" size="small" class="constant-array-input-add" @click="addItem" />
    </div>
  </div>
</template>

<style scoped>
.constant-array-input-table {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.constant-array-input-cell {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 3px;
}

.constant-array-input-box {
  margin: 0 5px;
}

.constant-array-input-delete {
  margin: 0 5px;
}

.constant-array-input-add {
  width: 50px;
}
</style>
