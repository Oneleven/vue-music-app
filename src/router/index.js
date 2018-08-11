import Vue from 'vue'
import Router from 'vue-router'
// import HomeRank from 'components/rank/rank'
// import HomeRecommend from 'components/recommend/recommend'
// import HomeSearch from 'components/search/search'
// import HomeSinger from 'components/singer/singer'
// import SingerDetail from 'components/singer-detail/singer-detail'
// import RecommendDetail from 'components/recommend-detail/recommend-detail'
// import RankDetail from 'components/rank-detail/rank-detail'
// import UserCenter from 'components/user-center/user-center'

const HomeRank = () => import('components/rank/rank')
const HomeRecommend = () => import('components/recommend/recommend')
const HomeSearch = () => import('components/search/search')
const HomeSinger = () => import('components/singer/singer')
const SingerDetail = () => import('components/singer-detail/singer-detail')
const RecommendDetail = () => import('components/recommend-detail/recommend-detail')
const RankDetail = () => import('components/rank-detail/rank-detail')
const UserCenter = () => import('components/user-center/user-center')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    }, {
      path: '/rank',
      component: HomeRank,
      children: [{
        path: ':id',
        component: RankDetail
      }]
    }, {
      path: '/recommend',
      component: HomeRecommend,
      children: [{
        path: ':id',
        component: RecommendDetail
      }]
    }, {
      path: '/search',
      component: HomeSearch,
      children: [{
        path: ':id',
        component: SingerDetail
      }]
    }, {
      path: '/singer',
      component: HomeSinger,
      children: [{
        path: ':id',
        component: SingerDetail
      }]
    }, {
      path: '/user',
      component: UserCenter
    }
  ]
})
