<template>
  <div class="goods">
    <good-list-item v-for="(item, index) in goods" :key="index" :goodsItem="item" />
  </div>
</template>
<script>
import GoodListItem from './GoodListItem'
  export default{
    name: 'goodList',
    props: {
      goods: ''
    },
    components: {
      GoodListItem
    }
  }
</script>
<style scoped>
.goods{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
