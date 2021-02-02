<template>
  <div class="project">
    <div v-if="role == 'ADMIN'">
      <Toolbar msg="Projects" />
      <br />
      <ListProjectAll style="margin-top: 60px;" />
    </div>
    <div v-if="role == 'USER'">
      <Toolbar msg="My Projects" />
      <br />
      <ListProject style="margin-top: 60px;" />
    </div>
    <BarRouter />
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue'
import BarRouter from '@/components/BarRouter.vue'
import ListProjectAll from '@/components/ListProjectAll.vue'
import ListProject from '@/components/ListProject.vue'

export default {
  name: 'Projects',
  components: {
    Toolbar,
    BarRouter,
    ListProjectAll,
    ListProject,
  },

  data() {
    return {
      role: null,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const get = JSON.parse(localStorage.getItem('vuex'))
      this.role = get.Auth.user.role
    },
  },
}
</script>
