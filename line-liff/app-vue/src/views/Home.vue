<template>
  <f7-app>
    <f7-panel left cover theme-dark>
      <f7-navbar title="Left Panel" />
      <f7-block>Left panel content</f7-block>
    </f7-panel>

    <f7-panel right reveal>
      <f7-navbar title="Right Panel" />
      <f7-block>Right panel content</f7-block>
    </f7-panel>

    <f7-view main>
      <f7-page>
        <f7-navbar title="My App" />
        <f7-block>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend, elit vitae
            scelerisque vulputate, tortor velit tempus dui, et luctus tellus justo nec velit. Duis
            scelerisque in tellus et pretium. Ut faucibus fringilla risus, ut dapibus nunc vehicula
            sit amet. Donec posuere nunc non fermentum commodo.
          </p>
        </f7-block>
        <f7-block>
          <f7-segmented>
            <f7-button panel-open="left">Left Panel</f7-button>
            <f7-button panel-open="right">Right Panel</f7-button>
          </f7-segmented>
        </f7-block>
        <f7-list>
          <f7-list-item v-for="n in 3" :key="n" :title="`Item ${n}`" />
        </f7-list>
      </f7-page>
    </f7-view>
  </f7-app>
</template>
<script>
export default {
  methods: {
    more() {
      const self = this
      self.actions.open()
    },
    mark() {
      const app = this.$f7
      app.dialog.alert('Mark')
    },
    reply() {
      const app = this.$f7
      app.dialog.alert('Reply')
    },
    forward() {
      const app = this.$f7
      app.dialog.alert('Forward')
    },
    onDeleted() {
      const app = this.$f7
      app.dialog.alert('Thanks, item removed!')
    },
    onPageInit() {
      const self = this
      const app = self.$f7
      self.actions = app.actions.create({
        buttons: [
          [
            {
              text: 'Here comes some optional description or warning for actions below',
              label: true,
            },
            {
              text: 'Action 1',
            },
            {
              text: 'Action 2',
            },
          ],
          [
            {
              text: 'Cancel',
              bold: true,
            },
          ],
        ],
      })
    },
  },
}
</script>
