<template>
  <div style="margin-left:15px;; margin-right:15px">
    <div v-if="todayTaskFunc.length == 0" class="noData" style="height:200px;">
      <a-empty />
    </div>
    <div v-else>
      <div v-for="task in todayTaskFunc" :key="task.id">
        <a-card v-if="task.isDone == false" :bodyStyle="{ padding: '15px' }" id="card" align="left">
          <router-link :to="{ name: 'TaskDetail', params: { id: task.id } }">
            <div>
              <a-row type="flex" justify="space-between">
                <a-col :span="18" align="left">
                  <a-row>
                    <b class="taskFont" style="color:#333333;">
                      {{ task.taskName }}
                      <span v-if="task.files.length > 0">
                        <a-icon style="color:#105EFB" type="paper-clip" />
                      </span>
                      <span v-if="task.comments.length > 0">
                        <a-icon style="color:#105EFB" type="message" />
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
                            member.image ? member.image.fullPath : require('../assets/user.svg')
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

    <div style="padding-bottom:60px"></div>
  </div>
</template>

<script>
import * as gqlQueryUser from '../constants/user'
export default {
  name: 'TodayTask',
  apollo: {
    getUser: {
      query: gqlQueryUser.MEMBER_QUERY,
      variables() {
        return {
          userId: this.userId,
        }
      },
      update(data) {
        this.dataUser = data.user
        this.dataTask = data.user.tasks
      },
    },
  },
  data() {
    return {
      currentDate: new Date(),
      userId: 0,
      dataTask: [],
      dataUser: [],
      search: '',
      currentFilter: '',
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const get = JSON.parse(localStorage.getItem('vuex'))
      this.userId = get.Auth.user.id
    },
  },
  computed: {
    todayTaskFunc() {
      const currentDate = new Date(this.currentDate)
      return this.dataTask.filter(value => {
        let endDate = new Date(value.endTime)
        const numberDate = parseInt(
          (endDate.getTime() - currentDate.getTime()) / (24 * 3600 * 1000)
        )
        if (value.isDone == false && endDate > currentDate && numberDate > 3) {
          return value
        }
      })
    },
  },
}
</script>

<style scoped>
#card {
  margin: 3px 0px 24px 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
}
</style>
