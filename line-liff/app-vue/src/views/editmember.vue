<template>
  <div>
    <div style="position: fixed; z-index:10; width:100%">
      <a-page-header style="background-color: #262626; padding-top:0px; padding-bottom: 10px;">
        <!-- <div style="border:none; width:100% "> -->
        <a-row style="display:flex; align-items: center;">
          <a-col align="left" :span="5">
            <v-btn
              @click="$router.go(-1)"
              style="background-color:#262626; max-width:5%; height: 36px; min-width: 0px; padding-left:0px; box-shadow: none;"
            >
              <a-icon type="close" style="margin-left:20px; color:white;" />
            </v-btn>
          </a-col>

          <a-col :span="14">
            <div class="title">Edit members</div>
          </a-col>

          <a-col align="right" :span="5"> </a-col>
        </a-row>
        <!-- </div> -->
      </a-page-header>
    </div>
    <br />
    <div style="margin:60px 15px 15px 15px;">
      <a-input-search v-model="search" placeholder=" input search text" block />
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
