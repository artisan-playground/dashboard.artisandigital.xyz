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
    <div style="margin: 60px 18px 0px 18px;">
      <a-form layout="vertical" hide-required-mark v-if="dataTask">
        <a-row>
          <a-form-item label="Task name">
            <a-input
              v-model="dataTask.taskName"
              v-decorator="[
                'name',
                {
                  rules: [{ required: true, message: 'Please enter Task name' }],
                },
              ]"
              placeholder="Task name"
            />
          </a-form-item>
          <a-form-item label="Date">
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
          <a-form-item label="Members">
            <a-card
              disabled
              style="background-color:#EAEAEA; min-height:32px; border: 1px solid #C0C0C0; border-radius: 4px;"
              :bodyStyle="{
                padding: '4px',
              }"
            >
              <a-tag
                style="float:left; background-color:#EAEAEA; border: 1px solid #C0C0C0; border-radius: 2px;"
                disabled
                v-for="user in dataTask.members"
                :key="user.id"
                :value="user.name"
              >
                {{ user.name }}
              </a-tag>
            </a-card>
          </a-form-item>
          <a-form-item label="Description">
            <a-textarea
              v-model="dataTask.taskDetail"
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
          <a-form-item align="left" label="Project Status">
            <a-switch
              default-checked
              v-model="switchCheck"
              :loading="loading"
              @change="onChange(switchCheck)"
            />
            <span v-if="switchCheck == true">Active</span>
            <span v-else>Inactive</span>
          </a-form-item>
        </a-row>
        <a-button
          v-if="switchCheck == true"
          block
          html-type="submit"
          @click="editTask(dataTask.taskName, dataTask.taskDetail)"
          style="text-transform: capitalize; background-color: #134F83; color:white;"
          >Submit
        </a-button>

        <a-button
          v-if="switchCheck == false"
          block
          html-type="submit"
          @click="deleteTask()"
          style="text-transform: capitalize; background-color: #134F83; color:white;"
          >Submit
        </a-button>
      </a-form>
    </div>
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
    getProject: {
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
      dataTask: null,
      switchCheck: true,
      loading: false,
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
      try {
        await this.$confirm({
          title: 'Are you sure you want to edit this project ?',
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
        this.$message.error(error)
      }
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
#imgMember {
  border-radius: 100%;
  height: 30px;
  width: 30px;
  object-fit: cover;
  position: relative;
}
</style>
