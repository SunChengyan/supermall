<template>
  <div>
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <swiper class="container" :options="swiperOption" ref="mySwiper">
      <swiper-slide class="indi-item" v-for="(slide, index) in banners" :key="index">
        <a :href="slide.link"><img :src="slide.image"></a>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>

    <recommend-view :recommends="recommends" />
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import RecommendView from './childComps/RecommendView'

import {getHomeMultidata} from "network/home";
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default{
  data() {
    return {
      // result: '',
      banners: [],
      recommends: [],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay:true
      }
    }
  },
  components: {
    NavBar,
    RecommendView,
    swiper,
    swiperSlide
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  created(){
    getHomeMultidata().then(res => {
      // this.result = res
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
  }
}
</script>
<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.indi-item {
  width: 100%;
  height: 220px;
}
.indi-item img{
  width: 100%;
}
</style>
