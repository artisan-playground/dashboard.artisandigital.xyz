<template>
  <div style="margin-left:15px;; margin-right:15px" v-if="userId == dataUser.id">
    <div>
      <a-row style="margin-bottom:1.5rem">
        <a-col :span="18" style="width:80%" id="antInput">
          <a-input-search v-model="search" type="search" placeholder=" input search text" />
        </a-col>
        <a-col :span="6" style="width:20%">
          <a-select style="width:100%" v-model="currentFilter">
            <a-select-option value="">
              <span style="font-size:10px">All</span>
            </a-select-option>
            <a-select-option value="undone">
              <span style="font-size:10px">WIP</span>
            </a-select-option>
            <a-select-option value="done">
              <span style="font-size:10px">Done</span>
            </a-select-option>
          </a-select>
        </a-col>
      </a-row>
    </div>

    <div v-if="dataUser.projects.length == 0" class="noData">
      <a-empty />
    </div>
    <div v-else>
      <a-card
        id="card"
        :bodyStyle="{ padding: '15px' }"
        v-for="project in searchFilter"
        :key="project.id"
      >
        <router-link
          style="text-decoration: none; color:black"
          :to="{ name: 'Project', params: { id: project.id } }"
        >
          <a-row type="flex" justify="space-between">
            <a-col :span="18" align="left">
              <div class="md-title">
                <b style="line-height: 0px;">{{ project.projectName }}</b>
              </div>
              <div id="position">{{ project.projectType }}</div>
            </a-col>
            <a-col :span="4" id="statusProject">
              <a-tag
                style="float:right; margin-right:0px;"
                color="red"
                md-clickable
                v-if="project.status == 'undone'"
              >
                <span
                  id="iconStatus"
                  class="iconify"
                  data-inline="false"
                  data-icon="carbon:warning"
                ></span>
                WIP
              </a-tag>
              <a-tag
                color="green"
                v-if="project.status == 'done'"
                style="float:right; margin-right:0px;"
              >
                <span
                  id="iconStatus"
                  class="iconify"
                  data-inline="false"
                  data-icon="octicon:check-circle-24"
                ></span>
                Done
              </a-tag>
            </a-col>
          </a-row>
          <a-row style="padding-top: 0px;">
            <a-col>
              <div align="left" class="content">{{ project.projectDetail }}</div>
            </a-col>
          </a-row>

          <a-row>
            <a-col>
              <div style="float:right">
                <vs-avatar-group float max="4">
                  <vs-avatar
                    v-for="member in project.members"
                    :key="member.id"
                    style="border-radius: 100%; margin-left:3px; width:33px; height:33px;"
                  >
                    <img
                      v-bind:src="
                        member.image ? member.image.fullPath : require('../assets/user.svg')
                      "
                      :alt="member.name"
                    />
                  </vs-avatar>
                </vs-avatar-group>
              </div>
            </a-col>
          </a-row>
        </router-link>
      </a-card>
    </div>

    <div style="padding-bottom:60px"></div>
  </div>
</template>

<script>
import * as gqlQueryUser from '../constants/user'
export default {
  name: 'ListProject',
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
      },
    },
  },
  data() {
    return {
      search: '',
      currentFilter: '',
      dataUser: [],
      userId: 0,
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
  },
  computed: {
    searchFilter() {
      let text = this.search.trim()
      let filterStatus = this.currentFilter.trim()
      return this.dataUser.projects.filter(item => {
        let filtered = true
        if (filterStatus && filterStatus.length > 0) {
          filtered = item.status == filterStatus
          return (
            filtered &&
            (item.projectName.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
              item.projectType.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
              item.projectDetail.toLowerCase().indexOf(text.toLowerCase()) > -1)
          )
        } else {
          return (
            item.projectName.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
            item.projectType.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
            item.projectDetail.toLowerCase().indexOf(text.toLowerCase()) > -1
          )
        }
      })
    },
  },
}
</script>

<style scoped>
#card {
  margin: 3px 0px 24px 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
}
</style>
