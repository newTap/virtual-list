<template>
  <div class="container" :style="{'height': containerHeight}" @scroll="scrollFn">
    <div class="empty" :style="{'height': height}"></div>
    <ul class="list" :style="{ 'transform': `translateY(${translateY}px)` }">
      <li class="item" v-for="key in showData" :key="key">{{key}}</li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const list = [...new Array(100).keys()]
    const height = list.length * 40
    // 单条数据高度
    const itemHeight = 40
    // 视口上下的缓冲区
    const poolBuffer = 1
    // 现实的视口高度
    const containerHeight = 500
    // 需要获取的数据条数
    const num = Math.ceil(containerHeight/itemHeight)
    let animation = false
    // 实际展示的数据值
    let showData = ref([])
    let translateY = ref(0)
    const changeShowData = function (current = 0) {
      if(animation) return false
      animation = true
      requestAnimationFrame(() => {
        animation = false
        let range = []
        range[0] = current - poolBuffer
        range[0] = Math.max(range[0], 0)
        range[1] = range[0] + num + 2 * poolBuffer
        range[1] = Math.min(range[1], list.length)
        showData.value = list.slice(range[0], range[1])
        translateY.value = current * itemHeight
      })
    }
    const scrollFn = function (e){
      let scrollTop = e.target.scrollTop
       let currentIndex = Math.floor(scrollTop/itemHeight)
      changeShowData(currentIndex)
    }
    changeShowData()
    return {
      height: `${height}px`,
      containerHeight: `${containerHeight}px`,
      showData,
      translateY,
      scrollFn
    }
  }
}
</script>

<style scoped>
.container{
  width: 200px;
  border: 1px solid red;
  overflow-y:scroll;
  display: flex;
}
.list{
  list-style: none;
  padding: 0;
  margin: 0;
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
</style>
