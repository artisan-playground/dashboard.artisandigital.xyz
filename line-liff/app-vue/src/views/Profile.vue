<template>
  <div class="project">
    <Toolbar msg="Profile" />
    <br />
    <div style="margin-top:60px">
      <Profile />
      <div id="tabCusProfile">
        <a-tabs default-active-key="1" :tabBarStyle="{}">
          <a-tab-pane key="1" tab="Project">
            <ListProject />
          </a-tab-pane>
          <a-tab-pane key="2" tab="Tasks" force-render>
            <Tasks />
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <BarRouter />
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue'
import BarRouter from '@/components/BarRouter.vue'
import Profile from '@/components/Profile.vue'
import ListProject from '@/components/ListProject.vue'
import Tasks from '@/components/Tasks.vue'

export default {
  name: 'profile',
  data() {
    return {
      items: ['Projects', 'Tasks'],
    }
  },
  components: {
    Toolbar,
    BarRouter,
    Profile,
    ListProject,
    Tasks,
  },
}
</script>

<style scoped></style>
