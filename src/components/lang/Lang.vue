<template>
  <div>
    <b-dropdown
      v-bind:text="lang"
      variant="warning"
      class="mr-md-2 mb-2 mb-lg-0 lang-dropdown"
    >
      <b-dropdown-item
        v-for="language in languages"
        :key="language.info.code"
        @click="setLanguage(language.info.code)"
        :active="language.info.code == lang"
        href="#"
        >{{ language.info.code }}</b-dropdown-item
      >
    </b-dropdown>
  </div>
</template>

<script>
import i18n from "../../plugins/i18n";
import "./Lang.scss";
export default {
  name: "Lang",
  data() {
    return {
      lang:
        localStorage.getItem("lang") != null
          ? localStorage.getItem("lang")
          : "TR",
      languages: Object.values(i18n.messages),
    };
  },
  methods: {
    setLanguage(val) {
      this.lang = val;
      this.$store.dispatch("setLang", val);
      this.$i18n.locale = val;
    },
  },
};
</script>
