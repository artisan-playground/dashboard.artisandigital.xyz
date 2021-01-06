<template>
  <div class="TaskChart">
    <vc-donut
      hasLegend
      :thickness="35"
      legendPlacement="bottom"
      :sections="[
        { value: doneTask, label: 'Done Task', color: '#00ACB3' },
        { value: todayTask, label: `Today's task`, color: '#FECA7A' },
        { value: overDue, label: 'Over due', color: '#D84774' },
      ]"
      :total="task.length"
    >
      <div style="font-size:35px; color:#134F83; font-weight:600;">
        {{ ((doneTask * 100) / task.length).toFixed(2) }}%
      </div>
      <div>
        Done Task
      </div>
    </vc-donut>
  </div>
</template>

<script>
import * as gqlQueryUser from '../constants/user'
export default {
  name: 'DonutChart',
  apollo: {
    getUser: {
      query: gqlQueryUser.MEMBER_QUERY,
      variables() {
        return {
          userId: this.userId,
        }
      },
      update(data) {
        this.dataUserId = data.user.id
        this.dataTask = data.user.tasks
        this.task = data.user.tasks
        this.doneTaskFunc()
        this.todayTaskFunc()
        this.overDueFunc()
      },
    },
  },
  data() {
    return {
      currentDate: new Date(),
      task: 0,
      doneTask: 0,
      todayTask: 0,
      overDue: 0,
      dataTask: null,
      dataUserId: 0,
      userId: 0,
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
    doneTaskFunc() {
      let doneTaskTemp = 0
      this.dataTask.filter(value => {
        if (value.isDone == true) {
          doneTaskTemp += 1
        }
      })
      this.doneTask = doneTaskTemp
    },
    todayTaskFunc() {
      let todayTaskTemp = 0
      var currentDate = new Date(this.currentDate)
      this.dataTask.filter(value => {
        let endDate = new Date(value.endTime)
        if (value.isDone == false && endDate > currentDate) {
          todayTaskTemp += 1
        }
      })
      this.todayTask = todayTaskTemp
    },
    overDueFunc() {
      let overDueTemp = 0
      const currentDate = new Date(this.currentDate)
      this.dataTask.filter(value => {
        let endDate = new Date(value.endTime)
        if (value.isDone == false && endDate < currentDate) {
          overDueTemp += 1
        }
      })
      this.overDue = overDueTemp
    },
  },
  computed: {},
}
</script>

<style></style>
