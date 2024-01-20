<script setup lang="ts">
import Editor from './Editor.vue'
</script>

<template>
  <div class="heading">
    Foginess - 大物实验不确定度计算器
  </div>
  <div class="main">
    <div style="flex-grow: 1">
      <Editor />
    </div>
    <div style="width: 50px; margin: 10px; background-color: white;">
      啊啊啊啊啊啊
    </div>
  </div>
  <div>
    By <a href="https://www.wallbreaker5th.top">破壁人五号</a>
  </div>
</template>

<style scoped>
.heading {
  width: 90vw;
  height: 20px;

  font-size: 18px;
  font-weight: bold;
  margin: 1rem;
}

.main {
  width: 90vw;
  height: 80vh;
  display: flex;
  flex-direction: row;
}</style>
