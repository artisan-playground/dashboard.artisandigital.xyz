<template>
  <div>
    <ToolbarBack msg="Edit Task" />
    <br />
    <div id="modal" v-if="switchCheck == true">
      <vue-confirm-dialog></vue-confirm-dialog>
    </div>
    <div id="modal" class="modal-delete" v-else>
      <vue-confirm-dialog></vue-confirm-dialog>
    </div>
    <div id="antInput" class="create-form" style="margin: 60px 18px 0px 18px;" v-if="dataTask">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" label="Task name">
          <a-input
            placeholder="Task name"
            v-decorator="[
              'taskName',
              {
                rules: [{ required: true, message: 'Please enter Task name!', whitespace: true }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Members">
          <a-card
            disabled
            style="background-color:#EAEAEA; min-height:32px; border: 1px solid #C0C0C0; border-radius: 2px;"
            :bodyStyle="{
              padding: '4px',
            }"
          >
            <a-tag
              disabled
              style="float:left; background-color:#EAEAEA; border: 1px solid #C0C0C0; border-radius: 2px;"
              v-for="user in dataTask.members"
              :key="user.id"
              :value="user.name"
            >
              {{ user.name }}
            </a-tag>
          </a-card>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Type">
          <a-select
            v-decorator="[
              'taskType',
              { rules: [{ required: true, message: 'Please select type of task!' }] },
            ]"
            placeholder="Please select type of task"
          >
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
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Date">
          <a-form-item :style="{ display: 'inline-block', width: 'calc(50%)' }">
            <a-date-picker
              style="width: 100%"
              :default-value="moment(dataTask.startTime, dateFormat)"
              disabled
            />
          </a-form-item>
          <a-form-item :style="{ display: 'inline-block', width: 'calc(50%)' }">
            <a-date-picker
              style="width: 100%"
              :default-value="moment(dataTask.endTime, dateFormat)"
              disabled
            />
          </a-form-item>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Description">
          <a-textarea
            v-decorator="[
              'taskDetail',
              {
                rules: [{ required: true, message: 'Please input task detail!' }],
              },
            ]"
            :rows="4"
            placeholder="please enter task description"
          />
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label="Task status"
          align="left"
          class="switchCustomize"
        >
          <a-switch
            default-checked
            v-model="switchCheck"
            :loading="loading"
            @change="onChange(switchCheck)"
          />
          <span v-if="switchCheck == true"> Active</span>
          <span v-else> Inactive</span>
        </a-form-item>
        <a-form-item v-bind="tailFormItemLayout">
          <a-button
            block
            style="text-transform: capitalize; background-color: #134F83; color:white;"
            html-type="submit"
          >
            Submit
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import ToolbarBack from '@/components/ToolbarBack'
import * as gqlQueryTask from '../constants/task'
import * as gqlQueryRecent from '../constants/recentActivity'
import moment from 'moment'
export default {
  components: {
    ToolbarBack,
  },
  apollo: {
    getTask: {
      query: gqlQueryTask.TASK_QUERY,
      variables() {
        return {
          taskId: parseInt(this.$route.params.id),
        }
      },
      update(data) {
        this.dataTask = data.getTaskById
      },
    },
  },
  data() {
    this.dateFormat = 'YYYY-MM-DD'
    return {
      switchCheck: true,
      loading: false,
      dataTask: {
        taskName: '',
        taskDetail: '',
        startTime: undefined,
        endTime: undefined,
      },
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
          md: { span: 3 },
          lg: { span: 2 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
          md: { span: 21 },
          lg: { span: 22 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
          md: {
            span: 21,
            offset: 3,
          },
        },
      },
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'submit' })
  },
  methods: {
    moment,
    onChange() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    getData() {
      const get = JSON.parse(localStorage.getItem('vuex'))
      this.user = get.Auth.user
      this.userId = get.Auth.user.id
    },
    createRecent(val) {
      this.$apollo.mutate({
        mutation: gqlQueryRecent.CREATE_RECENT,
        variables: {
          message: `${val}`,
          userId: this.userId,
          projectId: this.dataTask.project.id,
        },
      })
    },
    async editTask(taskName, taskType, taskDetail) {
      const val = `Updated ${this.dataTask.taskName}`
      if (this.dataTask.taskName !== '' && this.dataTask.taskDetail !== '') {
        try {
          await this.$confirm({
            title: 'Are you sure you want to edit this Task ?',
            button: {
              no: 'Cancel',
              yes: 'Ok',
            },
            callback: confirm => {
              if (confirm) {
                this.$apollo.mutate({
                  mutation: gqlQueryTask.EDIT_TASK,
                  variables: {
                    id: parseInt(this.$route.params.id),
                    taskName: taskName,
                    taskType: taskType,
                    taskDetail: taskDetail,
                  },
                })
                this.createRecent(val)
                this.$router.go(-1)
                this.$message.success('Edit task is success')
              }
            },
          })
        } catch (error) {
          this.$message.error(error + '')
        }
      }

      this.$refs.ruleForm.validate(isValid => isValid)
    },
    async deleteTask() {
      const val = `Deleted ${this.dataTask.taskName}`
      try {
        await this.$confirm({
          title: 'Are you sure you want to delete this task ?',
          button: {
            no: 'Cancel',
            yes: 'Delete',
          },
          callback: confirm => {
            if (confirm) {
              this.$apollo.mutate({
                mutation: gqlQueryTask.DELETE_TASK,
                variables: {
                  id: parseInt(this.$route.params.id),
                },
              })
              this.createRecent(val)
              this.$router.go(-2)
              this.$message.success('Delete task is success')
            }
          },
          onCancel() {},
        })
      } catch (error) {
        this.$message.error(error)
      }
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.switchCheck == true
            ? this.editTask(values.taskName, values.taskType, values.taskDetail)
            : this.deleteTask()
        }
      })
    },
  },
  mounted() {
    this.getData()
    this.form.setFieldsValue({
      taskName: this.dataTask.taskName,
      taskType: this.dataTask.taskType ? this.dataTask.taskType : undefined,
      taskDetail: this.dataTask.taskDetail,
    })
  },
}
</script>
