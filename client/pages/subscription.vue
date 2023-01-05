<template>
  <!-- <Notification :message="error" v-if="error" /> -->
  <div>
    <Stepform :editedItem="editedItem" @submit-form="subscribeUser" />
  </div>
</template>

<script>
//import Notification from "~/components/Notification";
import global from "~/mixins.js/global.js";
import { mapActions, mapMutations } from "vuex";

export default {
  mixins: [global],
  data() {
    return {
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
    };
  },
  methods: {
    ...mapActions({
      resetMyStep: "step/resetMyStep",
    }),
    testReset() {
      this.resetMyStep();
    },
  },
  beforeRouteLeave(to, from, next) {
    this.editedItem = Object.assign({}, this.defaultItem);
    this.resetMyStep();
    next();
  },
};
</script>
