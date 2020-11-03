<template>
  <div v-if="user">
    <ToolbarBack />
    <br />
    <div style="margin-top:60px">
      <div style="border:none; width:100%">
        <div style="margin:0px 18px 0px 18px">
          <!-- ระยะห่างด้านข้าง margin:0px 18px 0px 18px -->
          <a-row
            type="flex"
            justify="space-around"
            align="middle"
            style="font-size:12.5px; margin-bottom: 10px;"
          >
            <a-col :span="6">
              <img
                class="profile"
                id="pictureUrl"
                :src="
                  user.image.fullPath ||
                    'https://www.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png'
                "
              />
              <h3 id="displayName" style="display:inline"></h3>
            </a-col>

            <!-- ใส่ข้อมูล Project Participants Today’s task-->
            <a-col :span="6">
              <a-row>1</a-row>
              <a-row>Project</a-row>
            </a-col>

            <a-col :span="6">
              <a-row>2</a-row>
              <a-row>Participants</a-row>
            </a-col>
            <a-col :span="6">
              <a-row>2</a-row>
              <a-row>Today’s task</a-row>
            </a-col>
          </a-row>

          <!-- Name, Position , Status -->
          <a-row style="float:left; margin-bottom: 40px;">
            <a-row style="text-align:left; font-size:20px; color:#0036C7; font-weight:500">
              {{ user.name }}
            </a-row>
            <a-row style="text-align:left;">
              {{ user.position }}
            </a-row>
            <a-row style="text-align:left;">
              Status In LINE
            </a-row>
          </a-row>

          <a-row>
            <a-divider style="margin-top:5px; margin-bottom:5px;" />
            <div>
              <a-tabs default-active-key="1">
                <a-tab-pane key="1" tab="Project">
                  <div class="listProject">
                    <a-card
                      bodyStyle="padding:15px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);"
                      v-for="project in user.projects"
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
                              color="red"
                              style="margin-right: 0px; margin-right:0px;"
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
                              style="float:right; margin-right: 0px;"
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
                </a-tab-pane>
                <a-tab-pane key="2" tab="Tasks" force-render>
                  <a-card
                    style="text-decoration:none; color:black"
                    v-for="task in user.tasks"
                    :key="task.id"
                  >
                    {{ task.taskName }}
                  </a-card>
                </a-tab-pane>
              </a-tabs>
            </div>
          </a-row>
        </div>
      </div>
    </div>
    <BarRouter />
  </div>
</template>

<script>
// import store from '../store/index.js'
import ToolbarBack from '@/components/ToolbarBack.vue'
import BarRouter from '@/components/BarRouter.vue'
// import gql from 'graphql-tag'
import * as gqlQuery from '../constants/graphql'
export default {
  name: 'profileMember',
  components: {
    ToolbarBack,
    BarRouter,
  },
  methods: {},
  apollo: {
    getUser: {
      query: gqlQuery.MEMBER_QUERY,
      variables() {
        return {
          memberId: parseInt(this.$route.params.id),
        }
      },
      update(data) {
        this.user = data.user
        console.log('We got some result!', data)
        this.dataProject = data.user.projects
      },
    },
  },
  data() {
    return {
      user: null,
      dataProject: [],
    }
  },
  mounted() {
    console.log(this.$route.params.id)
  },
}
</script>

<style>
.listProject {
  font-family: 'Roboto';
}
#pictureUrl {
  width: 80px;
  -moz-border-radius: 100px;
  -webkit-border-radius: 100px;
  border-radius: 100px;
  /* margin-left: 40%; */
}
.md-title {
  font-size: 16px;
  margin-bottom: -1px; /* ระยะห่างระหว่างชื่อโปรเจคกับตำแหน่งงาน */
  line-height: 20px; /* ระยะห่างระหว่างบรรทัดของชื่อโปรเจค เวลาขึ้นบรรทัดใหม่ */
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
  padding-bottom: 10px;
  border-radius: 2px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
