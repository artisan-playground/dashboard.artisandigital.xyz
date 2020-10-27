<template>
  <div class="project">
    <!-- <h1>This is an about page</h1> -->
    <Toolbar msg="Members" />
    <br />
    <md-content id="content">
      <div>
        <!-- filter department -->
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" tab="HR/Admin">
            <!-- search button -->
            <div style="width:100%; margin-bottom:10px">
              <div align="right" style="padding-right:18px; padding-left:18px">
                <a-input-search v-model="search" type="search" placeholder="input search text" />

                <!-- <a-input-search
                  v-model="search"
                  type="search"
                  placeholder="search"
                  style="width: 50%"
                  enter-button
                  @search="onSearch"
                /> -->
              </div>
            </div>
            <!-- end search button -->
            <!-- list member Admin -->
            <div class="listmembers">
              <div v-for="member in userFilter" :key="member.id">
                <div v-if="member.department === 'HR/Admin'" style="width:100%; height:50%">
                  <v-card id="card" :to="{ name: 'profileMember', params: { id: member.id } }">
                    <v-row>
                      <div id="card-media" style="vertical-align: middle;">
                        <div id="circle" align="center">
                          <v-img v-bind:src="member.image" id="imgProfile"> </v-img>
                        </div>
                      </div>
                      <div id="information" align="left">
                        <div>
                          <b id="displayname">{{ member.name }}</b>
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
                        <div v-if="(member.type == 'Intern')" id="department" style="font-size:10px">
                          Internship period :
                          <span>
                            {{ $dayjs(member.startDate).format('DD MMM YYYY') }}
                            - {{ $dayjs(member.dueDate).format('DD MMM YYYY') }}
                          </span>
                        </div>
                      </div>
                    </v-row>
                  </v-card>
                </div>
              </div>
            </div>
            <!-- end list member Admin -->
          </a-tab-pane>

          <a-tab-pane key="2" tab="Development">
            <!-- search button -->
            <div style="width:100%; margin-bottom:10px">
              <div align="right" style="padding-right:18px; padding-left:18px">
                <a-input-search v-model="search" type="search" placeholder="input search text" />
              </div>
            </div>
            <!-- end search button -->
            <!-- list Developer -->
            <div class="listmembers">
              <div v-for="member in userFilter" :key="member.id">
                <div v-if="member.department === 'Development'" style="width:100%; height:50%">
                  <v-card id="card" :to="{ name: 'profileMember', params: { id: member.id } }">
                    <v-row>
                      <div id="card-media" style="vertical-align: middle;">
                        <div id="circle" align="center">
                          <v-img v-bind:src="member.image" id="imgProfile"> </v-img>
                        </div>
                      </div>
                      <div id="information" align="left">
                        <div>
                          <b id="displayname">{{ member.name }}</b>
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
                        <div v-if="(member.type == 'Intern')" id="department" style="font-size:10px">
                          Internship period :
                          <span>
                            {{ $dayjs(member.startDate).format('DD MMM YYYY') }}
                            - {{ $dayjs(member.dueDate).format('DD MMM YYYY') }}
                          </span>
                        </div>
                      </div>
                    </v-row>
                  </v-card>
                </div>
              </div>
            </div>
          </a-tab-pane>

          <a-tab-pane key="3" tab="Design" force-render>
            <!-- search button -->
            <div style="width:100%; margin-bottom:10px">
              <div align="right" style="padding-right:18px; padding-left:18px">
                <a-input-search v-model="search" type="search" placeholder="input search text" />
              </div>
            </div>
            <!-- end search button -->
            <div class="listmembers">
              <div v-for="member in userFilter" :key="member.id">
                <div v-if="member.department === 'Design'" style="width:100%; height:50%">
                  <v-card id="card" :to="{ name: 'profileMember', params: { id: member.id } }">
                    <v-row>
                      <div id="card-media" style="vertical-align: middle;">
                        <div id="circle" align="center">
                          <v-img v-bind:src="member.image" id="imgProfile"> </v-img>
                        </div>
                      </div>
                      <div id="information" align="left">
                        <div>
                          <b id="displayname">{{ member.name }}</b>
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
                        <div v-if="(member.type == 'Intern')" id="department" style="font-size:10px">
                          Internship period :
                          <span>
                            {{ $dayjs(member.startDate).format('DD MMM YYYY') }}
                            - {{ $dayjs(member.dueDate).format('DD MMM YYYY') }}
                          </span>
                        </div>
                      </div>
                    </v-row>
                  </v-card>
                </div>
              </div>
            </div>
          </a-tab-pane>

          <a-tab-pane key="4" tab="Digital Marketing">
            <!-- search button -->
            <div style="width:100%; margin-bottom:10px">
              <div align="right" style="padding-right:18px; padding-left:18px">
                <a-input-search v-model="search" type="search" placeholder="input search text" />
              </div>
            </div>
            <!-- end search button -->
            <div class="listmembers">
              <div v-for="member in userFilter" :key="member.id">
                <div v-if="member.department === 'Marketing'" style="width:100%; height:50%">
                  <v-card id="card" :to="{ name: 'profileMember', params: { id: member.id } }">
                    <v-row>
                      <div id="card-media" style="vertical-align: middle;">
                        <div id="circle" align="center">
                          <v-img v-bind:src="member.image" id="imgProfile"> </v-img>
                        </div>
                      </div>
                      <div id="information" align="left">
                        <div>
                          <b id="displayname">{{ member.name }}</b>
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
                        <div v-if="(member.type == 'Intern')" id="department" style="font-size:10px">
                          Internship period :
                          <span>
                            {{ $dayjs(member.startDate).format('DD MMM YYYY') }}
                            - {{ $dayjs(member.dueDate).format('DD MMM YYYY') }}
                          </span>
                        </div>
                      </div>
                    </v-row>
                  </v-card>
                </div>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </md-content>

    <BarRouter />
  </div>
</template>

<script>
// @ is an alias to /src
import Toolbar from '@/components/Toolbar.vue'
import BarRouter from '@/components/BarRouter.vue'
// import store from '../store/index.js'
import * as gqlQuery from '../constants/graphql'
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
      // members: store.state.members,
      search: '',
      displayName: '',
      name: '',
      users: [],
    }
  },
  computed: {
    memberFilter() {
      let text = this.search.trim()
      return this.members.filter(item => {
        return item.displayName.toLowerCase().indexOf(text.toLowerCase()) > -1
      })
    },
    userFilter() {
      let text = this.search.trim()
      return this.users.filter(item => {
        return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1
      })
    },
  },
}
</script>

<style scoped>
div {
  font-family: 'Roboto';
}

#content {
  margin-bottom: 80px;
  margin-top: 50px;
  /* ระยะห่างระหว่าง content กับแถบ menu ข้างล่าง */
}

#bottom-content {
  /* พื้นที่ข้างล่างของ content */
  margin: 0px 18px 0px 18px;
  /* background-color: #e9f0ff; */
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 5px;
}

#back,
#next {
  vertical-align: -10%;
}
button {
  background-color: white;
  border-radius: 3px;
  border: none;
  border: 1px solid #8f8f8f;
}
.listmembers {
  /* margin: 0px 18px 0px 18px; */
  /* background-color: #e9f0ff; */
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 15px;
  padding-bottom: 15px; /* ระยะห่างระหว่าง card */
  height: 100%;
}
.row {
  margin-bottom: 24px;
  margin-left: 0px;
  margin-right: 0px;
}
#card {
  /* padding: 15px 15px 15px 15px; */
  /* border-radius: 5px; */
  /* เงากรอบขาว ระยะเงาด้านขวากับกรอบ ระยะเงาด้านล่างกับกรอบ ความฟุ่งของเงา สีของเงา*/
  /* border-radius: 5px; */
  box-shadow: 1.5px 1.5px 5px #b1b1b1;
  margin-bottom: 0px; /* ระยะห่างระหว่าง card */
  margin-top: 3px;
  margin-left: 15px;
  margin-right: 15px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  text-decoration: none;
}
#card-media {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: #9daace;
  padding: 15px;
  float: left;
}
#information {
  vertical-align: middle;
  float: left;
  margin-left: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
}
#imgProfile {
  /* margin-top: 17px; */
  border-radius: 100%;
  height: 77px;
  width: 77px;
  object-fit: cover;
  border: 3px solid #9daace;
  position: relative;
}
#circle {
  border-radius: 100%;
  border: 3px solid #ffffff;
  width: 84px;
  height: 84px;
}
#displayname {
  color: #0036c7;
  font-size: 18px;
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
span {
  opacity: 0.75;
}
#des {
}
</style>
