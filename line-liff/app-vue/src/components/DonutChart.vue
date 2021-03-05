<script>
import * as gqlQueryUser from '../constants/user'
import { Doughnut } from '../../node_modules/vue-chartjs/src/BaseCharts'
const get = JSON.parse(localStorage.getItem('vuex'))
export default {
  name: 'donutchart',
  extends: Doughnut,
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
      dataTask: [],
      dataUserId: 0,
      userId: 0,
    }
  },
  async mounted() {
    await this.getData()
    await this.$apollo.queries.getUser.refetch()
    await this.doneTaskFunc()
    await this.todayTaskFunc()
    await this.overDueFunc()
    await this.renderChart(
      {
        labels: ['Done Task', `Today's task`, 'Over due'],
        datasets: [
          {
            label: 'Tasks Status',
            backgroundColor: ['#00ACB3', '#FECA7A', '#D84774'],
            data: [this.doneTask, this.todayTask, this.overDue],
          },
        ],
      },
      { responsive: false }
    )
  },
  methods: {
    getData() {
      this.userId = get.Auth.user.id
    },
    doneTaskFunc() {
      let doneTaskTemp = 0
      this.dataTask &&
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
      this.dataTask &&
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
      this.dataTask &&
        this.dataTask.filter(value => {
          let endDate = new Date(value.endTime)
          if (value.isDone == false && endDate < currentDate) {
            overDueTemp += 1
          }
        })
      this.overDue = overDueTemp
    },
  },
}
</script>

<style></style>
