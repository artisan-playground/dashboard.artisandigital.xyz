<template>
  <div style="border:none; width:100%">
    <div style="margin:0px 18px 0px 18px">
      <!-- ระยะห่างด้านข้าง margin:0px 18px 0px 18px -->
      <a-row
        type="flex"
        justify="space-around"
        align="middle"
        style="font-size:12.5px; margin-bottom: 10px;"
      >
        <a-col :span="6">
          <img
            class="profile"
            id="pictureUrl"
            :src="
              profileStore.pictureUrl ||
                'https://www.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png'
            "
          />
          <h3 id="displayName" style="display:inline"></h3>
        </a-col>

        <!-- ใส่ข้อมูล Project Participants Today’s task-->
        <a-col :span="6">
          <a-row>1</a-row>
          <a-row>Project</a-row>
        </a-col>

        <a-col :span="6">
          <a-row>2</a-row>
          <a-row>Participants</a-row>
        </a-col>
        <a-col :span="6">
          <a-row>2</a-row>
          <a-row>Today’s task</a-row>
        </a-col>
      </a-row>

      <!-- Name, Position , Status -->
      <a-row style="float:left; margin-bottom: 40px;">
        <a-row style="font-size:20px; color:#0036C7; font-weight:500">
          {{ profileStore.displayName }}
        </a-row>
        <a-row>
          Position
        </a-row>
        <a-row>
          Status
        </a-row>
      </a-row>

      <!-- edit button -->
      <a-row style="margin-bottom:20px">
        <a-col>
          <v-btn
            block
            color="primary"
            elevation="2"
            to="/editprofile"
            style="text-transform: capitalize; background-color: #105EFB;"
            >Edit profile</v-btn
          >
        </a-col>
      </a-row>
      <a-divider />
    </div>
  </div>
</template>
<script src="https://static.line-scdn.net/liff/edge/versions/2.4.0/sdk.js"></script>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
export default {
  name: 'Profile',
  computed: {
    ...mapState({
      profileStore: store => store.profile,
    }),
  },
  // async mounted() {
  //   await liff.init({ liffId: '1654900324-lDYAE146' })
  //   if (!liff.isLoggedIn()) {
  //     liff.login()
  //     this.getEnvironment()
  //     this.getUserProfile()
  //   }
  // },
  // methods: {
  //   async getUserProfile() {
  //     console.log('Logger : ', await liff.getProfile())
  //     const profile = await liff.getProfile()
  //     this.$store.commit('setUserId', profile.userId)
  //     this.$store.commit('setPicProfile', profile.pictureUrl)
  //     this.$store.commit('setDisplayName', profile.displayName)
  //     this.$store.commit('setStatusMessage', profile.statusMessage)
  //   },
  // },
}
</script>

<style scoped>
#pictureUrl {
  /* display: block; */
  /* margin: 0 auto; */
  /* margin-left: 10%; */
  /* margin: 10px 15px 10px 18px; */
  /* width: 18%; */
  width: 80px;
  -moz-border-radius: 100px;
  -webkit-border-radius: 100px;
  border-radius: 100px;
  /* margin-left: 40%; */
}

.edit-button {
  background-color: #0036c7;
  color: rgb(255, 255, 255);
  border-radius: 10px;
}

#accessToken,
#utouId {
  display: block;
  overflow: auto;
}
</style>
