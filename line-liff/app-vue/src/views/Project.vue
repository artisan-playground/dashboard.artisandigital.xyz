<template>
  <div v-if="dataProject">
    <ToolbarBack :msg="dataProject.projectName" />
    <br />
    <a-row class="space-top-left-right">
      <a-col
        :xs="{ span: 7 }"
        :sm="{ span: 6 }"
        :md="{ span: 4 }"
        :lg="{ span: 3 }"
        class="col-img"
      >
        <img
          id="imgProject"
          :src="
            dataProject.projectImage
              ? dataProject.projectImage.fullPath
              : 'https://source.unsplash.com/random?computer,technology'
          "
        />
      </a-col>
      <a-col
        :xs="{ span: 17 }"
        :sm="{ span: 18 }"
        :md="{ span: 20 }"
        :lg="{ span: 21 }"
        class="col-info"
        align="left"
      >
        <a-row>
          <a-col align="left" :span="20">
            <b>{{ dataProject.projectName }}</b>
          </a-col>
          <a-col align="right" :span="4">
            <router-link :to="{ name: 'EditProject', params: { id: dataProject.id } }">
              <a-icon type="edit" class="iconEdit" />
            </router-link>
          </a-col>
        </a-row>
        <a-row id="position">
          {{ dataProject.projectType }}
        </a-row>
        <a-row class="projectDetail" v-if="dataProject.projectDetail">
          <div>
            <span class="content" v-if="readDetailProject == false">
              {{ dataProject.projectDetail }}
            </span>
            <span v-else>
              {{ dataProject.projectDetail }}
            </span>
          </div>
          <div class="readMore-btn" @click="readDetailProject = !readDetailProject">
            <span v-if="readDetailProject" class="primaryColor">Read less</span>
            <span v-else class="primaryColor">Read more</span>
          </div>
        </a-row>
      </a-col>
    </a-row>

    <a-row class="space-top-left-right2">
      <!-- Done button -->
      <a-button
        size="large"
        v-if="dataStatus == 'undone'"
        block
        v-model="isDone"
        id="doneBtn"
        v-on:click="toggleDone()"
        :loading="isDone"
        @click="handleOk"
      >
        Mark as Done
      </a-button>
      <!-- WIP button -->
      <a-button
        size="large"
        v-if="dataStatus == 'done'"
        block
        v-model="isDone"
        id="wipBtn"
        v-on:click="toggleUndone()"
        :loading="isDone"
        @click="handleOk"
      >
        Mark as Undone
      </a-button>
    </a-row>

    <a-row :gutter="15" style="margin-top:15px; margin-left:7.5px; margin-right:7.5px;">
      <a-col :span="8">
        <a-card id="card" :bodyStyle="{ padding: '5px', margin: '0px' }">
          <router-link :to="{ name: 'DoneTask', params: { id: dataProject.id } }">
            <div class="iconCus">
              <a-icon type="carry-out" />
            </div>
            <b class="fifthColor">{{ tasksDone }}</b>
            <div id="position">Done Task</div>
          </router-link>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card id="card" :bodyStyle="{ padding: '5px' }">
          <router-link :to="{ name: 'MemberInProject', params: { id: dataProject.id } }">
            <div class="iconCus">
              <a-icon type="team" />
            </div>
            <div>
              <b class="fifthColor">{{ memberInProject }}</b>
            </div>
            <div id="position">Members</div>
          </router-link>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card id="card" :bodyStyle="{ padding: '5px' }">
          <router-link :to="{ name: 'TodayTask', params: { id: dataProject.id } }">
            <div class="iconCus"><a-icon type="profile" /></div>
            <div>
              <b class="fifthColor">{{ tasksUndone }}</b>
            </div>
            <div id="position">Today's Task</div>
          </router-link>
        </a-card>
      </a-col>
    </a-row>

    <!-- Date -->
    <a-row class="space-top-left-right2">
      <a-col>
        <a-card id="card" :bodyStyle="{ padding: '5px' }" style="border:none;">
          <div class="iconCus">
            <a-icon type="calendar" />
          </div>
          <div>
            <b class="fifthColor">{{ $dayjs(dataProject.dueDate).format('DD MMM YYYY') }}</b>
          </div>
          <div id="position">Release Date</div>
        </a-card>
      </a-col>
    </a-row>

    <!-- Tasks -->
    <a-row class="titleSpace">
      <a-col :xs="{ span: 18 }">
        <b class="titleName">Task</b>
      </a-col>
      <a-col :xs="{ span: 6 }">
        <div v-if="dataTask.length > 3" style="float:right;">
          <button style="font-size:20px;" :disabled="pageNumber === 0" @click="previousPage">
            <a-icon type="left" />
          </button>
          <button
            style="margin-left:20px; font-size:20px;"
            :disabled="pageNumber >= pageCount - 1"
            @click="nextPage"
          >
            <a-icon type="right" />
          </button>
        </div>
      </a-col>
    </a-row>
    <a-row style="margin-top:10px; margin-left:15px; margin-right:15px;">
      <a-col
        id="antInput"
        :xs="{ span: 18 }"
        :sm="{ span: 22 }"
        :md="{ span: 21 }"
        :lg="{ span: 21 }"
        :xl="{ span: 22 }"
        :xxl="{ span: 22 }"
      >
        <a-input-search v-model="search" type="search" placeholder=" input search text" />
      </a-col>
      <a-col
        :xs="{ span: 6 }"
        :sm="{ span: 2 }"
        :md="{ span: 3 }"
        :lg="{ span: 3 }"
        :xl="{ span: 2 }"
        :xxl="{ span: 2 }"
      >
        <router-link :to="{ name: 'CreateTask', params: { id: dataProject.id } }">
          <a-button
            class="btn-cus"
            style="background-color:#134F83; color:white; border:none; border-radius:2px; width:100%;"
          >
            <a-icon type="plus" />
            <span style="margin:0 2px">
              Create
            </span>
          </a-button>
        </router-link>
      </a-col>
    </a-row>
    <div style="padding-bottom:20px">
      <div v-if="dataTask.length > 0">
        <div v-for="task in taskFilter.slice(0, 3)" :key="task.id" class="titleSpace">
          <a-card :bodyStyle="{ padding: '15px' }" id="card" align="left">
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
                    <a-tag color="red" class="status-task" v-if="task.isDone == false">
                      <span
                        id="iconStatus"
                        class="iconify"
                        data-inline="false"
                        data-icon="carbon:warning"
                      ></span>
                      WIP
                    </a-tag>
                    <a-tag color="green" class="status-task" v-if="task.isDone == true">
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
                      <div v-for="member in task.members.slice(0, 3)" :key="member.id">
                        <a-avatar
                          v-bind:src="
                            member.image ? member.image.fullPath : require('../assets/user.svg')
                          "
                        />
                      </div>
                      <div v-if="task.members.length >= 4">
                        <div v-for="member in task.members.slice(3, 4)" :key="member.id">
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
              </div>
            </router-link>
          </a-card>
        </div>
      </div>
      <div v-if="taskFilter.slice(0, 3).length == 0" style="margin-top:30px;">
        <a-empty />
      </div>

      <!-- Recent -->
      <a-row class="titleSpace" v-if="recentfilter.length > 0">
        <a-col :xs="{ span: 19 }">
          <b class="titleName">Recent Activity</b>
        </a-col>
        <a-col :xs="{ span: 5 }" class="uploadProfile">
          <div v-if="recentfilter.length > 3" class="readMore-btn" @click="readMore = !readMore">
            <span v-if="readMore" class="primaryColor">
              See less
            </span>
            <span v-else class="primaryColor">
              See all
            </span>
          </div>
        </a-col>
      </a-row>
      <a-row class="space-left-right">
        <a-card
          v-for="recent in recentfilter.sort((a, b) => (a.id < b.id ? 1 : -1)).slice(0, 3)"
          :key="recent.id"
          class="card-recent"
          :bodyStyle="{ padding: '15px' }"
        >
          <a-col :xs="{ span: 1 }">
            <a-icon type="check-circle" id="iconTask" />
          </a-col>
          <a-col :xs="{ span: 14 }">
            <div style="float:left; text-align: left; padding-left:8px;">
              {{ recent.message }}
            </div>
          </a-col>
          <a-col :xs="{ span: 9 }">
            <span class="col-right">by {{ recent.user.name }}</span>
          </a-col>
        </a-card>

        <a-card
          v-show="readMore"
          v-for="recent in recentfilter
            .sort((a, b) => (a.id < b.id ? 1 : -1))
            .slice(3, recentfilter.length)"
          :key="recent.id"
          class="card-recent"
          :bodyStyle="{ padding: '15px' }"
        >
          <a-col :xs="{ span: 1 }">
            <a-icon type="check-circle" id="iconTask" />
          </a-col>
          <a-col :xs="{ span: 14 }">
            <div class="recentMessage">
              {{ recent.message }}
            </div>
          </a-col>
          <a-col :xs="{ span: 9 }">
            <span class="col-right">by {{ recent.user.name }}</span>
          </a-col>
        </a-card>
      </a-row>
    </div>
  </div>
</template>

<script>
import ToolbarBack from '@/components/ToolbarBack.vue'
import * as gqlQuery from '../constants/project'
import * as gqlQueryRecent from '../constants/recentActivity'
export default {
  name: 'project',
  components: {
    ToolbarBack,
  },
  data() {
    return {
      loading: true,
      dataProject: null,
      dataStatus: null,
      dataTask: [],
      isDone: false,
      search: '',
      userId: 0,
      pageNumber: 0,
      pageSize: 3,
      recents: [],
      readMore: false,
      readDetailProject: false,
    }
  },
  apollo: {
    getStatus: {
      query: gqlQuery.PROJECT_QUERY,
      variables() {
        return {
          projectId: parseInt(this.$route.params.id),
        }
      },
      update(data) {
        this.dataStatus = data.project.status
      },
    },
    getProject: {
      query: gqlQuery.PROJECT_QUERY,
      variables() {
        return {
          projectId: parseInt(this.$route.params.id),
        }
      },
      fetchPolicy: 'cache-and-network',
      update(data) {
        this.dataProject = data.project
        this.dataTask = data.project.tasks
      },
    },
    getRecent: {
      query: gqlQueryRecent.QUERY_RECENT,
      variables() {
        return {
          projectId: parseInt(this.$route.params.id),
        }
      },
      fetchPolicy: 'cache-and-network',
      update(data) {
        this.recents = data.getRecentActivityByProjectId
      },
    },
  },

  mounted() {
    this.getData()
  },
  methods: {
    nextPage() {
      this.pageNumber++
    },
    previousPage() {
      this.pageNumber--
    },
    handleOk() {
      this.isDone = true
      setTimeout(() => {
        this.isDone = false
      }, 1000)
    },
    toggleDone() {
      const val = 'Project marked as done'
      this.$apollo
        .mutate({
          mutation: gqlQuery.PROJECT_STATUS,
          variables: {
            id: parseInt(this.$route.params.id),
            data: {
              status: { set: 'done' },
            },
          },
        })
        .then(this.createRecent(val))
    },
    toggleUndone() {
      const val = 'Project marked as undone'
      this.$apollo
        .mutate({
          mutation: gqlQuery.PROJECT_STATUS,
          variables: {
            id: parseInt(this.$route.params.id),
            data: {
              status: { set: 'undone' },
            },
          },
        })
        .then(this.createRecent(val))
    },
    createRecent(val) {
      this.$apollo.mutate({
        mutation: gqlQueryRecent.CREATE_RECENT,
        variables: {
          message: `${val}`,
          userId: this.userId,
          projectId: this.dataProject.id,
        },
      })
    },
    getData() {
      const get = JSON.parse(localStorage.getItem('vuex'))
      this.user = get.Auth.user
      this.userId = get.Auth.user.id
    },
  },

  computed: {
    pageCount() {
      return this.dataTask.length / this.pageSize
    },
    recentfilter() {
      return this.recents.filter(item => {
        const dataDate = this.$dayjs().isSame(this.$dayjs(item.timestamp), 'day', 'month', 'year')
        if (dataDate) {
          return item
        }
      })
    },
    taskFilter() {
      let text = this.search.trim()
      let dataTask = this.dataTask.filter(item => {
        return (
          (item.taskName && item.taskName.toLowerCase().indexOf(text.toLowerCase()) > -1) ||
          (item.taskDetail && item.taskDetail.toLowerCase().indexOf(text.toLowerCase()) > -1)
        )
      })
      const start = this.pageNumber * this.pageSize,
        end = start + this.pageSize
      return dataTask.slice(start, end)
    },
    tasksDone() {
      return this.dataTask.filter(item => item.isDone == true).length
    },
    tasksUndone() {
      return this.dataTask.filter(item => item.isDone == false).length
    },
    memberInProject() {
      return this.dataProject.members.length
    },
  },
}
</script>

<style lang="less">
@seventh: #8f8f8f;
.col-img {
  padding: 0px 0px 0px 0px;
  display: flex;
}
.col-info {
  vertical-align: middle;
  font-size: 16px;
}
.col-right {
  float: right;
  color: @seventh;
}
#imgProject {
  margin-top: 2px;
  border-radius: 100%;
  width: 22vmin;
  height: 22vmin;
  object-fit: cover;
}
#imgProject::after {
  display: block;
}
.projectDetail {
  padding-top: 8px;
  font-size: 14px;
}
@media only screen and (min-width: 768px) {
  #imgProject {
    width: 100px;
    height: 100px;
  }
}
.iconCus .anticon svg {
  display: inline-block;
  color: #0036c7;
  font-size: 20px;
  margin-top: 5px;
}
.status-task {
  float: right;
  margin-right: 0px;
}
.card-recent {
  border: none;
}
button:disabled,
button[disabled] {
  opacity: 0.3;
}
.recentMessage {
  float: left;
  text-align: left;
  padding-left: 8px;
}
</style>
