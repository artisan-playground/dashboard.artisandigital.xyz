<template>
  <div style="position: fixed; z-index:10; width:100%">
    <a-page-header class="toolbar" style="padding-top:0px; padding-bottom: 10px;">
      <a-row style="display:flex; align-items: center;">
        <a-col align="left" :span="5">
          <img class="logo" src="../assets/1_1.svg" />
        </a-col>

        <a-col :span="14">
          <div class="title">{{ msg }}</div>
        </a-col>

        <a-col align="right" :span="5">
          <div>
            <img
              id="pictureUrl"
              :src="
                profileStore.pictureUrl ||
                  'https://cdn.iconscout.com/icon/premium/png-512-thumb/profile-1506810-1278719.png'
              "
            />
          </div>
        </a-col>
      </a-row>
    </a-page-header>
  </div>
</template>
<script src="https://static.line-scdn.net/liff/edge/versions/2.4.0/sdk.js"></script>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
export default {
  name: 'Toolbar',
  props: {
    msg: String,
  },
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
  // liff.login({ redirectUri: 'https://localhost:8080' }) // ไม่เอา
  // await liff.init({ liffId: '1654900324-lDYAE146' })
  // },
  methods: {
    // async getUserProfile() {
    //   console.log('Logger : ', await liff.getProfile())
    //   const profile = await liff.getProfile()
    //   this.$store.commit('setUserId', profile.userId)
    //   this.$store.commit('setPicProfile', profile.pictureUrl)
    //   this.$store.commit('setDisplayName', profile.displayName)
    //   this.$store.commit('setStatusMessage', profile.statusMessage)
    //   this.$store.commit('setEmail', getDecodedIDToken.email)
    // },
    getEnvironment() {
      document.getElementById('os').append(liff.getOS()) // liff.getOS() ทำให้เราทราบว่า liff ที่เราเปิดตอนนี้เปิดด้วย device อะไรอยู่ ex. แอนดรอย ios web
      document.getElementById('language').append(liff.getLanguage()) // liff.getLanguage() รู้ว่า client นี้ defalt เขาใช้ภาษาอะไร
      document.getElementById('version').append(liff.getVersion()) // liff.getVersion() เว่อร์ชั่น liff
      document.getElementById('accessToken').append(liff.getAccessToken())
      document.getElementById('isInClient').append(liff.isInClient())
    },
  },
}
</script>

<style scoped>
.logo {
  width: 24px;
  margin-top: 6px;
  margin-bottom: 6px;
}
.toolbar {
  background-color: #262626;
}
#accessToken,
#utouId {
  display: block;
  overflow: auto;
}
/* #accessToken,
#utouId {
  display: block;
  overflow: auto;
} */
</style>
