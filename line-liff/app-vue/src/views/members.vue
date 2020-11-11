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
                <div v-if="member.department === item" class="flex-container">
                  <div class="cardPicture">
                    <img v-bind:src="member.image.fullPath" id="imgProfile" />
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
import * as gqlQuery from '../constants/graphql'
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
/* .v-slide-group {
  display: inline-grid;
} */
.flex-container {
  display: flex;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;

  margin: 0px 15px 20px 15px;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); */
  transition: 0.3s;
  text-align: left;
  color: black;
  border: 1px solid #f0f0f0;
  align-items: flex-start;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}
.flex-container > *:first-child {
  align-self: stretch;
}
.cardPicture {
  background-color: #9daace;
  box-shadow: 0 0 1px 1px #9daace;
  padding: 15px 10px 15px 10px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.cardInformation {
  margin-top: 17px;
  margin-bottom: 30px;
  padding: 2px 16px;
}
#displayname {
  color: #0036c7;
  font-size: 18px;
  font-weight: 550;
}
#imgProfile {
  margin-top: 10px;
  border-radius: 100%;
  height: 77px;
  width: 77px;
  object-fit: cover;
  border: 4px solid #9daace;
  position: relative;
  box-shadow: 0 0 1px 3px rgb(255, 255, 255);
}
#memberposition {
  color: #000000;
  opacity: 0.85;
  font-weight: 500;
}
#department {
  color: #000000;
  opacity: 0.85;
  font-size: 12px;
}

.v-tabs-bar__content {
  flex-wrap: wrap;
}
div.v-tabs-bar {
  /* height: auto; */
}

/* .v-slide-group__prev {
  display: none;
} */

/* .v-tabs:not(.v-tabs--vertical):not(.v-tabs--right)
  > .v-slide-group--is-overflowing.v-tabs-bar--is-mobile:not(.v-slide-group--has-affixes)
  .v-slide-group__prev {
  display: none;
} */
</style>
