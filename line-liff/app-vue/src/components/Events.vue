<template>
  <div>
    <div align="left" class="eventTitle">
      Events
    </div>

    <div class="news">
      <div v-if="todayEvent.length == 0">
        <a-empty />
      </div>
      <div v-else>
        <div v-for="event in todayEvent" :key="event.id">
          <a-card :bodyStyle="{ padding: '15px 15px 15px 0px' }" class="card">
            <router-link
              :to="{ name: 'EventDetail', params: { id: event.id } }"
              style="color:#333333;"
            >
              <a-row>
                <a-col :span="3">
                  <a-row class="flex-container" style="margin-left: 8px;">
                    <div>
                      <div style="color:#8F8F8F;">{{ $dayjs(event.eventDate).format('ddd') }}</div>
                      <div style="font-weight:550">{{ $dayjs(event.eventDate).format('D') }}</div>
                      <div style="color:#8F8F8F;">{{ $dayjs(event.eventDate).format('MMM') }}</div>
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
                    <a-col :span="8">
                      <a-tag class="status-tag" v-if="event.tag == 'Important'" color="orange">
                        <span
                          id="iconStatusEvent"
                          class="iconify"
                          data-inline="false"
                          data-icon="bi:bookmark"
                          style="font-size: 14px;"
                        >
                        </span>
                        {{ event.tag }}
                      </a-tag>
                    </a-col>
                  </a-row>
                  <a-row class="content">{{ event.note }}</a-row>
                  <a-row>
                    <div
                      v-for="member in event.invited.slice(0, 3)"
                      :key="member.id"
                      style="display:inline; margin: 5px 2px 0; float:right;"
                    >
                      <a-avatar
                        v-bind:src="
                          member.image ? member.image.fullPath : require('../assets/user.svg')
                        "
                      />
                    </div>
                    <div v-if="event.invited.length >= 4" style="display:inline;">
                      <div
                        v-for="member in event.invited.slice(3, 4)"
                        :key="member.id"
                        style="display:inline; margin: 0 2px;"
                      >
                        <a-avatar
                          style="position:absolute; background-color:rgba(0, 0, 0, 0.5); z-index:9; color:white;"
                        >
                          <a-icon slot="icon" type="plus" />
                        </a-avatar>
                        <a-avatar
                          v-bind:src="
                            member.image ? member.image.fullPath : require('../assets/user.svg')
                          "
                        />
                      </div>
                    </div>
                  </a-row>
                </a-col>
              </a-row>
            </router-link>
          </a-card>
        </div>
      </div>
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
      const result = this.events.map(item => {
        return new Date(item.endDate).toLocaleString() > new Date().toLocaleString()
      })
      return result
    },
  },
  computed: {
    todayEvent() {
      const currentDate = new Date()
      return this.events.filter(value => {
        let endDate = new Date(value.endDate)
        if (endDate.toLocaleString() > currentDate.toLocaleString()) {
          return value
        }
      })
    },
  },
}
</script>

<style scoped>
.eventTitle {
  margin-left: 15px;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 550;
}
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
@media only screen and (max-width: 535px) {
  #profileImg {
    margin-top: 2px;
  }
}
@media only screen and (min-width: 536px) {
  #profileImg {
    margin-top: 25px;
  }
}
@media only screen and (min-width: 1010px) {
  #profileImg {
    margin-top: 44px;
  }
}
</style>
