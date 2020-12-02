<template>
  <div>
    <ToolbarBack msg="Create Task" />
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
                <v-img
                  style="float:left;"
                  v-bind:src="user.image ? user.image.fullPath : ''"
                  id="imgMember"
                />
                <span style="float:left; margin-left:5px">{{ user.name }}</span>
              </a-mentions-option>
            </a-mentions>
          </a-form-item>
        </a-row>
        <a-row>
          <!-- <a-form-item label="Approver">
            <a-mentions
              style="text-align: initial;"
              placeholder="input @ to mention people"
              v-model="reviewer"
            >
              <a-mentions-option v-for="user in users" :key="user.id" :value="user.name">
                <div v-for="member in dataProject.members" :key="member.id">
                  <div v-if="member.id !== user.id">
                    <v-img style="float:left;" v-bind:src="user.image.fullPath" id="imgMember" />
                    <span style="float:left; margin-left:5px">{{ user.name }}</span>
                  </div>
                </div>
              </a-mentions-option>
            </a-mentions>
          </a-form-item> -->
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
          <a-button
            size="large"
            block
            html-type="submit"
            @click="createTask(member)"
            style="text-transform: capitalize; background-color: #134F83; color:white;"
            >Submit
          </a-button>
        </a-row>
      </a-form>
    </div>
    <div style="padding-bottom:60px">
      <!-- ระยะห่าง manu ข้างล่างกับ content -->
    </div>
  </div>
</template>

<script>
import ToolbarBack from '@/components/ToolbarBack.vue'
import * as gqlQueryProject from '../constants/project'
import * as gqlQueryTask from '../constants/task'
import * as gqlQueryMember from '../constants/user'

export default {
  name: 'createTask',
  components: {
    ToolbarBack,
  },
  apollo: {
    getProject: {
      query: gqlQueryProject.PROJECT_QUERY,
      variables() {
        return {
          projectId: parseInt(this.$route.params.id),
        }
      },
      update(data) {
        this.dataProject = data.project
        this.dataTask = data.project.tasks
        this.dataMember = data.project.members
      },
    },

    users: gqlQueryMember.ALL_MEMBER_QUERY,
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
      dataMember: [],
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
    async createTask(value) {
      try {
        const mem = this.dataMember
          .filter(item =>
            value
              .slice(0, -1)
              .split('@')
              .includes(item.name)
          )
          .map(val => val.id)

        this.$apollo.mutate({
          mutation: gqlQueryTask.ADD_TASK,
          variables: {
            projectId: parseInt(this.$route.params.id),
            taskName: this.taskName,
            taskDetail: this.taskDetail,
            startTime: this.startTime,
            endTime: this.endTime,
            isDone: false,
            members: parseInt(mem),
          },
        })
        this.taskName = ''
        this.taskDetail = ''
        this.startTime = ''
        this.endTime = ''
        this.member = ''
        this.$router.go(-1)
        this.$message.success('Create task is success')
      } catch (error) {
        this.$message.error(error)
      }
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
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
.ant-calendar-picker {
  min-width: 50px;
}
#imgMember {
  border-radius: 100%;
  height: 30px;
  width: 30px;
  object-fit: cover;
  position: relative;
}
</style>
