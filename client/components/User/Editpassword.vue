<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <v-form
      ref="form"
      lazy-validation
      @submit.prevent="$emit('submit-form')"
      @close.prevent="$emit('close-form')"
    >
      <v-row>
        <v-col>
          <validation-provider
            v-slot="{ errors }"
            name="Email"
            rules="required|email"
          >
            <v-text-field
              v-model="editedItem.email"
              :error-messages="errors"
              outlined
              clearable
              label="Email"
            ></v-text-field>
          </validation-provider>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <validation-provider
            v-slot="{ errors }"
            name="Password"
            :rules="{
              required: true,
              regex:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            }"
          >
            <v-text-field
              v-model="editedItem.password"
              :error-messages="errors"
              outlined
              clearable
              :append-icon="show_psw ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show_psw ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              @click:append="show_psw = !show_psw"
              autocomplete="nope"
            ></v-text-field>
          </validation-provider>
        </v-col>
        <v-col>
          <validation-provider
            v-slot="{ errors }"
            name="Password"
            :rules="{
              required: true,
              regex:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            }"
          >
            <v-text-field
              v-model="editedItem.confirmpassword"
              :error-messages="errors"
              outlined
              clearable
              :append-icon="show_confpsw ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show_confpsw ? 'text' : 'password'"
              name="input-10-1"
              label="Confirm password"
              @click:append="show_confpsw = !show_confpsw"
              autocomplete="nope"
            ></v-text-field>
          </validation-provider>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-row>
          <v-col>
            <nuxt-link to="/login">Go to login</nuxt-link>
          </v-col>
          <v-col class="mr-2" align="right">
            <v-btn
              color="primary"
              elevation="2"
              type="submit"
              :disabled="invalid"
              >Submit
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-form>
  </validation-observer>
</template>

<script>
import global from "~/mixins.js/global.js";

export default {
  name: "Editpassword",
  middleware: "auth",
  mixins: [global],
  props: {
    editedItem: {
      type: Object,
      required: true,
    },
  },
  async fetch() {},
};
</script>
