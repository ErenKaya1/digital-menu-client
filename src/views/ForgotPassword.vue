<template>
  <div class="authentication-wrapper authentication-2 px-4">
    <div class="authentication-inner py-5">
      <b-card no-body v-if="emailSent">
        <div class="p-4 p-sm-5">
          <div class="display-1 lnr lnr-checkmark-circle text-center text-landing-primary mb-4"></div>
          <p class="text-center text-big mb-4">{{ $t("forgotPasswordView.messages.emailSent") }}</p>
          <b-link to="/" class="btn btn-landing-primary btn-block">{{ $t("forgotPasswordView.backToHomepageButtonText") }}</b-link>
        </div>
      </b-card>
      <form class="card" @submit.prevent="forgotPassword" v-else>
        <div class="p-4 p-sm-5">
          <!-- Logo -->
          <div class="d-flex justify-content-center align-items-center pb-2 mb-4">
            <div class="ui-w-60">
              <div class="w-100 position-relative" style="padding-bottom: 54%"></div>
            </div>
          </div>
          <!-- / Logo -->

          <h5 class="text-center text-muted font-weight-normal mb-4">{{ $t("forgotPasswordView.formTitle") }}</h5>
          <hr class="mt-0 mb-4" />
          <p>{{ $t("forgotPasswordView.formDescription") }}</p>
          <b-form-group
            :state="validateEmailAddress()"
            :invalid-feedback="!$v.credentials.emailAddress.required ? $t('forgotPasswordView.errorMessages.emailRequired') : !$v.credentials.emailAddress.email ? $t('forgotPasswordView.errorMessages.emailFormat') : ''"
          >
            <b-input v-model="credentials.emailAddress" :placeholder="this.$t('forgotPasswordView.inputPlaceholder')" :state="validateEmailAddress()" />
          </b-form-group>
          <b-btn type="submit" variant="landing-primary" :block="true">{{ $t("forgotPasswordView.formButtonText") }}</b-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import authService from "@/services/authService";
import { required, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      credentials: {
        emailAddress: "",
      },
      emailSent: false,
    };
  },

  validations: {
    credentials: {
      emailAddress: {
        required,
        email,
      },
    },
  },

  mounted() {
    this.$title = this.$t("forgotPasswordView.tabTitle");
  },

  methods: {
    async forgotPassword() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.emailSent = true;
        await authService.forgotPassword(this.credentials);
      }
    },

    validateEmailAddress() {
      const { $dirty, $error } = this.$v.credentials.emailAddress;
      return $dirty ? !$error : null;
    },
  },
};
</script>

<style scoped>
.authentication-wrapper.authentication-2 {
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.authentication-wrapper.authentication-2 .authentication-inner {
  max-width: 380px;
}
</style>
