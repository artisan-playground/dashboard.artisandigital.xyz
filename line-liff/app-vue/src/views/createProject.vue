<template>
  <div>
    <ToolbarBack msg="Create Project" />
    <br />
    <div style="margin: 60px 18px 0px 18px;">
      <a-form layout="vertical" hide-required-mark>
        <a-row>
          <a-form-item label="Project name">
            <a-input
              v-model="projectName"
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
                <a-button style="width:20%; background-color:#0036C7; color:white;">
                  <a-icon type="upload"
                /></a-button>
              </a-input-group>
            </a-upload>
          </a-form-item>
          <a-form-item label="Type">
            <a-input
              v-model="projectType"
              v-decorator="[
                'name',
                {
                  rules: [{ required: true, message: 'Please enter Project Type' }],
                },
              ]"
              placeholder="Project Type"
            />
          </a-form-item>
          <a-form-item label="Members">
            <a-mentions
              style="text-align: initial;"
              placeholder="input @ to mention people"
              v-model="member"
            >
              <a-mentions-option v-for="user in users" :key="user.id" :value="user.name">
                <v-img
                  style="float:left;"
                  v-bind:src="
                    user.image ? user.image.fullPath : 'https://source.unsplash.com/random?animal'
                  "
                  id="imgMember"
                />
                <span style="float:left; margin-left:5px">{{ user.name }}</span>
              </a-mentions-option>
            </a-mentions>
          </a-form-item>
          <a-form-item label="Due Date">
            <a-date-picker style="width:100%" v-model="dueDate" />
          </a-form-item>
          <a-form-item label="Description">
            <a-textarea
              v-model="projectDetail"
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
        </a-row>
        <a-button
          block
          html-type="submit"
          @click="createProject(member)"
          style="text-transform: capitalize; background-color: #105EFB; color:white;"
          >Submit
        </a-button>
      </a-form>
    </div>
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
      users: [],
      projectName: '',
      projectType: '',
      projectDetail: '',
      dueDate: '',
      member: '',
    }
  },

  methods: {
    async createProject(value) {
      try {
        const mem = this.users
          .filter(item =>
            value
              .slice(0, -1)
              .split('@')
              .includes(item.name)
          )
          .map(val => val.id)
        this.$apollo.mutate({
          mutation: gqlQuery.ADD_PROJECT,
          variables: {
            data: {
              projectName: this.projectName,
              projectType: this.projectType,
              projectDetail: this.projectDetail,
              dueDate: this.dueDate,
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
