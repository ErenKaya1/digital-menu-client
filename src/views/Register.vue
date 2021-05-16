<template>
  <div class="register-view authentication-wrapper authentication-3">
    <div class="authentication-inner">
      <b-col lg="8" class="d-none d-lg-flex align-items-center ui-bg-cover ui-bg-overlay-container p-5 register-bg">
        <div class="ui-bg-overlay custom-bg-dark opacity-50"></div>
        <div class="w-100 text-white px-5">
          <h1 class="display-3 font-weight-bolder mb-4" v-html="$t('registerView.pageTitle')"></h1>
          <div class="page-description text-large font-weight-light">{{ $t("registerView.pageDescription") }}</div>
        </div>
      </b-col>
      <b-col lg="4" class="theme-bg-white d-flex align-items-center p-5">
        <b-col sm="7" md="5" lg="12" class="d-flex px-0 px-xl-4 mx-auto">
          <div class="w-100">
            <!-- Logo -->
            <div class="d-flex justify-content-center align-items-center">
              <div class="ui-w-60">
                <div class="w-100 position-relative" style="padding-bottom: 30%">
                  <b-link to="/">
                    <img class="register-logo" src="/img/logo-green-blue.svg" alt="" />
                  </b-link>
                </div>
              </div>
            </div>
            <!-- / Logo -->

            <h4 class="text-center custom-text-muted font-weight-normal mb-0">{{ $t("registerView.formTitle") }}</h4>
            <form class="my-5" @submit.prevent="register">
              <b-form-group
                :label="$t('registerView.username')"
                :state="validateState('username')"
                :invalid-feedback="!$v.credentials.username.required ? $t('registerView.errorMessages.usernameRequired') : !$v.credentials.username.maxLength ? $t('registerView.errorMessages.usernameMaxLength') : ''"
              >
                <b-input v-model.trim="credentials.username" :state="validateState('username')" />
              </b-form-group>
              <b-form-group
                :label="$t('registerView.firstName')"
                :state="validateState('firstName')"
                :invalid-feedback="!$v.credentials.firstName.required ? $t('registerView.errorMessages.firstNameRequired') : !$v.credentials.firstName.maxLength ? $t('registerView.errorMessages.firstNameMaxLength') : ''"
              >
                <b-input v-model.trim="credentials.firstName" :state="validateState('firstName')" />
              </b-form-group>
              <b-form-group
                :label="$t('registerView.lastName')"
                :state="validateState('lastName')"
                :invalid-feedback="!$v.credentials.lastName.required ? $t('registerView.errorMessages.lastNameRequired') : !$v.credentials.lastName.maxLength ? $t('registerView.errorMessages.lastNameMaxLength') : ''"
              >
                <b-input v-model.trim="credentials.lastName" :state="validateState('lastName')" />
              </b-form-group>
              <b-form-group
                :label="$t('registerView.emailAddress')"
                :state="validateState('emailAddress')"
                :invalid-feedback="!$v.credentials.emailAddress.required ? $t('registerView.errorMessages.emailRequired') : !$v.credentials.emailAddress.email ? $t('registerView.errorMessages.emailFormat') : ''"
              >
                <b-input v-model.trim="credentials.emailAddress" :state="validateState('emailAddress')" />
              </b-form-group>
              <b-form-group :label="$t('registerView.phoneNumber')">
                <b-input v-model.trim="credentials.phoneNumber" />
              </b-form-group>
              <b-form-group
                :label="$t('registerView.password')"
                :state="validateState('password')"
                :invalid-feedback="!$v.credentials.password.required ? $t('registerView.errorMessages.passwordRequired') : !$v.credentials.password.minLength ? $t('registerView.errorMessages.passwordMinLength') : ''"
              >
                <b-input type="password" v-model.trim="credentials.password" :state="validateState('password')" />
              </b-form-group>
              <b-form-group
                :label="$t('registerView.passwordConfirm')"
                :state="validatePasswordConfirm()"
                :invalid-feedback="!$v.passwordConfirm.required ? $t('registerView.errorMessages.passwordConfirmRequired') : !$v.passwordConfirm.sameAs ? $t('registerView.errorMessages.passwordsDontMatch') : ''"
              >
                <b-input type="password" v-model.trim="passwordConfirm" :state="validatePasswordConfirm()" />
              </b-form-group>
              <b-btn type="submit" variant="landing-primary" :block="true" class="mt-4">{{ $t("registerView.formButtonText") }}</b-btn>
              <div class="custom-text-muted small mt-4">
                {{ $t("registerView.disclaimer") }}
                <b-link to="/privacy-policy" class="text-landing-primary">{{ $t("registerView.moreInformation") }}</b-link>
              </div>
            </form>
            <div class="text-center text-muted">
              {{ $t("registerView.alreadyHaveAnAccount") }}
              <b-link to="/login" class="text-landing-primary">{{ $t("registerView.signIn") }}</b-link>
            </div>
          </div>
        </b-col>
      </b-col>
    </div>
  </div>
</template>

<script>
import authService from "@/services/authService";
import { required, maxLength, email, sameAs, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      credentials: {
        username: "",
        firstName: "",
        lastName: "",
        emailAddress: "",
        phoneNumber: " ",
        password: "",
      },
      passwordConfirm: "",
    };
  },

  validations: {
    credentials: {
      username: {
        required,
        maxLength: maxLength(30),
      },
      firstName: {
        required,
        maxLength: maxLength(30),
      },
      lastName: {
        required,
        maxLength: maxLength(30),
      },
      emailAddress: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
    passwordConfirm: {
      required,
      sameAs: sameAs((vm) => {
        if (vm.credentials.password) {
          return vm.credentials.password;
        }
      }),
    },
  },

  beforeCreate() {
    if (this.$store.state.isUserLoggedIn) this.$router.push("/dashboard");
  },

  mounted() {
    this.$title = this.$t("registerView.tabTitle");
  },

  methods: {
    async register() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        var loader = this.$loading.show();
        this.$v.$reset();
        const data = await authService.register(this.credentials);
        if (data.success) {
          this.$store.dispatch("setToken", data.data.token);
          this.$store.dispatch("setUser", data.data.user);
          this.$router.push("/dashboard");
        } else if (data.code === 409) {
          var errorMessage = "";

          switch (data.errorCode) {
            // duplicated username
            case 1:
              errorMessage = this.$t("registerView.errorMessages.duplicatedUsername");
              break;

            // duplicated email address
            case 2:
              errorMessage = this.$t("registerView.errorMessages.duplicatedEmailAddress");
              break;
          }

          this.$notify({
            group: "notify",
            text: errorMessage,
            duration: 5000,
            type: "error",
          });
        }

        loader.hide();
      }
    },

    validateState(name) {
      const { $dirty, $error } = this.$v.credentials[name];
      return $dirty ? !$error : null;
    },

    validatePasswordConfirm() {
      const { $dirty, $error } = this.$v.passwordConfirm;
      return $dirty ? !$error : null;
    },
  },
};
</script>

<style>
@import "../../node_modules/@fontsource/comfortaa/700.css";

.register-bg {
  background-image: url("../assets/register-img.jpg");
}

.register-logo {
  height: 100px;
}

.register-view h1,
.page-description {
  font-family: "Comfortaa";
}

.page-description {
  font-size: 18px;
  letter-spacing: 1px;
}

@media (max-width: 512px) {
  .register-logo {
    height: 70px;
  }
}
</style>
