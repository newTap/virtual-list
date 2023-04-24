<script setup>
import { ref } from 'vue';
import VirtualList from './components/virtualList.vue'
import SuperVirtualList from './components/SuperVirtualList.vue'
 const list = [...new Array(100).keys()]
  // 单条数据高度
  const itemHeight = 40
  // 视口上下的缓冲区
  const poolBuffer = ref(1)
  const handlerBuffer = () => {
    poolBuffer.value = 2
  }
</script>

<template>
  <!-- <VirtualList/> -->
  <button @click="handlerBuffer">改变缓冲区</button>
  <div class="box">
    <SuperVirtualList v-slot="slotProps" :itemHeight="itemHeight" :poolBuffer="poolBuffer" :data="list">
     <ul class="list">
       <li class="item" v-for="item in slotProps.showData" :key="item">
          {{ item }}
      </li>
     </ul>
  </SuperVirtualList>
  </div>
</template>

<style scoped>
.list{
  list-style: none;
  padding: 0;
  margin: 0;
}
.box{
  height: 500px;
}
.item{
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  text-align: left;
  padding: 0;
  display: inline-block;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
