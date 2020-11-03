<template>
  <div>
    <ToolbarBack msg="Create Project" />
    <br />
    <div style="margin: 60px 18px 0px 18px">
      <a-form layout="vertical" hide-required-mark>
        <a-row>
          <a-form-item label="Project name">
            <a-input
              v-model="projectName"
              v-decorator="[
                'name',
                {
                  rules: [{ required: true, message: 'Please enter Project name' }],
                },
              ]"
              placeholder="Project name"
            />
          </a-form-item>
        </a-row>
      </a-form>
    </div>
  </div>
</template>

<script>
import ToolbarBack from '@/components/ToolbarBack'
export default {
  name: 'createProject',
  components: {
    ToolbarBack,
  },

  data() {
    return {}
  },
}
</script>

<style>
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #105efb !important;
}
.v-slide-group {
  display: grid;
}
</style>
