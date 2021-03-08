<template>
  <div class="space-right-bottom-left">
    <div>
      <a-row style="margin-bottom:1.5rem" id="antInput">
        <a-col :span="18" style="width:80%" id="antInput">
          <a-input-search v-model="search" type="search" placeholder=" input search text" />
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
    <div
      v-if="
        taskFilter.length == 0 ||
          (currentFilter == 'done' && taskFilterDone.length == 0) ||
          (currentFilter == 'undone' && taskFilterUndone.length == 0)
      "
      class="noData"
      style="height:200px;"
    >
      <a-empty />
    </div>
    <div v-else>
      <div
        v-for="task in currentFilter == ''
          ? taskFilter
          : currentFilter == 'done'
          ? taskFilterDone
          : taskFilterUndone"
        :key="task.id"
      >
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
                    {{ $dayjs(task.startTime).format('DD MMM YY') }}
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
  </div>
</template>

<script>
import * as gqlQueryUser from '../constants/user'
export default {
  name: 'Tasks',
  apollo: {
    getUser: {
      query: gqlQueryUser.MEMBER_QUERY,
      variables() {
        return {
          userId: this.userId,
        }
      },
      update(data) {
        this.dataTask = data.user.tasks
      },
    },
  },
  data() {
    return {
      userId: 0,
      dataTask: [],
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
    taskFilter() {
      let text = this.search.trim()
      return this.dataTask.filter(item => {
        return (
          item.taskName.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
          item.taskDetail.toLowerCase().indexOf(text.toLowerCase()) > -1
        )
      })
    },
    taskFilterDone() {
      let text = this.search.trim()
      return this.dataTask.filter(item => {
        if (item.isDone == true) {
          return (
            (item.taskName && item.taskName.toLowerCase().indexOf(text.toLowerCase()) > -1) ||
            (item.taskDetail && item.taskDetail.toLowerCase().indexOf(text.toLowerCase()) > -1)
          )
        }
      })
    },
    taskFilterUndone() {
      let text = this.search.trim()
      return this.dataTask.filter(item => {
        if (item.isDone == false) {
          return (
            (item.taskName && item.taskName.toLowerCase().indexOf(text.toLowerCase()) > -1) ||
            (item.taskDetail && item.taskDetail.toLowerCase().indexOf(text.toLowerCase()) > -1)
          )
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
