<template>
  <!-- <v-card
        class="pa-2"
        v-bind:class="{ 'fade-in': local_step === 2 }"
        v-if="local_step === 2"
        v-show="local_step === 2"
      > -->
  <v-card class="pa-2">
    <v-card-title class="font-italic flex-column">
      Shipping address
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="12">
          <input
            ref="googleAutocomplete"
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
    </v-card-text>
  </v-card>
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
    const input = this.$refs.googleAutocomplete;
    const autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener("place_changed", () => {
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
    });

    // this.autocomplete = new google.maps.places.Autocomplete(
    //   this.$refs.autocomplete,
    //   { types: ["geocode"] }
    // );
    // this.autocomplete.addListener("place_changed", () => {
    //   debugger;

    //   console.log(this.editedItem.shipping_address);
    // });
  },
};
</script>
<!-- 
  <template>
    <v-autocomplete
      v-model="location"
      :items="locations"
      :search-input.sync="search"
      item-text="description"
      item-value="place_id"
      :loading="loading"
    ></v-autocomplete>
  </template>
  
  <script>
    export default {
      data() {
        return {
          location: null,
          locations: [],
          search: '',
          loading: false
        }
      },
      watch: {
        search(val) {
          this.loading = true;
          // Esegui la ricerca con l'autocomplete di Google Maps qui
          // Popola la proprietà "locations" con i risultati ottenuti
          this.loading = false;
        }
      }
    }
  </script>
   -->
