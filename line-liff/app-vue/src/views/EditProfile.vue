<template>
  <div>
    <ToolbarBack msg="Edit Profile" />
    <br />
    <div id="antInput" class="create-form" style="margin: 60px 18px 0px 18px;" v-if="profile">
      <div class="profilePic">
        <a-spin :spinning="spinningImg">
          <div class="clearfix">
            <a-col>
              <img v-if="url" :src="url" class="editProfilePic" />
              <img
                v-else
                :src="profile.image ? profile.image.fullPath : require('../assets/user.svg')"
                alt=""
                class="editProfilePic"
              />
            </a-col>
            <div class="uploadProfile">
              <a-col class="upload-btn-profile" style="margin-top: -30px; margin-left: 70px;">
                <a-button
                  shape="circle"
                  icon="camera"
                  style="border: 0; border-radius:100%; background-color:#134F83; color:white;"
                >
                  <div v-if="profile.image == null">
                    <input @change="onFileChangeUpload" type="file" name="myfile" />
                  </div>
                  <div v-else>
                    <input @change="updateProfile" type="file" name="myfile" />
                  </div>
                </a-button>
              </a-col>
            </div>
          </div>
        </a-spin>
      </div>

      <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" label="Username">
          <a-input
            placeholder="Username"
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: 'Please enter your name!', whitespace: true }],
              },
            ]"
          />
        </a-form-item>

        <a-form-item v-bind="formItemLayout" label="Email">
          <a-input
            placeholder="E-mail"
            v-decorator="[
              'email',
              {
                rules: [{ required: true, message: 'Please enter your e-mail!', whitespace: true }],
              },
            ]"
          />
        </a-form-item>

        <a-form-item v-bind="formItemLayout" label="Department">
          <a-select
            v-decorator="[
              'department',
              { rules: [{ required: true, message: 'Please select department!' }] },
            ]"
            placeholder="Please select department"
            @change="handleSelectChange"
          >
            <a-select-option value="HR / Admin">
              HR / Admin
            </a-select-option>
            <a-select-option value="Development">
              Development
            </a-select-option>
            <a-select-option value="Design">
              Design
            </a-select-option>
            <a-select-option value="Digital marketing">
              Digital marketing
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item v-bind="formItemLayout" label="Position">
          <a-select
            v-decorator="[
              'position',
              { rules: [{ required: true, message: 'Please select position!' }] },
            ]"
            placeholder="Please select position"
          >
            <a-select-option value="Account Executive" v-if="department == 'Digital marketing'">
              Account Executive
            </a-select-option>
            <a-select-option value="Accountant & Administrator" v-if="department == 'HR / Admin'">
              Accountant & Administrator
            </a-select-option>
            <a-select-option value="Back - End Developer" v-if="department == 'Development'">
              Back - End Developer
            </a-select-option>
            <a-select-option value="Community Manager" v-if="department == 'Digital marketing'">
              Community Manager
            </a-select-option>
            <a-select-option value="Content Creator" v-if="department == 'Digital marketing'">
              Content Creator
            </a-select-option>
            <a-select-option value="Course Developer" v-if="department == 'Development'">
              Course Developer
            </a-select-option>
            <a-select-option value="Creative Podcast" v-if="department == 'Digital marketing'">
              Creative Podcast
            </a-select-option>
            <a-select-option value="Digital marketing" v-if="department == 'Digital marketing'">
              Digital marketing
            </a-select-option>
            <a-select-option value="Filmmaker" v-if="department == 'Digital marketing'">
              Filmmaker
            </a-select-option>
            <a-select-option value="Front - End Developer" v-if="department == 'Development'">
              Front - End Developer
            </a-select-option>
            <a-select-option value="Graphic Designer" v-if="department == 'Design'">
              Graphic Designer
            </a-select-option>
            <a-select-option value="Legal Officer" v-if="department == 'HR / Admin'">
              Legal Officer
            </a-select-option>
            <a-select-option
              value="Mid - Level & Senior Developer"
              v-if="department == 'Development'"
            >
              Mid - Level & Senior Developer
            </a-select-option>
            <a-select-option value="Mobile Developer" v-if="department == 'Development'">
              Mobile Developer
            </a-select-option>
            <a-select-option value="Secretary" v-if="department == 'HR / Admin'">
              Secretary
            </a-select-option>
            <a-select-option value="Software Business Analyst" v-if="department == 'Development'">
              Software Business Analyst
            </a-select-option>
            <a-select-option value="Software Tester" v-if="department == 'Development'">
              Software Tester
            </a-select-option>
            <a-select-option value="UX / UI Designer" v-if="department == 'Design'">
              UX / UI Designer
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item v-bind="formItemLayout" label="Phone">
          <a-input addon-before="+66" placeholder="phone number" />
        </a-form-item>

        <a-form-item v-bind="formItemLayout" label="Full-time / Intern">
          <div class="type-emp">
            <a-radio-group
              v-decorator="[
                'type',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter your type position!',
                      whitespace: true,
                    },
                  ],
                },
              ]"
            >
              <a-radio value="Full-time" @change="onChange('Full-time')">
                Full-time
              </a-radio>
              <a-radio value="Intern" @change="onChange('Intern')">
                Intern
              </a-radio>
            </a-radio-group>
          </div>
        </a-form-item>

        <a-form-item
          v-bind="formItemLayout"
          label="Internship perid"
          v-if="profile.type == 'Intern'"
        >
          <a-form-item
            v-bind="formItemLayout"
            :style="{ display: 'inline-block', width: 'calc(50%)' }"
          >
            <a-date-picker
              style="width: 100%"
              @change="handleStartDateChange"
              v-decorator="[
                'startDate',
                {
                  initialValue: this.profile.startDate
                    ? moment(this.profile.startDate, dateFormat)
                    : null,
                  rules: [
                    {
                      required: true,
                      message: 'Please enter your start date!',
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item
            v-bind="formItemLayout"
            id="dueDate"
            :style="{ display: 'inline-block', width: 'calc(50%)' }"
          >
            <a-date-picker
              style="width: 100%;"
              @change="handleDueDateChange"
              v-decorator="[
                'dueDate',
                {
                  initialValue: this.profile.dueDate
                    ? moment(this.profile.dueDate, dateFormat)
                    : null,
                  rules: [
                    {
                      required: true,
                      message: 'Please enter your due date!',
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
        </a-form-item>

        <!-- <div v-bind="formItemLayout" v-if="profile.type == 'Intern'" label="Internship perid">
          <a-form-item>
            <a-date-picker
              style="width: 100%"
              v-decorator="[
                'startDate',
                {
                  initialValue: this.profile.startDate
                    ? moment(this.profile.startDate, dateFormat)
                    : null,
                  rules: [
                    {
                      required: true,
                      message: 'Please enter your start date!',
                      whitespace: true,
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item>
            <a-date-picker
              style="width: 100%"
              v-decorator="[
                'dueDate',
                {
                  initialValue: this.profile.dueDate
                    ? moment(this.profile.dueDate, dateFormat)
                    : null,
                  rules: [
                    {
                      required: true,
                      message: 'Please enter your due date!',
                      whitespace: true,
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
        </div> -->

        <a-form-item v-bind="tailFormItemLayout">
          <a-button
            block
            size="large"
            style="text-transform: capitalize; background-color: #134F83; color:white;"
            html-type="submit"
          >
            Submit
          </a-button>

          <div
            @click="signOut"
            style="color:#FF4D4F; margin-top: 15px; margin-bottom:10px; cursor: pointer;"
          >
            Sign out
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import ToolbarBack from '@/components/ToolbarBack.vue'
import * as gqlQueryUser from '../constants/user'
import * as gqlQueryImage from '../constants/profileImage'
import { mapActions } from 'vuex'
import moment from 'moment'
export default {
  components: {
    ToolbarBack,
  },
  apollo: {
    getUser: {
      query: gqlQueryUser.MEMBER_QUERY,
      variables() {
        return {
          userId: this.userId,
        }
      },
      update(data) {
        this.profile = data.user
        this.imageId = data.user.image ? data.user.image.id : null
      },
    },
  },
  data() {
    this.dateFormat = 'YYYY-MM-DD'
    return {
      status_department: false,
      spinningImg: false,
      spinning: false,
      userId: 0,
      imageId: 0,
      imageIdUpload: 0,
      url: null,
      department: undefined,
      startDate: '',
      dueDate: '',
      profile: {
        name: '',
        email: '',
        position: '',
        department: undefined,
        phone: '',
        type: '',
        image: '',
        startDate: undefined,
        dueDate: undefined,
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
    this.form.getFieldDecorator('type', {
      rules: [
        {
          required: true,
          message: 'Please enter your type position!',
          whitespace: true,
        },
      ],
    })
  },
  methods: {
    moment,
    onFileChangeUpload(e) {
      const file = e.target.files[0]
      this.url = URL.createObjectURL(file)
      this.uploadProfile()
    },
    async uploadProfile() {
      try {
        await this.$apollo.mutate({
          mutation: gqlQueryImage.UPLOAD_IMAGE,
          variables: {
            file: event.target.files[0],
          },
          update: (store, { data: { uploadImage } }) => {
            this.imageIdUpload = uploadImage.id
          },
        })
      } catch (error) {
        this.$message.error(error)
      }
    },
    async updateProfile(event) {
      try {
        this.spinningImg = !this.spinningImg
        await this.$apollo.mutate({
          mutation: gqlQueryImage.UPDATE_IMAGE,
          variables: {
            id: this.imageId,
            file: event.target.files[0],
          },
        })
        this.spinningImg = !this.spinningImg
      } catch (error) {
        this.$message.error(error)
      }
    },
    async editProfileUploadIntern(
      name,
      email,
      position,
      department,
      phone,
      type,
      startDate,
      dueDate
    ) {
      try {
        this.spinning = !this.spinning
        await this.$apollo.mutate({
          mutation: gqlQueryUser.EDIT_PROFILE_UPLOAD_INTERN,
          variables: {
            id: parseInt(this.profile.id),
            name: name,
            email: email,
            position: position,
            department: department,
            phone: phone == '' ? phone : '',
            type: type,
            startDate: startDate,
            dueDate: dueDate,
            imageId: this.imageIdUpload,
          },
        })
        this.spinning = !this.spinning
        this.$router.go(-1)
        this.$message.success('Edit profile is success')
      } catch (error) {
        this.$message.error(error + '')
      }
    },
    async editProfileUploadFulltime(name, email, position, department, phone, type) {
      try {
        this.spinning = !this.spinning
        await this.$apollo.mutate({
          mutation: gqlQueryUser.EDIT_PROFILE_UPLOAD_FULLTIME,
          variables: {
            id: parseInt(this.profile.id),
            name: name,
            email: email,
            position: position,
            department: department,
            phone: phone == '' ? phone : '',
            type: type,
            imageId: this.imageIdUpload,
          },
        })
        this.spinning = !this.spinning
        this.$router.go(-1)
        this.$message.success('Edit profile is success')
      } catch (error) {
        this.$message.error(error + '')
      }
    },
    async editProfileUpdateIntern(
      name,
      email,
      position,
      department,
      phone,
      type,
      startDate,
      dueDate
    ) {
      if (
        this.profile.name !== '' &&
        this.profile.position !== '' &&
        this.profile.department !== '' &&
        this.profile.email !== '' &&
        this.profile.type !== '' &&
        this.profile.startDate !== '' &&
        this.profile.dueDate !== ''
      ) {
        try {
          this.spinning = !this.spinning
          await this.$apollo.mutate({
            mutation: gqlQueryUser.EDIT_PROFILE_INTERN_UPDATE,
            variables: {
              id: parseInt(this.profile.id),
              name: name,
              email: email,
              position: position,
              department: department,
              phone: phone == '' ? phone : '',
              type: type,
              startDate: startDate,
              dueDate: dueDate,
            },
          })
          this.spinning = !this.spinning
          this.$router.go(-1)
          this.$message.success('Edit profile is success')
        } catch (error) {
          this.$message.error(error + '')
        }
      }
    },
    async editProfileUpdateFulltime(name, email, position, department, phone, type) {
      if (
        this.profile.name !== '' &&
        this.profile.position !== '' &&
        this.profile.department !== '' &&
        this.profile.email !== '' &&
        this.profile.type !== ''
      ) {
        try {
          this.spinning = !this.spinning
          await this.$apollo.mutate({
            mutation: gqlQueryUser.EDIT_PROFILE_FULLTIME_UPDATE,
            variables: {
              id: parseInt(this.profile.id),
              name: name,
              email: email,
              position: position,
              department: department,
              phone: phone == '' ? phone : '',
              type: type,
            },
          })
          this.spinning = !this.spinning
          this.$router.go(-1)
          this.$message.success('Edit profile is success')
        } catch (error) {
          this.$message.error(error + '')
        }
      }
    },
    onChange(type) {
      this.profile.type = type
    },
    getData() {
      const get = JSON.parse(localStorage.getItem('vuex'))
      this.userId = get.Auth.user.id
    },
    ...mapActions({
      logOut: 'Auth/logOut',
    }),
    signOut() {
      this.logOut()
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          if (this.profile.image || this.imageIdUpload == 0) {
            if (values.type == 'Intern')
              this.editProfileUpdateIntern(
                values.name,
                values.email,
                values.position,
                values.department,
                values.phone,
                values.type,
                values.startDate,
                values.dueDate
              )
            else
              this.editProfileUpdateFulltime(
                values.name,
                values.email,
                values.position,
                values.department,
                values.phone,
                values.type
              )
          } else {
            if (values.type == 'Intern')
              this.editProfileUploadIntern(
                values.name,
                values.email,
                values.position,
                values.department,
                values.phone,
                values.type,
                values.startDate,
                values.dueDate
              )
            else
              this.editProfileUploadFulltime(
                values.name,
                values.email,
                values.position,
                values.department,
                values.phone,
                values.type
              )
          }
        }
      })
    },
    handleSelectChange(value) {
      this.status_department == true
      this.department = value
    },
    handleStartDateChange(value) {
      this.startDate = value
    },
    handleDueDateChange(value) {
      this.dueDate = value
    },
  },
  async mounted() {
    await this.getData()
    await this.form.setFieldsValue({
      name: this.profile.name,
      email: this.profile.email,
      department: this.profile.department ? this.profile.department : undefined,
      position: this.profile.position ? this.profile.position : undefined,
      type: this.profile.type ? this.profile.type : undefined,
      // startDate: this.profile.startDate ? this.profile.startDate : null,
      // dueDate: this.profile.dueDate ? this.profile.dueDate : null,
    })
    ;(await this.status_department) == false ? (this.department = this.profile.department) : ''
  },
}
</script>
<style scoped>
.type-emp {
  float: left;
}
</style>
