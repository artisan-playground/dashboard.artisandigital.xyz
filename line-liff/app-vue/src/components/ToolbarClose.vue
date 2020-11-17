<template>
  <div style="position: fixed; z-index:10; width:100%">
    <md-toolbar class="toolbar" md-elevation="1">
      <div style="border:none; width:100% ">
        <v-row>
          <v-col align="left" cols="3">
            <v-btn
              @click="$router.go(-1)"
              style="background-color:#262626; max-width:5%; height: 36px; min-width: 0px; padding-left:10px; box-shadow: none;"
            >
              <a-icon type="close" style="margin-left:20px; color:white;" />
            </v-btn>
          </v-col>

          <v-col cols="6">
            <div class="title">{{ msg }}</div>
          </v-col>

          <v-col align="right" cols="3">
            <div class="profile" style="margin-top:10px;">
              <span style="color:white;" @click="test">
                Invite
              </span>
            </div>
          </v-col>
        </v-row>
      </div>
    </md-toolbar>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'ToolbarClose',
  props: {
    msg: String,
  },
  methods: {
    test() {
      console.log('test')
    },
  },
}
</script>

<style scoped>
.title {
  color: white;
  margin-top: 17px;
  font-weight: 380;
  font-size: 18px;
}
#displayName {
  font-size: 12px;
  color: white;
  margin-top: 1em;
  margin-bottom: 0.5em;
}
.logo {
  margin: 10px 20px 0px 15px;
  vertical-align: middle;
  width: 22.5px;
}
.toolbar {
  background-color: #262626;
  height: 50px;
}
.profile {
  margin: 0px 10px 0px 10px;
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
