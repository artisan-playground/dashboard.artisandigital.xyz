<template>
  <div class="forgetpassword">
    <h1>Forget password?</h1>
    <!-- <h1>Artisan</h1>
    <h1 style="margin-top:0px">Digital</h1>-->
    <div class="content">
      <p>Enter your registered email below to receive reset instruction password</p>
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
      <md-button id="button-send" class="md-raised md-primary">Send</md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'forgetpassword',
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
  margin-bottom: 15px;
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
p {
  font-size: 13px;
  color: #8f8f8f;
  margin-bottom: 0px;
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

#button-send {
  width: 100%;
  background-color: #105efb;
  height: 42px;
  border-radius: 8px;
  text-transform: capitalize;
  margin-top: 40px;
  margin-bottom: 15px;
}

.md-field {
  width: 100%;
  min-height: 48px;
  margin: 40px 0 40px;
  /* ระยะห่างระหว่างtextข้างบนกับช่องinput และ ระยะห่างระหว่างช่อง input กับ ปุ่ม */
  padding-top: 16px;
  display: flex;
  position: relative;
  font-family: inherit;
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
</style>
