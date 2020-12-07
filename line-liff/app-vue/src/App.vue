<template>
  <div id="app">
    <!-- <vue-confirm-dialog></vue-confirm-dialog> -->
    <router-view />
  </div>
</template>

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
.modal-delete .vc-btn {
  color: rgb(255, 32, 32);
}
#modal .vc-btn.left {
  color: #4083ff;
  font-weight: 650;
}
#modal .vc-btn {
  font-weight: 400;
}

.tabs-member .v-slide-group {
  display: grid;
}

.create-form .ant-form-explain {
  float: left;
}
.login_form .ant-form-explain {
  float: left;
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
  padding: 15px 10px 15px 10px;
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
  -moz-border-radius: 100px;
  -webkit-border-radius: 100px;
  border-radius: 100px;
}
#pictureUrl {
  width: 24px;
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
</style>
