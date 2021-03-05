<template>
  <div>
    <ToolbarBack msg="Over due" />
    <br />
    <div style="margin-top:60px;">
      <OverdueTask />
    </div>
  </div>
</template>

<script>
import ToolbarBack from '@/components/ToolbarBack.vue'
import OverdueTask from '@/components/OverdueTask.vue'
export default {
  name: 'MyOverdueTask',
  components: {
    ToolbarBack,
    OverdueTask,
  },
}
</script>

<style></style>
