import router from '@/router'
import { ALL_MEMBER_QUERY, GET_USER_EMAIL } from '../../constants/user'
import { apolloClient } from '../../vue-apollo'

const state = {
  user: {},
  authStatus: false,
  token: localStorage.getItem('apollo-token') || null,
}

const getters = {
  user: state => state.user,
  authStatus: state => state.authStatus,
  isAuthenticated: state => !!state.token,
}

const actions = {
  async login({ commit }, authDetails) {
    try {
      const { data } = await apolloClient.mutate({
        mutation: GET_USER_EMAIL,
        variables: {
          ...authDetails,
        },
      })

      let { token } = data.getUserByEmail

      commit('SET_TOKEN', token)
      localStorage.setItem('apollo-token', token)
      commit('GET_USER_EMAIL', data.getUserByEmail)
      router.push('/')
    } catch (e) {
      this.$message.error(e + '')
    }
  },

  async setUser({ commit, dispatch }) {
    try {
      const { data } = await apolloClient.query({
        query: ALL_MEMBER_QUERY,
      })
      commit('GET_USER_EMAIL', data.users)
      router.push('/')
    } catch (err) {
      dispatch('logOut')
    }
  },

  async logOut({ commit }) {
    commit('LOGOUT_USER')
  },
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },

  GET_USER_EMAIL(state, value) {
    state.authStatus = true
    state.user = value
  },

  LOGOUT_USER() {
    state.user = {}
    state.authStatus = false
    state.token = '' && localStorage.removeItem('apollo-token')
    localStorage.removeItem('vuex')
    localStorage.clear()
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
}
