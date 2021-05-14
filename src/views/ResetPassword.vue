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

          <h5 class="text-center text-muted font-weight-normal mb-4">{{ $t("forgotPasswordView.formTitle") }}</h5>
          <hr class="mt-0 mb-4" />
          <b-form-group label="Yeni Parola" :state="validateNewPassword()" :invalid-feedback="!$v.credentials.newPassword.required ? 'Zorunlu Alan' : !$v.credentials.newPassword.minLength ? 'Parola en az 6 karakter uzunluğunda olmalıdır.' : ''">
            <b-input v-model="credentials.newPassword" type="password" :state="validateNewPassword()" />
          </b-form-group>
          <b-form-group label="Yeni Parola Tekrar" :state="validateNewPasswordConfirm()" :invalid-feedback="!$v.newPasswordConfirm.required ? 'Zorunlu Alan' : !$v.newPasswordConfirm.sameAs ? 'Parolalar uyuşmuyor.' : ''">
            <b-input v-model="newPasswordConfirm" type="password" :state="validateNewPasswordConfirm()" />
          </b-form-group>

          <b-btn type="submit" variant="landing-primary" :block="true">Parola Sıfırla</b-btn>
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
    this.credentials = {
      userId: this.$route.params.userId,
      token: this.$route.params.token,
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
            text: "Parolanız başarıyla değiştirildi. Yeni parolanızla giriş yapabilirsiniz.",
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
              this.errorMessage = "Parola yenileme bağlantısının süresi doldu.";
              break;

            // invalid reset password token
            case 5:
              this.errorMessage = "Parola yenileme bağlantısı geçersiz.";
              break;

            default:
              this.errorMessage = "Parola değiştirilirken bir hata meydana geldi.";
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
