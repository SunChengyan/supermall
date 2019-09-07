<template>
  <div class="recommend">
    <div v-for="(item, index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="推荐图片" class="recommend-img">
        <p>{{ item.title }}</p>
      </a>
    </div>
  </div>
</template>
<script>
export default{
  props: {
    recommends: {
      type: Array,
      default(){ //默认返回空
        return[]
      }
    }
  }
}
</script>
<style scoped>
.recommend{
  display: flex;
  width: 100%;
  text-align: center;
  padding: 10px 0 20px;
  border-bottom: 5px solid #eee;
}
.recommend-item{
  flex: 1;
}
.recommend-img{
  width: 65px;
  height: 65px;
  vertical-align: middle;
  margin-bottom: 5px;
}
</style>
