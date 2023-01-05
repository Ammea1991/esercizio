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
    <v-card class="pa-4" flat>
      <Stepform :editedItem="editedItem" @submit-form="editUser" />
    </v-card>
  </div>
</template>

<script>
import global from "~/mixins.js/global.js";
import { mapActions, mapMutations } from "vuex";

export default {
  middleware: "auth",
  mixins: [global],
  data: () => ({
    user: {},
    editedItem: {
      name: "",
      surname: "",
      birth_date: "",
      phone_number: "",
      shipping_address: {
        country: "",
        region: "",
        province: "",
        locality: "",
        route: "",
        street_number: "",
        postal_code: "",
      },
      codice_fiscale: "",
      email: "",
      created_at: new Date().toISOString(),
      dark_theme: true,
      password: "",
      confirmpassword: "",
    },
  }),
  methods: {
    ...mapActions({
      resetMyStep: "step/resetMyStep",
    }),
    testReset() {
      this.resetMyStep();
    },
  },
  beforeRouteLeave(to, from, next) {
    this.resetMyStep();
    next();
  },
  mounted() {
    this.getCurrentUser();
  },
};
</script>

<style></style>
