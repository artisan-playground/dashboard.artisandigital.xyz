<template>
  <div>
    <ToolbarBackHome msg="Over due" />
    <br />
    <div style="margin-top:60px;"></div>
    <OverdueTask />
    <BarRouter />
  </div>
</template>

<script>
import ToolbarBackHome from '@/components/ToolbarBackHome.vue'
import OverdueTask from '@/components/OverdueTask.vue'
import BarRouter from '@/components/BarRouter.vue'
export default {
  name: 'MyOverdueTask',
  components: {
    ToolbarBackHome,
    OverdueTask,
    BarRouter,
  },
}
</script>

<style></style>
