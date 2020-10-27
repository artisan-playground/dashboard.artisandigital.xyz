<template>
  <div class="login">
    <img alt="Vue logo" src="../assets/logo.svg" width="110" height="110" class="logo" />
    <!-- <h1>Artisan</h1>
    <h1 style="margin-top:0px">Digital</h1>-->
    <div class="content">
      <md-field>
        <md-icon>
          <span class="iconify" data-inline="false" data-icon="clarity:user-line"></span>
        </md-icon>
        <label>Email</label>
        <md-input v-model="email"></md-input>
      </md-field>

      <md-field id="password">
        <md-icon>
          <span class="iconify" data-inline="false" data-icon="clarity:lock-line"></span> </md-icon
        >&nbsp; &nbsp;
        <label>Password</label>
        <md-input type="password" v-model="password"></md-input>
      </md-field>
      <a href="/forgetpassword" id="forgetpass" style="float:right">Forget password?</a>

      <md-button id="button-login" class="md-raised md-primary">login</md-button>
      <a href="/register">
        <span style="color:black; ">Don't have account?</span>
        Register?
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  props: {
    msg: String,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-family: Avenir;
  text-transform: uppercase;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 100.6%;
  /* or 25px */

  text-align: center;
  letter-spacing: 0.07em;
  margin: 10px auto 3px auto;
  /* top right bottom left */
  /* margin: 10px 10px 15px 20px; */
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.content a {
  /* color: #42b983; */
  color: #0036c7;
  font-size: 12px;
  font-weight: 950;
}

.logo {
  margin-bottom: 40px; /* 50px คือระยะห่าง logo กับ email */
}

.content {
  /* top right bottom left */
  /* margin: 10px 10px 15px 20px; */
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 2px;
  align-content: center;
}

#password {
  width: 100%;
  min-height: 48px;
  margin: 4px 0 15px;
  padding-top: 16px;
  display: flex;
  position: relative;
  font-family: inherit;
}

#button-login {
  width: 100%;
  background-color: #105efb;
  height: 42px;
  border-radius: 8px;
  text-transform: capitalize;
  margin-bottom: 15px; /* ระยะห่างระหว่าง login กับ Don't have account? Register? */
}

/* เส้นใต้ icons input */
.md-field > .md-icon:after {
  width: 37px;
  height: 4px;
  position: absolute;
  left: -1px;
  bottom: -5px;
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  content: none;
}

.md-field {
  width: 100%;
  min-height: 48px;
  margin: 4px 0 15px;
  /* ระยะห่างของ input แต่ละอัน */
  padding-top: 16px;
  display: flex;
  position: relative;
  font-family: inherit;
}

#forgetpass {
  margin-bottom: 40px;
  /* ระยะห่างระหว่าง forgetpassword กับ ปุ่ม login */
}
</style>
