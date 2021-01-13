<template>
  <div style="position: fixed; z-index:10; width:100%">
    <a-page-header class="toolbar" style="padding-top:0px; padding-bottom: 10px;">
      <a-row style="display:flex; align-items: center;">
        <a-col align="left" :span="5">
          <v-btn
            @click="$router.go(-1)"
            style="background-color:#262626; max-width:5%; height: 36px; min-width: 0px; padding-left:0px; box-shadow: none;"
          >
            <a-icon type="left" style="margin-left:20px; color:white;" />
          </v-btn>
        </a-col>

        <a-col :span="14">
          <div class="title">{{ msg }}</div>
        </a-col>
      </a-row>
    </a-page-header>
  </div>
</template>
<script src="https://static.line-scdn.net/liff/edge/versions/2.4.0/sdk.js"></script>

<script>
import { mapActions } from 'vuex'
import auth from '../store/Auth/index.js'
import * as gqlQueryUser from '../constants/user'
export default {
  name: 'ToolbarBack',
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
  methods: {
    getData() {
      const get = JSON.parse(localStorage.getItem('vuex'))
      this.userId = get.Auth.user.id
    },
  },
  computed: {},
}
</script>

<style scoped>
.logo {
  margin: 0px 10px 0px 15px;
  width: 22.5px;
}
.toolbar {
  background-color: #262626;
}
#accessToken,
#utouId {
  display: block;
  overflow: auto;
}
/* #accessToken,
#utouId {
  display: block;
  overflow: auto;
} */
</style>
