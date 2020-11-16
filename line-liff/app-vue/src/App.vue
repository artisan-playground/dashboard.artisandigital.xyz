<template>
  <div id="app">
    <!-- <div id="nav"> -->
    <!-- <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
    <router-link to="/login">Login</router-link>-->
    <!-- </div> -->
    <router-view />
  </div>
</template>

<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css" />

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

html,
body {
  font-family: 'Roboto', sans-serif;
}

#app {
  font-family: 'Roboto', serif;
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
