<template>
  <div class="detailNavBar">
    <nav-bar>
      <div slot="left" class="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="返回">
      </div>
      <div slot="center" class="detailNavBarbox">
        <div v-for="(item, index) in titles" :key="index" class="detail-item"  @click="activeClick(index)" :class="{active: activeIndex === index}" >
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  data(){
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      activeIndex: 0
    }
  },
  components: {
    NavBar
  },
  methods: {
    backClick(){
      this.$router.back()
    },
    activeClick(index){
      this.activeIndex = index
      this.$emit('navBarClick', index)
    }
  }
}
</script>
<style scoped>
.detailNavBarbox{
  display: flex;
  font-size: 13px;
}
.detail-item{
  flex: 1;
}
.left img{
  margin-top: 14px;
  width: 15px;
}
.active{
  color: red;
}
</style>
