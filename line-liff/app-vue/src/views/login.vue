<template>
  <div class="element">
    <div class="subelement">
      <img class="logo" src="../assets/logo-login.svg" />
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-decorator="[
              'userName',
              { rules: [{ required: true, message: 'Please input your username!' }] },
            ]"
            placeholder="Username"
            addon-after="@artisan.co.th"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            style="color:white; background-color:#0036C7;"
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

<script></script>
<style scoped>
.element {
  /* display: -webkit-flex;
  display: flex;
  flex-direction: column; */
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.subelement {
  margin-left: 15px;
  margin-right: 15px;
}
.sub-element {
  position: fixed;
  bottom: 0;
  width: 100%;
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
