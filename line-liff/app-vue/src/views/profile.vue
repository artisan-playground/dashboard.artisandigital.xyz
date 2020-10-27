<template>
  <div class="project">
    <Toolbar msg="Profile" />
    <br />
    <div style="margin-top:60px">
      <Profile />
      <div>
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="Project">
            <div style="width:100%; margin-bottom:10px">
              <div style="margin-left:18px">
                <div align="left" style="font-size:20px; font-weight:550">Project</div>
              </div>
            </div>
            <ListProject />
          </a-tab-pane>
          <a-tab-pane key="2" tab="Tasks" force-render>
            <div
              align="left"
              style="margin-bottom:10px; margin-left:18px; font-weight:550; font-size:20px;"
            >
              Today's tasks
            </div>
            <Tasks />
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>

    <!-- <div style="margin-top:20px;">
      <div
        align="left"
        style="margin-bottom:10px; margin-left:18px; font-weight:550; font-size:20px;"
      >
        Today's tasks
      </div>
      <div>
        <Tasks />
      </div>
    </div> -->
    <div id="bottom-content">
      <!-- พื้นที่ข้างล่างของ content  -->
    </div>
    <BarRouter />
  </div>
</template>

<script>
// @ is an alias to /src
import Toolbar from '@/components/Toolbar.vue'
import BarRouter from '@/components/BarRouter.vue'
import Profile from '@/components/Profile.vue'
import ListProject from '@/components/ListProject.vue'
import Tasks from '@/components/Tasks.vue'

export default {
  name: 'profile',
  components: {
    Toolbar,
    BarRouter,
    Profile,
    ListProject,
    Tasks,
  },
}
</script>

<style scoped>
div {
  font-family: 'Roboto';
}
#bottom-content {
  /* พื้นที่ข้างล่างของ content */
  margin: 0px 18px 10px 18px;
  background-color: #ffffff;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 5px;
}
</style>
