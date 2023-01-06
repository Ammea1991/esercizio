<template>
  <!-- <Notification :message="error" v-if="error" /> -->
  <Loading v-if="showHideSpinner" />
  <v-card v-else class="mx-auto" max-width="500">
    <v-alert
      outlined
      :value="alert.show"
      dismissible
      elevation="3"
      :type="alert.type"
      >{{ alert.message }}</v-alert
    >
    <v-card-text>
      <Editpassword :editedItem="editedItem" @submit-form="editPsw" />
    </v-card-text>
  </v-card>
</template>

<script>
import global from "~/mixins/global.js";

export default {
  mixins: [global],
  data: () => ({
    alert: { type: "error", show: false, message: "" },
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
    loginData: {
      email: "",
      password: "",
    },
  }),
};
</script>
