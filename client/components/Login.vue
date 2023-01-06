<template>
  <form>
    <v-alert
      outlined
      :value="alert.show"
      dismissible
      elevation="3"
      :type="alert.type"
      >{{ alert.message }}</v-alert
    >
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
          <v-row class="mb-10">
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
              <nuxt-link to="/changepassword">Change your password </nuxt-link>
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
};
</script>
