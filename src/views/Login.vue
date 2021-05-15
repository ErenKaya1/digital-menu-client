<template>
  <div class="authentication-wrapper authentication-3">
    <div class="authentication-inner">
      <b-col lg="8" class="d-none d-lg-flex align-items-center ui-bg-cover ui-bg-overlay-container p-5 login-bg">
        <div class="ui-bg-overlay custom-bg-dark opacity-50"></div>
        <div class="w-100 text-white px-5">
          <h1 class="display-3 font-weight-bolder mb-4" v-html="$t('loginView.pageTitle')"></h1>
        </div>
      </b-col>
      <b-col lg="4" class="theme-bg-white d-flex align-items-center p-5">
        <b-col sm="7" md="5" lg="12" class="d-flex px-0 px-xl-4 mx-auto">
          <div class="w-100">
            <!-- Logo -->
            <div class="d-flex justify-content-center align-items-center">
              <div class="ui-w-60">
                <div class="w-100 position-relative" style="padding-bottom: 54%"></div>
              </div>
            </div>
            <!-- / Logo -->

            <h4 class="text-center custom-text-muted font-weight-normal mt-5 mb-0">{{ $t("loginView.formTitle") }}</h4>
            <form class="my-5" @submit.prevent="login">
              <b-form-group :label="$t('loginView.username')" :state="validateState('userName')" :invalid-feedback="$v.credentials.userName.$error ? $t('loginView.errorMessages.usernameRequired') : ''">
                <b-input v-model="credentials.userName" :state="validateState('userName')" />
              </b-form-group>
              <b-form-group :state="validateState('password')" :invalid-feedback="$v.credentials.password.$error ? $t('loginView.errorMessages.passwordRequired') : ''">
                <div slot="label" class="d-flex justify-content-between align-items-end">
                  <div>{{ $t("loginView.password") }}</div>
                  <b-link to="/forgot-password" class="d-block small text-landing-primary">{{ $t("loginView.forgotPassword") }}</b-link>
                </div>
                <b-input type="password" v-model="credentials.password" :state="validateState('password')" />
              </b-form-group>

              <div class="d-flex justify-content-between align-items-center m-0">
                <b-check v-model="credentials.isPersistent" class="m-0">{{ $t("loginView.rememberMe") }}</b-check>
                <b-btn type="submit" variant="landing-primary">{{ $t("loginView.formButtonText") }}</b-btn>
              </div>
            </form>
            <div class="text-center text-muted">
              {{ $t("loginView.dontHaveAnAccountYet") }}
              <b-link to="/register" class="text-landing-primary">{{ $t("loginView.signUpLinkText") }}</b-link>
            </div>
          </div>
        </b-col>
      </b-col>
    </div>
  </div>
</template>

<script>
import authService from "@/services/authService";
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      credentials: {
        userName: "erenkaya",
        password: "asdasd",
        isPersistent: false,
      },
    };
  },

  validations: {
    credentials: {
      userName: {
        required,
      },
      password: {
        required,
      },
    },
  },

  beforeCreate() {
    if (this.$store.state.isUserLoggedIn) this.$router.push("/dashboard");
  },

  mounted() {
    this.$title = this.$t("loginView.tabTitle");
  },

  methods: {
    async login() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        var loader = this.$loading.show();
        this.$v.$reset();
        const data = await authService.authenticate(this.credentials);
        if (data.success) {
          this.$store.dispatch("setToken", data.data.token);
          this.$store.dispatch("setUser", data.data.user);
          this.$store.dispatch("setPersistent", this.credentials.isPersistent);
          this.$router.push("/dashboard");
        } else {
          var errorMessage = "";

          switch (data.errorCode) {
            // incorrect credentials
            case 3:
              errorMessage = this.$t("loginView.errorMessages.invalidCredentials")
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
  },
};
</script>

<style>
.login-bg {
  background-image: url("../assets/login-img.jpg");
}
</style>
