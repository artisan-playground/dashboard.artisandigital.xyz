<template>
  <div class="subelement">
    <a-spin :spinning="spinning">
      <img style="height:80px;" src="../assets/Artisan Digital_logo.png" />
      <div
        style="color:#134F83; font-weight:560; font-size:18px; margin-top:5px; margin-bottom:20px;"
      >
        Artisan Dashboard
      </div>
      <div class="login_form">
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit.prevent="getUserByEmail(form.email)"
        >
          <a-form-model-item prop="email" style="margin-bottom: 10px;">
            <a-input
              v-model="form.email"
              autocomplete="off"
              placeholder="E-mail"
              addon-after="@artisan.co.th"
            >
              <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-button
              size="large"
              style="color:white; background-color:#134F83;"
              html-type="submit"
              class="login-form-button"
            >
              Sign in
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>

      <div class="sub-element">
        <img src="../../src/assets/background-login.svg" alt="" />
      </div>
    </a-spin>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'LoginPage',
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  data() {
    return {
      spinning: false,
      form: {
        email: '',
      },
      rules: {
        email: [{ required: true, message: 'Please enter your E-mail', trigger: 'change' }],
      },
      suffix: '@artisan.co.th',
    }
  },
  methods: {
    ...mapActions({
      login: 'Auth/login',
    }),

    async getUserByEmail(email) {
      if (email !== '') {
        try {
          email = `${email}@artisan.co.th`
          this.spinning = !this.spinning
          await this.login({ email })
        } catch (error) {
          this.spinning = false
          this.$message.error('Invalid E-mail')
        }
      }
    },
  },
}
</script>
<style scoped>
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
