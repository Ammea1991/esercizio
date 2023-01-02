<template>
  <div>
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
export default {
  middleware: "auth", // it will use `isAuthenticated` middleware
  computed: {
    getUserInfo() {
      return this.$store.getters.getUserInfo;
    },
  },
  data: () => ({
    users: [],
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
    this.editedItem = Object.assign({}, this.$store.getters.getUserInfo);
  },
  methods: {
    async editUser() {
      await axios
        .post("http://192.168.1.86:3001/api/auth/update", {
          _id: this.editedItem._id,
          user: this.editedItem,
        })
        .then((response) => {
          this.alert = {
            type: "success",
            show: true,
            message: response.data.message,
          };
          this.users.push(this.editedItem);
          this.users.splice(this.editedIndex, 1);
          this.dialogEdit = false;
        })
        .catch((error) => {
          this.alert = {
            type: "error",
            show: true,
            message: error.response.data.message,
          };
          return error;
        });
    },
  },
};
</script>

<style></style>
