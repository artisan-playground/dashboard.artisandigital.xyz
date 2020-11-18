<template>
  <div>
    <!-- toolbar -->
    <div style="position: fixed; z-index:10; width:100%">
      <md-toolbar class="toolbar" md-elevation="1" style="background-color: #262626;">
        <div style="border:none; width:100% ">
          <v-row>
            <v-col align="left" cols="3">
              <v-btn
                @click="$router.go(-1)"
                style="background-color:#262626; max-width:5%; height: 36px; min-width: 0px; padding-left:10px; box-shadow: none;"
              >
                <a-icon type="left" style="margin-left:20px; color:white;" />
              </v-btn>
            </v-col>

            <v-col cols="6">
              <div class="title">Member in Project</div>
            </v-col>

            <v-col align="right" cols="3">
              <div class="profile" style="margin-top:10px;">
                <router-link :to="{ name: 'editmember', params: { id: dataProject.id } }">
                  <span style="color:white;">
                    Edit
                  </span>
                </router-link>
              </div>
            </v-col>
          </v-row>
        </div>
      </md-toolbar>
    </div>
    <!-- end toolbar -->
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
    <!-- test UI framework -->
    <!-- <f7-app>
      <f7-block-title>On both sides with overswipes</f7-block-title>
      <f7-list media-list>
        <f7-list-item
          swipeout
          title="Facebook"
          after="17:14"
          subtitle="New messages from John Doe"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
        >
          <f7-swipeout-actions left>
            <f7-swipeout-button overswipe color="green" @click="reply">Reply</f7-swipeout-button>
            <f7-swipeout-button color="blue" @click="forward">Forward</f7-swipeout-button>
          </f7-swipeout-actions>
          <f7-swipeout-actions right>
            <f7-swipeout-button @click="more">More</f7-swipeout-button>
            <f7-swipeout-button color="orange" @click="mark">Mark</f7-swipeout-button>
            <f7-swipeout-button
              delete
              overswipe
              confirm-text="Are you sure you want to delete this item?"
              >Delete</f7-swipeout-button
            >
          </f7-swipeout-actions>
        </f7-list-item>
        <f7-list-item
          swipeout
          title="John Doe (via Twitter)"
          after="17:11"
          subtitle="John Doe (@_johndoe) mentioned you on Twitter!"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
        >
          <f7-swipeout-actions left>
            <f7-swipeout-button overswipe color="green" @click="reply">Reply</f7-swipeout-button>
            <f7-swipeout-button color="blue" @click="forward">Forward</f7-swipeout-button>
          </f7-swipeout-actions>
          <f7-swipeout-actions right>
            <f7-swipeout-button @click="more">More</f7-swipeout-button>
            <f7-swipeout-button color="orange" @click="mark">Mark</f7-swipeout-button>
            <f7-swipeout-button
              delete
              overswipe
              confirm-text="Are you sure you want to delete this item?"
              >Delete</f7-swipeout-button
            >
          </f7-swipeout-actions>
        </f7-list-item>
        <f7-list-item
          swipeout
          title="Facebook"
          after="16:48"
          subtitle="New messages from John Doe"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
        >
          <f7-swipeout-actions left>
            <f7-swipeout-button overswipe color="green" @click="reply">Reply</f7-swipeout-button>
            <f7-swipeout-button color="blue" @click="forward">Forward</f7-swipeout-button>
          </f7-swipeout-actions>
          <f7-swipeout-actions right>
            <f7-swipeout-button @click="more">More</f7-swipeout-button>
            <f7-swipeout-button color="orange" @click="mark">Mark</f7-swipeout-button>
            <f7-swipeout-button
              delete
              overswipe
              confirm-text="Are you sure you want to delete this item?"
              >Delete</f7-swipeout-button
            >
          </f7-swipeout-actions>
        </f7-list-item>
        <f7-list-item
          swipeout
          title="John Doe (via Twitter)"
          after="15:32"
          subtitle="John Doe (@_johndoe) mentioned you on Twitter!"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
        >
          <f7-swipeout-actions left>
            <f7-swipeout-button overswipe color="green" @click="reply">Reply</f7-swipeout-button>
            <f7-swipeout-button color="blue" @click="forward">Forward</f7-swipeout-button>
          </f7-swipeout-actions>
          <f7-swipeout-actions right>
            <f7-swipeout-button @click="more">More</f7-swipeout-button>
            <f7-swipeout-button color="orange" @click="mark">Mark</f7-swipeout-button>
            <f7-swipeout-button
              delete
              overswipe
              confirm-text="Are you sure you want to delete this item?"
              >Delete</f7-swipeout-button
            >
          </f7-swipeout-actions>
        </f7-list-item>
      </f7-list>
    </f7-app> -->
    <BarRouter />
  </div>
</template>

<script>
import BarRouter from '@/components/BarRouter.vue'
import * as gqlQuery from '../constants/graphql'
export default {
  name: 'doneTask',
  components: {
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
.title {
  color: white;
  margin-top: 17px;
  font-weight: 380;
  font-size: 18px;
}
</style>
