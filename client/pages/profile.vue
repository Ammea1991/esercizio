<template>
  <!-- <Loading v-if="$fetchState.pending" /> -->
  <Loading v-if="showHideSpinner" />
  <div v-else>
    <v-alert
      outlined
      :value="alert.show"
      dismissible
      elevation="3"
      :type="alert.type"
      >{{ alert.message }}</v-alert
    >
    <v-card class="pa-4">
      <Edituser
        :editedItem="editedItem"
        @submit-form="editUser"
        @close-modal="dialogEdit = false"
      />
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import global from "~/mixins.js/global.js";

export default {
  middleware: "auth", // it will use `isAuthenticated` middleware
  mixins: [global],
  computed: {
    getUserInfo() {
      return this.$store.getters.getUserInfo;
    },
  },
  data: () => ({
    user: {},
    editedItem: {
      name: "",
      surname: "",
      birth_date: "",
      phone_number: "",
      shipping_address: {},
      codice_fiscale: "",
      email: "",
      created_at: new Date().toISOString(),
      dark_theme: true,
      password: "",
      confirmpassword: "",
    },
  }),
  mounted() {
    this.getCurrentUser();
  },
};
</script>

<style></style>
