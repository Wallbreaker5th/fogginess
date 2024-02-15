<script setup lang="ts">
import Editor from './Editor.vue'
import { Download, Upload, Delete, Document } from '@element-plus/icons-vue';
</script>
<script lang="ts">
export default {
  components: {
    Editor
  },
  methods: {
    load() {
      const file = (this.$refs.jsonFile as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const json = JSON.parse(reader.result as string);
          (this.$refs.editor as any).load(json);
        };
        reader.readAsText(file);
      }
    }
  }
}
</script>
<template>
  <div class="main">
    <div class="toolbar">
      <el-button type="primary" @click="($refs.editor as any).save()" :icon="Download" class="tool-button" title="下载文件"
        circle></el-button>

      <input type="file" ref="jsonFile" accept=".json" style="display:none" @change="load" />
      <el-button type="primary" @click="($refs.jsonFile as any).click()" :icon="Upload" class="tool-button" title="加载文件"
        circle></el-button>

      <el-button type="primary" @click="($refs.editor as any).saveInBrowser()" :icon="Document" class="tool-button"
        title="保存草稿" circle></el-button>

      <el-popconfirm width="220" title="确定要清空吗？（无法撤销）" @confirm="($refs.editor as any).clear()">
        <template #reference>
          <el-button type="danger" :icon="Delete" class="tool-button" title="清空" circle></el-button>
        </template>
      </el-popconfirm>
    </div>
    <div style="flex-grow: 1">
      <Editor ref="editor" />
    </div>
  </div>
  <div class="footer">
    <div class="heading">Fogginess - 大物实验不确定度计算器</div>
    <div>
      <el-text>By <el-link href="https://www.wallbreaker5th.top">破壁人五号</el-link></el-text>
    </div>
    <div style="margin-left: 100px">
      <el-text>
        See also:
        <el-link href="https://dawu.feixu.site/">蜗壳大雾实验工具</el-link>
        By
        <el-link href="https://feixu.site">飞旭</el-link>
      </el-text>
    </div>
  </div>
</template>

<style scoped>
.footer {
  width: 90vw;
  height: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.heading {
  height: 20px;

  font-size: 18px;
  font-weight: bold;
  margin: 1rem;
}

.main {
  width: 95vw;
  height: 90vh;
  display: flex;
  flex-direction: row;
}

.toolbar {
  margin: 50px 5px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
}

.toolbar .el-button+.el-button {
  margin-left: 0;
}

.tool-button {
  margin: 5px 0;
}
</style>
