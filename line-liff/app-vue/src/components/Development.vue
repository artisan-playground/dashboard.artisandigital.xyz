<template>
  <div>
    <div id="antInput" style="margin-left: 15px; margin-right: 15px; margin-bottom:1.5rem;">
      <a-input-search v-model="search" type="search" placeholder="input search text" />
    </div>
    <div v-if="emptyEmp.length == 0" class="noData">
      <a-empty />
    </div>
    <div v-else>
      <div v-for="member in userFilter" :key="member.id">
        <router-link
          style="text-decoration: none;"
          :to="
            userId == member.id ? '/profile' : { name: 'ProfileMember', params: { id: member.id } }
          "
        >
          <div v-if="member.department === 'Development'" id="flex-container">
            <div class="cardPicture">
              <img
                v-bind:src="member.image ? member.image.fullPath : require('../assets/user.svg')"
                id="imgProfile"
              />
            </div>
            <div :class="member.type == 'Intern' ? 'cardInforIntern' : 'cardInformation'">
              <div id="displayname">
                {{ member.name }}
              </div>
              <div id="memberposition">
                {{ member.position }}
              </div>
              <br />
              <div id="department">
                Full-time/Intern :
                <span>{{ member.type }}</span>
              </div>
              <div id="department">
                Department:
                <span>{{ member.department }}</span>
              </div>
              <div v-if="member.type == 'Intern'" id="department" style="font-size:10px">
                Internship period :
                <span>
                  {{ $dayjs(member.startDate).format('DD MMM YYYY') }}
                  - {{ $dayjs(member.dueDate).format('DD MMM YYYY') }}
                </span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import * as gqlQuery from '../constants/user'
export default {
  name: 'Development',
  components: {},
  apollo: {
    users: gqlQuery.ALL_MEMBER_QUERY,
  },
  data() {
    return {
      search: '',
      users: [],
      userId: 0,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const get = JSON.parse(localStorage.getItem('vuex'))
      this.userId = get.Auth.user.id
    },
  },
  computed: {
    userFilter() {
      let text = this.search.trim()
      return this.users.filter(item => {
        return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1
      })
    },
    emptyEmp() {
      let development = 0
      return this.users.filter(value => {
        if (value.department === 'Development') {
          development += 1
          return development
        }
      })
    },
  },
}
</script>

<style></style>
