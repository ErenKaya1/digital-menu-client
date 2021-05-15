<template>
  <div class="authentication-wrapper authentication-2 px-4">
    <div class="authentication-inner py-5">
      <b-alert variant="danger" show v-if="errorMessage">{{ errorMessage }}</b-alert>
      <form class="card" @submit.prevent="resetPassword">
        <div class="p-4 p-sm-5">
          <!-- Logo -->
          <div class="d-flex justify-content-center align-items-center pb-2 mb-4">
            <div class="ui-w-60">
              <div class="w-100 position-relative" style="padding-bottom: 54%"></div>
            </div>
          </div>
          <!-- / Logo -->

          <h5 class="text-center text-muted font-weight-normal mb-4">{{ $t("resetPasswordView.formTitle") }}</h5>
          <hr class="mt-0 mb-4" />
          <b-form-group
            :label="$t('resetPasswordView.newPassword')"
            :state="validateNewPassword()"
            :invalid-feedback="!$v.credentials.newPassword.required ? $t('resetPasswordView.errorMessages.newPasswordRequired') : !$v.credentials.newPassword.minLength ? $t('resetPasswordView.errorMessages.newPasswordMinLength') : ''"
          >
            <b-input v-model="credentials.newPassword" type="password" :state="validateNewPassword()" />
          </b-form-group>
          <b-form-group
            :label="$t('resetPasswordView.newPasswordConfirm')"
            :state="validateNewPasswordConfirm()"
            :invalid-feedback="!$v.newPasswordConfirm.required ? $t('resetPasswordView.errorMessages.newPasswordConfirmRequired') : !$v.newPasswordConfirm.sameAs ? $t('resetPasswordView.errorMessages.passwordsDontMatch') : ''"
          >
            <b-input v-model="newPasswordConfirm" type="password" :state="validateNewPasswordConfirm()" />
          </b-form-group>

          <b-btn type="submit" variant="landing-primary" :block="true">{{ $t("resetPasswordView.formButtonText") }}</b-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import authService from "@/services/authService";

export default {
  data() {
    return {
      credentials: {
        userId: "",
        token: "",
        newPassword: "",
      },

      newPasswordConfirm: "",
      errorMessage: "",
    };
  },

  validations: {
    credentials: {
      newPassword: {
        required,
        minLength: minLength(6),
      },
    },

    newPasswordConfirm: {
      required,
      sameAs: sameAs((vm) => {
        if (vm.credentials.newPassword) {
          return vm.credentials.newPassword;
        }
      }),
    },
  },

  mounted() {
    this.$title = this.$t("resetPasswordView.tabTitle");
    this.credentials = {
      userId: this.$route.query.userId,
      token: this.$route.query.token,
    };
  },

  methods: {
    async resetPassword() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        var loader = this.$loading.show();
        this.$v.$reset();
        const response = await authService.resetPassword(this.credentials);
        if (response.success) {
          this.$notify({
            group: "notify",
            text: this.$t("resetPasswordView.messages.passwordUpdatedSuccessfully"),
            duration: 5000,
            type: "success",
          });

          this.$store.dispatch("setToken", null);
          this.$store.dispatch("setUser", null);
          this.$store.dispatch("setPersistent", null);
          this.$router.push("/login");
        } else {
          switch (response.errorCode) {
            // expired reset password token
            case 4:
              this.errorMessage = this.$t("resetPasswordView.errorMessages.resetPasswordTokenExpired");
              break;

            // invalid reset password token
            case 5:
              this.errorMessage = this.$t("resetPasswordView.errorMessages.invalidResetPasswordToken");
              break;

            default:
              this.errorMessage = this.$t("resetPasswordView.errorMessages.passwordUpdateFailed");
              break;
          }
        }

        loader.hide();
      }
    },

    validateNewPassword() {
      const { $dirty, $error } = this.$v.credentials.newPassword;
      return $dirty ? !$error : null;
    },

    validateNewPasswordConfirm() {
      const { $dirty, $error } = this.$v.newPasswordConfirm;
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
