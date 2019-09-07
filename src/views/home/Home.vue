<template>
  <div class="home wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pullUpLoad="true" @pullingUp="loadMore">
      <swiper class="container" :options="swiperOption" ref="mySwiper">
        <swiper-slide class="indi-item" v-for="(slide, index) in banners" :key="index">
          <a :href="slide.link"><img :src="slide.image" @load="imageLoad"></a>
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl2" />
      <good-list :goods="goods[currentType].list"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow" />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodList'
import BackTop from 'components/content/backTop/BackTop'

import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import {getHomeMultidata, getHomeGoods} from "network/home";
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
      },
      titles: ['流行', '新款', '精选'],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      isShow: false,
      tabOffsetTop: 0,
      isTabFixed: false
    }
  },
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodList,
    BackTop,
    RecommendView,
    FeatureView,
    swiper,
    swiperSlide
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  created(){
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted(){
    // 1. GoodListItem中图片加载完成的事件监听
    this.$bus.$on('itemImageLoadHome', () =>{
      // console.log('----')
      setTimeout(() => {
        this.$refs.scroll.scroll.refresh()
      },2500)
    })
  },
  methods: {
    /*
     事件监听相关
    */
    tabClick(index){
      // console.log(index)
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
        default:
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick(){
      // console.log(this.$refs.scroll.scroll)
      this.$refs.scroll.scroll.scrollTo(0, 0, 500)
    },
    contentScroll(onScrollXY){
      // console.log(onScrollXY)
      this.isShow = onScrollXY.y < -500 // 监听返回顶部 BcakTop 是否显示
      this.isTabFixed = (-onScrollXY.y) > this.tabOffsetTop // 监听 tabControl 是否吸顶显示
    },
    loadMore(){
      // console.log('加载更多')
      this.getHomeGoods(this.currentType)
    },
    imageLoad(){
      // 2. 获取 tabControl 组件的 offsetTop (所有组件都有一个属性$el用于获取组件中元素的)
      // console.log(this.$refs.tabControl2.$el.offsetTop)
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    /*
      网络请求相关
    */
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        // this.result = res
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1 // 当前页数+1
      getHomeGoods(type, page).then(res => {
        // console.log(res)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page + 1

        // 完成上拉加载更多
        this.$refs.scroll.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
.home{
  position: relative;
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  z-index: 9;
}
.indi-item {
  width: 100%;
  /* padding-top: 44px; */
}
.indi-item img{
  width: 100%;
}
.tab-control {
  /* position: sticky;
  top: 44px;
  z-index: 9; */
  position: relative;
  z-index: 9;
}
.content{
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
  /* height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px; */
}
</style>
