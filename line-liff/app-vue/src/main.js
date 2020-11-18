import 'ant-design-vue/dist/antd.css'
import Button from 'ant-design-vue/lib/button'
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js'
// Import F7 Styles
import 'framework7/css/framework7.css'
import Framework7 from 'framework7/framework7.esm.bundle.js'
import Vue from 'vue'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import App from './App.vue'
import dayjs from './plugins/dayjs'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'
// Import Icons and App Custom Styles

// Import Icons and App Custom Styles

Vue.component(Button.name, Button)
Framework7.use(Framework7Vue)
Vue.prototype.$liff = window.liff
Vue.config.productionTip = false
Vue.use(Vuesax, {
  // options here
})

new Vue({
  router,
  store,
  vuetify,
  dayjs,
  apolloProvider: createProvider(),
  render: h => h(App),
}).$mount('#app')
