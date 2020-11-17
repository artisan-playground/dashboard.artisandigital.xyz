<template>
  <div class="register">
    <h1>Register</h1>

    <div class="content">
      <md-field>
        <md-icon>
          <span
            class="iconify"
            data-inline="false"
            data-icon="clarity:user-line"
            style="font-size: 18px;"
          ></span>
        </md-icon>
        <label>Username</label>
        <md-input v-model="username"></md-input>
      </md-field>

      <md-field>
        <md-icon>
          <span
            class="iconify"
            data-inline="false"
            data-icon="carbon:email"
            style="font-size: 18px;"
          ></span>
        </md-icon>
        <label>Email</label>
        <md-input v-model="email"></md-input>
      </md-field>

      <md-field id="password">
        <md-icon>
          <span
            class="iconify"
            data-inline="false"
            data-icon="clarity:lock-line"
            style="font-size: 18px;"
          ></span> </md-icon
        >&nbsp; &nbsp;
        <label>Password</label>
        <md-input type="password" v-model="password"></md-input>
      </md-field>

      <md-field id="password">
        <md-icon>
          <span
            class="iconify"
            data-inline="false"
            data-icon="clarity:lock-line"
            style="font-size: 18px;"
          ></span> </md-icon
        >&nbsp; &nbsp;
        <label>Confirm password</label>
        <md-input type="password" v-model="confirmPass"></md-input>
      </md-field>

      <md-button id="button-register" class="md-raised md-primary">register</md-button>
      <a href>
        <span style="color:black; ">Already have account?</span>
        Login?
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  props: {
    msg: String,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 100.6%;
  /* or 25px */

  text-align: center;
  letter-spacing: 0.07em;
  /* margin-top: 10px; */
  margin-bottom: 40px;
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

.content {
  /* top right bottom left */
  /* margin: 10px 10px 15px 20px; */
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 2px;
  align-content: center;
}

#button-register {
  width: 100%;
  background-color: #105efb;
  height: 42px;
  border-radius: 8px;
  text-transform: capitalize;
  margin-top: 40px;
  margin-bottom: 15px;
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
</style>
