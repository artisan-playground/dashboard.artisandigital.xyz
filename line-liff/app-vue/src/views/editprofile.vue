<template>
  <div>
    <ToolbarBack />
    <br />
    <!-- profile picture -->
    <div style="margin :60px 18px 0 18px">
      <v-row align="left">
        <v-col>Edit profile</v-col>
      </v-row>
      <v-row>
        <v-col>Pic</v-col>
      </v-row>
    </div>

    <!-- detail -->
    <div style="margin-left:18px; margin-right:18px;">
      <v-row>
        <v-col align="left">Name : </v-col>
        <v-col><a-input placeholder="Basic usage"/></v-col>
      </v-row>
      <v-row>
        <v-col align="left">Jop position : </v-col>
        <v-col><a-input placeholder="Basic usage"/></v-col>
      </v-row>
      <v-row>
        <v-col align="left">Bio : </v-col>
        <v-col><a-input placeholder="Basic usage"/></v-col>
      </v-row>
      <v-row>
        <v-col align="left">Wedsite : </v-col>
        <v-col><a-input placeholder="Basic usage"/></v-col>
      </v-row>
      <v-row>
        <v-col
          ><v-btn
            style="width:100%; background-color:#105EFB; color:white; text-transform: capitalize;"
            >Save change</v-btn
          ></v-col
        >
      </v-row>
    </div>
  </div>
</template>

<script>
import ToolbarBack from '@/components/ToolbarBack.vue'

export default {
  name: 'editprofile',
  components: {
    ToolbarBack,
  },
}
</script>

<style></style>
