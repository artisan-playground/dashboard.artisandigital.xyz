<template>
  <div style="border:none; width:100%">
    <div style="margin:0px 18px 0px 18px">
      <a-row
        type="flex"
        justify="space-around"
        align="middle"
        style="font-size:12.5px; margin-bottom: 10px;"
      >
        <a-col :span="6">
          <img
            class="profile"
            id="profilePic"
            :src="userProfile ? userProfile.fullPath : require('../assets/user.svg')"
          />
          <h3 id="displayName" style="display:inline"></h3>
        </a-col>

        <a-col :span="6">
          <a-row>{{ projectNum }}</a-row>
          <a-row>Project</a-row>
        </a-col>

        <a-col :span="6">
          <a-row>{{ doneTask }}</a-row>
          <a-row>Done Task</a-row>
        </a-col>
        <a-col :span="6">
          <a-row>{{ todayTask }}</a-row>
          <a-row>Today’s task</a-row>
        </a-col>
      </a-row>

      <a-row style="float:left; margin-bottom:40px; text-align:left;">
        <div>
          <span class="username">
            {{ user.name }}
          </span>
        </div>
        <div>
          <span>
            {{ user.position }}
          </span>
        </div>
      </a-row>

      <a-row>
        <a-col>
          <router-link to="/editprofile">
            <a-button size="large" block class="btnEditProfile">
              Edit profile
            </a-button>
          </router-link>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script src="https://static.line-scdn.net/liff/edge/versions/2.4.0/sdk.js"></script>

<script>
import * as gqlQueryUser from '../constants/user'
export default {
  name: 'Profile',
  apollo: {
    getUser: {
      query: gqlQueryUser.MEMBER_QUERY,
      variables() {
        return {
          userId: this.userId,
        }
      },
      fetchPolicy: 'cache-and-network',
      update(data) {
        this.user = data.user
        this.dataProject = data.user.projects
        this.dataTask = data.user.tasks
        this.projectNum = data.user.projects.length
        this.userProfile = data.user.image
        this.doneTaskFunc()
        this.todayTaskFunc()
      },
    },
  },
  data() {
    return {
      dataTask: null,
      dataProject: 0,
      userProfile: '',
      user: '',
      userId: 0,
      currentDate: new Date(),
      doneTask: 0,
      todayTask: 0,
      projectNum: 0,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const get = JSON.parse(localStorage.getItem('vuex'))
      this.userId = get.Auth.user.id
    },
    doneTaskFunc() {
      let doneTaskTemp = 0
      this.dataTask.filter(value => {
        if (value.isDone == true) {
          doneTaskTemp += 1
        }
      })
      this.doneTask = doneTaskTemp
    },
    todayTaskFunc() {
      let todayTaskTemp = 0
      var currentDate = new Date(this.currentDate)
      this.dataTask.filter(value => {
        let endDate = new Date(value.endTime)
        if (value.isDone == false && endDate > currentDate) {
          todayTaskTemp += 1
        }
      })
      this.todayTask = todayTaskTemp
    },
  },
  computed: {},
}
</script>

<style scoped lang="less">
.btnEditProfile {
  text-transform: capitalize;
  background-color: #134f83;
  color: white;
  margin-bottom: 2px;
}
.username {
  font-size: 20px;
  color: #0036c7;
  font-weight: 500;
  text-align: left;
}
</style>
