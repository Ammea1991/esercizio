<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <v-form ref="form" lazy-validation @submit.prevent="$emit('submit-form')">
      <div class="pa-4">
        <div class="register-stepper">
          <div
            class="step"
            @click.prevent="changeStep(1)"
            :class="{
              'step-active': local_step === 1,
              'step-done': local_step > 1,
            }"
          >
            <span class="step-number"></span>
          </div>
          <div
            class="step"
            @click.prevent="changeStep(2)"
            :class="{
              'step-active': local_step === 2,
              'step-done': local_step > 2,
            }"
          >
            <span class="step-number"></span>
          </div>
          <div
            class="step"
            @click.prevent="changeStep(3)"
            :class="{
              'step-active': local_step === 3,
              'step-done': local_step > 3,
            }"
          >
            <span class="step-number"></span>
          </div>
        </div>
        <Transition name="fade">
          <v-card
            class="pa-2"
            v-bind:class="{ 'fade-in': local_step === 1 }"
            v-if="local_step === 1"
            v-show="local_step === 1"
          >
            <v-card-title class="font-italic flex-column">
              Personal data
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="4">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Name"
                    rules="required|max:50"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      :counter="50"
                      :error-messages="errors"
                      clearable
                      outlined
                      label="Name"
                      prepend-inner-icon="mdi-card-account-details-outline"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" sm="4">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Surname"
                    rules="required|max:50"
                  >
                    <v-text-field
                      v-model="editedItem.surname"
                      :counter="50"
                      :error-messages="errors"
                      clearable
                      outlined
                      label="Surname"
                      prepend-inner-icon="mdi-card-account-details-outline"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" sm="4">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Codice fiscale"
                    :rules="{
                      required: true,
                      regex:
                        /^[A-Za-z]{6}[0-9LMNPQRSTUV]{2}[A-Za-z]{1}[0-9LMNPQRSTUV]{2}[A-Za-z]{1}[0-9LMNPQRSTUV]{3}[A-Za-z]{1}$/,
                    }"
                  >
                    <v-text-field
                      v-model="editedItem.codice_fiscale"
                      :error-messages="errors"
                      @input="
                        (val) => {
                          if (val) {
                            editedItem.codice_fiscale =
                              editedItem.codice_fiscale.toUpperCase();
                          }
                        }
                      "
                      outlined
                      clearable
                      label="Codice fiscale"
                      prepend-inner-icon="mdi-card-account-details-outline"
                      autocomplete="nope"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <validation-provider
                    v-slot="{ errors }"
                    name="phone_number"
                    :rules="{
                      required: true,
                      digits: 10,
                      regex:
                        /^(0{1}[1-9]{1,3})[\s|\.|\-]?(\d{4,})|(\((00|\+)39\)|(00|\+)39)?(38[890]|34[7-90]|36[680]|33[3-90]|32[89])\d{7}$/,
                    }"
                  >
                    <v-text-field
                      outlined
                      v-model="editedItem.phone_number"
                      :counter="10"
                      :error-messages="errors"
                      prepend-inner-icon="mdi-cellphone"
                      label="Phone Number"
                      required
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <validation-provider
                        v-slot="{ errors }"
                        name="Birth Date"
                        :rules="{
                          required: true,
                        }"
                      >
                        <v-text-field
                          readonly
                          outlined
                          v-model="editedItem.birth_date"
                          :error-messages="errors"
                          clearable
                          label="Birth date"
                          prepend-inner-icon="mdi-calendar"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </validation-provider>
                    </template>
                    <v-date-picker
                      v-model="editedItem.birth_date"
                      @input="menu2 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="centered-button">
              <v-btn
                v-if="
                  $route.path != '/subscription' && $route.path != '/profile'
                "
                color="primary"
                elevation="2"
                @click="$emit('close-modal')"
                >Close</v-btn
              >
              <v-btn
                @click.prevent="next()"
                class="arrow-next"
                color="primary"
                elevation="2"
              >
                Next
              </v-btn>
            </v-card-actions>
          </v-card>
        </Transition>
        <Transition name="fade">
          <v-card
            class="pa-2"
            v-bind:class="{ 'fade-in': local_step === 2 }"
            v-if="local_step === 2"
            v-show="local_step === 2"
          >
            <AutocompleteGoogle :editedItem="editedItem" />
            <!-- <v-card-title class="font-italic flex-column">
              Shipping address
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="12">
                  <input type="text" ref="inputGoogle" />
                  <input
                    ref="autocomplete"
                    placeholder="Search for location"
                    class="search-location"
                    onfocus="value = ''"
                    type="text"
                    prepend-inner-icon="mdi-map-marker"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="4">
                  <v-text-field
                    outlined
                    v-model="editedItem.shipping_address.country"
                    label="Country"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    outlined
                    v-model="editedItem.shipping_address.region"
                    label="Region"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    outlined
                    v-model="editedItem.shipping_address.province"
                    label="Province"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="3">
                  <v-text-field
                    outlined
                    v-model="editedItem.shipping_address.locality"
                    label="locality"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    outlined
                    v-model="editedItem.shipping_address.route"
                    label="route"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    outlined
                    v-model="editedItem.shipping_address.street_number"
                    label="street_number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    outlined
                    v-model="editedItem.shipping_address.postal_code"
                    label="postal_code"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text> -->

            <v-card-actions class="centered-button">
              <v-btn
                v-if="
                  $route.path != '/subscription' && $route.path != '/profile'
                "
                large
                color="primary"
                elevation="2"
                @click="$emit('close-modal')"
                >Close</v-btn
              >
              <v-btn
                @click.prevent="prev()"
                large
                class="arrow-prev"
                color="primary"
                elevation="2"
                >Previous</v-btn
              >
              <v-btn
                @click.prevent="next()"
                large
                class="arrow-next"
                color="primary"
                elevation="2"
              >
                Next
              </v-btn>
            </v-card-actions>
          </v-card>
        </Transition>
        <Transition name="fade">
          <v-card
            class="pa-2"
            v-bind:class="{ 'fade-in': local_step === 3 }"
            v-if="local_step === 3"
            v-show="local_step === 3"
          >
            <v-card-title class="font-italic flex-column">
              Login data
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="12"
                  ><validation-provider
                    v-slot="{ errors }"
                    name="Email"
                    rules="required|email"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      :error-messages="errors"
                      outlined
                      clearable
                      prepend-icon="mdi-email"
                      label="Email"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row v-if="$route.path == '/subscription'">
                <v-col cols="12" sm="6">
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
                    >
                      <template v-slot:prepend>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-icon v-on="on"> mdi-help-circle-outline </v-icon>
                          </template>
                          The password must be up to 8 characters, including
                          lowercase uppercase, numbers and special characters
                        </v-tooltip>
                      </template>
                    </v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" sm="6">
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
                      :rules="confirmPasswordRules"
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
            </v-card-text>
            <v-card-actions class="centered-button">
              <v-btn
                v-if="
                  $route.path != '/subscription' && $route.path != '/profile'
                "
                large
                color="primary"
                elevation="2"
                @click="$emit('close-modal')"
              >
                Close
              </v-btn>
              <v-btn
                large
                @click.prevent="prev()"
                class="arrow-prev"
                color="primary"
                elevation="2"
              >
                Previous
              </v-btn>
              <v-btn
                large
                color="primary"
                elevation="2"
                type="submit"
                :disabled="invalid"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </Transition>
      </div>
    </v-form>
  </validation-observer>
</template>

<script>
import global from "~/mixins.js/global.js";
import { mapState, mapMutations } from "vuex";
import { maps } from "googlemaps";

export default {
  name: "Stepform",
  mixins: [global],
  data() {
    return {
      confirmPasswordRules: [
        (value) =>
          value === this.editedItem.password || "Passwords does not match.",
      ],
    };
  },
  props: {
    editedItem: {
      type: Object,
    },
  },
  mounted() {
    const input = this.$refs.inputGoogle;
    const autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener("place_changed", () => {
      // Esegui il test del servizio di autocomplete di Google Maps qui
    });

    this.autocomplete = new google.maps.places.Autocomplete(
      this.$refs.autocomplete,
      { types: ["geocode"] }
    );
    this.autocomplete.addListener("place_changed", () => {
      debugger;
      let place = this.autocomplete.getPlace();
      let ac = place.address_components;
      console.log(ac);
      let street_number = ac.find((o) => o.types.includes("street_number"));
      let route = ac.find((o) => o.types.includes("route"));
      let locality = ac.find((o) => o.types.includes("locality"));
      let administrative_area_level_2 = ac.find((o) =>
        o.types.includes("administrative_area_level_2")
      );
      let administrative_area_level_1 = ac.find((o) =>
        o.types.includes("administrative_area_level_1")
      );
      let country = ac.find((o) => o.types.includes("country"));
      let postal_code = ac.find((o) => o.types.includes("postal_code"));

      this.editedItem.shipping_address = {
        country: country ? country.long_name : "",
        region: administrative_area_level_1
          ? administrative_area_level_1.long_name
          : "",
        province: administrative_area_level_2
          ? administrative_area_level_2.short_name
          : "",
        locality: locality ? locality.long_name : "",
        route: route ? route.long_name : "",
        street_number: street_number ? street_number.long_name : "",
        postal_code: postal_code ? postal_code.long_name : "",
      };
      console.log(this.editedItem.shipping_address);
    });
  },
  computed: {
    ...mapState({
      local_step: (state) => state.step.step,
    }),
  },
  methods: {
    changeStep(param) {
      this.$store.commit("step/setMyStep", param);
    },
    ...mapMutations({
      setPrevMyStep: "step/setPrevMyStep",
      setNextMyStep: "step/setNextMyStep",
      setMyStep: "step/setMyStep",
    }),
    prev() {
      this.setPrevMyStep();
    },
    next() {
      this.setNextMyStep();
    },
  },
};
</script>
