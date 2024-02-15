<script lang="ts">
import { PropType } from 'vue';
export default {
  props: {
    modelValue: {
      // Two arrays of numbers
      type: Object as PropType<[Array<number>, Array<number>]>,
      required: true,
    },
  },
  data() {
    return {
      xCoef: 1,
      yCoef: 1,
      twoRows: false,
      visible: false,
    };
  },
  computed: {
    table() {
      if (this.twoRows) {
        return this.modelValue[0].map(x => (x * this.xCoef).toString()).join('\t') + '\n' +
          this.modelValue[1].map(y => (y * this.yCoef).toString()).join('\t');
      } else {
        return this.modelValue[0].map((x, i) => (x * this.xCoef).toString() + '\t' + (this.modelValue[1][i] * this.yCoef).toString()).join('\n');
      }
    }
  },
  methods: {
    toPaste() {
      navigator.clipboard.writeText(this.table);
    }
  }
};
</script>

<template>
  <el-popover placement="top" width="300" :visible="visible">
    <template #reference>
      <el-button size="small" @click="visible = !visible">导出</el-button>
    </template>
    <div class="export-two-arrays">
      <el-switch v-model="twoRows" active-text="两行" inactive-text="两列" />
      <div style="display: flex; justify-content: space-between;">
        <el-text size="small">X 系数</el-text>
        <el-input-number class="export-two-arrays-coef" v-model="xCoef" size="small" :controls="false" title="" />
        <el-text size="small">Y 系数</el-text>
        <el-input-number class="export-two-arrays-coef" v-model="yCoef" size="small" :controls="false" title="" />
      </div>
      <el-input type="textarea" :rows="5" :value="table" readonly style="margin: 5px;" />
      <div style="display: flex; justify-content: flex-end;">
        <el-text size="small" style="margin-right: 10px;">可直接粘贴至 Excel</el-text>
        <el-button size="small" type="primary" @click="toPaste">复制</el-button>
        <el-button size="small" @click="visible = false">确定</el-button>
      </div>
    </div>
  </el-popover>
</template>
<style scoped>
.export-two-arrays-coef {
  width: 70px !important;
}
</style>
