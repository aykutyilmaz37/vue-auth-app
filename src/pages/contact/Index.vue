<template>
  <b-container class="pt-5 pb-5">
    <b-row>
      <b-col offset-sm="3" cols="12" sm="6">
        <b-card-group deck>
          <b-card bg-variant="light" v-bind:header="$t('CONTACT_FORM__C')">
            <b-form @submit.prevent="onSubmit">
              <div class="form-group">
                <label for="title">{{ $t("TITLE__C") }}</label>
                <b-form-input
                  v-model="contact.title"
                  id="title"
                  type="text"
                  aria-describedby="title"
                ></b-form-input>
              </div>

              <div class="form-group">
                <label for="name">{{ $t("NAME__C") }}</label>
                <b-form-input
                  v-model="contact.name"
                  id="name"
                  type="text"
                  aria-describedby="name"
                ></b-form-input>
              </div>

              <div class="form-group">
                <label for="email">{{ $t("EMAIL__C") }}</label>
                <b-form-input
                  v-model="contact.email"
                  :state="validateState('email')"
                  id="email"
                  type="text"
                  aria-describedby="email"
                ></b-form-input>
                <b-form-invalid-feedback
                  id="email"
                  v-if="!$v.contact.email.required"
                >
                  {{ $t("REQUIRED_ERROR__C") }}
                </b-form-invalid-feedback>
                <b-form-invalid-feedback
                  id="email"
                  v-if="!$v.contact.email.email"
                >
                  {{ $t("EMAIL_ERROR__C") }}
                </b-form-invalid-feedback>
              </div>

              <div class="form-group">
                <label for="phone">{{ $t("PHONE__C") }}</label>
                <b-form-input
                  v-model="contact.phone"
                  :state="validateState('phone')"
                  id="phone"
                  type="number"
                  aria-describedby="password"
                ></b-form-input>
                <b-form-invalid-feedback
                  id="phone"
                  v-if="!$v.contact.phone.required"
                >
                  {{ $t("REQUIRED_ERROR__C") }}
                </b-form-invalid-feedback>
                <b-form-invalid-feedback
                  id="phone"
                  v-if="!$v.contact.phone.maxLength"
                >
                  {{ $t("PHONE_MAX_LENGTH_ERROR__C") }}
                </b-form-invalid-feedback>
              </div>

              <div class="form-group">
                <label for="country">{{ $t("COUNTRY__C") }}</label>
                <b-form-input list="country-list" id="country" v-model="contact.country"></b-form-input>
                <b-datalist id="country-list">
                  <option
                    v-for="country in countryList"
                    :key="country.key"
                    :value="country.value"
                  ></option>
                </b-datalist>
              </div>

              <div class="form-group">
                <label for="phone">{{ $t("TEXT__C") }}</label>
                <b-form-textarea
                  v-model="contact.text"
                  id="text"
                  type="text"
                  no-resize
                  aria-describedby="text"
                ></b-form-textarea>
              </div>
              <div
                class="button-container d-flex flex-column align-items-center"
              >
                <Button
                  type="submit"
                  v-bind:text="$t('SUBMIT__C')"
                  variant="dark"
                />
              </div>

              <div
                v-if="alertSuccess"
                :class="'alert alert-success'"
                class="mt-2"
              >
                {{ $t("SUCCESS_MESSAGE__C") }}
              </div>
            </b-form>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Button from "../../components/button/Button";
import { validationMixin } from "vuelidate";
import { required, email, maxLength } from "vuelidate/lib/validators";
import i18n from "../../plugins/i18n";

export default {
  mixins: [validationMixin],
  data() {
    return {
      contact: {
        title: null,
        name: null,
        email: null,
        phone: null,
        country: null,
        text: null,
      },
      countryList: [],
      alertSuccess: false,
    };
  },
  methods: {
    init() {
      this.getCountry();
    },
    onSubmit(e) {
      let sendData = {};
      this.$v.contact.$touch();
      if (this.$v.contact.$anyError) {
        return;
      } else {
        sendData.title = this.contact.title;
        sendData.name = this.contact.name;
        sendData.email = this.contact.email;
        sendData.phone = this.contact.phone;
        sendData.country = this.contact.country;
        sendData.text = this.contact.text;

        console.log(sendData);
        this.alertSuccess = true;
        console.log("Send Message...");
      }
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.contact[name];
      return $dirty ? !$error : null;
    },
    getCountry() {
      const list = Object.values(i18n.messages);
      const lang = localStorage.getItem("lang");
      this.countryList = [];
      list.forEach((item) => {
        if (lang == item.info.code) {
          item.COUNTRY_LIST__ARRAY.forEach((list) => {
            this.countryList.push(list);
          });
        }
      });
    },
  },
  components: {
    Button,
  },
  validations: {
    contact: {
      email: {
        required,
        email,
      },
      phone: {
        required,
        maxLength: maxLength(10),
      },
    },
  },
  beforeMount() {
    this.init();
  },
  beforeUpdate() {
    this.init();
  },
  computed: {
    getUserInfo() {
      this.contact.name = this.$store.getters.isAuthenticated
        ? this.$store.state.user.name
        : null;
      this.contact.email = this.$store.getters.isAuthenticated
        ? this.$store.state.user.email
        : null;
    },
  },
  watch: {
    getUserInfo() {},
  },
};
</script>

