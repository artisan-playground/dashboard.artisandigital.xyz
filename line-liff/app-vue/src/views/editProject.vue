<template>
  <div>
    <ToolbarBack msg="Edit Project" />
    <br />
    <div style="margin: 60px 18px 0px 18px;">
      <a-form layout="vertical" hide-required-mark v-if="dataProject">
        <a-row>
          <a-form-item label="Project name">
            <a-input
              v-model="dataProject.projectName"
              v-decorator="[
                'name',
                {
                  rules: [{ required: true, message: 'Please enter Project name' }],
                },
              ]"
              placeholder="Project name"
            />
          </a-form-item>
          <a-form-item label="Project Image">
            <a-upload
              style="float:left;"
              name="file"
              :multiple="true"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            >
              <a-input-group compact style="width:100%;">
                <a-input style="width:80%" default-value="" placeholder="Upload image" />
                <a-button style="width:20%; background-color:#134F83; color:white;">
                  <a-icon type="upload"
                /></a-button>
              </a-input-group>
            </a-upload>
          </a-form-item>
          <a-form-item label="Type">
            <a-select
              v-model="dataProject.projectType"
              show-search
              placeholder="Select a Type"
              block
              v-decorator="[
                'name',
                {
                  rules: [{ required: true, message: 'Please enter Project Type' }],
                },
              ]"
            >
              <a-select-option value="">
                <span style="color:#BDBDBD">Select a Type</span>
              </a-select-option>
              <a-select-option value="Web App">
                Web App
              </a-select-option>
              <a-select-option value="Mobile App">
                Mobile App
              </a-select-option>
              <a-select-option value="Desktop App">
                Desktop App
              </a-select-option>
              <a-select-option value="Desktop Web">
                Desktop Web
              </a-select-option>
            </a-select>
          </a-form-item>
          <!-- <a-form-item label="Members">
            <a-select-option
              mode="tags"
              style="width: 100%"
              placeholder="Tag People"
              :default-value="[dataProject.members.id]"
              v-model="dataProject.members"
            >
              <a-select-option
                v-for="user in dataProject.members"
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
            <a-date-picker style="width:100%" v-model="dataProject.dueDate" />
          </a-form-item> -->
          <a-form-item label="Description">
            <a-textarea
              v-model="dataProject.projectDetail"
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
          @click="
            editProject(dataProject.projectName, dataProject.projectType, dataProject.projectDetail)
          "
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
import * as gqlQueryProject from '../constants/project'

export default {
  name: 'editProject',
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
      },
    },
  },
  data() {
    return {
      dataProject: null,
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

    async editProject(projectName, projectType, projectDetail) {
      try {
        await this.$apollo.mutate({
          mutation: gqlQueryProject.EDIT_PROJECT,
          variables: {
            id: parseInt(this.$route.params.id),
            projectName: projectName,
            projectType: projectType,
            projectDetail: projectDetail,
          },
        })
        this.$router.go(-1)
        this.$message.success('Edit project is success')
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
              mutation: gqlQueryProject.DELETE_PROJECT,
              variables: {
                id: parseInt(this.$route.params.id),
              },
            })
            this.$router.go(-2)
            this.$message.success('Delete project is success')
          },
          onCancel() {
            console.log('Cancel')
          },
        })

        // await this.$apollo.mutate({
        //   mutation: gqlQueryProject.DELETE_PROJECT,
        //   variables: {
        //     id: parseInt(this.$route.params.id),
        //   },
        // })
        // this.$router.go(-2)
        // this.$message.success('Delete project is success')
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
