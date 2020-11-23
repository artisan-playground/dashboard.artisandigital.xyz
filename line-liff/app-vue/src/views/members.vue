<template>
  <div>
    <Toolbar msg="Members" />
    <br />
    <div style="margin-top: 60px;">
      <v-tabs v-model="tab" background-color="transparent" color="#105EFB">
        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <div style="margin-top:20px; margin-left: 15px; margin-right: 15px;">
        <a-input-search v-model="search" type="search" placeholder="input search text" />
      </div>

      <div style="margin-top:20px;">
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item">
            <div v-for="member in userFilter" :key="member.id">
              <router-link
                style="text-decoration: none;"
                :to="{ name: 'profileMember', params: { id: member.id } }"
              >
                <div v-if="member.department === item" id="flex-container">
                  <div class="cardPicture">
                    <img
                      v-bind:src="
                        member.image
                          ? member.image.fullPath
                          : 'https://source.unsplash.com/random?cat,bunny'
                      "
                      id="imgProfile"
                    />
                  </div>
                  <div class="cardInformation">
                    <div id="displayname">
                      {{ member.name }}
                    </div>
                    <div id="memberposition">
                      {{ member.position }}
                    </div>
                    <div id="department">
                      Full-time/Intern :
                      <span>{{ member.type }}</span>
                    </div>
                    <div id="department">
                      Department:
                      <span>{{ member.department }}</span>
                    </div>
                    <div v-if="member.type == 'intern'" id="department" style="font-size:10px">
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
          </v-tab-item>
        </v-tabs-items>
      </div>
    </div>

    <div style="padding-bottom:80px">
      <!-- ระยะห่าง manu ข้างล่างกับ content -->
    </div>
    <BarRouter />
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import BarRouter from '@/components/BarRouter.vue'
import * as gqlQuery from '../constants/user'
// import store from '../store/index.js'

export default {
  name: 'members',
  components: {
    Toolbar,
    BarRouter,
  },
  apollo: {
    users: gqlQuery.ALL_MEMBER_QUERY,
  },
  data() {
    return {
      tab: null,
      items: ['HR/Admin', 'Development', 'Design', 'Digital Marketing'],
      search: '',
      displayName: '',
      name: '',
      users: [],
      // users: store.state.users,
    }
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
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #105efb !important;
}
.v-tabs-bar__content {
  flex-wrap: wrap;
}
div.v-tabs-bar {
  /* height: auto; */
}
</style>
