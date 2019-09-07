<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @navBarClick="navBarClick" />
    <scroll class="content" ref="scroll">
      <swiper :options="swiperOption" ref="mySwiper" class="swiperItem">
        <swiper-slide v-for="(item, index) in topImages" :key="index" >
          <img :src="item" alt="">
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo" ref="param"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <good-list :goods="goodsList" ref="recommend"/>
    </scroll>
  </div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodList from 'components/content/goods/GoodList'

import Scroll from 'components/common/scroll/Scroll'
import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  data(){
    return {
      swiperOption: {
        notNextTick: true,
        autoplay: 3000,
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      goodsList: [],
      themeTops: []
    }
  },
  components: {
    swiper,
    swiperSlide,
    Scroll,
    DetailNavBar,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodList
  },
  created(){
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
    // console.log(this.iid)
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages
      // 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //获取商家信息
      this.shop = new Shop(data.shopInfo)
      // 保存商品的详情数据
      this.detailInfo = data.detailInfo;
      // 获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 获取评论信息
      this.commentInfo = data.rate.list[0]
    }),
    getRecommend().then(res => {
      // console.log('getRecommend-res', res)
      this.goodsList = res.data.list
    })
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted(){
    // 1. GoodListItem中图片加载完成的事件监听
    this.$bus.$on('itemImageLoadDetail', () =>{
      // console.log('----')
      setTimeout(() => {
        this.$refs.scroll.scroll.refresh()
      },1500)
    })
  },
  methods: {
    imageLoad(){
      this.$refs.scroll.scroll.refresh()

      // 获取对应的offsetTop
      this.themeTops = []
      this.themeTops.push(0)
      this.themeTops.push(this.$refs.param.$el.offsetTop)
      this.themeTops.push(this.$refs.comment.$el.offsetTop)
      this.themeTops.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeTops)
    },
    navBarClick(index){
      // console.log(index)
      this.$refs.scroll.scroll.scrollTo(0,-this.themeTops[index],200)
    }
  }
}
</script>
<style scoped>
.swiperItem{
  height: 300px;
  overflow: hidden;
 }
.detail{
  position: relative;
  z-index: 9;
  background: #fff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background: #fff;
}
.content{
  height: calc(100% - 44px);
  /* position: absolute;
  top: 44px;
  left: 0;
  right: 0; */
}
</style>
