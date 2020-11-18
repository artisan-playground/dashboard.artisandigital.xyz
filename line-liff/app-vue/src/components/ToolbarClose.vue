<template>
  <div style="position: fixed; z-index:10; width:100%">
    <a-page-header class="toolbar" style="padding-top:0px; padding-bottom: 10px;">
      <div style="border:none; width:100% ">
        <a-row>
          <a-col align="left" cols="3">
            <v-btn
              @click="$router.go(-1)"
              style="background-color:#262626; max-width:5%; height: 36px; min-width: 0px; padding-left:10px; box-shadow: none;"
            >
              <a-icon type="close" style="margin-left:20px; color:white;" />
            </v-btn>
          </a-col>

          <a-col cols="6">
            <div class="title">{{ msg }}</div>
          </a-col>

          <a-col align="right" cols="3">
            <div class="profile" style="margin-top:10px;">
              <span style="color:white;" @click="test">
                Invite
              </span>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-page-header>
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
