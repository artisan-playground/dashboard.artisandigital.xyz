<template>
  <div v-if="user">
    <ToolbarBack />
    <br />
    <div style="margin-top:60px">
      <div style="border:none;">
        <div style="margin:0px 15px 0px 15px">
          <a-row type="flex" style="font-size:12.5px; margin-bottom: 10px;">
            <a-col :span="6">
              <img
                style="justify-content: flex-start;"
                class="profile"
                id="profilePic"
                v-bind:src="
                  user.image ? user.image.fullPath : 'https://source.unsplash.com/900x900/?person'
                "
              />
              <h3 id="displayName" style="display:inline"></h3>
            </a-col>

            <!-- ใส่ข้อมูล Project, Today’s task-->
            <a-col :span="6">
              <a-row>{{ projectNum }}</a-row>
              <a-row>Project</a-row>
            </a-col>

            <a-col :span="6">
              <a-row>{{ tasksUndone }}</a-row>
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
                  <div>
                    <a-card
                      :bodyStyle="{ padding: '15px' }"
                      v-for="project in user.projects"
                      style="color: black; margin-bottom: 15px;"
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
                </a-tab-pane>
                <a-tab-pane key="2" tab="Tasks" force-render>
                  <div v-for="task in user.tasks" :key="task.id">
                    <a-card
                      v-if="!task.isDone"
                      :bodyStyle="{ padding: '15px' }"
                      id="cardTask"
                      align="left"
                    >
                      <router-link :to="{ name: 'taskDetail', params: { id: task.id } }">
                        <div>
                          <a-row type="flex" justify="space-between">
                            <a-col :span="18" align="left">
                              <a-row>
                                <b style="color:black;">
                                  {{ task.taskName }}
                                </b>
                              </a-row>
                              <a-row id="position">
                                {{ $dayjs(task.startTime).format('DD MMM YY ') }}
                              </a-row>
                            </a-col>
                            <a-col :span="4" id="status">
                              <a-tag
                                color="red"
                                style="float:right; margin-right:0px;"
                                v-if="task.isDone == false"
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
                                style="margin-right: 0px;"
                                v-if="task.isDone == true"
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
                          <a-row>
                            <div style="color:black;" class="content">{{ task.taskDetail }}</div>
                          </a-row>

                          <!-- list members -->
                          <a-row>
                            <a-col>
                              <div style="float:right">
                                <vs-avatar-group float max="4">
                                  <vs-avatar
                                    v-for="member in task.members"
                                    :key="member.id"
                                    style="border-radius: 100%; margin-left:3px; width:33px; height:33px;"
                                  >
                                    <img
                                      style="z-index:1;"
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
                        </div>
                      </router-link>
                    </a-card>
                  </div>
                </a-tab-pane>
              </a-tabs>
            </div>
          </a-row>
        </div>
      </div>
    </div>
    <div style="padding-bottom:90px">
      <!-- ระยะห่าง manu ข้างล่างกับ content -->
    </div>
    <BarRouter />
  </div>
</template>

<script>
// import store from '../store/index.js'
import ToolbarBack from '@/components/ToolbarBack.vue'
import BarRouter from '@/components/BarRouter.vue'
// import gql from 'graphql-tag'
import * as gqlQuery from '../constants/user'
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
          userId: parseInt(this.$route.params.id),
        }
      },
      update(data) {
        this.user = data.user
        console.log('We got some result!', data)
        this.dataProject = data.user.projects
        this.dataTask = data.user.tasks
      },
    },
  },
  computed: {
    projectNum() {
      return this.dataProject.filter(item => item.id).length
    },
    tasksUndone() {
      return this.dataTask.filter(item => item.isDone == false).length
    },
  },
  data() {
    return {
      user: null,
      dataProject: [],
      dataTask: [],
    }
  },
  mounted() {
    console.log(this.$route.params.id)
  },
}
</script>

<style>
#status {
  font-size: 10.5px;
  padding-right: 0px;
}
#cardTask {
  margin: 3px 0px 15px 0px;
  padding-bottom: 10px;
  border-radius: 2px;
}
</style>
