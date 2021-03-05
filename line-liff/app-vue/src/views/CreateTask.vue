<template>
  <div>
    <ToolbarBack msg="Create Task" />
    <br />
    <a-spin :spinning="spinning">
      <div id="antInput" class="create-form" style="margin: 60px 18px 0px 18px;" v-if="dataProject">
        <a-form-model class="label-form" ref="ruleForm" :model="form" :rules="rules">
          <a-form-model-item ref="taskName" label="Task name" prop="taskName">
            <a-input
              v-model="form.taskName"
              placeholder="Task name"
              @blur="
                () => {
                  $refs.taskName.onFieldBlur()
                }
              "
            />
          </a-form-model-item>
          <a-form-model-item label="Members" prop="member">
            <a-select
              mode="multiple"
              placeholder="Members"
              :value="selectedItems"
              style="width: 100%"
              @change="handleChange"
            >
              <a-select-option v-for="user in filteredOptions" :key="user.id" :value="user.name">
                <span style="float:left; margin-left:5px">{{ user.name }}</span>
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="Type" required prop="taskType" class="selectInput">
            <a-select v-model="form.taskType" placeholder="Select a Type" block>
              <a-select-option value="Web">
                Web
              </a-select-option>
              <a-select-option value="Mobile">
                Mobile
              </a-select-option>
              <a-select-option value="Design">
                Design
              </a-select-option>
              <a-select-option value="Security">
                Security
              </a-select-option>
              <a-select-option value="Data">
                Data
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="Date" prop="startTime">
            <a-row></a-row>
            <div>
              <a-form-model-item
                prop="startTime"
                :style="{ display: 'inline-block', width: 'calc(50%)' }"
              >
                <a-date-picker
                  style="width: 100%"
                  v-model="form.startTime"
                  :disabled-date="disabledStartDate"
                  @openChange="handleStartOpenChange"
                />
              </a-form-model-item>
              <a-form-model-item
                prop="endTime"
                :style="{ display: 'inline-block', width: 'calc(50%)' }"
              >
                <a-date-picker
                  style="width: 100%"
                  v-model="form.endTime"
                  :disabled-date="disabledEndDate"
                  @openChange="handleEndOpenChange"
                />
              </a-form-model-item>
            </div>
          </a-form-model-item>
          <a-form-model-item label="Description" prop="taskDetail">
            <a-textarea
              v-model="form.taskDetail"
              :rows="4"
              placeholder="please enter task description"
            />
          </a-form-model-item>
          <a-form-model-item>
            <a-button
              size="large"
              type="primary"
              @click="createTask(selectedItems)"
              html-type="submit"
              block
              style="text-transform: capitalize; background-color: #134F83; color:white;"
            >
              Create
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </a-spin>
    <div style="padding-bottom:60px"></div>
  </div>
</template>
<script>
import ToolbarBack from '@/components/ToolbarBack'
import * as gqlQueryProject from '../constants/project'
import * as gqlQueryTask from '../constants/task'
import * as gqlQueryMember from '../constants/user'
import * as gqlQueryRecent from '../constants/recentActivity'
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
      spinning: false,
      selectedItems: [],
      users: [],
      user: '',
      userId: 0,
      dataMember: [],
      dataProject: null,
      form: {
        taskName: '',
        member: '',
        taskType: undefined,
        taskDetail: '',
        startTime: '',
        endTime: '',
      },
      endOpen: false,
      rules: {
        taskName: [{ required: true, message: 'Please enter Task name', trigger: 'blur' }],
        member: [{ required: true, message: 'Please enter Task member', trigger: 'blur' }],
        taskType: [{ required: true, message: 'Please enter Project Type', trigger: 'change' }],
        startTime: [{ required: true, message: 'Please enter Task start date', trigger: 'change' }],
        endTime: [{ required: true, message: 'Please enter Task end date', trigger: 'change' }],
        taskDetail: [{ required: true, message: 'Please enter Task description', trigger: 'blur' }],
      },
    }
  },
  methods: {
    handleChange(selectedItems) {
      this.selectedItems = selectedItems
    },
    async createTask(value) {
      const members = this.filteredOptions.filter(item => value.includes(item.name))
      const memId = members.map(data => data.id)
      const res = memId.map(data => {
        return { id: data }
      })
      if (
        this.form.taskName !== '' &&
        this.form.taskType !== '' &&
        this.form.taskDetail !== '' &&
        this.form.startTime !== '' &&
        this.form.endTime !== '' &&
        parseInt(res).length !== 0
      ) {
        try {
          this.spinning = !this.spinning
          await this.$apollo.mutate({
            mutation: gqlQueryTask.ADD_TASK,
            variables: {
              projectId: parseInt(this.$route.params.id),
              taskName: this.form.taskName,
              taskType: this.form.taskType,
              taskDetail: this.form.taskDetail,
              startTime: this.form.startTime,
              endTime: this.form.endTime,
              isDone: false,
              members: res,
            },
          })
          this.taskName = ''
          this.taskDetail = ''
          this.taskType = ''
          this.startTime = ''
          this.endTime = ''
          this.member = ''
          this.spinning = !this.spinning
          this.createRecent(this.form.taskName)
          this.$router.go(-1)
          this.$message.success('Create task is success')
        } catch (error) {
          this.$message.error(error + '')
        }
      }

      this.$refs.ruleForm.validate(isValid => isValid)
    },

    getData() {
      const get = JSON.parse(localStorage.getItem('vuex'))
      this.user = get.Auth.user
      this.userId = get.Auth.user.id
    },
    createRecent(taskName) {
      this.$apollo.mutate({
        mutation: gqlQueryRecent.CREATE_RECENT,
        variables: {
          message: `Created ${taskName}`,
          userId: this.userId,
          projectId: parseInt(this.$route.params.id),
        },
      })
    },
    disabledStartDate(startValue) {
      const endValue = this.form.endTime
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate(endValue) {
      const startValue = this.form.startTime
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
  mounted() {
    this.getData()
  },
  computed: {
    filteredOptions() {
      return this.dataMember.filter(o => !this.selectedItems.includes(o))
    },
  },
}
</script>
<style>
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #105efb !important;
}
.v-slide-group {
  display: grid;
}
</style>
