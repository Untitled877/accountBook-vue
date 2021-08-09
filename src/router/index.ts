import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Money from '@/views/Money.vue';
import Tags from '@/views/Labels.vue';
import EditTag from '@/views/EditTag.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/views/NotFound.vue';


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/money'
  },
  {
    path: '/money',
    component: Money
  },
  {
   path: '/tags',
   component: Tags
  },
  {
    path: '/tags/edit/:id',
    component: EditTag
  },
  {
    path:'/statistics',
    component: Statistics
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
