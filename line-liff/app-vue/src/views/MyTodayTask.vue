<template>
  <div>
    <ToolbarBackHome msg="Today Tasks" />
    <br />
    <div style="margin-top:60px;"></div>
    <TodayTask />
    <BarRouter />
  </div>
</template>

<script>
import ToolbarBackHome from '@/components/ToolbarBackHome.vue'
import TodayTask from '@/components/TodayTask.vue'
import BarRouter from '@/components/BarRouter.vue'
export default {
  name: 'MyTodayTask',
  components: {
    ToolbarBackHome,
    TodayTask,
    BarRouter,
  },
}
</script>

<style></style>
