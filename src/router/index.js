import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Post from '@/components/Post'
import Get from '@/components/Get'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      alias: '/Home'
    },
    {
      path: '/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/get',
      name: 'Get',
      component: Get
    }
  ]
})
