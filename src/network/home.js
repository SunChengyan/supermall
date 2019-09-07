import {request} from "./request";

/* 轮播 */
export function getHomeMultidata() {
  return request({
    url: '/api/v1/home/multidata'
  })
}
/* 商品列表 */
export function getHomeGoods(type, page) {
  return request({
    url: '/api/v1/home/data',
    params: {
      type,
      page
    }
  })
}
