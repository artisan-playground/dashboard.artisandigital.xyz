<template>
  <div id="app">
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    const get = JSON.parse(localStorage.getItem('vuex'))
    if (get) {
      if (get.Auth.authStatus) {
        this.task = get.Auth.user.tasks
        this.allTask = get.Auth.user.tasks.length
      } else {
        this.$router.push('/login')
      }
    } else {
      this.$router.push('/login')
    }
  },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

@font-face {
  font-family: Anuphan;
  src: url('./fonts/Anuphan-Regular.woff') format('woff');
  font-weight: 400;
}

html,
body {
  font-family: 'Anuphan', sans-serif;
}

.detail-event-content {
  text-align: left;
  color: #595959;
}
.taskFont {
  font-size: 16px;
}

.uploadProfile .ant-btn {
  box-shadow: none;
}

.TaskChart .cdc-legend-item-color {
  border-radius: 100%;
}

.noData {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
.label-inline .ant-form-item-label {
  width: fit-content;
  margin-right: 5px;
  margin-top: 10px;
}
.modal-delete .vc-btn {
  color: rgb(255, 32, 32);
}
#modal .vc-btn.left {
  color: #4f4f4f;
}
#modal .vc-title {
  font-size: 14px;
  color: #4f4f4f;
  font-weight: normal;
}
#modal .vc-btn {
  font-weight: normal;
  font-size: 18px;
}
.create-form .ant-form-explain {
  float: left;
}
.login_form .ant-form-explain {
  float: left;
}
.label-form .ant-col.ant-form-item-label {
  float: left;
}

.ant-btn:hover,
.ant-btn:focus {
  border-color: white;
}

#imgMember {
  border-radius: 100%;
  height: 30px;
  width: 30px;
  object-fit: cover;
  position: relative;
}
.md-title {
  font-size: 16px;
  margin-bottom: -1px; /* ระยะห่างระหว่างชื่อโปรเจคกับตำแหน่งงาน */
  line-height: 20px; /* ระยะห่างระหว่างบรรทัดของชื่อโปรเจค เวลาขึ้นบรรทัดใหม่ */
}
#card {
  border-radius: 2px;
  margin: 0px 0px 0px 0px;
}
.card {
  margin-left: 15px;
  margin-right: 15px;
  transition: 0.3s;
  text-align: left;
  color: black;
  margin-bottom: 15px;
}
.content {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.flex-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  align-content: center;
  border: none;
  height: 100%;
  margin-top: 25px;
}
#flex-container {
  display: flex;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;

  margin: 0px 15px 20px 15px;
  transition: 0.3s;
  text-align: left;
  color: black;
  border: 1px solid #f0f0f0;
  align-items: flex-start;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}
#flex-container > *:first-child {
  align-self: stretch;
}
.cardPicture {
  background-color: #9daace;
  box-shadow: 0 0 1px 1px #9daace;
  padding: 10px 10px 15px 10px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.cardInformation {
  margin-top: 17px;
  margin-bottom: 30px;
  padding: 2px 16px;
}
#displayname {
  color: #0036c7;
  font-size: 18px;
  font-weight: 550;
}
#imgProfile {
  margin-top: 10px;
  border-radius: 100%;
  height: 77px;
  width: 77px;
  object-fit: cover;
  border: 4px solid #9daace;
  position: relative;
  box-shadow: 0 0 1px 3px rgb(255, 255, 255);
}
#memberposition {
  color: #000000;
  opacity: 0.85;
  font-weight: 500;
}
#department {
  color: #000000;
  opacity: 0.85;
  font-size: 12px;
}
#position {
  color: #8f8f8f;
  font-size: 12px;
  margin-top: 0px;
  padding-bottom: 0px;
}
#status {
  font-size: 10.5px;
  padding-right: 0px;
}
#displayName {
  font-size: 12px;
  color: white;
  margin-top: 1em;
  margin-bottom: 0.5em;
}
#profilePic {
  width: 80px;
  height: 80px;
  object-fit: cover;
  -moz-border-radius: 100px;
  -webkit-border-radius: 100px;
  border-radius: 100px;
}
.editProfilePic {
  object-fit: cover;
  border-radius: 100%;
  width: 160px;
  height: 160px;
}
#pictureUrl {
  width: 30px;
  height: 30px;
  object-fit: cover;
  -moz-border-radius: 100px;
  -webkit-border-radius: 100px;
  border-radius: 100px;
}
.picUser {
  border-radius: 100%;
  margin-left: 3px;
  width: 30px;
  height: 30px;
}
.title {
  color: white;
  font-weight: 380;
  font-size: 18px;
}
#iconStatus {
  font-size: 10px;
  vertical-align: -4.57%;
}
#app {
  font-family: 'Anuphan', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}

.ant-input {
  border-radius: 2px;
}
.ant-btn {
  border-radius: 2px;
}
.selectInput .ant-select-selection {
  border-radius: 2px;
}

.btn {
  border: 1px solid gray;
  color: gray;
  background-color: white;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
}

.upload-btn-wrapper input[type='file'] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

.img-task {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 6px solid white;
}

.taskFileName {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.flexBox-file {
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.flexbox-delFileTask {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.taskFile {
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 102px;
  height: 100px;
  object-fit: cover;
  border: 6px solid white;
  opacity: 0;
  transition: 0.3s ease;
  background-color: rgb(0, 0, 0);
}
.taskFile:hover .overlay {
  opacity: 0.5;
}

div .ant-select-selection {
  border-radius: 2px;
}

/* Customize ant input */
#antInput .ant-input:hover {
  border-color: #d9d9d9;
  border-right-width: 1px !important;
}
#antInput .ant-input:focus {
  border-color: #d9d9d9;
  border-right-width: 1px !important;
  outline: 0;
  box-shadow: none;
}

/* select type */
#antInput .ant-select-selection:hover {
  border-color: #d9d9d9;
  border-right-width: 1px !important;
}
#antInput .ant-select-focused .ant-select-selection,
.ant-select-selection:focus,
.ant-select-selection:active {
  border-color: #d9d9d9;
  border-right-width: 1px !important;
  outline: 0;
  box-shadow: none;
}

/* Customize ant switch */
.switchCustomize .ant-switch-checked {
  background-color: #0036c7;
}

/* select status */
div .ant-select-selection:hover {
  border-color: #d9d9d9;
  border-right-width: 1px !important;
}
div .ant-select-focused .ant-select-selection,
.ant-select-selection:focus,
.ant-select-selection:active {
  border-color: #d9d9d9;
  border-right-width: 1px !important;
  outline: 0;
  box-shadow: none;
}
div .ant-select-open .ant-select-selection {
  border-color: #d9d9d9;
  border-right-width: 1px !important;
  outline: 0;
  box-shadow: none;
}

/* tab ant design */
#tabCusProfile .ant-tabs-ink-bar {
  width: 0;
  height: 2px;
  background-color: #134f83;
  transform-origin: 0 0;
}
#tabCusProfile .ant-tabs-nav .ant-tabs-tab-active {
  color: #0036c7;
  font-weight: 500;
}
#tabCusProfile .ant-tabs-nav .ant-tabs-tab {
  margin: 0;
}
@media only screen and (min-width: 375px) {
  #tabCusProfile .ant-tabs-nav .ant-tabs-tab {
    padding: 12px 74px;
  }
}
@media only screen and (min-width: 768px) {
  #tabCusProfile .ant-tabs-nav .ant-tabs-tab {
    padding: 12px 170px;
  }
}
#tabCusEmp .ant-tabs-ink-bar {
  position: absolute;
  bottom: 1px;
  left: 0;
  z-index: 1;
  box-sizing: border-box;
  width: 0;
  height: 2px;
  background-color: #134f83;
  transform-origin: 0 0;
}
#tabCusEmp .ant-tabs-nav .ant-tabs-tab-active {
  color: #0036c7;
  font-weight: 500;
}
#tabCusEmp .ant-tabs-nav .ant-tabs-tab {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  height: 100%;
  margin: 0;
  padding: 12px 16px;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
@media only screen and (max-width: 380px) {
  #tabCusEmp .ant-tabs-nav .ant-tabs-tab {
    padding: 12px 10px;
  }
}
@media only screen and (min-width: 768px) {
  #tabCusEmp .ant-tabs-nav .ant-tabs-tab {
    padding: 12px 60px;
  }
}
#tabCusEmp .ant-tabs-nav-container-scrolling {
  padding-right: 0;
  padding-left: 0;
}
#tabCusEmp .ant-tabs-tab-prev.ant-tabs-tab-arrow-show,
.ant-tabs-tab-next.ant-tabs-tab-arrow-show {
  opacity: 0;
}

/* Content and Content Detail page */
.contentImg {
  width: 100%;
  height: 220px;
  object-fit: cover;
}
@media only screen and (min-width: 768px) {
  .contentImg {
    width: 100%;
    height: 350px;
    object-fit: cover;
  }
}
@media only screen and (min-width: 1024px) {
  .contentImg {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
}
</style>
