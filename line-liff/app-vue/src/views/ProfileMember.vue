<template>
  <div v-if="user">
    <ToolbarBack :msg="user.name" />
    <br />
    <div>
      <div>
        <div>
          <a-row
            class="space-top-left-right"
            type="flex"
            justify="space-around"
            align="middle"
            style="font-size:12.5px; margin-bottom: 10px;"
          >
            <a-col :span="6">
              <img
                class="profile"
                id="profilePic"
                :src="user.image ? user.image.fullPath : require('../assets/user.svg')"
              />
              <h3 id="displayName" style="display:inline"></h3>
            </a-col>

            <a-col :span="6">
              <a-row>{{ projectNum }}</a-row>
              <a-row>Project</a-row>
            </a-col>

            <a-col :span="6">
              <a-row>{{ doneTask }}</a-row>
              <a-row>Done Task</a-row>
            </a-col>
            <a-col :span="6">
              <a-row>{{ tasksUndone }}</a-row>
              <a-row>Today’s task</a-row>
            </a-col>
          </a-row>

          <a-row class="space-left-right" style="float:left; margin-bottom:40px; text-align:left;">
            <div>
              <span class="username">
                {{ user.name }}
              </span>
            </div>
            <div>
              <span>
                {{ user.position }}
              </span>
            </div>
          </a-row>

          <a-row>
            <div id="tabCusProfile">
              <a-tabs default-active-key="1">
                <a-tab-pane key="1" tab="Project">
                  <div class="space-right-bottom-left">
                    <a-row style="margin-bottom:1.5rem">
                      <a-col :span="18" style="width:80%" id="antInput">
                        <a-input-search
                          v-model="search"
                          type="search"
                          placeholder=" input search text"
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

                    <div v-if="dataProject.length == 0" class="noData">
                      <a-empty />
                    </div>
                    <div v-else>
                      <a-card
                        id="card"
                        :bodyStyle="{ padding: '15px' }"
                        v-for="project in searchProjectFilter"
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
                            <a-col :span="4" id="status">
                              <a-tag
                                class="status-tag"
                                color="red"
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
                                class="status-tag"
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
                              <div class="listMember">
                                <div v-for="member in project.members.slice(0, 3)" :key="member.id">
                                  <a-avatar
                                    v-bind:src="
                                      member.image
                                        ? member.image.fullPath
                                        : require('../assets/user.svg')
                                    "
                                  />
                                </div>
                                <div v-if="project.members.length >= 4">
                                  <div
                                    v-for="member in project.members.slice(3, 4)"
                                    :key="member.id"
                                  >
                                    <a-avatar class="avatar-plus">
                                      <a-icon slot="icon" type="plus" />
                                    </a-avatar>
                                    <a-avatar
                                      v-bind:src="
                                        member.image
                                          ? member.image.fullPath
                                          : require('../assets/user.svg')
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
                </a-tab-pane>
                <a-tab-pane key="2" tab="Tasks" force-render>
                  <div class="space-right-bottom-left">
                    <a-row style="margin-bottom:1.5rem" id="antInput">
                      <a-input-search
                        v-model="search"
                        type="search"
                        placeholder=" input search text"
                      />
                    </a-row>
                    <div v-if="emptyTask == 0" class="noData" style="height:200px;">
                      <a-empty />
                    </div>
                    <div v-else>
                      <div v-for="task in searchTaskFilter" :key="task.id">
                        <a-card
                          v-if="!task.isDone"
                          :bodyStyle="{ padding: '15px' }"
                          id="cardTask"
                          align="left"
                        >
                          <router-link :to="{ name: 'TaskDetail', params: { id: task.id } }">
                            <div>
                              <a-row type="flex" justify="space-between">
                                <a-col :span="18" align="left">
                                  <a-row>
                                    <b class="taskNameFont">
                                      {{ task.taskName }}
                                      <span v-if="task.files.length > 0">
                                        <a-icon id="iconTask" type="paper-clip" />
                                      </span>
                                      <span v-if="task.comments.length > 0">
                                        <a-icon id="iconTask" type="message" />
                                      </span>
                                    </b>
                                  </a-row>
                                  <a-row id="position">
                                    {{ $dayjs(task.startTime).format('DD MMM YY ') }}
                                    <span>
                                      Time
                                      {{ $dayjs(task.startTime).format('HH:mm') }}
                                    </span>
                                  </a-row>
                                </a-col>
                                <a-col :span="4" id="status">
                                  <a-tag color="red" class="status-tag" v-if="task.isDone == false">
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
                                <div class="content">{{ task.taskDetail }}</div>
                              </a-row>

                              <!-- list members -->
                              <a-row>
                                <a-col>
                                  <div class="listMember">
                                    <div
                                      v-for="member in task.members.slice(0, 3)"
                                      :key="member.id"
                                    >
                                      <a-avatar
                                        v-bind:src="
                                          member.image
                                            ? member.image.fullPath
                                            : require('../assets/user.svg')
                                        "
                                      />
                                    </div>

                                    <div v-if="task.members.length >= 4">
                                      <div
                                        v-for="member in task.members.slice(3, 4)"
                                        :key="member.id"
                                      >
                                        <a-avatar class="avatar-plus">
                                          <a-icon slot="icon" type="plus" />
                                        </a-avatar>
                                        <a-avatar
                                          v-bind:src="
                                            member.image
                                              ? member.image.fullPath
                                              : require('../assets/user.svg')
                                          "
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </a-col>
                              </a-row>
                            </div>
                          </router-link>
                        </a-card>
                      </div>
                    </div>
                  </div>
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
import ToolbarBack from '@/components/ToolbarBack.vue'
import BarRouter from '@/components/BarRouter.vue'
import * as gqlQuery from '../constants/user'
export default {
  name: 'profileMember',
  components: {
    ToolbarBack,
    BarRouter,
  },
  data() {
    return {
      user: null,
      dataProject: [],
      dataTask: [],
      search: '',
      currentFilter: '',
    }
  },
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
    doneTask() {
      return this.dataTask.filter(item => item.isDone == true).length
    },
    emptyTask() {
      let statusTask = 0
      return this.dataTask.filter(value => {
        if (value.isDone == false) {
          statusTask += 1
          return statusTask
        }
      })
    },
    searchProjectFilter() {
      let text = this.search.trim()
      let filterStatus = this.currentFilter.trim()

      return this.dataProject.filter(item => {
        let filtered = true
        if (filterStatus && filterStatus.length > 0) {
          filtered = item.status == filterStatus
          return filtered
        } else {
          return item.projectName.indexOf(text) > -1
        }
      })
    },
    searchTaskFilter() {
      let text = this.search.trim()

      return this.dataTask.filter(item => {
        return item.taskName.indexOf(text) > -1
      })
    },
  },
}
</script>

<style>
#status {
  font-size: 10.5px;
  padding-right: 0px;
}
#cardTask {
  margin: 3px 0px 24px 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
}
#card {
  margin: 3px 0px 24px 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
}
</style>
