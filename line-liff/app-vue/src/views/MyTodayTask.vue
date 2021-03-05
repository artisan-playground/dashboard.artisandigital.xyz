<template>
  <div>
    <ToolbarBack msg="My today's Tasks" />
    <br />
    <div style="margin-top:60px;">
      <TodayTask />
    </div>
  </div>
</template>

<script>
import ToolbarBack from '@/components/ToolbarBack.vue'
import TodayTask from '@/components/TodayTask.vue'
export default {
  name: 'MyTodayTask',
  components: {
    ToolbarBack,
    TodayTask,
  },
}
</script>

<style></style>
