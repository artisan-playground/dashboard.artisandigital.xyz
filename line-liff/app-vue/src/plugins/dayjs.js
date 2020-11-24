import Vue from 'vue'
import dayjs from 'dayjs'

Vue.prototype.$dayjs = dayjs

Vue.use(dayjs)

export default new dayjs({})
