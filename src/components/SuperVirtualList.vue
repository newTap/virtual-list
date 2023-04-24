<template>
  <div class="container" ref="root" @scroll="scrollFn">
    <div class="list" :style="{ 'padding-top': `${translateY}px`,height: listHeight }">
      <slot :showData="showData"></slot>
      <!-- <li class="item" v-for="key in showData" :key="key">{{key}}</li> -->
    </div>
  </div>
</template>

<script>
import { ref, toRefs, watch, computed, onMounted } from 'vue'
export default {
  props: {
    // 单条数据高度
    itemHeight: {
      type: Number,
      required: true,
      default: 40
    },
    // 视口上下的缓冲区
    poolBuffer: {
      type: Number,
      required: true,
      default: 1
    },
    // 数据
    data: {
      type: Array,
      required: true,
      default: () => [...new Array(100).keys()]
    }
  },
  setup(props) {
    const { data, itemHeight, poolBuffer } = toRefs(props)
    const root = ref(null)
    // list 高度
    let listHeight = computed(() => data.value.length * itemHeight.value)
    // 动画的执行
    let animationFrame = false
    // 实际展示的数据值
    let showData = ref([])
    // 滚动值
    let translateY = ref(0)
    const scrollFn = function (e){
      let scrollTop = e.target.scrollTop
      // 下取整
      let current = Math.floor(scrollTop/itemHeight.value)
      if(animationFrame) return false
      animationFrame = true
      requestAnimationFrame(() => {
        animationFrame = false
        const range= [];
        range[0] = current -  poolBuffer.value;
        range[0] = Math.max(range[0], 0);
        range[1] =
          range[0] +
          Math.ceil(root.value.clientHeight / itemHeight.value) +
          // 算start的时候减去了一个poolBuffer，所以最后要加上 2 * poolBuffer
          poolBuffer.value*2;
        range[1] = Math.min(range[1], data.value.length );
        showData.value = data.value
        .slice(range[0], range[1]);
        translateY.value = range[0] * itemHeight.value;
      })
    }
    onMounted(() => {
      if (!root.value) return;
      const contentLines = Math.ceil(root.value.clientHeight / itemHeight.value);
      const totalLines = contentLines + poolBuffer.value;
      const range = [0, totalLines];
      showData.value = data.value
        .slice(range[0], range[1]);
    })
    return {
      listHeight: `${listHeight.value}px`,
      showData,
      translateY,
      scrollFn,
      root
    }
  }
}
</script>

<style scoped>
.container{
  width: 200px;
  height: 100%;
  border: 1px solid red;
  overflow-y:scroll;
  display: flex;
}
.list{
  list-style: none;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
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
