<template>
  <div>
    <div align="left" style="margin-left:18px; margin-bottom:20px; font-size:20px; font-weight:550">
      Event
    </div>

    <div class="news">
      <!-- <router-link> -->
      <div>
        <a-card
          bodyStyle="padding: 15px 15px 15px 0px;"
          class="card"
          v-for="event in events"
          :key="event.id"
          :bordered="false"
        >
          <a-row v-if="new Date(event.endDate).toLocaleString() > new Date().toLocaleString()">
            <a-col :span="3" sty>
              <a-row class="flex-container">
                <div>
                  <div>{{ $dayjs(event.eventDate).format('ddd') }}</div>
                  <div style="font-weight:550">{{ $dayjs(event.eventDate).format('D') }}</div>
                  <div>{{ $dayjs(event.eventDate).format('MMM') }}</div>
                </div>
              </a-row>
            </a-col>
            <a-col :span="1">
              <a-divider type="vertical" style="height:120px" />
            </a-col>
            <a-col :span="20" style="text-align:left; padding-left:10px;">
              <a-row>
                <a-col :span="16">
                  <b style="font-size:16px">{{ event.eventName }}</b>
                </a-col>
                <a-col :span="8"
                  ><a-tag
                    style="float:right; margin-right:0px;"
                    v-if="event.tag == 'Important'"
                    color="orange"
                  >
                    <span
                      id="iconStatus"
                      class="iconify"
                      data-inline="false"
                      data-icon="bi:bookmark"
                      style="font-size: 14px;"
                    ></span>

                    {{ event.tag }}
                  </a-tag></a-col
                >
              </a-row>
              <a-row class="content">{{ event.note }}</a-row>
              <a-row>
                <vs-avatar-group float max="4" style="float:right; margin-top:5px;">
                  <vs-avatar v-for="member in members" :key="member.id" id="profileImg">
                    <img v-bind:src="member.image" />
                  </vs-avatar>
                </vs-avatar-group>
              </a-row>
            </a-col>
          </a-row>
        </a-card>
      </div>

      <!-- </router-link> -->
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
      members: store.state.users,
      events: [],
    }
  },
  apollo: {
    events: {
      query: gqlQuery.ALL_EVENT,
    },
  },
  methods: {
    currentDate() {
      // new Date(this.events.endDate).toLocaleString() > new Date().toLocaleString()
      const result = this.events.map(item => {
        return new Date(item.endDate).toLocaleString() > new Date().toLocaleString()
      })
      console.log(result)
      return result
    },
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
.content {
  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card {
  margin-left: 15px;
  margin-right: 15px;
  transition: 0.3s;
  text-align: left;
  color: black;
  margin-bottom: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.flex-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  align-content: center;
  border: none;
  height: 100%;
  margin-top: 25px;
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
.vl {
  border-left: 0.5px solid rgb(184, 184, 184);
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
