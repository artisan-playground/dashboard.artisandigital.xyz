<template>
  <div>
    <ToolbarBack msg="Create Task"  />
    <br />
    <div style="margin: 60px 18px 0px 18px" v-if="dataProject">
      <a-form layout="vertical" hide-required-mark>
        <a-row>
          <a-form-item label="Task name">
            <a-input
              v-model="taskName"
              v-decorator="[
                'name',
                {
                  rules: [{ required: true, message: 'Please enter Task name' }],
                },
              ]"
              placeholder="Task name"
            />
          </a-form-item>
        </a-row>
        <a-row style="">
          <a-form-item label="Members">
            <a-mentions
              style="text-align: initial;"
              placeholder="input @ to mention people"
              v-model="member"
            >
              <a-mentions-option
                v-for="user in dataProject.members"
                :key="user.id"
                :value="user.name"
              >
                <v-img style="float:left;" v-bind:src="user.image" id="imgProfile" />
                <span style="float:left; margin-left:5px">{{ user.name }}</span>
              </a-mentions-option>
            </a-mentions>
          </a-form-item>

        <!-- <select name="" id="" v-model="member">
          <option v-for="user in dataProject.members" :key="user.id" :value="user.id">
            {{ user.name }}
          </option>
        </select> -->
          
        </a-row>
        <a-row>
          <a-form-item label="Approver">
            <a-mentions
              style="text-align: initial;"
              placeholder="input @ to mention people"
              v-model="reviewer"
            >
              <a-mentions-option v-for="user in users" :key="user.id" :value="user.name">
                <v-img style="float:left;" v-bind:src="user.image" id="imgProfile" />
                <span style="float:left; margin-left:5px">{{ user.name }}</span>
              </a-mentions-option>
            </a-mentions>
          </a-form-item>
        </a-row>
        <a-row>
          <a-form-item label="Date" style="margin-bottom:0;">
            <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
              <a-date-picker style="width: 100%" v-model="startTime" />
            </a-form-item>
            <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }">
              -
            </span>
            <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
              <a-date-picker style="width: 100%" v-model="endTime" />
            </a-form-item>
          </a-form-item>
        </a-row>
        <a-row>
          <a-form-item label="Description">
            <a-textarea
              v-model="taskDetail"
              v-decorator="[
                'description',
                {
                  rules: [{ required: true, message: 'Please enter url description' }],
                },
              ]"
              :rows="4"
              placeholder="please enter url description"
            />
          </a-form-item>
        </a-row>
        <a-row>
          <v-btn
            @click="createTask"
            block
            color="primary"
            elevation="2"
            to=""
            style="text-transform: capitalize; background-color: #105EFB;"
            >Submit</v-btn
          >
        </a-row>
      </a-form>
    </div>
    <BarRouter />
  </div>
</template>

<script>
import ToolbarBack from '@/components/ToolbarBack.vue'
import BarRouter from '@/components/BarRouter.vue'
import * as gqlQuery from '../constants/graphql'

export default {
  name: 'createTask',
  components: {
    ToolbarBack,
    BarRouter,
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

    users: gqlQuery.ALL_MEMBER_QUERY,
  },
  data() {
    return {
      startValue: null,
      endValue: null,
      endOpen: false,
      reviewer: '',
      taskName: '',
      member: '',
      memberId: '',
      taskDetail: '',
      startTime: '',
      endTime: '',
      dataProject: null,
      users: [],
    }
  },
  watch: {
    startValue(val) {
      console.log('startValue', val)
    },
    endValue(val) {
      console.log('endValue', val)
    },
  },
  methods: {
    async createTask() {
      console.log(parseInt(this.$route.params.id))
      console.log(this.taskName)
      console.log(this.member)
      console.log(this.taskDetail)
      console.log(this.startTime)
      console.log(this.endTime)
      console.log(this.memberId)

      // const result = await this.$apollo.mutate({
      //   mutation: gqlQuery.ADD_TASK,
      //   variables: {
      //     projectId: parseInt(this.$route.params.id),
      //     taskName: this.taskName,
      //     taskDetail: this.taskDetail,
      //     startTime: this.startTime,
      //     endTime: this.endTime,
      //     isDone: false,
      //     members: 8
      //   },
      // })
    },

    onSearch(_, prefix) {
      console.log(_, prefix)
      this.prefix = prefix

      console.log(this.users)
    },
    disabledStartDate(startValue) {
      const endValue = this.endValue
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open
    },
  },
}
</script>

<style>
div {
  font-family: 'Roboto';
}
.ant-calendar-picker {
  min-width: 50px;
}
#imgProfile {
  /* margin-top: 17px; */
  border-radius: 100%;
  height: 30px;
  width: 30px;
  object-fit: cover;
  position: relative;
}
</style>
