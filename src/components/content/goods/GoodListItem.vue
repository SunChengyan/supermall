<template>
  <div class="goodsListItem" @click="itemClick">
    <img :src="showImg" class="goodsImg" @load="imageLoad">
    <div class="goodsText">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'goodsListItem',
    props: {
      goodsItem: ''
    },
    computed: {
      showImg(){
        return this.goodsItem.image || this.goodsItem.show.img
        console.log('img', this.goodsItem.image)
      }
    },
    methods: {
      imageLoad(){
        // console.log('图片加载完成')
        if(this.$route.path.indexOf('/home')){
          this.$bus.$emit('itemImageLoadHome')
        } else if(this.$route.path.indexOf('/detail')){
          this.$bus.$emit('itemImageLoadDetail')
        }
      },
      itemClick(){
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    }
  }
</script>
<style scoped>
.goodsListItem{
  width: 48%;
  margin: 10px 0;
}
.goodsText{
  text-align: center;
}
.goodsText p{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  line-height: 22px;
}
.goodsImg{
  width: 100%;
  border-radius: 5px;
  font-size: 15px;
  line-height: 20px;
}
.price{
  font-size: 15px;
  color: var(--color-high-text);
  margin-right: 20px;
}
.collect {
    position: relative;
    z-index: 8;
  }
.collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
