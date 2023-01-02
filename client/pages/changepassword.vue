<template>
  <form>
    <!-- <Notification :message="error" v-if="error" /> -->
    <v-card class="mx-auto" max-width="500">
      <v-card-text>
        <Editpassword :editedItem="editedItem" @submit-form="editPsw" />
      </v-card-text>
    </v-card>
  </form>
</template>

<script>
//import Notification from "~/components/Notification";
import global from "~/mixins.js/global.js";

export default {
  mixins: [global],
  components: {
    //Notification,
  },

  data: () => ({
    showModalPsw: false,
    alert: { type: "error", show: false, message: "" },
    editedItem: {
      email: "",
      created_at: new Date().toISOString(),
      roles: [],
      defaultSelected: [],
    },
    defaultItem: {
      email: "",
      created_at: new Date().toISOString(),
      roles: [],
      defaultSelected: [],
    },
    loginData: {
      email: "",
      password: "",
    },
  }),

  methods: {
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async login() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.loginData,
        });
        this.$router.push("/home");
        console.log(response);
      } catch (err) {
        console.log(err);
      }
      // await this.$axios.post("http://192.168.1.86:3001/api/auth/signin", {
      //   email: this.editedItem.email,
      //   password: this.editedItem.password,
      // });

      // this.$router.push("/home");
    },
  },
};
</script>
