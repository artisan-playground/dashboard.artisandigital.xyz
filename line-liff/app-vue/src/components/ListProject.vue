<template>
  <div>
    <div class="listProject">
      <a-card
        id="card"
        style="margin: 3px 15px 24px 15px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);"
        :bodyStyle="{ padding: '15px' }"
        v-for="project in projects"
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
                class="md-accent"
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
                  style="font-size: 14px;"
                ></span>
                Done
              </a-tag>
            </a-col>
          </a-row>
          <a-row>
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
import * as gqlQuery from '../constants/graphql'

export default {
  name: 'ListProject',
  data() {
    return {
      // projects: store.state.projects,
      projects: [],
      members: store.state.users,
    }
  },
  apollo: {
    projects: {
      query: gqlQuery.ALL_PROJECT_QUERY,
      result({ data }) {
        this.dataProject = data.projects
        console.log(this.dataProject)
      },
    },
  },
  methods: {},
}
</script>

<style scoped>
.listProject {
  /* margin: 0px 18px 0px 18px; */
  background-color: #e9f0ff;
  padding-top: 15px;
  padding-bottom: 2px;
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
  /* width: 25%; */
  padding-right: 0px;
  /* float: right;
  justify-content: flex-end; */
}
#iconStatus {
  font-size: 10px;
  vertical-align: -4.57%;
}
#card {
  /* margin: 3px 15px 24px 15px;  */
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
}
.md-title {
  font-size: 16px;
  margin-bottom: -1px; /* ระยะห่างระหว่างชื่อโปรเจคกับตำแหน่งงาน */
  line-height: 20px; /* ระยะห่างระหว่างบรรทัดของชื่อโปรเจค เวลาขึ้นบรรทัดใหม่ */
}
.content {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
