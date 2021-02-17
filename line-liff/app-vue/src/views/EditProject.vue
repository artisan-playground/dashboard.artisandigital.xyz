<template>
  <div>
    <ToolbarBack msg="Edit Project" />
    <br />
    <div id="modal" v-if="switchCheck == true">
      <vue-confirm-dialog></vue-confirm-dialog>
    </div>
    <div id="modal" class="modal-delete" v-else>
      <vue-confirm-dialog></vue-confirm-dialog>
    </div>
    <div id="antInput" class="create-form" style="margin: 60px 18px 0px 18px;" v-if="dataProject">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" label="Project name">
          <a-input
            placeholder="Project name"
            v-decorator="[
              'projectName',
              {
                rules: [
                  { required: true, message: 'Please enter Project name!', whitespace: true },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Project Image">
          <a-row class="upload-btn-wrapper">
            <a-col :xs="{ span: 20 }" :sm="{ span: 22 }" :xl="{ span: 23 }">
              <div class="ant-input">
                <div v-if="selectedFileName">
                  <label
                    for="file"
                    align="left"
                    style="color:#0036C7; display:flex; overflow: hidden;"
                  >
                    {{ selectedFileName }}
                  </label>
                </div>
                <div v-else>
                  <label for="file" v-if="dataProject.projectImage" style="display:flex;">
                    <span class="projectImgName" align="left">
                      {{ dataProject.projectImage.fileName }}
                    </span>
                  </label>
                  <label
                    for="file"
                    v-if="dataProject.projectImage == null"
                    style="color:#C1C3C1; display:flex;"
                  >
                    Upload Image
                  </label>
                </div>
              </div>
              <input @change="onFileSelected" type="file" name="myfile" />
            </a-col>
            <a-col :xs="{ span: 4 }" :sm="{ span: 2 }" :xl="{ span: 1 }">
              <a-button style="background-color:#134F83; color:white; width:100%;">
                <a-icon type="upload" />
              </a-button>
              <input @change="onFileSelected" type="file" name="myfile" />
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Type">
          <a-select
            v-decorator="[
              'projectType',
              { rules: [{ required: true, message: 'Please select type of project!' }] },
            ]"
            placeholder="Please select type of project"
          >
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
        <a-form-item v-bind="formItemLayout" label="Due Date">
          <a-date-picker
            style="width: 100%"
            :default-value="moment(dataProject.dueDate, dateFormat)"
            disabled
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
              v-for="user in dataProject.members"
              :key="user.id"
              :value="user.name"
            >
              {{ user.name }}
            </a-tag>
          </a-card>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Description">
          <a-textarea
            v-decorator="[
              'projectDetail',
              {
                rules: [{ required: true, message: 'Please input project detail!' }],
              },
            ]"
            :rows="4"
            placeholder="please enter project description"
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
import * as gqlQueryProject from '../constants/project'
import * as gqlUpload from '../constants/upload'
import moment from 'moment'
import * as gqlQueryRecent from '../constants/recentActivity'
export default {
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
        this.projectImageId = data.project.projectImage ? data.project.projectImage.id : null
      },
    },
  },
  data() {
    this.dateFormat = 'YYYY-MM-DD'
    return {
      selectedFile: null,
      selectedFileName: null,
      switchCheck: true,
      loading: false,
      projectImageId: 0,
      userId: 0,
      dataProject: {
        projectName: '',
        projectDetail: '',
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
          projectId: parseInt(this.$route.params.id),
        },
      })
    },
    async editProject(projectName, projectType, projectDetail) {
      const val = 'Update project'
      if (this.dataProject.projectName !== '' && this.dataProject.projectDetail !== '') {
        try {
          await this.$confirm({
            title: 'Are you sure you want to edit this Project ?',
            button: {
              no: 'Cancel',
              yes: 'Ok',
            },
            callback: confirm => {
              if (confirm) {
                this.$apollo.mutate({
                  mutation: gqlQueryProject.EDIT_PROJECT,
                  variables: {
                    id: parseInt(this.$route.params.id),
                    projectName: projectName,
                    projectType: projectType,
                    projectDetail: projectDetail,
                  },
                })
                if (this.selectedFile != null) {
                  this.updatePhoto()
                }
                this.createRecent(val)
                this.$router.go(-1)
                this.$message.success('Edit project is success')
              }
            },
          })
        } catch (error) {
          this.$message.error(error + '')
        }
      }

      this.$refs.ruleForm.validate(isValid => isValid)
    },
    async deleteProject() {
      try {
        await this.$confirm({
          title: 'Are you sure you want to delete this project ?',
          button: {
            no: 'Cancel',
            yes: 'Delete',
          },
          callback: confirm => {
            if (confirm) {
              this.$apollo.mutate({
                mutation: gqlQueryProject.DELETE_PROJECT,
                variables: {
                  id: parseInt(this.$route.params.id),
                },
              })
              this.$router.go(-2)
              this.$message.success('Delete project is success')
            }
          },
          onCancel() {},
        })
      } catch (error) {
        this.$message.error(error)
      }
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
      this.selectedFileName = event.target.files[0].name
    },

    async updatePhoto() {
      await this.$apollo.mutate({
        mutation: gqlUpload.UPDATE_PROJECT_IMG,
        variables: {
          id: this.projectImageId,
          file: this.selectedFile,
        },
      })
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.switchCheck == true
            ? this.editProject(values.projectName, values.projectType, values.projectDetail)
            : this.deleteProject()
        }
      })
    },
  },
  mounted() {
    this.getData()
    this.form.setFieldsValue({
      projectName: this.dataProject.projectName,
      projectType: this.dataProject.projectType ? this.dataProject.projectType : undefined,
      projectDetail: this.dataProject.projectDetail,
    })
  },
}
</script>
<style>
.projectImgName {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
