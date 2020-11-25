<template>
  <div v-if="dataProject">
    <div style="position: fixed; z-index:10; width:100%">
      <a-page-header style="background-color: #262626; padding-top:0px; padding-bottom: 10px;">
        <!-- <div style="border:none; width:100% "> -->
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
        <!-- </div> -->
      </a-page-header>
    </div>
    <br />
    <div style="margin:60px 15px 0px 15px;">
      <a-input-search v-model="search" placeholder=" input search text" block />
      <div style="margin-top:20px;">
        <a-row>
          <a-col :span="20" align="left">
            <router-link :to="{ name: 'addMemberToProject', params: { id: dataProject.id } }">
              <a-button shape="circle" icon="plus" style="color:#333333" />
              <span style="margin-left:10px; color:black;">Invite members</span>
            </router-link>
          </a-col>

          <a-col :span="4" align="right">
            <a-button
              v-if="deleteButton == false"
              shape="circle"
              icon="delete"
              style="color:white; background-color:#FF7875;"
              @click="deleteButton = !deleteButton"
            />
            <a-button
              v-if="deleteButton == true"
              shape="circle"
              icon="check"
              style="color:white; background-color:#73D13D;"
              @click="deleteButton = !deleteButton"
            />
          </a-col>
        </a-row>
      </div>
    </div>
    <br />
    <a-divider style="margin:0px 0px 15px 0px;" />
    <div v-for="user in userFilter" :key="user.id">
      <a-row style="margin:0px 25px 0px 15px;">
        <a-col :span="20" align="left">
          <img
            class="picUser"
            v-bind:src="
              user.image ? user.image.fullPath : 'https://source.unsplash.com/random?animal'
            "
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

    <BarRouter />
  </div>
</template>

<script>
import * as gqlQuery from '../constants/project'
import BarRouter from '@/components/BarRouter.vue'

export default {
  name: 'editmember',
  components: {
    BarRouter,
  },
  data() {
    return {
      dataProject: null,
      dataMember: null,
      search: '',
      deleteButton: false,
      commentLoadding: false,
      memberId: '',
    }
  },
  methods: {
    async deleteMemberProject(memberId) {
      try {
        await this.$confirm({
          title: 'Are you sure delete this task?',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk: () => {
            this.$apollo.mutate({
              mutation: gqlQuery.DELETE_MEMBER_FROM_PROJECT,
              variables: {
                projectId: parseInt(this.$route.params.id),
                memberId: memberId,
              },
            })
            setTimeout(this.$message.success('delete comment success'), 800)
          },
          onCancel() {
            console.log('Cancel')
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

<style>
.item-media {
  /* border-radius: 100%; */
  width: 30px;
  height: 30px;
}
.ios .media-list .item-title,
.ios li.media-item .item-title {
  font-weight: 400;
}
.media-list .item-media img,
li.media-item .item-media img {
  display: block;
  border-radius: 100%;
  /* width: 33px;
  height: 33px; */
  margin-top: 15px;
  /* margin-top: 10px; */
}
</style>
