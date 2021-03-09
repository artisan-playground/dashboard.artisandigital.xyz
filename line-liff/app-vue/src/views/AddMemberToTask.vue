<template>
  <div>
    <div style="position: fixed; z-index:10; width:100%">
      <a-page-header style="background-color: #262626; padding-top:0px; padding-bottom: 10px;">
        <a-row style="display:flex; align-items: center;">
          <a-col align="left" :span="5">
            <v-btn
              @click="$router.go(-1)"
              style="background-color:#262626; max-width:5%; height: 36px; min-width: 0px; padding-left:0px; box-shadow: none;"
            >
              <a-icon type="close" style="margin-left:20px; color:white;" />
            </v-btn>
          </a-col>

          <a-col :span="14">
            <div class="title">Choose friends</div>
          </a-col>

          <a-col align="right" :span="5">
            <div>
              <span v-if="member.length >= 1" style="color:white;" @click="addmember">
                Invite
              </span>
              <span v-else style="color:#8C8C8C">
                Invite
              </span>
            </div>
          </a-col>
        </a-row>
      </a-page-header>
    </div>

    <br />
    <div id="antInput" style="margin:60px 15px 15px 15px;">
      <a-input-search v-model="search" placeholder="input search text" block />
    </div>
    <a-form>
      <a-divider style="margin:25px 0px 0px 0px;" />
      <div v-if="userFilter.length >= 1" style="margin-top:15px;">
        <div v-for="user in userFilter" :key="user.id">
          <div style="margin:0px 15px 0px 15px; float:left; display: flex;">
            <v-checkbox color="#0036C7" v-model="member" :label="user.name" :value="user.id">
              <template v-slot:label>
                <img
                  v-bind:src="user.image ? user.image.fullPath : require('../assets/user.svg')"
                  class="picUser"
                />
                <span style="margin-left:5px;">{{ user.name }}</span>
              </template>
            </v-checkbox>
          </div>
          <a-divider style="margin:15px 0px 15px 0px;" />
        </div>
      </div>
      <div v-else class="noData">
        <a-empty />
      </div>
    </a-form>
  </div>
</template>

<script>
import * as gqlQueryTask from '../constants/task'
import * as gqlQueryRecent from '../constants/recentActivity'
export default {
  name: 'AddMemberToTask',
  components: {},
  methods: {
    async addmember() {
      const memberId = this.member.map(data => {
        return { id: data }
      })
      let members = this.userInProject.filter(o => memberId.find(o2 => o.id === o2.id))
      let mem = members.filter(item => item.id != this.userId)
      let myUser = members.filter(item => item.id == this.userId)
      const message_many_user = `Invited ${mem.map(a => a.name).slice(0, 1)},${mem
        .map(a => ' ' + a.name)
        .slice(1, memberId.length)} to task ${this.taskName}`
      const message_one_user = `Invited ${mem.map(a => a.name)} to project`
      const message_my_user = `${myUser.map(a => a.name)} joined to task ${this.taskName}`
      try {
        await this.$apollo.mutate({
          mutation: gqlQueryTask.ADD_MEMBER_TO_TASK,
          variables: {
            id: parseInt(this.$route.params.id),
            members: memberId,
          },
        })

        myUser.length == 1 && mem.length == 1
          ? this.createRecentMyUser(message_my_user) || this.createRecent(message_one_user)
          : myUser.length == 1 && mem.length > 1
          ? this.createRecentMyUser(message_my_user) || this.createRecent(message_many_user)
          : myUser.length == 1 && mem.length == 0
          ? this.createRecentMyUser(message_my_user)
          : mem.length == 1
          ? this.createRecent(message_one_user)
          : this.createRecent(message_many_user)

        this.$router.go(-1)
        this.$message.success('Add member success')
      } catch (error) {
        this.$message.error(error)
      }
    },
    createRecent(val) {
      this.$apollo.mutate({
        mutation: gqlQueryRecent.CREATE_RECENT,
        variables: {
          message: `${val}`,
          userId: this.userId,
          projectId: this.task.project.id,
        },
      })
    },
    createRecentMyUser(val) {
      this.$apollo.mutate({
        mutation: gqlQueryRecent.CREATE_RECENT,
        variables: {
          message: `${val}`,
          userId: this.userId,
          projectId: this.task.project.id,
        },
      })
    },
    getData() {
      const get = JSON.parse(localStorage.getItem('vuex'))
      this.user = get.Auth.user
      this.userId = get.Auth.user.id
    },
  },
  mounted() {
    this.getData()
  },
  data() {
    return {
      userInTask: [],
      search: '',
      checked: false,
      checkb: false,
      test: [],
      member: [],
      userInProject: [],
      taskName: '',
      userId: 0,
      task: [],
    }
  },
  apollo: {
    getUserInTask: {
      query: gqlQueryTask.TASK_QUERY,
      variables() {
        return {
          taskId: parseInt(this.$route.params.id),
        }
      },
      update(data) {
        this.userInProject = data.getTaskById.project.members
        this.userInTask = data.getTaskById.members
        this.taskName = data.getTaskById.taskName
        this.task = data.getTaskById
      },
    },
  },
  computed: {
    userFilter() {
      let result = this.userInProject.filter(o => !this.userInTask.find(o2 => o.id === o2.id))
      let text = this.search.trim()
      return result.filter(item => {
        return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1
      })
    },
  },
}
</script>

<style>
.v-input--selection-controls {
  margin-top: 0px;
  padding-top: 0px;
}
.v-input--selection-controls__ripple {
  margin: 0px;
  padding: 0px;
}
.v-input__slot {
  margin-bottom: 0px;
}
.v-icon.v-icon {
  color: #e0e0e0;
  border-radius: 50%;
}

.v-input--selection-controls__ripple {
  border-radius: 50%;
  cursor: pointer;
  height: 34px;
  transition: inherit;
  width: 34px;
  left: -12px;
  top: calc(50% - 24px);
  margin: 7px;
}
.v-icon.v-icon {
  color: #e0e0e0;
  border-radius: 50%;
}

.v-input--selection-controls__ripple {
  border-radius: 50%;
  cursor: pointer;
  height: 34px;
  transition: inherit;
  width: 34px;
  left: -12px;
  top: calc(50% - 24px);
  margin: 7px;
}

.v-input--selection-controls__ripple {
  color: rgba(255, 255, 255, 0);
  caret-color: rgba(255, 255, 255, 0);
}
</style>
