<template>
  <div>
    <ToolbarBack msg="Create Task" />
    <br />
    <div class="create-form" style="margin: 60px 18px 0px 18px;" v-if="dataProject">
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
          <a-mentions
            class="ant-input"
            style="text-align: initial;"
            placeholder="input @ to mention people"
            v-model="form.member"
          >
            <a-mentions-option
              v-for="user in dataProject.members"
              :key="user.id"
              :value="user.name"
            >
              <v-img
                style="float:left;"
                v-bind:src="user.image ? user.image.fullPath : require('../assets/user.svg')"
                id="imgMember"
              />
              <span style="float:left; margin-left:5px">{{ user.name }}</span>
            </a-mentions-option>
          </a-mentions>
        </a-form-model-item>
        <a-form-model-item label="Type" required prop="taskType" class="selectInput">
          <a-select v-model="form.taskType" show-search placeholder="Select a Type" block>
            <a-select-option value="">
              <span style="color:#BDBDBD">Select a Type</span>
            </a-select-option>
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
          <a-form-model-item
            prop="startTime"
            :style="{ display: 'inline-block', width: 'calc(50%)' }"
          >
            <a-date-picker style="width: 100%" v-model="form.startTime" />
          </a-form-model-item>
          <a-form-model-item
            prop="endTime"
            :style="{ display: 'inline-block', width: 'calc(50%)' }"
          >
            <a-date-picker style="width: 100%" v-model="form.endTime" />
          </a-form-model-item>
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
            @click="createTask(form.member)"
            html-type="submit"
            block
            style="text-transform: capitalize; background-color: #134F83; color:white;"
          >
            Create
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div style="padding-bottom:60px"></div>
  </div>
</template>
<script>
import ToolbarBack from '@/components/ToolbarBack'
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
      other: '',
      users: [],
      dataMember: [],
      dataProject: null,
      form: {
        taskName: '',
        member: '',
        taskType: '',
        taskDetail: '',
        startTime: '',
        endTime: '',
      },
      rules: {
        taskName: [{ required: true, message: 'Please enter Task name', trigger: 'blur' }],
        member: [{ required: true, message: 'Please enter Task member', trigger: 'change' }],
        taskType: [{ required: true, message: 'Please enter Project Type', trigger: 'change' }],
        startTime: [{ required: true, message: 'Please enter Task start date', trigger: 'change' }],
        endTime: [{ required: true, message: 'Please enter Task end date', trigger: 'change' }],
        taskDetail: [{ required: true, message: 'Please enter Task description', trigger: 'blur' }],
      },
    }
  },
  methods: {
    async createTask(value) {
      const mem = this.dataMember
        .filter(item =>
          value
            .slice(0, -1)
            .split('@')
            .includes(item.name)
        )
        .map(val => val.id)
      if (
        this.form.taskName !== '' &&
        this.form.taskType !== '' &&
        this.form.taskDetail !== '' &&
        this.form.startTime !== '' &&
        this.form.endTime !== '' &&
        parseInt(mem).length !== 0
      ) {
        try {
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
              members: parseInt(mem),
            },
          })
          this.taskName = ''
          this.taskDetail = ''
          this.taskType = ''
          this.startTime = ''
          this.endTime = ''
          this.member = ''
          this.$router.go(-1)
          this.$message.success('Create task is success')
        } catch (error) {
          this.$message.error(error + '')
        }
      }

      this.$refs.ruleForm.validate(isValid => isValid)
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
