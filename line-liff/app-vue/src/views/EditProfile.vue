<template>
  <div>
    <ToolbarBack msg="Edit Profile" />
    <br />
    <div class="create-form" style="margin: 60px 18px 0px 18px;">
      <div class="profilePic">
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
            <a-col class="upload-btn-wrapper" style="margin-top: -30px; margin-left: 70px;">
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
      </div>
      <a-form-model class="label-form" ref="ruleForm" :model="profile" :rules="rules">
        <a-form-model-item ref="name" label="Username" prop="name">
          <a-input
            v-model="profile.name"
            placeholder="Username"
            @blur="
              () => {
                $refs.name.onFieldBlur()
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item ref="positon" label="Jop Position" prop="position">
          <a-input v-model="profile.position" placeholder="Project position" />
        </a-form-model-item>
      </a-form-model>
      <div @click="signOut" style="color:#FF4D4F">Sign out</div>

      <a-row style="margin-top:70px;">
        <a-col>
          <a-button
            v-if="url == null && profile.image == null"
            @click="editProfileUpdate(profile.name, profile.position)"
            size="large"
            block
            style="text-transform: capitalize; background-color: #134F83; color:white;"
          >
            Save
          </a-button>
          <a-button
            v-else
            @click="
              profile.image
                ? editProfileUpdate(profile.name, profile.position)
                : editProfileUpload(profile.name, profile.position)
            "
            size="large"
            block
            style="text-transform: capitalize; background-color: #134F83; color:white;"
          >
            Save
          </a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import ToolbarBack from '@/components/ToolbarBack.vue'
import * as gqlQueryUser from '../constants/user'
import * as gqlQueryImage from '../constants/profileImage'
import { mapActions } from 'vuex'
export default {
  name: 'editprofile',
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
      fetchPolicy: 'cache-and-network',
      update(data) {
        this.profile = data.user
        this.imageId = data.user.image ? data.user.image.id : null
      },
    },
  },
  data() {
    return {
      userId: 0,
      imageId: 0,
      imageIdUpload: 0,
      url: null,
      profile: {
        name: '',
        position: '',
        image: '',
      },
      rules: {
        name: [{ required: true, message: 'Please enter your name', trigger: 'blur' }],
      },
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
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
        await this.$apollo.mutate({
          mutation: gqlQueryImage.UPDATE_IMAGE,
          variables: {
            id: this.imageId,
            file: event.target.files[0],
          },
        })
      } catch (error) {
        this.$message.error(error)
      }
    },

    async editProfileUpload(name, position) {
      try {
        await this.$apollo.mutate({
          mutation: gqlQueryUser.EDIT_PROFILE_UPLOAD,
          variables: {
            id: parseInt(this.profile.id),
            name: name,
            position: position,
            imageId: this.imageIdUpload,
          },
        })
        this.$router.go(-1)
        this.$message.success('Edit profile is success')
      } catch (error) {
        this.$message.error(error + '')
      }
    },
    ...mapActions({
      logOut: 'Auth/logOut',
    }),
    signOut() {
      this.logOut()
    },
    getData() {
      const get = JSON.parse(localStorage.getItem('vuex'))
      this.userId = get.Auth.user.id
    },

    async editProfileUpdate(name, position) {
      if (this.profile.name !== '' && this.profile.position !== '') {
        try {
          await this.$apollo.mutate({
            mutation: gqlQueryUser.EDIT_PROFILE_UPDATE,
            variables: {
              id: parseInt(this.profile.id),
              name: name,
              position: position,
            },
          })
          this.$router.go(-1)
          this.$message.success('Edit profile is success')
        } catch (error) {
          this.$message.error(error + '')
        }
      }

      this.$refs.ruleForm.validate(isValid => isValid)
    },
  },
}
</script>

<style></style>
