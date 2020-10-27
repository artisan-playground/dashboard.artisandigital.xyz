<template>
  <div>
    <div>
      <v-row style="width:100%; margin-bottom:10px">
        <v-col align="right" style="padding-right: 0px; padding-left: 0px;">
          <a-input-search
            v-model="search"
            type="search"
            placeholder="input search text"
            style="width: 73%"
          />
          <a-select v-model="currentFilter" style="width: 20%; margin-right:18px;">
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
        </v-col>
      </v-row>
    </div>
    <div class="listProject">
      <v-card
        id="card"
        style="text-decoration:none; color:black"
        v-for="project in searchFilter"
        :key="project.id"
        :to="{ name: 'project', params: { id: project.id } }"
      >
        <v-row>
          <v-col cols="8" align="left" style="padding-bottom: 0px;">
            <div class="md-title">
              <b style="line-height: 0px;">{{ project.projectName }}</b>
            </div>
            <div id="position">{{ project.projectType }}</div>
          </v-col>
          <v-col cols="4" id="status" align="right" style="padding-bottom: 0px;">
            <a-tag color="red"
              style="margin-right: 0px;"
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
            <a-tag color="green"
              v-if="project.status == 'done'"
              style="margin-right: 0px;"
            >
              <span
                id="iconStatus"
                class="iconify"
                data-inline="false"
                data-icon="octicon:check-circle-24"
              ></span>
              Done
            </a-tag>
          </v-col>
        </v-row>
        <v-row style="padding-top: 0px;">
          <v-col>
            <div align="left">{{ project.projectDetail }}</div>
          </v-col>
        </v-row>

        <v-row>
          <v-col style="padding-top: 0px;">
            <div style="float:right">
              <vs-avatar-group float max="4">
                <vs-avatar
                  v-for="member in project.members"
                  :key="member.id"
                  style="border-radius: 100%; margin-left:3px; width:33px; height:33px;"
                >
                  <img v-bind:src="member.image" />
                </vs-avatar>
              </vs-avatar-group>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </div>

    <div style="padding-bottom:60px">
      <!-- ระยะห่าง manu ข้างล่างกับ content -->
    </div>
  </div>
</template>

<script>
import store from '../store/index.js'
import * as gqlQuery  from '../constants/graphql'
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
      dataProject: null
    }
  },
  apollo: {
    projects: {
      query: gqlQuery.ALL_PROJECT_QUERY
      ,
      result({ data }) {
        this.dataProject = data.projects
        // this.dataProject.forEach(element => {
        // });
        console.log(this.dataProject);
        // this.dataMember = data.projects.members.user
      }
    }
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
  width: 25%;
}

#iconStatus {
  font-size: 10px;
  vertical-align: -4.57%;
}

#card {
  margin: 3px 15px 24px 15px; /* ระยะห่างรอบๆ card */
  padding-bottom: 10px;
  border-radius: 2px;
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
