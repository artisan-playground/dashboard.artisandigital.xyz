<template>
  <div class="menuContent">
    <div>
      <a-row :gutter="[0, 16]">
        <a-col>
          <router-link to="/MyOverdueTask">
            <a-card
              :bordered="false"
              class="overDue"
              style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); border-radius:4px;"
            >
              <div style="float:right;">
                <div class="num-task">
                  {{ numOverDue }}
                </div>
                <div class="name-task">
                  Over due
                </div>
              </div>
            </a-card>
          </router-link>
        </a-col>
        <a-col>
          <router-link to="/MyDeadlineTask">
            <a-card
              :bordered="false"
              class="deadline"
              style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); border-radius:4px;"
            >
              <div style="float:right;">
                <div class="num-task">
                  {{ numDeadline }}
                </div>
                <div class="name-task">
                  Deadline
                </div>
              </div>
            </a-card>
          </router-link>
        </a-col>
        <a-col>
          <router-link to="/MyTodayTask">
            <a-card
              :bordered="false"
              class="todaytask"
              style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); border-radius:4px;"
            >
              <div style="float:right;">
                <div class="num-task">
                  {{ numTodayTask }}
                </div>
                <div class="name-task">
                  My today's task
                </div>
              </div>
            </a-card>
          </router-link>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import * as gqlQueryUser from '../constants/user'
export default {
  name: 'MenuContent',
  apollo: {
    getUser: {
      query: gqlQueryUser.MEMBER_QUERY,
      variables() {
        return {
          userId: this.userId,
        }
      },
      fetchPolicy: 'cache-and-network',
      update(data) {
        this.dataUserId = data.user.id
        this.dataTask = data.user.tasks
        this.task = data.user.tasks
        this.deadlineFunc()
        this.todayTaskFunc()
        this.overDueFunc()
      },
    },
  },
  data() {
    return {
      currentDate: new Date(),
      userId: 0,
      dataTask: null,
      numTodayTask: 0,
      numDeadline: 0,
      numOverDue: 0,
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
    deadlineFunc() {
      let deadlineTaskTemp = 0
      const currentDate = new Date(this.currentDate)
      this.dataTask.filter(value => {
        let endDate = new Date(value.endTime)
        const numberDate = parseInt(
          (endDate.getTime() - currentDate.getTime()) / (24 * 3600 * 1000)
        )
        if (value.isDone == false && numberDate > 0 && numberDate < 3) {
          deadlineTaskTemp += 1
        }
      })
      this.numDeadline = deadlineTaskTemp
    },
    todayTaskFunc() {
      let todayTaskTemp = 0
      var currentDate = new Date(this.currentDate)
      this.dataTask.filter(value => {
        let endDate = new Date(value.endTime)
        const numberDate = parseInt(
          (endDate.getTime() - currentDate.getTime()) / (24 * 3600 * 1000)
        )
        if (value.isDone == false && endDate > currentDate && numberDate >= 3) {
          todayTaskTemp += 1
        }
      })
      this.numTodayTask = todayTaskTemp
    },
    overDueFunc() {
      let overDueTemp = 0
      const currentDate = new Date(this.currentDate)
      this.task.filter(value => {
        let endDate = new Date(value.endTime)
        if (value.isDone == false && endDate < currentDate) {
          overDueTemp += 1
        }
      })
      this.numOverDue = overDueTemp
    },
  },
}
</script>

<style scoped>
.menuContent {
  margin: 10px 18px 0px 18px;
  padding: 0 0 80px;
}
.overDue {
  background-image: url('../assets/menu-content/overDue.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom 70% right 10%;
}
.deadline {
  background-image: url('../assets/menu-content/deadline.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom 70% right 35px;
}
.todaytask {
  background-image: url('../assets/menu-content/todayTask.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom 50% right 75px;
}
.num-task {
  color: #0036c7;
  font-weight: 1000;
  font-size: 30px;
  text-align: right;
}
.name-task {
  font-weight: 600;
  font-size: 18px;
  text-align: right;
}
</style>
