<template>
  <div class="space-left-right">
    <div>
      <a-row style="margin-bottom:1.5rem" id="antInput">
        <a-input-search v-model="search" type="search" placeholder=" input search text" />
      </a-row>
    </div>
    <div v-if="deadlineFunc.length == 0" class="noData" style="height:200px;">
      <a-empty />
    </div>
    <div v-else>
      <div v-for="task in deadlineFunc" :key="task.id">
        <a-card v-if="task.isDone == false" :bodyStyle="{ padding: '15px' }" id="card" align="left">
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
                  <a-row style="color:#FF4D4F;" id="position">
                    {{ $dayjs(task.startTime).format('DD MMM YY ') }}
                    <span>
                      Time
                      {{ $dayjs(task.startTime).format('HH:mm') }}
                    </span>
                  </a-row>
                </a-col>
                <a-col :span="4" id="status">
                  <a-tag color="red" class="status-tag">
                    <span
                      id="iconStatus"
                      class="iconify"
                      data-inline="false"
                      data-icon="carbon:warning"
                    ></span>
                    WIP
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
                      style="display:inline; margin: 0 2px;"
                    >
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
  async mounted() {
    await this.getData()
    await this.$apollo.queries.getUser.refetch()
  },
  methods: {
    getData() {
      const get = JSON.parse(localStorage.getItem('vuex'))
      this.userId = get.Auth.user.id
    },
  },
  computed: {
    deadlineFunc() {
      let text = this.search.trim()
      const currentDate = new Date(this.currentDate)
      return this.dataTask.filter(value => {
        let endDate = new Date(value.endTime)
        const numberDate = parseInt(
          (endDate.getTime() - currentDate.getTime()) / (24 * 3600 * 1000)
        )
        if (value.isDone == false && numberDate > 0 && numberDate < 3) {
          return (
            value.taskName.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
            value.taskDetail.toLowerCase().indexOf(text.toLowerCase()) > -1
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
