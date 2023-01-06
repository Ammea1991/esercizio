<template>
  <v-card class="pa-2" tile flat>
    <div class="d-flex justify-center">
      <v-tooltip left v-if="!modalCreate && $route.path != '/subscription'">
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" large>mdi-account-question</v-icon>
        </template>
        {{ editedItem.email }}
      </v-tooltip>
      <v-card-title class="font-italic"> Shipping address </v-card-title>
    </div>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="12">
          <div class="input-container">
            <v-icon>mdi-map-marker</v-icon>
            <input
              ref="googleAutocomplete"
              placeholder="Search for location"
              class="search-location"
              onfocus="value = ''"
              type="text"
              prepend-inner-icon="mdi-map-marker"
            />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <validation-provider
            v-slot="{ errors }"
            name="Country"
            rules="required"
          >
            <v-text-field
              :error-messages="errors"
              clearable
              outlined
              v-model="editedItem.shipping_address.country"
              label="Country"
            ></v-text-field>
          </validation-provider>
        </v-col>
        <v-col cols="12" sm="4">
          <validation-provider
            v-slot="{ errors }"
            name="Region"
            rules="required"
          >
            <v-text-field
              :error-messages="errors"
              clearable
              outlined
              v-model="editedItem.shipping_address.region"
              label="Region"
            ></v-text-field>
          </validation-provider>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            clearable
            outlined
            v-model="editedItem.shipping_address.province"
            label="Province"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="3">
          <validation-provider
            v-slot="{ errors }"
            name="Locality"
            rules="required"
          >
            <v-text-field
              :error-messages="errors"
              clearable
              outlined
              v-model="editedItem.shipping_address.locality"
              label="Locality"
            ></v-text-field>
          </validation-provider>
        </v-col>
        <v-col cols="12" sm="3">
          <validation-provider
            v-slot="{ errors }"
            name="Route"
            rules="required"
          >
            <v-text-field
              :error-messages="errors"
              clearable
              outlined
              v-model="editedItem.shipping_address.route"
              label="Route"
            ></v-text-field>
          </validation-provider>
        </v-col>
        <v-col cols="12" sm="3">
          <validation-provider
            v-slot="{ errors }"
            name="Street number"
            rules="required"
          >
            <v-text-field
              :error-messages="errors"
              clearable
              outlined
              v-model="editedItem.shipping_address.street_number"
              label="Street number"
            ></v-text-field>
          </validation-provider>
        </v-col>
        <v-col cols="12" sm="3">
          <validation-provider
            v-slot="{ errors }"
            name="Zip code"
            rules="required"
          >
            <v-text-field
              :error-messages="errors"
              clearable
              outlined
              v-model="editedItem.shipping_address.postal_code"
              label="Zip code"
            ></v-text-field>
          </validation-provider>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import global from "~/mixins/global.js";
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
  computed: {
    ...mapState({
      modalCreate: (state) => state.modal.modalCreate,
    }),
  },
  mounted() {
    const input = this.$refs.googleAutocomplete;
    const autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener("place_changed", () => {
      let place = autocomplete.getPlace();
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
    });
  },
};
</script>
