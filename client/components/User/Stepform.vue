<template>
  <v-form ref="form" lazy-validation @submit.prevent="$emit('submit-form')">
    <validation-observer ref="observer" v-slot="{ invalid }">
      <div class="pa-4">
        <div class="register-stepper">
          <div
            class="step"
            :class="{
              'step-active': local_step === 1,
              'step-done': local_step > 1,
            }"
          >
            <span class="step-number"></span>
          </div>
          <div
            class="step"
            :class="{
              'step-active': local_step === 2,
              'step-done': local_step > 2,
            }"
          >
            <span class="step-number"></span>
          </div>
          <div
            class="step"
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
            flat
            class="pa-2"
            v-bind:class="{ 'fade-in': local_step === 1 }"
            v-if="local_step === 1"
            v-show="local_step === 1"
          >
            <div class="d-flex justify-center">
              <v-tooltip
                left
                v-if="!modalCreate && $route.path != '/subscription'"
              >
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" large>mdi-account-question</v-icon>
                </template>
                {{ editedItem.email }}
              </v-tooltip>
              <v-card-title class="font-italic"> Personal data </v-card-title>
            </div>

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
                      prepend-icon="mdi-card-account-details-outline"
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
                      prepend-icon="mdi-card-account-details-outline"
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
                      prepend-icon="mdi-card-account-details-outline"
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
                      prepend-icon="mdi-cellphone"
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
                          :max="date"
                          v-model="editedItem.birth_date"
                          :error-messages="errors"
                          clearable
                          label="Birth date"
                          prepend-icon="mdi-calendar"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </validation-provider>
                    </template>
                    <v-date-picker
                      v-model="editedItem.birth_date"
                      :max="date"
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
                elevation="2"
                @click="$emit('close-modal')"
                >Close</v-btn
              >
              <v-btn
                @click.prevent="next()"
                class="arrow-next"
                color="primary"
                elevation="2"
                v-bind:disabled="invalid"
              >
                Next
              </v-btn>
            </v-card-actions>
          </v-card>
        </Transition>
        <Transition name="fade">
          <v-card
            flat
            class="pa-2"
            v-bind:class="{ 'fade-in': local_step === 2 }"
            v-if="local_step === 2"
            v-show="local_step === 2"
          >
            <AutocompleteGoogle :editedItem="editedItem" />
            <v-card-actions class="centered-button">
              <v-btn
                v-if="
                  $route.path != '/subscription' && $route.path != '/profile'
                "
                large
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
                v-bind:disabled="invalid"
              >
                Next
              </v-btn>
            </v-card-actions>
          </v-card>
        </Transition>
        <Transition name="fade">
          <v-card
            flat
            class="pa-2"
            v-bind:class="{ 'fade-in': local_step === 3 }"
            v-if="local_step === 3"
            v-show="local_step === 3"
          >
            <div class="d-flex justify-center">
              <v-tooltip
                left
                v-if="!modalCreate && $route.path != '/subscription'"
              >
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" large>mdi-account-question</v-icon>
                </template>
                {{ editedItem.email }}
              </v-tooltip>
              <v-card-title class="font-italic"> Login data </v-card-title>
            </div>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="12"
                  ><validation-provider
                    v-slot="{ errors }"
                    name="Email"
                    rules="required|email"
                    autocomplete="off"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      :error-messages="errors"
                      outlined
                      clearable
                      prepend-icon="mdi-email"
                      type="text"
                      autocomplete="off"
                      label="Email"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row v-if="$route.path == '/subscription' || modalCreate">
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
                      autocomplete="off"
                    >
                      <template v-slot:prepend>
                        <v-tooltip left v-if="!modalCreate">
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
                v-bind:disabled="invalid"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </Transition>
      </div>
    </validation-observer>
  </v-form>
</template>

<script>
import global from "~/mixins.js/global.js";
import { mapState, mapMutations } from "vuex";
import { maps } from "googlemaps";

export default {
  name: "Stepform",
  mixins: [global],
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    min: new Date(Date.now() - 315569260000).toISOString().substr(0, 10),
    invalid: false,
  }),
  props: {
    editedItem: {
      type: Object,
    },
  },
  computed: {
    ...mapState({
      local_step: (state) => state.step.step,
      modalDelete: (state) => state.modal.modalDelete,
      modaEdit: (state) => state.modal.modaEdit,
      modalCreate: (state) => state.modal.modalCreate,
    }),
  },
  methods: {
    toAllowedDates(val, index) {
      const today = this.$moment(this.schedules[index].dayFrom, "YYYY-MM-DD");
      const maxAllowedDate = today.clone().add(1, "days");
      const currentDate = this.$moment(val);
      return (
        !today.isAfter(currentDate) && !currentDate.isAfter(maxAllowedDate)
      );
    },
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
