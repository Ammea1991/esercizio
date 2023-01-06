<template>
  <Loading v-if="showHideSpinner" />
  <Login v-else />
</template>

<script>
import global from "~/mixins.js/global.js";

export default {
  mixins: [global],
  middleware: "auth",
};
</script>
