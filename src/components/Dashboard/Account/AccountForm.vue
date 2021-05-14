<template>
  <form class="my-5 px-3" @submit.prevent="submitAccountForm">
    <b-form-group
      :label="this.$t('username')"
      :state="validateState('username')"
      :invalid-feedback="!$v.user.username.required ? $t('messages.error.usernameRequiredError') : !$v.user.username.maxLength ? $t('messages.error.usernameMaxLengthError') : ''"
    >
      <b-input v-model.trim="user.username" :state="validateState('username')" />
    </b-form-group>
    <b-form-group
      :label="this.$t('firstName')"
      :state="validateState('firstName')"
      :invalid-feedback="!$v.user.firstName.required ? $t('messages.error.firstNameRequiredError') : !$v.user.firstName.maxLength ? $t('messages.error.firstNameMaxLengthError') : ''"
    >
      <b-input v-model.trim="user.firstName" :state="validateState('firstName')" />
    </b-form-group>
    <b-form-group
      :label="this.$t('lastName')"
      :state="validateState('lastName')"
      :invalid-feedback="!$v.user.lastName.required ? $t('messages.error.lastNameRequiredError') : !$v.user.lastName.maxLength ? $t('messages.error.lastNameMaxLengthError') : ''"
    >
      <b-input v-model.trim="user.lastName" :state="validateState('lastName')" />
    </b-form-group>
    <b-form-group
      :label="this.$t('emailAddress')"
      :state="validateState('emailAddress')"
      :invalid-feedback="!$v.user.emailAddress.required ? $t('messages.error.emailRequiredError') : !$v.user.emailAddress.email ? $t('messages.error.emailWrongFormatError') : ''"
    >
      <b-input v-model.trim="user.emailAddress" :state="validateState('emailAddress')" />
    </b-form-group>
    <b-form-group :label="this.$t('phoneNumber')">
      <b-input v-model.trim="user.phoneNumber" />
    </b-form-group>
    <b-btn type="submit" variant="landing-secondary" class="mt-4">Hesap Bilgilerini Güncelle</b-btn>
  </form>
</template>

<script>
import accountService from "@/services/accountService";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      user: {},
    };
  },

  validations: {
    user: {
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
    },
  },

  mounted() {
    this.user = this.$store.state.user;
  },

  methods: {
    async submitAccountForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        var loader = this.$loading.show();
        var data = await accountService.updateProfile(this.user);
        if (data.success) {
          this.$notify({
            group: "notify-top-right",
            text: "Hesap bilgileri başarıyla güncellendi.",
            duration: 5000,
            type: "success",
          });

          this.$store.dispatch("setToken", data.data.token);
          this.$store.dispatch("setUser", data.data.user);
        } else {
          this.$notify({
            group: "notify-top-right",
            text: "Hesap bilgileri güncellenemedi.",
            duration: 5000,
            type: "error",
          });
        }

        this.$v.$reset();
        loader.hide();
      }
    },

    validateState(name) {
      const { $dirty, $error } = this.$v.user[name];
      return $dirty ? !$error : null;
    },
  },
};
</script>

<style>
</style>