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
              :headers="headers"
              @change="handleChange"
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
            <a-dropdown>
              <a-menu slot="overlay" @click="handleMenuClick">
                <a-menu-item key="1"> <a-icon type="user" />1st menu item </a-menu-item>
                <a-menu-item key="2"> <a-icon type="user" />2nd menu item </a-menu-item>
                <a-menu-item key="3"> <a-icon type="user" />3rd item </a-menu-item>
              </a-menu>
              <a-button block style="color:#D9D9D9">
                Select an option and change input text above <a-icon type="down" />
              </a-button>
            </a-dropdown>
          </a-form-item>
          <a-form-item label="Member">
            <a-mentions
              style="text-align: initial;"
              placeholder="input @ to mention people"
              v-model="reviewer"
            >
              <a-mentions-option v-for="user in users" :key="user.id" :value="user.name">
                <v-img style="float:left;" v-bind:src="user.image.fullPath" id="imgProfile" />
                <span style="float:left; margin-left:5px">{{ user.name }}</span>
              </a-mentions-option>
            </a-mentions>
          </a-form-item>
          <a-form-item label="Due Date">
            <a-date-picker style="width:100%" />
          </a-form-item>
          <a-form-item label="Description">
            <a-textarea
              v-model="taskDetail"
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
          style="text-transform: capitalize; background-color: #105EFB; color:white;"
          >Submit
        </a-button>
      </a-form>
    </div>
  </div>
</template>

<script>
import ToolbarBack from '@/components/ToolbarBack'
import * as gqlQuery from '../constants/graphql'
export default {
  name: 'createProject',
  components: {
    ToolbarBack,
  },
  apollo: {
    users: gqlQuery.ALL_MEMBER_QUERY,
  },
  data() {
    return {
      users: [],
      reviewer: '',
    }
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
