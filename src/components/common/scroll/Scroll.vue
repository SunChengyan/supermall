<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'

export default {
  data(){
    return{
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default(){
        return 0
      }
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted(){
    // 1.创建Scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    }),
    // 2.监听滚动位置坐标
    this.scroll.on('scroll',(onScrollXY) => {
      // console.log(onScrollXY)
      this.$emit('scroll', onScrollXY)
    }),
    // 3.监听scroll滚动到底部下拉加载更多
    this.scroll.on('pullingUp', () => {
      // console.log('上拉加载更多')
      this.$emit('pullingUp')
    })
  }
}
</script>
<style scoped>

</style>
