<template>
  <div class="project">
    <!-- <h1>This is an about page</h1> -->
    <Toolbar msg="Project" />

    <md-content>
      <br />
      <div style="margin :60px 0px 0 0px">
        <ListProjectAll />
      </div>
    </md-content>
    <BarRouter />
  </div>
</template>

<script>
// @ is an alias to /src
import Toolbar from '@/components/Toolbar.vue'
import BarRouter from '@/components/BarRouter.vue'
import ListProjectAll from '@/components/ListProjectAll.vue'

export default {
  name: 'about',
  components: {
    Toolbar,
    BarRouter,
    ListProjectAll,
  },
}
</script>
