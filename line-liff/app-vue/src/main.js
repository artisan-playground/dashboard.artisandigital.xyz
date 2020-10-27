import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Button from 'ant-design-vue/lib/button'
import 'ant-design-vue/dist/antd.css'
import store from './store'
import vuetify from './plugins/vuetify'
import dayjs from './plugins/dayjs'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
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
  vuetify,dayjs,
  apolloProvider: createProvider(),
  render: h => h(App),
}).$mount('#app')
