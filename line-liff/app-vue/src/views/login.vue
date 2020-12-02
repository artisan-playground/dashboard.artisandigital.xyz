<template>
  <div class="element">
    <div class="subelement">
      <img style="height:80px;" src="../assets/Artisan Digital_logo.png" />
      <div
        style="color:#134F83; font-weight:560; font-size:18px; margin-top:5px; margin-bottom:20px;"
      >
        Artisan Dashboard
      </div>
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item style="margin-bottom: 10px;">
          <a-input
            v-decorator="[
              'email',
              { rules: [{ required: true, message: 'Please input your E-mail!' }] },
            ]"
            placeholder="E-mail"
            addon-after="@artisan.co.th"
          >
            <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            style="color:white; background-color:#134F83;"
            html-type="submit"
            class="login-form-button"
          >
            Log in
          </a-button>
        </a-form-item>
      </a-form>
      <div class="sub-element">
        <img src="../../src/assets/background-login.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
// import * as gqlUserQuery from '../constants/user'
export default {
  name: 'LoginPage',
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  data() {
    return {
      suffix: '@artisan.co.th',
    }
  },
  // apollo: {
  //   user: {
  //     query: gqlUserQuery.GET_USER_EMAIL,
  //     variable() {
  //       return {
  //       }
  //     },
  //   },
  // },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
  },
}
</script>
<style scoped>
.element {
}
.subelement {
  margin-left: 15px;
  margin-right: 15px;
  padding-top: 180px;
}
.sub-element {
  position: fixed;
  z-index: -2;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
