<template>
  <div v-if="dataProject">
    <div class="modal-delete" id="modal">
      <vue-confirm-dialog></vue-confirm-dialog>
    </div>
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
            <div class="title">Edit members</div>
          </a-col>

          <a-col align="right" :span="5"> </a-col>
        </a-row>
      </a-page-header>
    </div>
    <br />
    <div id="antInput" style="margin:60px 15px 0px 15px;">
      <a-input-search v-model="search" placeholder=" input search text" block />
      <div style="margin-top:20px;">
        <a-row>
          <a-col :span="20" align="left">
            <router-link :to="{ name: 'AddMemberToProject', params: { id: dataProject.id } }">
              <a-button shape="circle" icon="plus" style="color:#333333; border-radius:100%;" />
              <span style="margin-left:10px; color:black;">Invite members</span>
            </router-link>
          </a-col>

          <a-col :span="4" align="right">
            <a-button
              v-if="deleteButton == false"
              shape="circle"
              icon="delete"
              style="color:white; background-color:#FF7875; border-radius:100%;"
              @click="deleteButton = !deleteButton"
            />
            <a-button
              v-if="deleteButton == true"
              shape="circle"
              icon="check"
              style="color:white; background-color:#73D13D; border-radius:100%;"
              @click="deleteButton = !deleteButton"
            />
          </a-col>
        </a-row>
      </div>
    </div>
    <br />
    <a-divider style="margin:0px 0px 15px 0px;" />
    <div v-if="userFilter.length >= 1">
      <div v-for="user in userFilter" :key="user.id">
        <a-row style="margin:0px 25px 0px 15px;">
          <a-col :span="20" align="left">
            <img
              class="picUser"
              v-bind:src="user.image ? user.image.fullPath : require('../assets/user.svg')"
            />
            {{ user.name }}
          </a-col>
          <a-col :span="4" align="right">
            <v-expand-x-transition>
              <a-icon
                type="delete"
                v-if="deleteButton == true"
                @click="deleteMemberProject(user.id)"
                style="color:#FF4D4F;"
              />
            </v-expand-x-transition>
          </a-col>
        </a-row>
        <a-divider style="margin:15px 0px 15px 0px;" />
      </div>
    </div>
    <div v-else class="noData">
      <a-empty />
    </div>
  </div>
</template>

<script>
import * as gqlQuery from '../constants/project'
import * as gqlQueryUser from '../constants/user'
import * as gqlQueryRecent from '../constants/recentActivity'

export default {
  name: 'editMemberInProject',
  components: {},
  mounted() {
    this.getData()
  },
  data() {
    return {
      dataProject: null,
      dataMember: null,
      search: '',
      deleteButton: false,
      commentLoadding: false,
      memberId: '',
      userId: 0,
      users: [],
    }
  },
  methods: {
    createRecent(val) {
      this.$apollo.mutate({
        mutation: gqlQueryRecent.CREATE_RECENT,
        variables: {
          message: `${val}`,
          userId: this.userId,
          projectId: parseInt(this.$route.params.id),
        },
      })
    },
    getData() {
      const get = JSON.parse(localStorage.getItem('vuex'))
      this.user = get.Auth.user
      this.userId = get.Auth.user.id
    },
    async deleteMemberProject(memberId) {
      try {
        await this.$confirm({
          message: `Are you sure you want to delete this member ?`,
          button: {
            no: 'Cancel',
            yes: 'Delete',
          },
          callback: confirm => {
            if (confirm) {
              this.$apollo.mutate({
                mutation: gqlQuery.DELETE_MEMBER_FROM_PROJECT,
                variables: {
                  projectId: parseInt(this.$route.params.id),
                  memberId: memberId,
                },
              })

              const member = this.users.find(o => o.id === memberId)
              const message_user = `Removed ${member.name} from project`
              const meassgae_my_user = `${member.name} left from project`
              memberId == this.userId
                ? this.createRecent(meassgae_my_user)
                : this.createRecent(message_user)
              setTimeout(this.$message.success('delete member success'), 800)
            }
          },
        })
      } catch (error) {
        console.error(error)
      }
    },
  },
  computed: {
    userFilter() {
      let text = this.search.trim()
      return this.dataMember.filter(item => {
        return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1
      })
    },
  },
  apollo: {
    getUser: {
      query: gqlQueryUser.ALL_MEMBER_QUERY,
      update(data) {
        this.users = data.users
      },
    },
    getProject: {
      query: gqlQuery.PROJECT_QUERY,
      variables() {
        return {
          projectId: parseInt(this.$route.params.id),
        }
      },
      update(data) {
        this.dataProject = data.project
        this.dataMember = data.project.members
      },
    },
  },
}
</script>
