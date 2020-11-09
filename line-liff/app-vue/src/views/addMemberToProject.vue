<template>
  <div>
    <div style="position: fixed; z-index:10; width:100%">
      <md-toolbar class="toolbar" md-elevation="1" style="  background-color: #262626;">
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
              <div class="title">Choose friends</div>
            </v-col>

            <v-col align="right" cols="3">
              <div class="profile" style="margin-top:10px;">
                <span v-if="checkb == true" style="color:white;" @click="addmember">
                  Invite
                </span>
                <span v-else style="color:#8C8C8C">
                  Invite
                </span>
              </div>
            </v-col>
          </v-row>
        </div>
      </md-toolbar>
    </div>
    <!-- <ToolbarClose msg="Choose friends" />> -->
    <br />
    <div style="margin:60px 15px 15px 15px;">
      <a-input-search
        v-model="search"
        placeholder="input search text"
        block
        style="margin-bottom:35px;"
      />
    </div>
    <div v-for="user in userFilter" :key="user.id">
      <div style="margin:0px 15px 10px 15px; float:left">
        <a-checkbox>
          <img v-bind:src="user.image.fullPath" class="picUser" />
          {{ user.name }}
        </a-checkbox>
      </div>

      <a-divider />
    </div>
  </div>
</template>

<script>
// import ToolbarClose from '@/components/ToolbarClose.vue'
import * as gqlQuery from '../constants/graphql'
export default {
  name: 'addMemberToProject',
  components: {
    // ToolbarClose,
  },
  methods: {
    addmember() {
      console.log('addmember')
    },
    onChange(checkedValues) {
      console.log('checked = ', checkedValues)
    },
  },
  data() {
    return {
      users: [],
      search: '',
      checkb: false,
    }
  },
  apollo: {
    users: gqlQuery.ALL_MEMBER_QUERY,
  },
  computed: {
    userFilter() {
      let text = this.search.trim()
      return this.users.filter(item => {
        return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1
      })
    },
  },
}
</script>

<style>
.picUser {
  border-radius: 100%;
  margin-left: 3px;
  width: 33px;
  height: 33px;
}
.title {
  color: white;
  margin-top: 17px;
  font-weight: 380;
  font-size: 18px;
}
</style>
