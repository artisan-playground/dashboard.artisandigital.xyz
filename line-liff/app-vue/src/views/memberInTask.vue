<template>
  <div v-if="dataTask">
    <!-- toolbar -->
    <div style="position: fixed; z-index:10; width:100%">
      <a-page-header class="toolbar" style="padding-top:0px; padding-bottom: 10px;">
        <a-row style="display:flex; align-items: center;">
          <a-col align="left" :span="5">
            <v-btn
              @click="$router.go(-1)"
              style="background-color:#262626; max-width:5%; height: 36px; min-width: 0px; padding-left:0px; box-shadow: none;"
            >
              <a-icon type="left" style="margin-left:20px; color:white;" />
            </v-btn>
          </a-col>

          <a-col :span="14">
            <div class="title">Task Member</div>
          </a-col>

          <a-col align="right" :span="5">
            <div id="pictureUrl">
              <router-link
                v-if="dataTask.members.length > 0"
                :to="{ name: 'editMemberInTask', params: { id: dataTask.id } }"
              >
                <span style="color:white; margin-right:15px;">
                  Edit
                </span>
              </router-link>
              <span v-else style="color:rgb(140, 140, 140);">
                Edit
              </span>
            </div>
          </a-col>
        </a-row>
      </a-page-header>
    </div>
    <!-- end toolbar -->
    <br />
    <div style="margin: 60px 15px 20px 15px;">
      <router-link :to="{ name: 'addMemberToTask', params: { id: dataTask.id } }">
        <a-button
          size="large"
          block
          style="background-color:#134F83; color:white; border:none; border-radius:2px;"
        >
          Add member
        </a-button>
      </router-link>
    </div>

    <div v-if="dataTask.members.length > 0">
      <div v-for="member in dataTask.members" :key="member.id">
        <router-link
          style="text-decoration: none;"
          :to="{ name: 'profileMember', params: { id: member.id } }"
        >
          <div id="flex-container">
            <div class="cardPicture">
              <img
                v-bind:src="member.image ? member.image.fullPath : require('../assets/user.svg')"
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
    </div>
    <div v-else class="noData" style="height:400px;">
      <a-empty />
    </div>
    <div style="padding-bottom:60px"></div>
    <BarRouter />
  </div>
</template>

<script>
import BarRouter from '@/components/BarRouter.vue'
import * as gqlQuery from '../constants/task'
export default {
  name: 'doneTask',
  components: {
    BarRouter,
  },
  data() {
    return {
      dataTask: [],
    }
  },
  apollo: {
    getTask: {
      query: gqlQuery.TASK_QUERY,
      variables() {
        return {
          taskId: parseInt(this.$route.params.id),
        }
      },
      update(data) {
        this.dataTask = data.getTaskById
      },
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
.toolbar {
  background-color: #262626;
}
</style>
