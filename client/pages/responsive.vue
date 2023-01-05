<template>
  <v-form ref="form">
    <v-card class="pa-2">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              outlined
              label="First name"
              prepend-inner-icon="mdi-card-account-details-outline"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              outlined
              label="Last name"
              prepend-inner-icon="mdi-card-account-details-outline"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <v-text-field
              outlined
              type="email"
              label="Email"
              prepend-inner-icon="mdi-map-marker"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field outlined label="First name" />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field outlined label="Last name" />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field outlined label="Last name" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="3">
            <v-text-field outlined label="First name" />
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field outlined label="Last name" />
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field outlined label="Last name" />
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field outlined label="Last name" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              outlined
              label="First name"
              prepend-inner-icon="mdi-cellphone"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              outlined
              label="Last name"
              prepend-inner-icon="mdi-calendar"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field outlined label="Last name" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              outlined
              label="First name"
              prepend-inner-icon="mdi-at"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field outlined label="Last name"
              ><template v-slot:prepend>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on"> mdi-help-circle-outline </v-icon>
                  </template>
                  I'm a tooltip
                </v-tooltip>
              </template></v-text-field
            >
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field outlined label="Last name" />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text> Cancel </v-btn>
        <v-btn color="primary"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
export default {};
</script>
