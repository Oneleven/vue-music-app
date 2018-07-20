import Vue from 'vue'
import Router from 'vue-router'
import HomeRank from 'components/rank/rank'
import HomeRecommend from 'components/recommend/recommend'
import HomeSearch from 'components/search/search'
import HomeSinger from 'components/singer/singer'
import SingerDetail from 'components/singer-detail/singer-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    }, {
      path: '/rank',
      component: HomeRank
    }, {
      path: '/recommend',
      component: HomeRecommend
    }, {
      path: '/search',
      component: HomeSearch
    }, {
      path: '/singer',
      component: HomeSinger,
      children: [{
        path: ':id',
        component: SingerDetail
      }]
    }
  ]
})
