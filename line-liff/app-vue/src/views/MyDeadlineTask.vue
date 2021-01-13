<template>
  <div>
    <ToolbarBackHome msg="Deadline" />
    <br />
    <div style="margin-top:60px;"></div>
    <DeadlineTask />
    <BarRouter />
  </div>
</template>

<script>
import ToolbarBackHome from '@/components/ToolbarBackHome.vue'
import DeadlineTask from '@/components/DeadlineTask.vue'
import BarRouter from '@/components/BarRouter.vue'
export default {
  name: 'MyDeadlineTask',
  components: {
    ToolbarBackHome,
    DeadlineTask,
    BarRouter,
  },
}
</script>

<style></style>
