import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateTicket from '../views/CreateTicket.vue'
import Post from '../views/Post.vue'
import EditPost from '../views/EditPost.vue'
import CheckPost from '../views/AdminCheckPost.vue'
import Admin from '../views/Admin.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/add-post',
    name: 'add-post',
    component: CreateTicket
  },
  {
    path: '/post/:id',
    name: 'post',
    component: Post
  },
  {
    path: '/edit-post',
    name : 'edit-post',
    component: EditPost
  },{
    path: '/checkPost/:id',
    name: 'checkPost',
    component: CheckPost

  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
