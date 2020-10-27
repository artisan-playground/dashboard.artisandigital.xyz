<template>
  <div>
    <ToolbarBack />
    <BarRouter />
  </div>
</template>

<script>
import ToolbarBack from '@/components/ToolbarBack.vue'
import BarRouter from '@/components/BarRouter.vue'
export default {
  name: 'projectDetail',
  component: {
    ToolbarBack,
    BarRouter,
  },
}
</script>

<style></style>
