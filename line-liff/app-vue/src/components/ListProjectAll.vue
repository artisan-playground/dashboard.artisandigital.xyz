<template>
  <div class="space-right-bottom-left">
    <a-row>
      <router-link to="/createProject">
        <a-button
          size="large"
          block
          style="float:right; text-transform: capitalize; background-color: #134F83; color:white;"
        >
          Create Project
        </a-button>
      </router-link>
    </a-row>
    <div>
      <a-row style="margin-top:1.5rem;  margin-bottom:1.5rem">
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
    <div>
      <a-card
        id="card"
        :bodyStyle="{ padding: '15px' }"
        v-for="project in currentFilter == ''
          ? projectFilter
          : currentFilter == 'done'
          ? projectFilterDone
          : projectFilterUndone"
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
              <a-tag class="status-tag" color="red" md-clickable v-if="project.status == 'undone'">
                <span
                  id="iconStatus"
                  class="iconify"
                  data-inline="false"
                  data-icon="carbon:warning"
                ></span>
                WIP
              </a-tag>
              <a-tag color="green" v-if="project.status == 'done'" class="status-tag">
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
              <div class="listMember">
                <div v-for="member in project.members.slice(0, 3)" :key="member.id">
                  <a-avatar
                    v-bind:src="
                      member.image ? member.image.fullPath : require('../assets/user.svg')
                    "
                  />
                </div>

                <div v-if="project.members.length >= 4">
                  <div v-for="member in project.members.slice(3, 4)" :key="member.id">
                    <a-avatar class="avatar-plus">
                      <a-icon slot="icon" type="plus" />
                    </a-avatar>
                    <a-avatar
                      v-bind:src="
                        member.image ? member.image.fullPath : require('../assets/user.svg')
                      "
                    />
                  </div>
                </div>
              </div>
            </a-col>
          </a-row>
        </router-link>
      </a-card>
    </div>
  </div>
</template>

<script>
import * as gqlQuery from '../constants/project'
export default {
  name: 'ListProjectAll',
  data() {
    return {
      search: '',
      projects: [],
      currentFilter: '',
      dataMember: null,
      dataProject: null,
    }
  },
  apollo: {
    projects: {
      query: gqlQuery.ALL_PROJECT_QUERY,
      fetchPolicy: 'no-cache',
      result({ data }) {
        this.dataProject = data.projects
      },
    },
  },
  computed: {
    projectFilter() {
      let text = this.search.trim()
      return this.projects.filter(item => {
        return (
          (item.projectName && item.projectName.toLowerCase().indexOf(text.toLowerCase()) > -1) ||
          (item.projectType && item.projectType.toLowerCase().indexOf(text.toLowerCase()) > -1) ||
          (item.projectDetail && item.projectDetail.toLowerCase().indexOf(text.toLowerCase()) > -1)
        )
      })
    },
    projectFilterDone() {
      let text = this.search.trim()
      return this.projects.filter(item => {
        if (item.status == 'done') {
          return (
            (item.projectName && item.projectName.toLowerCase().indexOf(text.toLowerCase()) > -1) ||
            (item.projectType && item.projectType.toLowerCase().indexOf(text.toLowerCase()) > -1) ||
            (item.projectDetail &&
              item.projectDetail.toLowerCase().indexOf(text.toLowerCase()) > -1)
          )
        }
      })
    },
    projectFilterUndone() {
      let text = this.search.trim()
      return this.projects.filter(item => {
        if (item.status == 'undone') {
          return (
            (item.projectName && item.projectName.toLowerCase().indexOf(text.toLowerCase()) > -1) ||
            (item.projectType && item.projectType.toLowerCase().indexOf(text.toLowerCase()) > -1) ||
            (item.projectDetail &&
              item.projectDetail.toLowerCase().indexOf(text.toLowerCase()) > -1)
          )
        }
      })
    },
  },
}
</script>

<style scoped>
#title {
  padding-bottom: 0px;
  font-size: 16px;
}
#card {
  margin: 3px 0px 24px 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
}
.row {
  margin-left: 5px;
  margin-right: 5px;
}
.col {
  padding-bottom: 5px;
}
</style>
