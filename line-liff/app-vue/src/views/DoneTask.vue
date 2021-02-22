<template>
  <div>
    <ToolbarBack msg="Done Task" />
    <br />
    <div style="margin-top:60px;  margin-left:15px; margin-right:15px;">
      <div>
        <a-row style="margin-bottom:1.5rem" id="antInput">
          <a-input-search v-model="search" type="search" placeholder=" input search text" />
        </a-row>
      </div>
      <div v-if="emptyTask == 0" class="noData">
        <a-empty />
      </div>
      <div v-else>
        <div v-for="task in taskFilter" :key="task.id" style="margin-top:15px;">
          <a-card v-if="task.isDone" :bodyStyle="{ padding: '15px' }" id="card" align="left">
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

                      <div v-if="task.members.length >= 4" style="display:inline;">
                        <div
                          v-for="member in task.members.slice(3, 4)"
                          :key="member.id"
                          style="display:inline; margin: 0 2px;"
                        >
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
    <div style="padding-bottom:60px"></div>
    <BarRouter />
  </div>
</template>

<script>
import ToolbarBack from '@/components/ToolbarBack.vue'
import BarRouter from '@/components/BarRouter.vue'
import * as gqlQuery from '../constants/project'
export default {
  name: 'doneTask',
  components: {
    ToolbarBack,
    BarRouter,
  },
  data() {
    return {
      dataProject: null,
      dataTask: [],
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
      update(data) {
        this.dataProject = data.project
        this.dataTask = data.project.tasks
      },
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
    emptyTask() {
      let statusTask = 0
      return this.dataTask.filter(value => {
        if (value.isDone == true) {
          statusTask += 1
          return statusTask
        }
      })
    },
  },
}
</script>

<style></style>
