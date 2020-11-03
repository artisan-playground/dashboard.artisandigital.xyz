import 'ant-design-vue/dist/antd.css'
import Button from 'ant-design-vue/lib/button'
import Vue from 'vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import App from './App.vue'
import dayjs from './plugins/dayjs'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'

Vue.component(Button.name, Button)
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
