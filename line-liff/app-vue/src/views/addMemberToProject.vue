<template>
  <div>
    <div style="position: fixed; z-index:10; width:100%">
      <a-page-header class="toolbar" style="  background-color: #262626;">
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
                <span v-if="checkAll" @change="onCheck" style="color:white;" @click="addmember">
                  Invite
                </span>
                <span v-else style="color:#8C8C8C">
                  Invite
                </span>
              </div>
            </v-col>
          </v-row>
        </div>
      </a-page-header>
    </div>

    <br />
    <div style="margin:60px 15px 15px 15px;">
      <a-input-search
        v-model="search"
        placeholder="input search text"
        block
        style="margin-bottom:35px;"
      />
    </div>
    <!-- <a-form>
      <div v-for="user in userFilter" :key="user.id">
        <div style="margin:0px 15px 10px 15px; float:left">
          <a-checkbox-group @change="onChange">
            <a-row>
              <a-col>
                <a-checkbox v-model="member" :value="user.id" :checked="checked">
                  <img v-bind:src="user.image.fullPath" class="picUser" />
                  {{ user.name }}
                </a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </div>

        <a-divider />
      </div>
    </a-form> -->

    <div>
      <!-- <div :style="{ borderBottom: '1px solid #E9E9E9' }">
        <a-checkbox :checked="checkAll" @change="onCheck">
          Check all
        </a-checkbox>
      </div> -->
      <br />
      <!-- <div v-for="user in userFilter" :key="user.id"> -->
      <a-checkbox-group v-model="checkedList" :options="plainOptions" @change="onChange" />
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
const plainOptions = ['Nan', 'Chalobon', 'Wisan']
const defaultCheckedList = []
const users = []
const defaultUsername = () => {
  return users.forEach(person => {
    defaultUsername.push(person.name)
  })
}
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
    onChange1(checkedValues) {
      console.log('checked = ', checkedValues)
      this.test.push(...checkedValues)
      console.log(this.test)

      // this.check.push(this.checked)
      // console.log(this.check)
      // this.checked = !this.checked
      // เก็บ array - check กับ uncheck ถ้า array uncheck length == array ของ member จะให้ allUncheck เป็น true
      if (this.test.length >= 1) {
        this.checked = true

        console.log('boolean :', this.checked)
      } else {
        this.checked = false

        console.log('boolean :', this.checked)
      }
    },

    onChange(checkedList) {
      this.checkAll = checkedList.length >= 1
      this.users.map(({ id, name }) => `${id} ${name}`)
      console.log(checkedList)
      console.log(this.users)
      console.log(this.username)
      console.log(defaultUsername())
    },
    onCheck(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked,
      })
    },
  },
  data() {
    return {
      users,
      search: '',
      username: defaultUsername,
      checked: false,
      checkb: false,
      test: [],

      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      plainOptions,
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
</style>
