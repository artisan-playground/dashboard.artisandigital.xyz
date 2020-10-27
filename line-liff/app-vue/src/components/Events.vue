<template>
  <div>
    <div align="left" style="margin-left:18px; margin-bottom:20px; font-size:20px; font-weight:550">
      Event
    </div>

    <div class="news">
      <v-card id="card" align="left" v-for="event in events" :key="event.id">
        <div>
          <v-row style="margin:auto; padding:auto; margin-left:0px;">
            <!-- Date -->
            <v-col cols="2" id="date" style="margin-bottom:auto; margin-top:auto;">
              <div style="color:#8F8F8F; margin-left:0px; margin-right:0px;">
                <span>{{ $dayjs(event.eventDate).format('ddd') }}</span>
              </div>
              <div style="margin-left:0px; margin-right:0px;">
                <div>
                  <b>{{ $dayjs(event.eventDate).format('D') }}</b>
                </div>
              </div>
              <div style="color:#8F8F8F; margin-left:0px; margin-right:0px;">
                <div>{{ $dayjs(event.eventDate).format('MMM') }}</div>
              </div>
            </v-col>
            <!-- End Date -->

            <!-- vertical line -->
            <v-col cols="1" class="vl"></v-col>

            <!-- Description -->
            <v-col cols="9" style="padding-left:0px; padding-top:0px; padding-bottom:0px;">
              <v-row>
                <!-- Description Event -->
                <v-col cols="7" style="padding-left:0px; padding-bottom:0px;">
                  <div>
                    <b>{{ event.eventName }}</b>
                  </div>
                  <!-- <v-row>
                  {{
                    data.description
                  }}
                </v-row> -->
                </v-col>

                <!-- Important Icon -->
                <v-col cols="5" style="padding-bottom:0px;">
                  <a-tag style="float:right;" v-if="event.tag == 'Important'" color="orange">
                    <span
                      id="iconStatus"
                      class="iconify"
                      data-inline="false"
                      data-icon="bi:bookmark"
                      style="font-size: 14px;"
                    ></span>

                    {{ event.tag }}
                  </a-tag>
                </v-col>
              </v-row>

              <!-- Description Event -->

              <v-row>
                {{ event.note }}
              </v-row>

              <!-- Member -->
              <v-row style="float:right; padding-left:10px;">
                <v-col style="padding-left:0px; padding-top:0px; padding-bottom:0px;">
                  <vs-avatar-group
                    float
                    max="4"
                    style="margin-top:5px; margin-bottom:14px; margin-right: 5px;"
                  >
                    <vs-avatar v-for="member in members" :key="member.id" id="profileImg">
                      <img v-bind:src="member.image" />
                    </vs-avatar>
                  </vs-avatar-group>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import store from '../store/index.js'
import * as gqlQuery from '../constants/graphql'
export default {
  name: 'Events',
  data() {
    return {
      news: store.state.news,
      members: store.state.members,
      events: [],
    }
  },
  apollo: {
    events: {
      query: gqlQuery.ALL_EVENT,
    }
  },
}
</script>

<style scoped>
div {
  font-family: 'Roboto';
}
.news {
  padding-bottom: 5px;
}
#card {
  margin: 3px 15px 24px 15px; /* ระยะห่างรอบๆ card */
  border-radius: 2px;
}
#profileImg {
  border-radius: 100%;
  margin-left: 3px;
  width: 25px;
  height: 25px;
}
#iconStatus {
  font-size: 10px;
  vertical-align: -9%;
}
#date {
  /* vertical-align: middle; */
  text-align:center;
}
.vl {
  border-left: 0.5px solid rgb(184, 184, 184);
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
