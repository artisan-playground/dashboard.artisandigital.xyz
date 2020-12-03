import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
Vue.use(Antd)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/',
    name: 'HomeDashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeDashboard.vue'),
  },
  {
    path: '/news',
    name: 'news',
    component: () => import(/* webpackChunkName: "about" */ '../views/news.vue'),
  },
  {
    path: '/news/eventDetail/:id',
    name: 'eventDetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/eventDetail.vue'),
  },
  {
    path: '/projects/',
    name: 'projectPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/projects.vue'),
  },
  {
    path: '/projects/:id',
    name: 'project',
    component: () => import(/* webpackChunkName: "about" */ '../views/project.vue'),
  },
  {
    path: '/projects/:id/editProject/:id',
    name: 'editProject',
    component: () => import(/* webpackChunkName: "about" */ '../views/editProject.vue'),
  },
  {
    path: '/projects/:id/members',
    name: 'memberInProject',
    component: () => import(/* webpackChunkName: "about" */ '../views/memberInProject.vue'),
  },
  {
    path: '/projects/:id/editmember',
    name: 'editmember',
    component: () => import(/* webpackChunkName: "about" */ '../views/editmember.vue'),
  },
  {
    path: '/projects/:id/members/addmember',
    name: 'addMemberToProject',
    component: () => import(/* webpackChunkName: "about" */ '../views/addMemberToProject.vue'),
  },
  {
    path: '/projects/:id/doneTask',
    name: 'doneTask',
    component: () => import(/* webpackChunkName: "about" */ '../views/doneTask.vue'),
  },
  {
    path: '/projects/:id/todayTask',
    name: 'todayTask',
    component: () => import(/* webpackChunkName: "about" */ '../views/todayTask.vue'),
  },
  {
    path: '/createProject',
    name: 'createProject',
    component: () => import(/* webpackChunkName: "about" */ '../views/createProject.vue'),
  },
  {
    path: '/projects/:id/createTask',
    name: 'createTask',
    component: () => import(/* webpackChunkName: "about" */ '../views/createTask.vue'),
  },
  {
    path: '/taskDetail/:id',
    name: 'taskDetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/taskDetail.vue'),
  },
  {
    path: '/taskDetail/:id/editMemberInTask',
    name: 'editMemberInTask',
    component: () => import(/* webpackChunkName: "about" */ '../views/editMemberInTask.vue'),
  },
  {
    path: '/taskDetail/:id/addMemberToTask',
    name: 'addMemberToTask',
    component: () => import(/* webpackChunkName: "about" */ '../views/addMemberToTask.vue'),
  },
  {
    path: '/taskDetail/:id/memberInTask/:id',
    name: 'memberInTask',
    component: () => import(/* webpackChunkName: "about" */ '../views/memberInTask.vue'),
  },
  {
    path: '/taskDetail/:id/editTask/:id',
    name: 'editTask',
    component: () => import(/* webpackChunkName: "about" */ '../views/editTask.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/register.vue'),
  },
  {
    path: '/forgetpassword',
    name: 'forgetpassword',
    component: () => import(/* webpackChunkName: "about" */ '../views/forgetpassword.vue'),
  },
  {
    path: '/testLogin',
    name: 'testLogin',
    component: () => import(/* webpackChunkName: "about" */ '../views/testLogin.vue'),
  },

  {
    path: '/members',
    name: 'members',
    component: () => import(/* webpackChunkName: "about" */ '../views/members.vue'),
  },
  {
    path: '/members/:id',
    name: 'profileMember',
    component: () => import(/* webpackChunkName: "about" */ '../views/profileMember.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/profile.vue'),
  },
  {
    path: '/editprofile',
    name: 'editprofile',
    component: () => import(/* webpackChunkName: "about" */ '../views/editprofile.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
