<template>
  <div style="padding-top:80px; margin:0px 18px 0px 18px">
    <v-row>
      <v-col>
        <v-card class="card">
          <div><a-icon type="line-chart" style="color: #0036c7; font-size: 22px;" /></div>
          <div class="number">{{ numProject }}</div>
          <div class="title">Project</div>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="card">
          <div><a-icon type="usergroup-add" style="color: #0036c7; font-size: 22px;" /></div>
          <div class="number">{{ numPaticipants }}</div>
          <div class="title">Participants</div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="card">
          <div><a-icon type="profile" style="color: #0036c7; font-size: 22px;" /></div>
          <div class="number">{{ numTaskToday }}</div>
          <div class="title">Today’s tasks</div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'MenuContent',
  data() {
    return {
      numProject: 6,
      numPaticipants: 16,
      numTaskToday: 13,
    }
  },
}
</script>

<style scoped>
div {
  font-family: 'Roboto';
}
.title {
  color: rgb(114, 114, 114);
  font-size: 16px;
}
.card {
  box-shadow: 1px 8px 16px rgba(170, 170, 170, 0.2);
  /* transition: 0.3s; */
  padding-top: 20px;
  padding-bottom: 20px;
  /* margin-right: none; */
  /* width: 150px; */
  border-radius: 5px;
  font-family: 'Roboto';
}

.v-sheet.v-card:not(.v-sheet--outlined) {
  /* box-shadow: 2px 3px 1px -2px rgba(0, 0, 0, 0.2), 2px 2px 2px 0px rgba(0, 0, 0, 0.14),
    2px 1px 5px 0px rgba(0, 0, 0, 0.12); */

  box-shadow: 5px 5px 5px rgba(56, 56, 56, 0.2);
}
/* .card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
} */

.container {
  padding: 2px 16px;
}

.number {
  font-size: 18px;
  font-weight: 550;
}
</style>
