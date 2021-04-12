<template>
  <b-container class="pt-5 pb-5">
    <b-row>
      <b-col>
        <b-jumbotron header-level="4">
          <template #header>{{ $t("HOMEPAGE__U") }}</template>
          <template #lead>
            {{ $t("LOREM_IPSUM_TITLE__C") }}
          </template>
          <hr class="my-4" />
          <h4 v-if="this.$store.getters.isAuthenticated">
            {{ $t("LOGIN_TITLE__C") }}
          </h4>
          <p v-html="$t('LOREM_IPSUM_TEXT__C')"></p>
          <b-button variant="primary" href="#">{{
            $t("MORE_INFO__C")
          }}</b-button>
        </b-jumbotron>
      </b-col>
    </b-row>
  </b-container>
</template>
