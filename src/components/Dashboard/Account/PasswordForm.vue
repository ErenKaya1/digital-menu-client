<template>
  <form class="px-3 my-5" @submit.prevent="submitPasswordForm">
    <b-form-group :label="$t('dashboard.accountView.oldPassword')" :state="validateState('oldPassword')" :invalid-feedback="!$v.passwordCredentials.oldPassword.required ? $t('dashboard.accountView.errorMessages.oldPasswordRequired') : ''">
      <b-input type="password" v-model.trim="passwordCredentials.oldPassword" :state="validateState('oldPassword')" />
    </b-form-group>
    <b-form-group
      :label="$t('dashboard.accountView.newPassword')"
      :state="passwordCredentials.oldPassword === '' ? null : validateState('newPassword')"
      :invalid-feedback="
        !$v.passwordCredentials.newPassword.required ? $t('dashboard.accountView.errorMessages.newPasswordRequired') : !$v.passwordCredentials.newPassword.minLength ? $t('dashboard.accountView.errorMessages.newPasswordMinLength') : ''
      "
    >
      <b-input type="password" v-model.trim="passwordCredentials.newPassword" :disabled="passwordCredentials.oldPassword == ''" :state="passwordCredentials.oldPassword === '' ? null : validateState('newPassword')" />
    </b-form-group>
    <b-form-group
      :label="$t('dashboard.accountView.newPasswordConfirm')"
      :state="passwordCredentials.oldPassword === '' ? null : validatePasswordForm()"
      :invalid-feedback="!$v.newPasswordConfirm.required ? $t('dashboard.accountView.errorMessages.newPasswordConfirmRequired') : !$v.newPasswordConfirm.sameAs ? $t('dashboard.accountView.errorMessages.passwordsDoesntMatch') : ''"
    >
      <b-input type="password" v-model.trim="newPasswordConfirm" :disabled="passwordCredentials.oldPassword == ''" :state="passwordCredentials.oldPassword === '' ? null : validatePasswordForm()" />
    </b-form-group>
    <b-btn type="submit" variant="landing-secondary" class="mt-4">{{ $t("dashboard.accountView.passwordFormButtonText") }}</b-btn>
  </form>
</template>

<script>
import accountService from "@/services/accountService";
import { required, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      passwordCredentials: {
        oldPassword: "",
        newPassword: "",
      },
      newPasswordConfirm: "",
    };
  },

  validations: {
    passwordCredentials: {
      oldPassword: {
        required,
      },
      newPassword: {
        required,
        minLength: minLength(6),
      },
    },
    newPasswordConfirm: {
      required,
      sameAs: sameAs((vm) => {
        if (vm.passwordCredentials.newPassword) {
          return vm.passwordCredentials.newPassword;
        }
      }),
    },
  },

  methods: {
    async submitPasswordForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        var loader = this.$loading.show();
        var data = await accountService.updatePassword(this.$store.state.user.userId, this.passwordCredentials);
        if (data.success) {
          this.$notify({
            group: "notify-top-right",
            text: this.$t("dashboard.accountView.messages.passwordUpdatedSuccessfully"),
            duration: 5000,
            type: "success",
          });
        } else if (data.code === 400) {
          this.$notify({
            group: "notify-top-right",
            text: this.$t("dashboard.accountView.errorMessages.oldPasswordWrong"),
            duration: 5000,
            type: "error",
          });
        }

        this.passwordCredentials = {
          oldPassword: "",
          newPassword: "",
        };
        this.newPasswordConfirm = "";
        this.$v.$reset();
        loader.hide();
      }
    },

    validateState(name) {
      const { $dirty, $error } = this.$v.passwordCredentials[name];
      return $dirty ? !$error : null;
    },

    validatePasswordForm() {
      const { $dirty, $error } = this.$v.newPasswordConfirm;
      return $dirty ? !$error : null;
    },
  },
};
</script>

<style>
</style>