<template>
  <div v-if="dataProject">
    <ToolbarBack />
    <br />
    <a-row style="margin: 60px 15px 0px 15px">
      <a-col :span="7" style="padding: 0px 0px 0px 0px; display:flex;">
        <img
          id="imgProject"
          :src="
            dataProject.projectImage
              ? dataProject.projectImage.fullPath
              : 'https://source.unsplash.com/random?computer,technology'
          "
        />
      </a-col>
      <a-col :span="17" style="vertical-align: middle; font-size:16px;" align="left">
        <a-row>
          <a-col align="left" :span="20">
            <b>{{ dataProject.projectName }}</b>
          </a-col>
          <a-col align="right" :span="4">
            <a-icon type="edit" style="color:#0036C7;" />
          </a-col>
        </a-row>
        <a-row id="position" style="">
          {{ dataProject.projectType }}
        </a-row>
        <a-row style="padding-top: 8px; font-size:14px">
          {{ dataProject.projectDetail }}
        </a-row>
      </a-col>
    </a-row>

    <a-row style="margin: 15px 15px 0px 15px">
      <!-- Done button -->
      <a-button
        size="large"
        v-if="dataProject.status == 'undone'"
        block
        v-model="isDone"
        style="background-color:#FF4D4F; color:white; border: none; border-radius:2px;"
        v-on:click="toggleDone()"
        :loading="loading"
        @click="handleOk"
      >
        Mark as Done
      </a-button>
      <!-- WIP button -->
      <a-button
        size="large"
        v-if="dataProject.status == 'done'"
        block
        v-model="isDone"
        style="background-color:#73D13D; color:white; border: none; border-radius:2px;"
        v-on:click="toggleUndone()"
        :loading="loading"
        @click="handleOk"
      >
        Mark as Done
      </a-button>
    </a-row>

    <a-row :gutter="15" style="margin-top:15px; margin-left:7.5px; margin-right:7.5px;">
      <a-col :span="8">
        <a-card id="card" :bodyStyle="{ padding: '5px', margin: '0px' }">
          <router-link :to="{ name: 'doneTask', params: { id: dataProject.id } }">
            <div>
              <a-icon type="carry-out" style="color:#105EFB" />
            </div>
            <b style="color:#333333">{{ tasksDone }}</b>
            <div id="position">Done Task</div>
          </router-link>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card id="card" :bodyStyle="{ padding: '5px' }">
          <router-link :to="{ name: 'memberInProject', params: { id: dataProject.id } }">
            <div>
              <a-icon type="team" style="color:#105EFB" />
            </div>
            <div>
              <b style="color:#333333">{{ memberInProject }}</b>
            </div>
            <div id="position">Members</div>
          </router-link>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card id="card" :bodyStyle="{ padding: '5px' }">
          <router-link :to="{ name: 'todayTask', params: { id: dataProject.id } }">
            <div><a-icon type="profile" style="color:#105EFB" /></div>
            <div>
              <b style="color:#333333">{{ tasksUndone }}</b>
            </div>
            <div id="position">Today's Task</div>
          </router-link>
        </a-card>
      </a-col>
    </a-row>

    <!-- Date -->
    <a-row style="margin-top:15px; margin-left:15px; margin-right:15px;">
      <a-col v-if="project">
        <a-card id="card" :bodyStyle="{ padding: '5px' }">
          <div>
            <a-icon type="calendar" style="color:#105EFB" />
          </div>
          <div>
            <b style="color:#333333">{{ $dayjs(dataProject.dueDate).format('DD MMM YYYY') }}</b>
          </div>
          <div id="position">Release Date</div>
        </a-card>
      </a-col>
    </a-row>

    <!-- Tasks -->
    <a-row style="margin-top:30px; margin-left:15px; margin-right:15px;">
      <span style="float:left; font-size:20px; font-weight:550">Task</span>
    </a-row>
    <a-row style="margin-top:10px; margin-left:15px; margin-right:15px;">
      <a-col :span="18">
        <a-input-search v-model="search" type="search" placeholder=" input search text" />
      </a-col>
      <a-col :span="6">
        <router-link :to="{ name: 'createTask', params: { id: dataProject.id } }">
          <a-button
            style="float:right; background-color:#0036C7; color:white; border:none; border-radius:2px;"
          >
            <a-icon type="plus-circle" style="margin-right:2.5px" />Create
          </a-button>
        </router-link>
      </a-col>
    </a-row>
    <div v-if="dataTask.length > 0">
      <div
        v-for="task in taskFilter"
        :key="task.id"
        style="margin-top:15px; margin-left:15px; margin-right:15px;"
      >
        <a-card :bodyStyle="{ padding: '15px' }" id="card" align="left">
          <router-link :to="{ name: 'taskDetail', params: { id: task.id } }">
            <div>
              <a-row type="flex" justify="space-between">
                <a-col :span="18" align="left">
                  <a-row>
                    <b style="color:#333333;">
                      {{ task.taskName }} <a-icon style="color:#105EFB" type="paper-clip" /><a-icon
                        style="color:#105EFB"
                        type="message"
                      />
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
                  <a-tag color="green" style="margin-right: 0px;" v-if="task.isDone == true">
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
                <div style="color:#333333;" class="content">{{ task.taskDetail }}</div>
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
    </div>
    <div v-else style="margin-top:30px;">
      <a-empty />
    </div>

    <div style="padding-bottom:90px">
      <!-- ระยะห่าง manu ข้างล่างกับ content -->
    </div>
    <BarRouter />
  </div>
</template>

<script>
import store from '../store/index.js'
import ToolbarBack from '@/components/ToolbarBack.vue'
import BarRouter from '@/components/BarRouter.vue'
import * as gqlQuery from '../constants/project'
// import gql from 'graphql-tag'
export default {
  name: 'project',
  components: {
    ToolbarBack,
    BarRouter,
  },
  data() {
    const projectId = parseInt(this.$route.params.id)
    return {
      project: store.state.projects.find(p => p.id === projectId),
      loading: false,
      form: this.$form.createForm(this),
      visible: false,
      dataProject: null,
      dataTask: [],
      dataMemberTask: null,
      status: false,
      isDone: false,
      search: '',
    }
  },
  apollo: {
    getProject: {
      query: gqlQuery.PROJECT_QUERY,
      variables() {
        return {
          projectId: parseInt(this.$route.params.id),
        }
      },
      fetchPolicy: 'no-cache',
      update(data) {
        console.log('Get again :', data.project.tasks.length)
        this.dataProject = data.project
        this.dataTask = data.project.tasks
      },
    },
  },

  mounted() {},

  methods: {
    handleOk() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    toggleDone() {
      console.log(parseInt(this.$route.params.id))
      console.log(gqlQuery.PROJECT_STATUS)

      this.$apollo.mutate({
        mutation: gqlQuery.PROJECT_STATUS,
        variables: {
          id: parseInt(this.$route.params.id),
          data: {
            status: { set: 'done' },
          },
        },
        update: (store, { data: { updateOneProject } }) => {
          if (updateOneProject.status) {
            // eslint-disable-next-line
            console.log(updateOneProject)
          }
        },
      })
    },
    toggleUndone() {
      console.log(parseInt(this.$route.params.id))
      console.log(gqlQuery.PROJECT_STATUS)

      this.$apollo.mutate({
        mutation: gqlQuery.PROJECT_STATUS,
        variables: {
          id: parseInt(this.$route.params.id),
          data: {
            status: { set: 'undone' },
          },
        },
        update: (store, { data: { updateOneProject } }) => {
          if (updateOneProject.status) {
            // eslint-disable-next-line
            console.log(updateOneProject)
          }
        },
      })
    },

    showDrawer() {
      this.visible = true
      console.log(this.visible)
    },
    onClose() {
      this.visible = false
    },
  },

  computed: {
    formatCompat(date) {
      var ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return date.getDate() + ' ' + ms[date.getMonth()] + ' ' + date.getFullYear()
    },
    taskFilter() {
      let text = this.search.trim()
      return this.dataTask.filter(item => {
        return item.taskName.toLowerCase().indexOf(text.toLowerCase()) > -1
      })
    },
    projectFunc() {
      return this.$store.getters.project(parseInt(this.$route.params.id))
    },
    tasksFunc() {
      return this.$store.getters.tasks
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

<style>
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
</style>
