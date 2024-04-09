import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Codes from '@/pages/Codes'
import MyCode from '@/pages/MyCode'
import MyFavorite from '@/pages/MyFavorite'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/codes',
      name: 'codes',
      component: Codes
    },
    {
      path: '/my_code',
      name: 'my_code',
      component: MyCode
    },
    {
      path: '/my_favorite',
      name: 'my_favorite',
      component: MyFavorite
    }
  ]
})
