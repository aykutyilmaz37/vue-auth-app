<template>
  <div>
    <Layout />
  </div>
</template>
<script>
import Layout from "./layout/Index";
import "./App.scss";
export default {
  name: "App",
  components: {
    Layout,
  },
  created() {
    this.$store.dispatch("init");
  },
};
</script>
