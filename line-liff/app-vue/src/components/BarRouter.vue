<template>
  <v-bottom-navigation fixed grow color="#0036c7">
    <v-btn to="/" id="bottom-navigation">
      <span>Home</span>
      <a-icon id="icons" type="home" />
    </v-btn>

    <v-btn to="/projects" id="bottom-navigation">
      <span>Projects</span>
      <a-icon id="icons" type="project" />
    </v-btn>

    <v-btn to="/news" id="bottom-navigation">
      <span>News</span>
      <a-icon id="icons" type="read" />
    </v-btn>

    <v-btn to="/members" id="bottom-navigation">
      <span>Members</span>
      <a-icon id="icons" type="team" />
    </v-btn>

    <v-btn to="/profile" id="bottom-navigation">
      <span>Profile</span>
      <a-icon id="icons" type="user" />
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'BarRouter',
  data() {
    return {
      e3: 0,
    }
  },
  methods: {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
div {
  // font-family: 'Roboto';
  text-decoration: none;
}
span {
  font-size: 10px;
  font-weight: 500;
  margin-bottom: 15px;
}
#icons {
  margin-top: 15px;
}
#bottom-navigation {
  text-decoration: none;
  background-color: white;
  height: auto;
}

#bottom-navigation:hover {
  text-decoration: none;
  background-color: white;
}
</style>
