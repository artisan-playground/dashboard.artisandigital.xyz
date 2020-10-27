<template>
  <div>
    <ToolbarBack />
    <br />
    <div style="margin: 60px 18px 0px 18px">
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
              v-model="members"
            >
              <a-mentions-option v-for="user in users" :key="user.id" :value="user.name">
                <v-img v-bind:src="user.image" id="imgProfile" />
                <span style="display-inline">{{ user.name }}</span>
              </a-mentions-option>
            </a-mentions>
          </a-form-item>
        </a-row>
        <a-row>
          <a-form-item label="Approver">
            <a-mentions
              style="text-align: initial;"
              placeholder="input @ to mention people, # to mention tag"
              :prefix="['@', '#']"
              @search="onSearch"
            >
              <a-mentions-option
                v-for="value in MOCK_DATA[prefix] || []"
                :key="value"
                :value="value"
                :v-model="members"
              >
                {{ value }}
              </a-mentions-option>
            </a-mentions>
          </a-form-item>
        </a-row>
        <a-row>
          <a-form-item label="Date" style="margin-bottom:0;">
            <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
              <a-date-picker style="width: 100%" v-model="startDate" />
            </a-form-item>
            <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }">
              -
            </span>
            <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
              <a-date-picker style="width: 100%" v-model="endDate" />
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

const MOCK_DATA = {
  '@': ['Chalobon', 'NaN', 'pupaeng.’'],
  '#': ['1.0', '2.0', '3.0'],
}
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
      prefix: '@',
      MOCK_DATA,
      startValue: null,
      endValue: null,
      endOpen: false,
      taskName: '',
      members: '',
      taskDetail: '',
      startDate: '',
      endDate: '',
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
      console.log(this.members)
      console.log(this.taskDetail)
      console.log(this.startDate)
      console.log(this.endDate)

      // const result = await this.$apollo.mutate({
      //   mutation: gqlQuery.ADD_TASK,
      //   variables: {
      //     projectId: parseInt(this.$route.params.id),
      //     taskName: this.taskName,
      //     taskDetail: this.taskDetail,
      //     startTime: this.startTime,
      //     endTime: this.endTime,
      //     isDone: this.isDone,
      //     members: this.members
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
