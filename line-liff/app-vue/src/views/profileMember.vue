<template>
  <div v-if="user">
    <ToolbarBack />
    <br />
    <div style="margin-top:60px">
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
                  user.image ||
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
              {{ user.name }}
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
          <hr style="color:#a3a3a3; weight:550; margin-bottom:20px" />
        </div>
      </div>
    </div>
    <BarRouter />
  </div>
</template>

<script>
// import store from '../store/index.js'
import ToolbarBack from '@/components/ToolbarBack.vue'
import BarRouter from '@/components/BarRouter.vue'
// import gql from 'graphql-tag'
import * as gqlQuery from '../constants/graphql'
export default {
  name: 'profileMember',
  components: {
    ToolbarBack,
    BarRouter,
  },
  methods: {},
  apollo: {
    getUser: {
      query: gqlQuery.MEMBER_QUERY,
      variables() {
        return {
          memberId: parseInt(this.$route.params.id),
        }
      },
      update( data ) {
        this.user = data.user
        console.log('We got some result!', data)
      },
    },
  },
  data() {
    return {
      user: null,
    }
  },
  mounted() {
    console.log(this.$route.params.id)
  },
}
</script>

<style>
#pictureUrl {
  width: 80px;
  -moz-border-radius: 100px;
  -webkit-border-radius: 100px;
  border-radius: 100px;
  /* margin-left: 40%; */
}
</style>
