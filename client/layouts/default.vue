<template>
  <v-app dark>
    <Header />
    <v-main>
      <v-container>
        <Nuxt keep-alive />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";
import global from "~/mixins.js/global.js";

export default {
  data() {
    return {
      title: "Streaming Meazza 2",
    };
  },
  mixins: [global],
};
</script>
