<template>
  <div>
    <ToolbarBack msg="Member in Project" />
    <br />
    <div style="margin-top:60px"></div>
    <div style="margin: 0px 15px 20px 15px;">
      <router-link :to="{ name: 'addMemberToProject', params: { id: dataProject.id } }">
        <a-button
          type="primary"
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
    <BarRouter />
  </div>
</template>

<script>
import ToolbarBack from '@/components/ToolbarBack.vue'
import BarRouter from '@/components/BarRouter.vue'
import * as gqlQuery from '../constants/graphql'
export default {
  name: 'doneTask',
  components: {
    ToolbarBack,
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
div {
  font-style: 'Roboto';
}
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
</style>
