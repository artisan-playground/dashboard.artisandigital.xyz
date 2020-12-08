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

    <div class="create-form" style="margin: 60px 18px 0px 18px;" v-if="dataTask">
      <a-form-model class="label-form" ref="ruleForm" :model="dataTask" :rules="rules">
        <a-form-model-item ref="taskName" label="Task name" prop="taskName">
          <a-input
            v-model="dataTask.taskName"
            placeholder="Task name"
            @blur="
              () => {
                $refs.taskName.onFieldBlur()
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item>
          <span
            class="ant-form-item-label"
            style="color:#262626; display:flex; padding-bottom:13px;"
            >Members</span
          >
          <a-card
            disabled
            style="background-color:#EAEAEA; min-height:32px; border: 1px solid #C0C0C0; border-radius: 4px;"
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
        </a-form-model-item>
        <a-form-model-item label="Date" style="height: 70px;">
          <a-form-model-item :style="{ display: 'inline-block', width: 'calc(50%)' }">
            <a-date-picker
              style="width: 100%"
              :default-value="moment(dataTask.startTime, dateFormat)"
              disabled
            />
          </a-form-model-item>
          <a-form-model-item :style="{ display: 'inline-block', width: 'calc(50%)' }">
            <a-date-picker
              style="width: 100%"
              :default-value="moment(dataTask.endTime, dateFormat)"
              disabled
            />
          </a-form-model-item>
        </a-form-model-item>
        <a-form-model-item label="Description" prop="taskDetail">
          <a-textarea
            v-model="dataTask.taskDetail"
            :rows="4"
            placeholder="please enter task description"
          />
        </a-form-model-item>
        <div class="label-inline">
          <a-form-model-item align="left" label="Task status">
            <a-switch
              default-checked
              v-model="switchCheck"
              :loading="loading"
              @change="onChange(switchCheck)"
            />
            <span v-if="switchCheck == true"> Active</span>
            <span v-else> Inactive</span>
          </a-form-model-item>
          <a-form-model-item>
            <a-button
              size="large"
              v-if="switchCheck == true"
              block
              html-type="submit"
              @click="editTask(dataTask.taskName, dataTask.taskDetail)"
              style="text-transform: capitalize; background-color: #134F83; color:white;"
              >Submit
            </a-button>

            <a-button
              size="large"
              v-if="switchCheck == false"
              block
              html-type="submit"
              @click="deleteTask()"
              style="text-transform: capitalize; background-color: #134F83; color:white;"
              >Submit
            </a-button>
          </a-form-model-item>
        </div>
      </a-form-model>
    </div>
    <div style="padding-bottom:60px"></div>
  </div>
</template>
<script>
import ToolbarBack from '@/components/ToolbarBack'
import * as gqlQueryTask from '../constants/task'
import moment from 'moment'
export default {
  name: 'editTask',
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
      },

      rules: {
        taskName: [{ required: true, message: 'Please enter Task name', trigger: 'blur' }],
        taskDetail: [{ required: true, message: 'Please enter Task description', trigger: 'blur' }],
      },
    }
  },
  methods: {
    moment,
    onChange() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    async editTask(taskName, taskDetail) {
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
                    taskDetail: taskDetail,
                  },
                })
                this.$router.go(-1)
                this.$message.success('Edit task is success')
              }
            },
          })
        } catch (error) {
          this.$message.error(error + '')
        }
      }

      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          return true
        } else {
          return false
        }
      })
    },
    async deleteTask() {
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
