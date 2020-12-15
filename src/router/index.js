import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about", webpackPrefetch: true */ '../views/About.vue')
  },
  {
    path: '/love',
    name: 'love',
    component: () => import(/* webpackChunkName: "love", webpackPrefetch: true */ '../views/love.vue')
  }
]


const router = new VueRouter({
  mode: 'history',
  base: window.__POWERED_BY_QIANKUN__ ? "/parent/vue" : process.env.BASE_URL,
  routes
})

router.onError((error) => {
  const pattern = /Loading chunk \W*/g;
  const isChunkLoadFailed = pattern.test(error.message);
  console.log(isChunkLoadFailed, 'value', error.message, '=>', error)
  if (isChunkLoadFailed) {
      // window.location.reload();
      console.log(this.$route)
  } else {
      throw error
  }
})

export default router
