<template>
  <div>
    <ToolbarBack msg="Done Task" />
    <br />
    <div style="margin-top:60px;"></div>
    <div
      v-for="task in dataTask"
      :key="task.id"
      style="margin-top:15px; margin-left:15px; margin-right:15px;"
    >
      <a-card v-if="task.isDone" :bodyStyle="{ padding: '15px' }" id="card" align="left">
        <router-link :to="{ name: 'taskDetail', params: { id: task.id } }">
          <div>
            <a-row type="flex" justify="space-between">
              <a-col :span="18" align="left">
                <a-row>
                  <b style="color:black;">
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
                        v-bind:src="member.image ? member.image.fullPath : ''"
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
    <div style="padding-bottom:60px">
      <!-- ระยะห่าง manu ข้างล่างกับ content -->
    </div>
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
}
</script>

<style></style>
