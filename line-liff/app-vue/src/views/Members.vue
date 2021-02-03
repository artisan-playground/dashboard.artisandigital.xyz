<template>
  <div>
    <Toolbar msg="Employees" />
    <br />
    <div style="margin-top: 60px; padding-bottom:60px">
      <div id="tabCusEmp">
        <a-tabs default-active-key="1" :tabBarStyle="{}">
          <a-tab-pane key="1" tab="HR/Admin">
            <HrAdmin />
          </a-tab-pane>
          <a-tab-pane key="2" tab="Development" force-render>
            <Development />
          </a-tab-pane>
          <a-tab-pane key="3" tab="Design" force-render>
            <Design />
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <BarRouter />
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import BarRouter from '@/components/BarRouter.vue'
import * as gqlQuery from '../constants/user'
import HrAdmin from '@/components/HR_Admin'
import Development from '@/components/Development'
import Design from '@/components/Design'
export default {
  name: 'members',
  components: {
    Toolbar,
    BarRouter,
    HrAdmin,
    Development,
    Design,
  },
  apollo: {
    users: gqlQuery.ALL_MEMBER_QUERY,
  },
  data() {
    return {
      search: '',
      name: '',
      users: [],
      userId: 0,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const get = JSON.parse(localStorage.getItem('vuex'))
      this.userId = get.Auth.user.id
    },
  },
  computed: {
    userFilter() {
      let text = this.search.trim()
      return this.users.filter(item => {
        return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1
      })
    },
  },
}
</script>

<style></style>
