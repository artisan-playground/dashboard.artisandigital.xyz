<template>
  <div>
    <ToolbarBack msg="Edit Project" />
    <br />
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
          <!-- <a-form-item label="Type">
            <a-input
              v-model="dataTask.projectType"
              v-decorator="[
                'name',
                {
                  rules: [{ required: true, message: 'Please enter Project Type' }],
                },
              ]"
              placeholder="Project Type"
            />
          </a-form-item> -->
          <!-- <a-form-item label="Members">
            <a-select-option
              mode="tags"
              style="width: 100%"
              placeholder="Tag People"
              :default-value="[dataTask.members.id]"
              v-model="dataTask.members"
            >
              <a-select-option
                v-for="user in dataTask.members"
                :key="user.id"
                :value="user.name"
              >
                <v-img
                  style="float:left;"
                  v-bind:src="
                    user.image ? user.image.fullPath : ''
                  "
                  id="imgMember"
                />
                <span style="float:left; margin-left:5px">{{ user.name }}</span>
              </a-select-option>
            </a-select-option>
          </a-form-item>
          <a-form-item label="Due Date">
            <a-date-picker style="width:100%" v-model="dataTask.dueDate" />
          </a-form-item> -->
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
            <span v-if="switchCheck == false">Inactive</span>
          </a-form-item>
        </a-row>
        <a-button
          v-if="switchCheck == true"
          block
          html-type="submit"
          @click="editProject(dataTask.taskName, dataTask.taskDetail)"
          style="text-transform: capitalize; background-color: #134F83; color:white;"
          >Submit
        </a-button>

        <a-button
          v-if="switchCheck == false"
          block
          html-type="submit"
          @click="deleteProject()"
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

export default {
  name: 'editProject',
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
    return {
      dataTask: null,
      switchCheck: true,
      loading: false,
    }
  },

  methods: {
    onChange() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },

    async editProject(taskName, taskDetail) {
      try {
        await this.$apollo.mutate({
          mutation: gqlQueryTask.EDIT_TASK,
          variables: {
            id: parseInt(this.$route.params.id),
            taskName: taskName,
            taskDetail: taskDetail,
          },
        })
        this.$router.go(-1)
        this.$message.success('Edit task is success')
      } catch (error) {
        this.$message.error(error)
      }
    },

    async deleteProject() {
      try {
        await this.$confirm({
          title: 'Are you sure delete this task?',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk: () => {
            this.$apollo.mutate({
              mutation: gqlQueryTask.DELETE_TASK,
              variables: {
                id: parseInt(this.$route.params.id),
              },
            })
            this.$router.go(-2)
            this.$message.success('Delete task is success')
          },
          onCancel() {
            console.log('Cancel')
          },
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
