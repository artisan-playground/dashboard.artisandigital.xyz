<template>
  <div v-if="dataProject">
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
            <div class="title">Member in Project</div>
          </a-col>

          <a-col align="right" :span="5">
            <div id="pictureUrl">
              <router-link :to="{ name: 'editmember', params: { id: dataProject.id } }">
                <span style="color:white; margin-right:15px;">
                  Edit
                </span>
              </router-link>
            </div>
          </a-col>
        </a-row>
      </a-page-header>
    </div>
    <!-- end toolbar -->
    <br />
    <div style="margin: 60px 15px 20px 15px;">
      <router-link :to="{ name: 'addMemberToProject', params: { id: dataProject.id } }">
        <a-button
          size="large"
          block
          style="background-color:#0036C7; color:white; border:none; border-radius:2px;"
        >
          Add member
        </a-button>
      </router-link>
    </div>

    <div v-for="member in dataProject.members" :key="member.id">
      <router-link
        style="text-decoration: none;"
        :to="{ name: 'profileMember', params: { id: member.id } }"
      >
        <div id="flex-container">
          <div class="cardPicture">
            <img
              v-bind:src="
                member.image ? member.image.fullPath : 'https://source.unsplash.com/900x900/?person'
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
    <BarRouter />
  </div>
</template>

<script>
// import ToolbarBack from '@/components/ToolbarBack.vue'
import BarRouter from '@/components/BarRouter.vue'
import * as gqlQuery from '../constants/project'
export default {
  name: 'doneTask',
  components: {
    // ToolbarBack,
    BarRouter,
  },
  data() {
    return {
      dataProject: null,
      dataTask: [],
    }
  },
  apollo: {
    getProject: {
      query: gqlQuery.PROJECT_QUERY,
      variables() {
        return {
          projectId: parseInt(this.$route.params.id),
        }
      },
      update(data) {
        this.dataProject = data.project
        this.dataTask = data.project.tasks
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
