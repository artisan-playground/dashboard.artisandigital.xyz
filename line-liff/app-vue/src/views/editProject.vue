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

    <div class="create-form" style="margin: 60px 18px 0px 18px;" v-if="dataProject">
      <a-form-model class="label-form" ref="ruleForm" :model="dataProject" :rules="rules">
        <a-form-model-item ref="projectName" label="Project name" prop="projectName">
          <a-input
            v-model="dataProject.projectName"
            placeholder="Project name"
            @blur="
              () => {
                $refs.projectName.onFieldBlur()
              }
            "
          />
        </a-form-model-item>

        <a-form-model-item label="Project Image">
          <a-upload
            style="float:left;"
            name="file"
            :multiple="true"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          >
            <a-input-group compact>
              <a-row>
                <a-col :span="20">
                  <a-input default-value="" placeholder="Upload image" />
                </a-col>
                <a-col :span="4">
                  <a-button style=" background-color:#134F83; color:white;">
                    <a-icon type="upload"
                  /></a-button>
                </a-col>
              </a-row>
            </a-input-group>
          </a-upload>
        </a-form-model-item>

        <a-form-model-item label="Type" required prop="projectType">
          <a-select v-model="dataProject.projectType" show-search placeholder="Select a Type" block>
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
        </a-form-model-item>

        <a-form-model-item label="Due Date" prop="dueDate">
          <a-date-picker
            disabled
            style="width:100%"
            :default-value="moment(dataProject.dueDate, dateFormat)"
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
              v-for="user in dataProject.members"
              :key="user.id"
              :value="user.name"
            >
              {{ user.name }}
            </a-tag>
          </a-card>
        </a-form-model-item>
        <a-form-model-item label="Description" prop="projectDetail">
          <a-textarea
            v-model="dataProject.projectDetail"
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
              @click="
                editProject(
                  dataProject.projectName,
                  dataProject.projectType,
                  dataProject.projectDetail
                )
              "
              style="text-transform: capitalize; background-color: #134F83; color:white;"
              >Submit
            </a-button>

            <a-button
              size="large"
              v-if="switchCheck == false"
              block
              html-type="submit"
              @click="deleteProject()"
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
import * as gqlQueryProject from '../constants/project'
import moment from 'moment'
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
    this.dateFormat = 'YYYY-MM-DD'
    return {
      switchCheck: true,
      loading: false,

      dataProject: {
        projectName: '',
        projectDetail: '',
      },

      rules: {
        projectName: [{ required: true, message: 'Please enter Project name', trigger: 'blur' }],
        projectDetail: [
          { required: true, message: 'Please enter Project description', trigger: 'blur' },
        ],
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
    async editProject(projectName, projectType, projectDetail) {
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
                this.$router.go(-1)
                this.$message.success('Edit project is success')
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
