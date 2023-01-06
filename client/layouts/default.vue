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
import global from "~/mixins/global.js";

export default {
  data() {
    return {
      title: "Esercizio Meazza",
    };
  },
  mixins: [global],
};
</script>
