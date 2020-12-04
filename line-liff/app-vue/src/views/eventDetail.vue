<template>
  <div v-if="event">
    <ToolbarBack />
    <br />
    <a-divider style="margin-top: 60px" />
    <div style="margin: 0px 20px 0px 20px">
      <a-row>
        <a-row>
          <a-col :span="12" style="text-align:left; font-size:16px; color:#262626;">
            {{ event.eventName }}
          </a-col>
          <a-col :span="12" style="text-align:left; font-size:16px;">
            <a-tag
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
            </a-tag>
          </a-col>
        </a-row>

        <a-row style="margin-top:10px;">
          <a-col :span="12" style="text-align:left; font-size:16px; color:#262626;">
            {{ $dayjs(event.eventDate).format('ddd DD MMM YYYY') }}
          </a-col>
          <a-col :span="12" style="text-align:right; font-size:16px; color:#595959">
            {{ $dayjs(event.eventDate).format('h:mm A' + ' to ') }}
            {{ $dayjs(event.endDate).format('h:mm A') }}
          </a-col>
        </a-row>

        <a-row>
          <a-col
            :span="12"
            style="text-align:left; font-size:16px; margin-top:10px; color:#262626;"
          >
            สัมภาษณ์โดย
          </a-col>
          <a-col :span="12" style="text-align:right; font-size:16px;">
            <vs-avatar-group float style="float:right;">
              <vs-avatar
                v-for="member in event.invited"
                :key="member.id"
                style="border-radius: 100%; margin-left:3px; width:30px; height:30px;"
              >
                <img
                  v-bind:src="member.image ? member.image.fullPath : require('../assets/user.svg')"
                />
              </vs-avatar>
            </vs-avatar-group>
          </a-col>
        </a-row>
      </a-row>
    </div>
    <a-divider />
    <div style="margin: 0px 20px 0px 20px">
      <a-row style="text-align:left; color:#595959;">
        {{ event.note }}
      </a-row>
    </div>
    <a-divider />
    <BarRouter />
  </div>
</template>

<script>
import ToolbarBack from '@/components/ToolbarBack.vue'
import BarRouter from '@/components/BarRouter.vue'
import * as gqlQuery from '../constants/event'
export default {
  name: 'eventDetail',
  components: {
    ToolbarBack,
    BarRouter,
  },
  data() {
    return {
      event: null,
    }
  },
  apollo: {
    getEvent: {
      query: gqlQuery.EVENT_QUERY,
      variables() {
        return {
          eventId: parseInt(this.$route.params.id),
        }
      },
      update(data) {
        this.event = data.getEventById
      },
    },
  },
}
</script>

<style></style>
