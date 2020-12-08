<template>
  <div>
    <ToolbarBack msg="Create Project" />
    <br />
    <div class="create-form" style="margin: 60px 18px 0px 18px;">
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
          <a-select v-model="form.projectType" show-search placeholder="Select a Type" block>
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
        <a-form-model-item label="Members" prop="member">
          <a-mentions
            class="ant-input"
            style="text-align: initial;"
            placeholder="input @ to mention people"
            v-model="form.member"
          >
            <a-mentions-option v-for="user in users" :key="user.id" :value="user.name">
              <v-img
                style="float:left;"
                v-bind:src="user.image ? user.image.fullPath : require('../assets/user.svg')"
                id="imgMember"
              />
              <span style="float:left; margin-left:5px">{{ user.name }}</span>
            </a-mentions-option>
          </a-mentions>
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
            @click="createProject(form.member)"
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
import * as gqlQuery from '../constants/project'
import * as gqlQueryUser from '../constants/user'
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
      headers: {
        authorization: 'authorization-text',
      },
      other: '',
      users: [],
      form: {
        projectName: '',
        projectType: '',
        projectDetail: '',
        dueDate: '',
        member: '',
      },
      rules: {
        projectName: [{ required: true, message: 'Please enter Project name', trigger: 'blur' }],
        projectType: [{ required: true, message: 'Please enter Project Type', trigger: 'change' }],
        member: [{ required: true, message: 'Please enter Project member', trigger: 'change' }],
        dueDate: [{ required: true, message: 'Please enter Project due date', trigger: 'change' }],
        projectDetail: [
          { required: true, message: 'Please enter url description', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    async createProject(value) {
      const mem = this.users
        .filter(item =>
          value
            .slice(0, -1)
            .split('@')
            .includes(item.name)
        )
        .map(val => val.id)
      if (
        this.form.projectName !== '' &&
        this.form.projectType !== '' &&
        this.form.projectDetail !== '' &&
        this.form.dueDate !== '' &&
        parseInt(mem).length !== 0
      ) {
        try {
          await this.$apollo.mutate({
            mutation: gqlQuery.ADD_PROJECT,
            variables: {
              data: {
                projectName: this.form.projectName,
                projectType: this.form.projectType,
                projectDetail: this.form.projectDetail,
                dueDate: this.form.dueDate,
                members: {
                  connect: {
                    id: parseInt(mem),
                  },
                },
              },
            },
          })
          this.projectName = ''
          this.projectType = ''
          this.projectDetail = ''
          this.dueDate = ''
          this.member = ''
          this.$router.go(-1)
          this.$message.success('Create project is success')
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
    resetForm() {
      this.$refs.ruleForm.resetFields()
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
