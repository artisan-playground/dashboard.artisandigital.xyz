<template>
  <div class="about">
    <Toolbar />
    <br />
    <div style="margin-top:60px;">
      <div align="center">
        <DonutChart :width="350" :height="350" />
      </div>
      <MenuContent />
    </div>
    <BarRouter />
  </div>
</template>

<script>
// @ is an alias to /src
import Toolbar from '@/components/Toolbar.vue'
import BarRouter from '@/components/BarRouter.vue'
import DonutChart from '@/components/DonutChart.vue'
import MenuContent from '@/components/MenuContent.vue'
export default {
  name: 'HomeDashboard',
  components: {
    Toolbar,
    BarRouter,
    DonutChart,
    MenuContent,
  },
  methods: {},
}
</script>
