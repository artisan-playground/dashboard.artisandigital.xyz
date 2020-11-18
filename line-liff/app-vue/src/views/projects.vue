<template>
  <div class="project">
    <!-- <h1>This is an about page</h1> -->
    <Toolbar msg="Project" />
    <br />
    <ListProjectAll style="margin-top: 60px;" />
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
