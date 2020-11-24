<template>
  <div style="padding-top:80px; margin:0px 18px 0px 18px">
    <a-row :gutter="16">
      <a-col :span="12">
        <a-card :bordered="false" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);">
          <div><a-icon type="line-chart" style="color: #0036c7; font-size: 22px;" /></div>
          <div class="number" style="font-weight: 950;">{{ numProject }}</div>
          <div class="title">Project</div>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card :bordered="false" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);">
          <div><a-icon type="usergroup-add" style="color: #0036c7; font-size: 22px;" /></div>
          <div class="number" v-if="dataMember" style="font-weight: 950;">
            {{ dataMember.length }}
          </div>
          <div class="title">Participants</div>
        </a-card>
      </a-col>
    </a-row>
    <a-row style="margin-top:16px;">
      <a-col>
        <a-card :bordered="false" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);">
          <div><a-icon type="profile" style="color: #0036c7; font-size: 22px;" /></div>
          <div class="number" style="font-weight: 950;">{{ numTaskToday }}</div>
          <div class="title">Today’s tasks</div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import * as gqlQuery from '../constants/user'
export default {
  name: 'MenuContent',
  data() {
    return {
      numProject: 6,
      // numPaticipants: 16,
      numTaskToday: 13,
      dataMember: null,
      numMember: null,
    }
  },
  apollo: {
    getUser: {
      query: gqlQuery.ALL_MEMBER_QUERY,
      update(data) {
        this.dataMember = data.users
        console.log(data.users.length)
      },
    },
  },
  computed: {},
}
</script>

<style scoped>
.title {
  color: rgb(114, 114, 114);
  font-size: 16px;
}
.container {
  padding: 2px 16px;
}

.number {
  font-size: 18px;
  font-weight: 550;
}
</style>
