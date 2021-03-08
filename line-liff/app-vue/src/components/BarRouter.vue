<template>
  <div>
    <nav class="nav" id="nav">
      <router-link to="/" class="nav__link">
        <a-icon id="icons" type="home" class="nav__icon" />
        <span class="nav__text">Home</span>
      </router-link>
      <router-link to="/projects" class="nav__link">
        <a-icon id="icons" type="project" class="nav__icon" />
        <span class="nav__text">Projects</span>
      </router-link>
      <router-link to="/news" class="nav__link">
        <a-icon id="icons" type="read" class="nav__icon" />
        <span class="nav__text">News</span>
      </router-link>

      <router-link to="/members" class="nav__link">
        <a-icon id="icons" type="team" class="nav__icon" />
        <span class="nav__text">Employees</span>
      </router-link>

      <router-link to="/profile" class="nav__link">
        <a-icon id="icons" type="user" class="nav__icon" />
        <span class="nav__text">Profile</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'BarRouter',
  data() {
    return {
      e3: 0,
      activeBtn: '',
    }
  },
  methods: {
    activeFunc(val) {
      this.activeBtn = val
      if (this.activeBtn == 'btn1') {
        this.router.push('HomeDashboard')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#nav {
  padding: 0px;
}
#nav a.router-link-exact-active {
  color: #0036c7;
}
#nav a {
  color: #4f4f4f;
}
body {
  margin: 0 0 55px 0;
}
.nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 55px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  display: flex;
  overflow-x: auto;
  z-index: 5;
}
.nav__link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  min-width: 50px;
  white-space: nowrap;
  font-size: 13px;
  color: #444444;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.1s ease-in-out;
}
.nav__icon {
  font-size: 18px;
}
span {
  font-weight: 550;
}
</style>
