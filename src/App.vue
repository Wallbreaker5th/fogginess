<script setup lang="ts">
import Editor from './Editor.vue'
</script>

<template>
  <div class="main">
    <div style="flex-grow: 1">
      <Editor />
    </div>
    <div style="width: 50px; margin: 10px; background-color: white;">
      啊啊啊啊啊啊
    </div>
  </div>
  <div class="footer">
    <div class="heading">Foginess - 大物实验不确定度计算器</div>
    <div>By <a href="https://www.wallbreaker5th.top">破壁人五号</a></div>
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
</style>
