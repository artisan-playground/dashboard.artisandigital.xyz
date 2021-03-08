<template>
  <div style="position: fixed; z-index:10; width:100%">
    <a-page-header class="toolbar">
      <a-row style="display:flex; align-items: center;">
        <a-col align="left" :span="5">
          <v-btn
            @click="$router.go(-1)"
            style="background-color:#262626; max-width:5%; height: 36px; min-width: 0px; padding-left:0px; box-shadow: none;"
          >
            <a-icon type="left" style="margin-left:20px; color:white;" />
          </v-btn>
        </a-col>
        <a-col :span="14">
          <div class="title">{{ msg }}</div>
        </a-col>
      </a-row>
    </a-page-header>
  </div>
</template>
<script src="https://static.line-scdn.net/liff/edge/versions/2.4.0/sdk.js"></script>

<script>
export default {
  name: 'ToolbarBack',
  props: {
    msg: String,
  },
}
</script>

<style scoped>
.toolbar {
  padding-top: 0px;
  padding-bottom: 10px;
  background-color: #262626;
}
</style>
