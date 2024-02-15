<script setup lang="ts">
import { Delete, Plus, Check, Close } from '@element-plus/icons-vue'
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
  data() {
    return {
      visible: false,
      textInput: ''
    }
  },
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
    },
    fromText(text: string) {
      // split by blank characters
      const parts = text.split(/\s+/);
      const result = [];
      for (let part of parts) {
        if (part === '') {
          continue;
        }
        result.push(parseFloat(part));
      }
      this.array = result;
      this.visible = false;
    }
  }
}

</script>

<template>
  <div class="constant-array-input-table">
    <div v-for="index in modelValue.length" :key="index" class="constant-array-input-cell">
      <el-input-number :modelValue="modelValue[index - 1]" @update:modelValue="updateItem(index - 1, $event)" size="small"
        class="constant-array-input-box" :controls="false" title="" :ref="'input' + index"
        @keydown.enter="moveFocus(index + 1)" @keydown.tab="moveFocus(index + 1)" />
      <el-button type="danger" :icon="Delete" size="small" class="constant-array-input-delete"
        @click="removeItem(index - 1)" circle />
    </div>
    <div class="constant-array-input-tools">
      <el-button type="primary" :icon="Plus" size="small" class="constant-array-input-add" @click="addItem" />
      <el-popover :visible="visible" placement="top" :width="200">
        <div class="constant-array-input-pop">
          <el-input type="textarea" v-model="textInput" placeholder="从 Excel 粘贴，或直接输入一组用空格分隔的数值" size="small" />
          <div class="constant-array-input-tools">
            <el-button type="primary" size="small" @click="fromText(textInput)" :icon="Check" />
            <el-button size="small" @click="visible = false" :icon="Close" />
          </div>  
        </div>
        <template #reference>
          <el-button @click="visible = true" size="small">从 Excel 粘贴</el-button>
        </template>
      </el-popover>
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

.constant-array-input-tools {
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

.constant-array-input-pop {
  font-size: 0.8em;
}

.constant-array-input-pop .constant-array-input-tools {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 3px;
}
</style>
