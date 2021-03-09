<template>
  <div style="position: fixed; z-index:10; width:100%">
    <a-page-header class="toolbar" style="padding-top:0px; padding-bottom: 10px;">
      <a-row style="display:flex; align-items: center;">
        <a-col align="left" :span="5">
          <img class="logo" src="../assets/1_1.svg" />
        </a-col>

        <a-col :span="14">
          <div class="title">{{ msg }}</div>
        </a-col>

        <a-col align="right" :span="5">
          <div>
            <router-link to="/profile">
              <img
                id="pictureUrl"
                :src="userProfile ? userProfile.fullPath : require('../assets/user.svg')"
              />
            </router-link>
          </div>
        </a-col>
      </a-row>
    </a-page-header>
  </div>
</template>
<script src="https://static.line-scdn.net/liff/edge/versions/2.4.0/sdk.js"></script>

<script>
import { mapActions } from 'vuex'
import * as gqlQueryUser from '../constants/user'
export default {
  name: 'Toolbar',
  apollo: {
    getUser: {
      query: gqlQueryUser.MEMBER_QUERY,
      variables() {
        return {
          userId: this.userId,
        }
      },
      update(data) {
        this.dataUser = data.user
        this.userProfile = data.user.image
      },
    },
  },
  data() {
    return {
      userId: 0,
      userProfile: null,
      dataUser: [],
    }
  },
  mounted() {
    this.getData()
  },
  props: {
    msg: String,
  },
  computed: {},

  methods: {
    getData() {
      const get = JSON.parse(localStorage.getItem('vuex'))
      this.userId = get.Auth.user.id
    },
    ...mapActions({
      logOut: 'Auth/logOut',
    }),
    signOut() {
      this.logOut()
    },
  },
}
</script>

<style scoped>
.logo {
  width: 24px;
  margin-top: 6px;
  margin-bottom: 6px;
}
.toolbar {
  background-color: #262626;
}
#accessToken,
#utouId {
  display: block;
  overflow: auto;
}
</style>
