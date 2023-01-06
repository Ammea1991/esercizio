<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <template v-if="!this.$store.state.auth.loggedIn">
          <v-list-item class="nav-item" to="/login">
            <v-list-item-action>
              <v-icon>mdi-login</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="nav-item" to="/subscription">
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Subscribe</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-else>
          <v-list-item class="nav-item" @click="logout" to="/">
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <transition name="fade">
        <v-btn
          icon
          @click="toggleTheme"
          v-bind:class="{ 'fade-in': toggleTheme }"
          v-if="toggleTheme"
        >
          <v-icon>mdi-invert-colors</v-icon>
        </v-btn>
      </transition>
      <v-spacer />
      <v-img
        :lazy-src="logo"
        width="50"
        max-height="50"
        max-width="50"
        :src="logo"
      ></v-img>
      <v-spacer />
    </v-app-bar>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      miniVariant: false,
      right: false,
      rightDrawer: false,
      clipped: true,
      drawer: false,
      fixed: false,
      logo: require("@/static/logo.png"),
      items: [
        {
          icon: "mdi-account",
          title: "Profile",
          to: "/profile",
        },
        {
          icon: "mdi-home",
          title: "Home",
          to: "/home",
        },
      ],
      title: "Ec Meazza",
    };
  },
  mounted() {
    if (localStorage.dark_theme === "true") {
      this.$vuetify.theme.dark = true;
    } else {
      this.$vuetify.theme.dark = false;
    }
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.dark_theme = this.$vuetify.theme.dark;
    },
    async logout() {
      await this.$auth.logout(); // this method will logout the user and make token not valid
    },
  },
  computed: {
    getUserInfo() {
      return this.$store.getters.getUserInfo;
    },
    isAuthenticated() {
      return this.$store.state.auth.loggedIn; // it check if user isAuthenticated
    },
  },
};
</script>
