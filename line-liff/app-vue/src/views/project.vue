<template>
  <div v-if="dataProject">
    <ToolbarBack />
    <br />
    <v-row style="margin: 60px 0px 0px 0px">
      <v-col cols="3" style="padding: 12px 0px 0px 18px">
        <img id="imgProject" v-bind:src="dataProject.projectImage" />
      </v-col>
      <v-col cols="9" style="vertical-align: middle; font-size:16px" align="left">
        <div>
          <b>{{ dataProject.projectName }}</b>
        </div>
        <div id="position" style="">
          {{ dataProject.projectType }}
        </div>
        <div style="padding-top: 8px; font-size:14px">
          {{ dataProject.projectDetail }}
        </div>
      </v-col>
    </v-row>

    <v-row style="margin-left:6px; margin-right:6px;">
      <v-col>
        <v-card elevation="6" id="card">
          <div style="padding-top:10px">
            <a-icon type="carry-out" style="color:#105EFB" />
          </div>
            <b>{{ tasksDone }}</b>
          <div id="position" style="padding-bottom:10px">Done Task</div>
        </v-card>
      </v-col>
      <v-col>
        <v-card elevation="6" id="card">
          <div style="padding-top:10px">
            <a-icon type="team" style="color:#105EFB" />
          </div>
          <div>
            <b>{{ dataProject.members.length }}</b>
          </div>
          <div id="position" style="padding-bottom:10px">Members</div>
        </v-card>
      </v-col>
      <v-col>
        <v-card elevation="6" id="card">
          <div style="padding-top:10px"><a-icon type="profile" style="color:#105EFB" /></div>
          <div><b>{{ tasksUndone }}</b></div>
          <div id="position" style="padding-bottom:10px">Today's Task</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Date -->
    <v-row style="margin-left:6px; margin-right:6px;">
      <v-col v-if="project">
        <v-card id="card">
          <div style="padding-top:10px">
            <a-icon type="calendar" style="color:#105EFB" />
          </div>
          <div>
            <b>{{ $dayjs(dataProject.dueDate).format('DD MMM YYYY') }}</b>
          </div>
          <div id="position" style="padding-bottom:10px">Release Date</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Tasks -->
    <div>
      <v-row style="margin-left:6px; margin-right:6px;">
        <v-col><span style="float:left; font-size:20px; font-weight:550">Task</span></v-col>
        <v-col>
          <v-btn
            color="primary"
            style="float:right; text-transform: capitalize; background-color: #105EFB;"
            :to="{ name: 'createTask', params: { id: dataProject.id } }"
            ><a-icon type="plus-circle" style="margin-right:2.5px" />Create</v-btn
          >
        </v-col>
      </v-row>
      <div v-for="task in dataTask" :key="task.id" style="margin-left:6px; margin-right:6px;">
        <v-card id="taskcard" align="left" :to="{ name: 'taskDetail', params: { id: task.id } }">
          <div style="padding-left:15px">
            <v-row>
              <v-col>
                <v-row>
                  <b>
                    {{ task.taskName }} <a-icon style="color:#105EFB" type="paper-clip" /><a-icon
                      style="color:#105EFB"
                      type="message"
                    />
                  </b>
                </v-row>
                <v-row id="position">
                  {{ task.startTime }}
                </v-row>
              </v-col>
              <v-col align="right" id="status">
                <a-tag color="red" style="margin-right: 0px;" v-if="task.isDone == false">
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
              </v-col>
            </v-row>
            <v-row>
              <div>{{ task.taskDetail }}</div>
            </v-row>

            <!-- list members -->
            <v-row>
              <v-col align="right" style="padding-right: 16px;">
                <vs-avatar-group float max="4" style="float:right; margin-top:10px;">
                  <vs-avatar
                    v-for="member in task.members"
                    :key="member.id"
                    style="border-radius: 100%; margin-left:3px; width:33px; height:33px;"
                  >
                    <img style="z-index:1;" v-bind:src="member.image" />
                  </vs-avatar>
                </vs-avatar-group>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </div>
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
import * as gqlQuery from '../constants/graphql'
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
      members: store.state.members,
      task: store.state.tasks,
      form: this.$form.createForm(this),
      visible: false,
      dataProject: null,
      dataTask: [],
      dataMemberTask: null,
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
      update( data ) {
        this.dataProject = data.project
        this.dataTask = data.project.tasks
      },
    },
  },

  methods: {
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
    projectFunc() {
      return this.$store.getters.project(parseInt(this.$route.params.id))
    },
    tasksFunc() {
      return this.$store.getters.tasks
    },
    tasksDone() {
      return this.dataTask.filter(item => item.isDone==true).length
    },
    tasksUndone() {
      return this.dataTask.filter(item => item.isDone==false).length
    }
  },
}
</script>

<style>
div {
  font-family: 'Roboto';
}
#card {
  border-radius: 2px
}
#imgProject {
  margin-top: 2px;
  border-radius: 100%;
  width: 20vmin;
  height: 20vmin;
  /* height: 75px; */
  object-fit: cover;
}
#imgProject::after {
  display: block;
}
#position {
  color: #8f8f8f;
  font-size: 12px;
  margin-top: 0px;
  padding-bottom: 0px;
}
#taskcard {
  margin: 3px 15px 24px 15px; /* ระยะห่างรอบๆ card */
  border-radius: 2px;
  padding: 10px 12px 10px 12px;
  margin-bottom: 20px;
  text-decoration: none;
  color: black;
}

#status {
  font-size: 10.5px;
  padding-right: 16px;
  width: 25%;
}
</style>
