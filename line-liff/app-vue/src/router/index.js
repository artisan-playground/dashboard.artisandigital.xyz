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
    component: () => import('../views/HomeDashboard.vue'),
  },
  {
    path: '/MyOverdueTask',
    name: 'MyOverdueTask',
    component: () => import('../views/MyOverdueTask.vue'),
  },
  {
    path: '/MyDeadlineTask',
    name: 'MyDeadlineTask',
    component: () => import('../views/MyDeadlineTask.vue'),
  },
  {
    path: '/MyTodayTask',
    name: 'MyTodayTask',
    component: () => import('../views/MyTodayTask.vue'),
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../views/News.vue'),
  },
  {
    path: '/news/eventDetail/:id',
    name: 'EventDetail',
    component: () => import('../views/EventDetail.vue'),
  },
  {
    path: '/projects/',
    name: 'Projects',
    component: () => import('../views/Projects.vue'),
  },
  {
    path: '/projects/:id',
    name: 'Project',
    component: () => import('../views/Project.vue'),
  },
  {
    path: '/projects/:id/editProject/:id',
    name: 'EditProject',
    component: () => import('../views/EditProject.vue'),
  },
  {
    path: '/projects/:id/members',
    name: 'MemberInProject',
    component: () => import('../views/MemberInProject.vue'),
  },
  {
    path: '/projects/:id/editMemberInProject',
    name: 'EditMemberInProject',
    component: () => import('../views/EditMemberInProject.vue'),
  },
  {
    path: '/projects/:id/members/addmember',
    name: 'AddMemberToProject',
    component: () => import('../views/AddMemberToProject.vue'),
  },
  {
    path: '/projects/:id/doneTask',
    name: 'DoneTask',
    component: () => import('../views/DoneTask.vue'),
  },
  {
    path: '/projects/:id/todayTask',
    name: 'TodayTask',
    component: () => import('../views/TodayTask.vue'),
  },
  {
    path: '/createProject',
    name: 'CreateProject',
    component: () => import('../views/CreateProject.vue'),
  },
  {
    path: '/projects/:id/createTask',
    name: 'CreateTask',
    component: () => import('../views/CreateTask.vue'),
  },
  {
    path: '/taskDetail/:id',
    name: 'TaskDetail',
    component: () => import('../views/TaskDetail.vue'),
  },
  {
    path: '/taskDetail/:id/editMemberInTask',
    name: 'EditMemberInTask',
    component: () => import('../views/EditMemberInTask.vue'),
  },
  {
    path: '/taskDetail/:id/addMemberToTask',
    name: 'AddMemberToTask',
    component: () => import('../views/AddMemberToTask.vue'),
  },
  {
    path: '/taskDetail/:id/memberInTask/:id',
    name: 'MemberInTask',
    component: () => import('../views/MemberInTask.vue'),
  },
  {
    path: '/taskDetail/:id/editTask/:id',
    name: 'EditTask',
    component: () => import('../views/EditTask.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/forgetpassword',
    name: 'Forgetpassword',
    component: () => import('../views/Forgetpassword.vue'),
  },
  {
    path: '/testLogin',
    name: 'TestLogin',
    component: () => import('../views/TestLogin.vue'),
  },

  {
    path: '/members',
    name: 'Members',
    component: () => import('../views/Members.vue'),
  },
  {
    path: '/members/:id',
    name: 'ProfileMember',
    component: () => import('../views/ProfileMember.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/editprofile',
    name: 'Editprofile',
    component: () => import('../views/Editprofile.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
