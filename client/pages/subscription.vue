<template>
  <!-- <Notification :message="error" v-if="error" /> -->

  <v-card class="pa-2">
    <CreateUser :editedItem="editedItem" @submit-form="subscribeUser" />
  </v-card>
</template>

<script>
//import Notification from "~/components/Notification";
import global from "~/mixins.js/global.js";

export default {
  mixins: [global],
  data() {
    return {
      editedItem: {
        name: "",
        surname: "",
        birth_date: "",
        phone_number: "",
        address: {},
        shipping_address: {},
        codice_fiscale: "",
        email: "",
        created_at: new Date().toISOString(),
        dark_theme: true,
        password: "",
        confirmpassword: "",
      },
    };
  },
};
</script>
