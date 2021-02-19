<template>
  <div>
    <ToolbarBack msg="Create Project" />
    <br />
    <a-spin :spinning="spinning">
      <div id="antInput" class="create-form" style="margin: 60px 18px 0px 18px;">
        <a-form-model class="label-form" ref="ruleForm" :model="form" :rules="rules">
          <a-form-model-item ref="projectName" label="Project name" prop="projectName">
            <a-input
              v-model="form.projectName"
              placeholder="Project name"
              @blur="
                () => {
                  $refs.projectName.onFieldBlur()
                }
              "
            />
          </a-form-model-item>
          <a-form-model-item label="Project Image" prop="projectImg">
            <a-row class="upload-btn-wrapper">
              <a-col :xs="{ span: 20 }" :sm="{ span: 22 }" :xl="{ span: 23 }">
                <div class="ant-input">
                  <label
                    for="file"
                    v-if="selectedFileName == null"
                    style="color:#C1C3C1; display:flex;"
                    >Upload image</label
                  >
                  <label for="file" v-else style="color:#0036C7; display:flex;">
                    {{ selectedFileName }}
                  </label>
                </div>
                <input
                  v-if="selectedFile == null"
                  @change="uploadPhoto"
                  type="file"
                  name="myfile"
                />
                <input v-else @change="updatePhoto" type="file" name="myfile" />
              </a-col>
              <a-col :xs="{ span: 4 }" :sm="{ span: 2 }" :xl="{ span: 1 }">
                <a-button style="background-color:#134F83; color:white; width:100%;">
                  <a-icon type="upload" />
                </a-button>
                <input @change="uploadPhoto" type="file" name="myfile" />
              </a-col>
            </a-row>
          </a-form-model-item>
          <a-form-model-item label="Type" required prop="projectType" class="selectInput">
            <a-select v-model="form.projectType" placeholder="Select a Type" block>
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
          <a-form-model-item label="Due Date" prop="dueDate">
            <a-date-picker style="width:100%" v-model="form.dueDate" />
          </a-form-model-item>
          <a-form-model-item label="Description" prop="projectDetail">
            <a-textarea
              v-model="form.projectDetail"
              :rows="4"
              placeholder="please enter project description"
            />
          </a-form-model-item>
          <a-form-model-item>
            <a-button
              type="primary"
              size="large"
              @click="createProject(selectedItems)"
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
import * as gqlQuery from '../constants/project'
import * as gqlQueryUser from '../constants/user'
import * as gqlUpload from '../constants/upload'
export default {
  name: 'createProject',
  components: {
    ToolbarBack,
  },
  apollo: {
    users: gqlQueryUser.ALL_MEMBER_QUERY,
  },
  data() {
    return {
      spinning: false,
      selectedItems: [],
      search: '',
      selectedFile: null,
      selectedFileName: null,
      projectImgId: 0,
      member: [],
      headers: {
        authorization: 'authorization-text',
      },
      other: '',
      users: [],
      form: {
        projectName: '',
        projectImg: '',
        projectType: undefined,
        projectDetail: '',
        dueDate: '',
      },
      rules: {
        projectName: [{ required: true, message: 'Please enter Project name', trigger: 'blur' }],
        projectImg: [{ required: true, message: 'Please enter Project Image', trigger: 'change' }],
        projectType: [{ required: true, message: 'Please enter Project Type', trigger: 'change' }],
        member: [{ required: true, message: 'Please enter Project member', trigger: 'blur' }],
        dueDate: [{ required: true, message: 'Please enter Project due date', trigger: 'change' }],
        projectDetail: [
          { required: true, message: 'Please enter url description', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    handleChange(selectedItems) {
      this.selectedItems = selectedItems
    },
    async createProject(value) {
      const members = this.filteredOptions.filter(item => value.includes(item.name))
      const memId = members.map(data => data.id)
      const res = memId.map(data => {
        return { id: data }
      })
      if (
        this.form.projectName !== '' &&
        this.form.projectType !== '' &&
        this.form.projectDetail !== '' &&
        this.form.dueDate !== '' &&
        parseInt(res).length !== 0
      ) {
        try {
          this.spinning = !this.spinning
          await this.$apollo.mutate({
            mutation: gqlQuery.ADD_PROJECT,
            variables: {
              projectName: this.form.projectName,
              projectType: this.form.projectType,
              projectDetail: this.form.projectDetail,
              createdAt: new Date(),
              dueDate: this.form.dueDate,
              file: this.projectImgId,
              members: res,
            },
          })
          this.projectName = ''
          this.projectType = ''
          this.projectDetail = ''
          this.dueDate = ''
          this.member = ''
          this.spinning = !this.spinning
          this.$router.go(-1)
          this.$message.success('Create project is success')
        } catch (error) {
          this.$message.error(error + '')
        }
      }
      this.$refs.ruleForm.validate(isValid => isValid)
    },

    async uploadPhoto(event) {
      this.selectedFileName = event.target.files[0].name
      this.selectedFile = event.target.files[0]
      await this.$apollo.mutate({
        mutation: gqlUpload.UPLOAD_PROJECT_IMG,
        variables: {
          file: event.target.files[0],
        },
        update: (store, { data: { uploadProjectImage } }) => {
          this.projectImgId = uploadProjectImage.id
        },
      })
    },

    async updatePhoto(event) {
      await this.$apollo.mutate({
        mutation: gqlUpload.UPDATE_PROJECT_IMG,
        variables: {
          id: this.projectImgId,
          file: event.target.files[0],
        },
        update: (store, { data: { updateProjectImage } }) => {
          this.selectedFileName = updateProjectImage.fileName
        },
      })
    },
  },
  computed: {
    filteredOptions() {
      return this.users.filter(o => !this.selectedItems.includes(o))
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
