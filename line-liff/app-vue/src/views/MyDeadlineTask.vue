<template>
  <div>
    <ToolbarBack msg="Deadline" />
    <br />
    <div style="margin-top:60px;">
      <DeadlineTask />
    </div>
  </div>
</template>

<script>
import ToolbarBack from '@/components/ToolbarBack.vue'
import DeadlineTask from '@/components/DeadlineTask.vue'
export default {
  name: 'MyDeadlineTask',
  components: {
    ToolbarBack,
    DeadlineTask,
  },
}
</script>

<style></style>
