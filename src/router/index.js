import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Home' }
  },
  {
    path: '/line/:line_code',
    name: 'Line',
    component: () => import('../views/Line.vue'),
    meta: { title: '路線別' }
  }
]

const DEFAULT_TITLE = 'Default Title'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to) => {
  document.title = to.meta.title || DEFAULT_TITLE
})

export default router
