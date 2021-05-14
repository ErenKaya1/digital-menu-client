<template>
  <form class="px-3 my-5" @submit.prevent="submitPasswordForm">
    <b-form-group label="Eski Parola" :state="validateState('oldPassword')" :invalid-feedback="!$v.passwordCredentials.oldPassword.required ? 'Lütfen eski parolanızı giriniz.' : ''">
      <b-input type="password" v-model.trim="passwordCredentials.oldPassword" :state="validateState('oldPassword')" />
    </b-form-group>
    <b-form-group
      label="Yeni Parola"
      :state="passwordCredentials.oldPassword === '' ? null : validateState('newPassword')"
      :invalid-feedback="!$v.passwordCredentials.newPassword.required ? $t('messages.error.passwordRequiredError') : !$v.passwordCredentials.newPassword.minLength ? $t('messages.error.passwordLengthError') : ''"
    >
      <b-input type="password" v-model.trim="passwordCredentials.newPassword" :disabled="passwordCredentials.oldPassword == ''" :state="passwordCredentials.oldPassword === '' ? null : validateState('newPassword')" />
    </b-form-group>
    <b-form-group
      label="Yeni Parola Tekrar"
      :state="passwordCredentials.oldPassword === '' ? null : validatePasswordForm()"
      :invalid-feedback="!$v.newPasswordConfirm.required ? 'Parola doğrulama alanı boş bırakılamaz.' : !$v.newPasswordConfirm.sameAs ? 'Parolalar uyuşmuyor' : ''"
    >
      <b-input type="password" v-model.trim="newPasswordConfirm" :disabled="passwordCredentials.oldPassword == ''" :state="passwordCredentials.oldPassword === '' ? null : validatePasswordForm()" />
    </b-form-group>
    <b-btn type="submit" variant="landing-secondary" class="mt-4">Parolayı Güncelle</b-btn>
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
            text: "Parola başarıyla güncellendi.",
            duration: 5000,
            type: "success",
          });
        } else if (data.code === 400) {
          this.$notify({
            group: "notify-top-right",
            text: "Eski parola hatalı",
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