<template>
  <div>
    <Toolbar msg="News" />
    <br />
    <br />
    <br />
    <br />
    <md-content>
      <Events />
      <br />
      <Calendar />
      <br />
      <Content />
    </md-content>
    <BarRouter />
  </div>
</template>

<script>
// @ is an alias to /src
import Toolbar from '@/components/Toolbar.vue'
import BarRouter from '@/components/BarRouter.vue'
import Events from '@/components/Events.vue'
import Content from '@/components/Content.vue'
import Calendar from '@/components/Calendar.vue'

export default {
  name: 'news',
  components: {
    Toolbar,
    BarRouter,
    Events,
    Content,
    Calendar,
  },
}
</script>

<style scoped></style>
