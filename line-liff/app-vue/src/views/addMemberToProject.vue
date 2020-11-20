<template>
  <div>
    <div style="position: fixed; z-index:10; width:100%">
      <a-page-header style="background-color: #262626; padding-top:0px; padding-bottom: 10px;">
        <a-row style="display:flex; align-items: center;">
          <a-col align="left" :span="5">
            <v-btn
              @click="$router.go(-1)"
              style="background-color:#262626; max-width:5%; height: 36px; min-width: 0px; padding-left:0px; box-shadow: none;"
            >
              <a-icon type="close" style="margin-left:20px; color:white;" />
            </v-btn>
          </a-col>

          <a-col :span="14">
            <div class="title">Choose friends</div>
          </a-col>

          <a-col align="right" :span="5">
            <div id="pictureUrl" style="margin-right:30px;">
              <span v-if="member.length >= 1" style="color:white;" @click="addmember">
                Invite
              </span>
              <span v-else style="color:#8C8C8C">
                Invite
              </span>
            </div>
          </a-col>
        </a-row>
      </a-page-header>
    </div>

    <br />
    <div style="margin:60px 15px 15px 15px;">
      <a-input-search v-model="search" placeholder="input search text" block />
    </div>
    <a-form>
      <a-divider style="margin:25px 0px 0px 0px;" />
      <div style="margin-top:15px;"></div>
      <div v-for="user in userFilter" :key="user.id">
        <div style="margin:0px 15px 0px 15px; float:left; display: flex;">
          <v-checkbox color="#0036C7" v-model="member" :label="user.name" :value="user.id">
            <template v-slot:label>
              <img
                v-bind:src="
                  user.image ? user.image.fullPath : 'https://source.unsplash.com/random?animal'
                "
                class="picUser"
              />
              <span style="margin-left:5px;">{{ user.name }}</span>
            </template>
          </v-checkbox>
        </div>

        <a-divider style="margin:15px 0px 15px 0px;" />
      </div>
    </a-form>
  </div>
</template>

<script>
import * as gqlQuery from '../constants/graphql'
export default {
  name: 'addMemberToProject',
  components: {
    // ToolbarClose,
  },
  methods: {
    addmember() {
      this.$apollo
        .mutate({
          mutation: gqlQuery.ADD_MEMBER_TO_PROJECT,
          variables: {
            id: parseInt(this.$route.params.id),
            data: {
              members: {
                connect: {
                  id: parseInt(this.member),
                },
              },
            },
          },
        })
        .then(() => {
          this.member = ''
          this.$message.success('Add member success')
        })
    },
  },
  data() {
    return {
      users: [],
      search: '',
      checked: false,
      checkb: false,
      test: [],
      member: [],
    }
  },
  apollo: {
    getUser: {
      query: gqlQuery.ALL_MEMBER_QUERY,
      update(data) {
        this.users = data.users
        this.username = data.users.name
      },
    },
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
.v-input--selection-controls {
  margin-top: 0px;
  padding-top: 0px;
}
.v-input--selection-controls__ripple {
  margin: 0px;
  padding: 0px;
}
.v-input__slot {
  margin-bottom: 0px;
}
.picUser {
  border-radius: 100%;
  margin-left: 3px;
  width: 33px;
  height: 33px;
}
.title {
  color: white;
  font-weight: 380;
  font-size: 18px;
}
#pictureUrl {
  width: 24px;
  -moz-border-radius: 100px;
  -webkit-border-radius: 100px;
  border-radius: 100px;
}
.v-icon.v-icon {
  color: #e0e0e0;
  border-radius: 50%;
}

.v-input--selection-controls__ripple {
  border-radius: 50%;
  cursor: pointer;
  height: 34px;
  transition: inherit;
  width: 34px;
  left: -12px;
  top: calc(50% - 24px);
  margin: 7px;
}
</style>
