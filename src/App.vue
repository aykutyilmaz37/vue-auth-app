<template>
  <div>
    <Layout />
  </div>
</template>
<script>
import Layout from "./layout/Index";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
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
