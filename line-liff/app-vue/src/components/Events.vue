<template>
  <div>
    <div align="left" style="margin-left:18px; margin-bottom:20px; font-size:20px; font-weight:550">
      Event
    </div>

    <div class="news">
      <!-- <router-link> -->
      <div v-for="event in events" :key="event.id">
        <router-link :to="{ name: 'eventDetail', params: { id: event.id } }">
          <a-card :bodyStyle="{ padding: '15px 15px 15px 0px' }" class="card">
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
                        id="iconStatusEvent"
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
                    <vs-avatar v-for="member in event.invited" :key="member.id" id="profileImg">
                      <img v-bind:src="member.image.fullPath" />
                    </vs-avatar>
                  </vs-avatar-group>
                </a-row>
              </a-col>
            </a-row>
          </a-card>
        </router-link>
      </div>

      <!-- </router-link> -->
    </div>
  </div>
</template>

<script>
import * as gqlQuery from '../constants/event'
export default {
  name: 'Events',
  data() {
    return {
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
.news {
  padding-bottom: 5px;
}
#profileImg {
  border-radius: 100%;
  margin-left: 3px;
  width: 25px;
  height: 25px;
}
#iconStatusEvent {
  font-size: 10px;
  vertical-align: -9%;
}
</style>
