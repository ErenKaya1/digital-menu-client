<template>
  <div>
    <common-navbar />
    <div class="contact">
      <div class="contact-content">
        <h1 class="display-4 text-center pb-4 mb-5">İletişim</h1>

        <div class="contact-channels">
          <div class="channel">
            <p>{{ $t("contactView.email") }}</p>
            <a href="mailto:info@digitalmenu-iesu.tk">info@digitalmenu-iesu.tk</a>
          </div>
          <div class="channel">
            <p>{{ $t("contactView.phone") }}</p>
            <a href="tel:123456789">123456789</a>
          </div>
          <div class="channel">
            <p>{{ $t("contactView.socialMedia") }}</p>
            <a href="https://twitter.com" target="_blank">Twitter</a>
            <a href="https://facebook.com" target="_blank">Facebook</a>
            <a href="https://instagram.com" target="_blank">Instagram</a>
          </div>
        </div>
        <div class="contact-form">
          <form @submit.prevent="submitContactForm">
            <b-form-row>
              <b-col>
                <b-form-group
                  :label="$t('contactView.firstName')"
                  :state="validateState('firstName')"
                  :invalid-feedback="!$v.message.firstName.required ? $t('contactView.errorMessages.firstNameRequired') : !$v.message.firstName.maxLength ? $t('contactView.errorMessages.firstNameMaxLength') : ''"
                >
                  <b-input v-model.trim="message.firstName" type="text" :state="validateState('firstName')" />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group
                  :label="$t('contactView.lastName')"
                  :state="validateState('lastName')"
                  :invalid-feedback="!$v.message.lastName.required ? $t('contactView.errorMessages.lastNameRequired') : !$v.message.lastName.maxLength ? $t('contactView.errorMessages.lastNameMaxLength') : ''"
                >
                  <b-input v-model.trim="message.lastName" type="text" :state="validateState('lastName')" />
                </b-form-group>
              </b-col>
            </b-form-row>
            <b-form-group
              :label="$t('contactView.email')"
              :state="validateState('emailAddress')"
              :invalid-feedback="!$v.message.emailAddress.required ? $t('contactView.errorMessages.emailRequired') : !$v.message.emailAddress.email ? $t('contactView.errorMessages.emailFormat') : ''"
            >
              <b-input v-model.trim="message.emailAddress" type="text" :state="validateState('emailAddress')" />
            </b-form-group>
            <b-form-group :label="$t('contactView.message')" :state="validateState('content')" :invalid-feedback="!$v.message.content.required ? $t('contactView.errorMessages.contentRequired') : ''">
              <b-textarea v-model.trim="message.content" rows="5" :state="validateState('content')"></b-textarea>
            </b-form-group>
            <b-button type="submit" variant="landing-primary">{{ $t("contactView.formButtonText") }}</b-button>
          </form>
        </div>
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
import CommonNavbar from "@/components/Common/Navbar.vue";
import AppFooter from "@/components/Landing/Footer.vue";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  components: { CommonNavbar, AppFooter },

  data() {
    return {
      message: {
        firstName: "",
        lastName: "",
        emailAddress: "",
        content: "",
      },
    };
  },

  validations: {
    message: {
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
      content: {
        required,
      },
    },
  },

  mounted() {
    this.$title = this.$t("contactView.tabTitle");
  },

  methods: {
    submitContactForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$notify({
          group: "notify-top-right",
          text: this.$t("contactView.messages.messageSentSuccessfully"),
          duration: 5000,
          type: "success",
        });

        this.$v.$reset();
        this.message = {
          firstName: "",
          lastName: "",
          emailAddress: "",
          content: "",
        };
      }
    },

    validateState(name) {
      const { $dirty, $error } = this.$v.message[name];
      return $dirty ? !$error : null;
    },
  },
};
</script>

<style>
@import "../../node_modules/@fontsource/comfortaa/700.css";

.contact {
  background-color: var(--color-white);
  margin-top: 90px;
  width: 100%;
}

.contact-content {
  padding-top: 50px;
  padding-bottom: 50px;
  width: 40%;
  margin: auto;
}

.contact-content h1 {
  color: var(--color-landing-primary);
  font-family: "Comfortaa";
}

.contact .contact-channels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 60px;
}

.contact .contact-channels {
  text-align: center;
}

.contact .contact-channels p {
  font-weight: bold;
  margin-bottom: 20px;
  text-decoration: underline;
}

.contact .contact-channels a {
  display: block;
  color: var(--color-muted);
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .contact-content h1 {
    font-size: 36px;
  }

  .contact .contact-channels p {
    margin-bottom: 5px;
  }

  .contact .contact-channels .channel {
    margin-bottom: 20px;
  }

  .contact-content {
    width: 80%;
  }

  .contact .contact-channels {
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 60px;
  }
}
</style>