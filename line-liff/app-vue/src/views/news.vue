<template>
  <div>
    <Toolbar msg="News" />
    <br />
    <Events style="margin-top: 60px;" />
    <br />
    <Content />
    <BarRouter />
  </div>
</template>

<script>
// @ is an alias to /src
import Toolbar from '@/components/Toolbar.vue'
import BarRouter from '@/components/BarRouter.vue'
import Events from '@/components/Events.vue'
import Content from '@/components/Content.vue'

export default {
  name: 'news',
  components: {
    Toolbar,
    BarRouter,
    Events,
    Content,
  },
}
</script>

<style scoped></style>
