import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Auth from './Auth'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    profile: {
      userId: '',
      displayName: '',
      pictureUrl: '',
      statusMessage: '',
      email: '',
    },
  },
  mutations: {
    setPicProfile(state, value) {
      state.profile.pictureUrl = value
    },
    setUserId(state, value) {
      state.profile.userId = value
    },
    setDisplayName(state, value) {
      state.profile.displayName = value
    },
    setStatusMessage(state, value) {
      state.profile.statusMessage = value
    },
    setEmail(state, value) {
      state.getDecodedIDToken.email = value
    },
  },
  getters: {
    projects: state => {
      return state.projects
    },
    project: state => id => {
      return state.projects.find(project => project.id === id)
    },

    tasks: state => {
      return state.tasks
    },
    task: state => id => {
      return state.tasks.find(task => task.tasksId === id)
    },
  },
  actions: {
    showPicProfile(context) {
      context.commit('setPicProfile', this.getters.getPicProfile)
    },
  },
  modules: {
    Auth,
  },
})
