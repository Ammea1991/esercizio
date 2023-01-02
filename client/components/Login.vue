<template>
  <form>
    <!-- <Notification :message="error" v-if="error" /> -->
    <v-card class="ma-auto" max-width="500">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                required
                outlined
                clearable
                v-model="loginData.email"
                label="Email"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                required
                outlined
                clearable
                :append-icon="show_psw ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show_psw ? 'text' : 'password'"
                v-model="loginData.password"
                @click:append="show_psw = !show_psw"
                label="Password"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-col align="center"
              ><v-btn
                large
                width="300"
                color="primary"
                elevation="2"
                @click="login"
              >
                Login
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <nuxt-link to="/subscription">Do not have an account?</nuxt-link>
            </v-col>
            <v-col align="right">
              <nuxt-link to="/changepassword">Recover your password </nuxt-link>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
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
