<template>
  <div style="margin-left:15px;; margin-right:15px">
    <a-row>
      <router-link to="/createProject">
        <a-button
          block
          type="primary"
          style="float:right; text-transform: capitalize; background-color: #105EFB; color:white;"
        >
          Create Project
        </a-button>
      </router-link>
    </a-row>
    <div>
      <a-row style="margin-top:10px;  margin-bottom:10px">
        <a-col :span="18" style="width:80%">
          <a-input-search
            style="width:100%"
            v-model="search"
            type="search"
            placeholder="input search text"
          />
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
        bodyStyle="padding:15px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);"
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
            <a-col :span="4" id="status">
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
              <div align="left">{{ project.projectDetail }}</div>
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
                    <img v-bind:src="member.image.fullPath" />
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
import * as gqlQuery from '../constants/graphql'
// import gql from 'graphql-tag'

export default {
  name: 'ListProjectAll',
  data() {
    return {
      search: '',
      // projects: store.state.projects,
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
        // this.dataProject.forEach(element => {
        // });
        console.log(this.dataProject)
        // this.dataMember = data.projects.members.user
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
.listProject {
  font-family: 'Roboto';
}
#title {
  padding-bottom: 0px;
  font-size: 16px;
}
#position {
  color: #8f8f8f;
  font-size: 12px;
  margin-top: 0px;
  padding-bottom: 0px;
}
#status {
  font-size: 10.5px;
  padding-right: 0px;
}

#iconStatus {
  font-size: 10px;
  vertical-align: -4.57%;
}

#card {
  margin: 3px 0px 24px 0px; /* ระยะห่างรอบๆ card */
  padding-bottom: 0px;
  /* border-radius: 2px; */
  padding-left: 0px;
  padding-right: 0px;
}

.md-title {
  font-size: 16px;
  margin-bottom: -1px; /* ระยะห่างระหว่างชื่อโปรเจคกับตำแหน่งงาน */
  line-height: 20px; /* ระยะห่างระหว่างบรรทัดของชื่อโปรเจค เวลาขึ้นบรรทัดใหม่ */
}

.row {
  margin-left: 5px;
  margin-right: 5px;
}

.col {
  padding-bottom: 5px;
}
</style>
