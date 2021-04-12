<template>
  <header>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">
        <b-icon icon="lock-fill"></b-icon>
        <span>Auth App</span>
      </b-navbar-brand>

      <b-navbar-toggle
        target="nav-collapse"
        class="custom-nav-toggle"
      ></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav class="mr-md-4">
            <b-nav-item to="/" exact>
              <b-icon icon="house-door-fill"></b-icon>
              <span>{{ $t("HOMEPAGE__C") }}</span>
            </b-nav-item>
            <b-nav-item to="/contact">
              <b-icon icon="envelope-fill"></b-icon>
              <span>{{ $t("CONTACT__C") }}</span>
            </b-nav-item>
          </b-navbar-nav>
          <b-dropdown
            v-bind:text="lang"
            variant="warning"
            class="mr-md-2 mb-2 mb-md-0 lang-dropdown"
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

          <Button
            v-if="!this.$store.getters.isAuthenticated"
            v-bind:text="$t('LOGIN__C')"
            variant="light"
            icon="person-fill"
            id="show-btn"
            @click="openModal"
          />
          <b-dropdown
            v-if="this.$store.getters.isAuthenticated"
            variant="light"
            class="logged-dropdown"
          >
            <template #button-content>
              <b-icon icon="person-fill"></b-icon> {{ $t("HELLO__C") }}
              {{ userName }}
            </template>
            <b-dropdown-item @click="logout">{{
              $t("LOGOUT__C")
            }}</b-dropdown-item>
          </b-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>
<script>
import Button from "../button/Button.vue";
import i18n from "../../plugins/i18n";
import "./Index.scss";
export default {
  components: { Button },
  name: "Header",
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
    logout() {
      this.$store.dispatch("logout");
    },
    openModal() {
      this.$bvModal.show("loginModal");
    },
    setLanguage(val) {
      this.lang = val;
      this.$store.dispatch("setLang", val);
      this.$i18n.locale = val;
    },
  },
  computed: {
    userName() {
      return this.$store.state.user.name;
    },
  },
};
</script>