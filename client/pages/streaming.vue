<template>
  <div>
    <Movie />
  </div>
</template>

<script>
export default {
  middleware: "auth",
  data: () => ({
    show: false,
  }),
  computed: {},
};
</script>
