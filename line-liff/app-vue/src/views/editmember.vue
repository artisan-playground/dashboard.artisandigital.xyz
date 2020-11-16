<template>
  <div>
    <div style="position: fixed; z-index:10; width:100%">
      <md-toolbar class="toolbar" md-elevation="1" style="  background-color: #262626;">
        <div style="border:none; width:100% ">
          <v-row>
            <v-col align="left" cols="3">
              <v-btn
                @click="$router.go(-1)"
                style="background-color:#262626; max-width:5%; height: 36px; min-width: 0px; padding-left:10px; box-shadow: none;"
              >
                <a-icon type="close" style="margin-left:20px; color:white;" />
              </v-btn>
            </v-col>

            <v-col cols="6">
              <div class="title">Edit members</div>
            </v-col>

            <v-col align="right" cols="3"> </v-col>
          </v-row>
        </div>
      </md-toolbar>
    </div>
    <br />
    <div style="margin:60px 15px 15px 15px;">
      <a-input-search
        style="width:100%; border: 1px solid #D7D7D7; border-radius:2px; height:32px; margin-bottom:15px;"
        v-model="search"
        placeholder=" input search text"
        block
      />
      <div style="float:left;">
        <a-button shape="circle" icon="plus" style="color:#333333" />
        <span style="margin-left:10px;">Invite members</span>
      </div>
    </div>

    <!-- list member -->
    <f7-app>
      <f7-list media-list>
        <f7-list-item
          v-for="member in dataProject.members"
          :key="member.id"
          :media="member.image.fullPath"
          :title="member.name"
          swipeout
        >
          <f7-swipeout-actions right>
            <f7-swipeout-button
              delete
              overswipe
              confirm-text="Are you sure you want to delete this member?"
              style="color:white;"
              >Delete</f7-swipeout-button
            >
          </f7-swipeout-actions>
        </f7-list-item>
      </f7-list>
    </f7-app>
    <BarRouter />
  </div>
</template>

<script>
import * as gqlQuery from '../constants/graphql'
import BarRouter from '@/components/BarRouter.vue'

export default {
  name: 'editmember',
  components: {
    BarRouter,
  },
  data() {
    return {
      dataProject: null,
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
.title {
  color: white;
  margin-top: 17px;
  font-weight: 380;
  font-size: 18px;
}
.item-media {
  /* border-radius: 100%; */
  width: 30px;
  height: 30px;
}
.ios .media-list .item-title,
.ios li.media-item .item-title {
  font-weight: 400;
}
.media-list .item-media img,
li.media-item .item-media img {
  display: block;
  border-radius: 100%;
  /* width: 33px;
  height: 33px; */
  margin-top: 15px;
  /* margin-top: 10px; */
}
</style>
