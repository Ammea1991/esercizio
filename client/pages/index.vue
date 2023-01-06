<template>
  <Loading v-if="showHideSpinner" />
  <Login v-else />
</template>

<script>
import global from "~/mixins/global.js";

export default {
  mixins: [global],
  middleware: "auth",
};
</script>
