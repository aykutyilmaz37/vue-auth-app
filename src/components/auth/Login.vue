<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <div v-if="alertError" :class="'alert alert-danger'">
        {{ $t("LOGIN_ERROR__C") }}
      </div>
      <div class="alert alert-info">
        {{ $t("EMAIL__C") }}: test@user.com<br />
        {{ $t("PASSWORD__C") }}: 123456
      </div>
      <div class="form-group">
        <label for="email">{{ $t("EMAIL__C") }}</label>
        <b-form-input
          v-model="user.email"
          :state="validateState('email')"
          id="email"
          type="text"
          aria-describedby="email"
        ></b-form-input>
        <b-form-invalid-feedback id="email" v-if="!$v.user.email.required">
          {{ $t("REQUIRED_ERROR__C") }}
        </b-form-invalid-feedback>
        <b-form-invalid-feedback id="email" v-if="!$v.user.email.email">
          {{ $t("EMAIL_ERROR__C") }}
        </b-form-invalid-feedback>

      </div>
      <div class="form-group">
        <label for="email">{{ $t("PASSWORD__C") }}</label>
        <b-form-input
          v-model="user.password"
          :state="validateState('password')"
          id="password"
          type="password"
          aria-describedby="password"
        ></b-form-input>
        <b-form-invalid-feedback id="password" v-if="!$v.user.password.required">
          {{ $t("REQUIRED_ERROR__C") }}
        </b-form-invalid-feedback>
      </div>
      <div class="button-container d-flex justify-content-between">
        <Button type="submit" v-bind:text="$t('LOGIN__C')" variant="dark" />
        <Lang />
      </div>
    </b-form>
  </div>
</template>
<script>
import Button from "../button/Button.vue";
import { validationMixin } from "vuelidate";
import { required,email } from "vuelidate/lib/validators";
import Lang from '../lang/Lang.vue';

export default {
  mixins: [validationMixin],
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      alertError: false,
    };
  },
  methods: {
    onSubmit(e) {
      this.$v.user.$touch();
      if (this.$v.user.$anyError) {
        return;
      } else {
        this.$store.dispatch("login", { ...this.user }).then((response) => {
          if (response) {
            console.log(response);
            this.alertError = false;
            this.$bvModal.hide("loginModal");
          } else {
            this.alertError = true;
          }
        });
      }
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.user[name];
      return $dirty ? !$error : null;
    },
  },
  components: {
    Button,
    Lang,
  },
  validations: {
    user: {
      email: {
        required,
        email
      },
      password: {
        required,
      },
    },
  },
};
</script>
