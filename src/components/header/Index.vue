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
          <Lang />
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
              <b-icon icon="person-fill"></b-icon>
              {{ userEmail }}
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
import Lang from '../lang/Lang.vue';
import "./Index.scss";
export default {
  components: { Button, Lang },
  name: "Header",
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    openModal() {
      this.$bvModal.show("loginModal");
    },
  },
  computed: {
    userEmail() {
      return this.$store.state.user.email;
    },
  },
};
</script>