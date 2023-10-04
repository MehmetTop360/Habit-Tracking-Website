import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainPage.vue'

const routes = [
  {
    path: '/day/:date',
    name: 'DayView',
    component: MainView,
    props: true
  },
  {
    path: '/',
    redirect: `/day/${new Date().toISOString().slice(0, 10)}`
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
