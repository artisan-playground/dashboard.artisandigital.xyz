<template>
  <div style="margin-left:15px;; margin-right:15px">
    <a-row>
      <router-link to="/createProject">
        <a-button
          size="large"
          block
          style="float:right; text-transform: capitalize; background-color: #0036C7; color:white;"
        >
          Create Project
        </a-button>
      </router-link>
    </a-row>
    <div>
      <a-row style="margin-top:10px;  margin-bottom:10px">
        <a-col :span="18" style="width:80%">
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
    <div class="listProject">
      <a-card
        id="card"
        :bodyStyle="{ padding: '15px' }"
        v-for="project in searchFilter"
        :key="project.id"
      >
        <router-link
          style="text-decoration: none; color:black"
          :to="{ name: 'project', params: { id: project.id } }"
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
                        member.image
                          ? member.image.fullPath
                          : 'https://source.unsplash.com/900x900/?person'
                      "
                    />
                  </vs-avatar>
                </vs-avatar-group>
              </div>
            </a-col>
          </a-row>
        </router-link>
      </a-card>
    </div>

    <div style="padding-bottom:60px">
      <!-- ระยะห่าง manu ข้างล่างกับ content -->
    </div>
  </div>
</template>

<script>
import store from '../store/index.js'
import * as gqlQuery from '../constants/project'

export default {
  name: 'ListProjectAll',
  data() {
    return {
      search: '',
      projects: [],
      members: store.state.members,
      currentFilter: '',
      dataMember: null,
      dataProject: null,
    }
  },
  apollo: {
    projects: {
      query: gqlQuery.ALL_PROJECT_QUERY,
      result({ data }) {
        this.dataProject = data.projects
      },
    },
  },
  computed: {
    searchFilter() {
      let text = this.search.trim()
      let filterStatus = this.currentFilter.trim()

      return this.projects.filter(item => {
        let filtered = true
        if (filterStatus && filterStatus.length > 0) {
          filtered = item.status == filterStatus
          return filtered
        } else {
          return item.projectName.indexOf(text) > -1
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
