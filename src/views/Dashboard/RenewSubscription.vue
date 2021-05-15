<template>
  <div>
    <div v-if="isSubscribe">
      <b-alert variant="warning" show>{{ $t("dashboard.renewSubscriptionView.messages.alreadySubscribe") }}</b-alert>
    </div>
    <div v-else class="renew-subscription">
      <h3 class="renew-subscription-title">{{ $t("dashboard.renewSubscriptionView.subscriptionTypesTitle") }}</h3>
      <b-row>
        <b-col md="4" class="d-flex flex-column py-4 text-center" :class="index != 2 ? 'pricing-bordered' : ''" v-for="(type, index) in subscriptionTypes" :key="type.id">
          <h5 class="m-0">{{ type.title }}</h5>
          <div class="flex-grow-1">
            <div class="py-4 my-2">
              <span class="d-inline-block text-muted text-big align-middle mr-2">₺</span>
              <span class="display-3 d-inline-block font-weight-bold align-middle pricing-price">{{ type.price }}</span>
              <span class="d-inline-block text-muted text-big align-middle ml-2">/ {{ $t("dashboard.renewSubscriptionView.montlyPeriod") }}</span>
            </div>
            <div class="pb-5">
              <p class="mb-2" v-for="(feature, index) in type.features" :key="index">{{ feature.isUnlimited ? $t("dashboard.renewSubscriptionView.unlimited") : feature.totalValue }} {{ feature.name }}</p>
            </div>
            <b-button :variant="type.id === selectedSubscriptionTypeId ? 'primary' : 'outline-primary'" @click="selectSubscriptionType(type.id)">{{ $t("dashboard.renewSubscriptionView.subscriptionTypesButtonText") }}</b-button>
          </div>
        </b-col>
      </b-row>
      <vue-pay-card class="mt-5" :value-fields="creditCard" :labels="labels" :is-card-number-masked="false" />
      <div class="payment-form">
        <form @submit.prevent="renewSubscription">
          <b-form-group :label="$t('dashboard.renewSubscriptionView.cardHolder')" :state="validateState('cardName')" :invalid-feedback="$t('dashboard.renewSubscriptionView.errorMessages.cardHolderRequired')">
            <b-input id="v-card-name" data-card-field v-model="creditCard.cardName" placeholder="Eren Kaya" :state="validateState('cardName')" />
          </b-form-group>
          <b-form-group :label="$t('dashboard.renewSubscriptionView.cardNumber')" :state="validateState('cardNumber')" :invalid-feedback="$t('dashboard.renewSubscriptionView.errorMessages.cardNumberRequired')">
            <b-input maxlength="19" @input="formatCardNumber" id="v-card-number" data-card-field v-model="creditCard.cardNumber" placeholder="4242 4242 4242 4242" :state="validateState('cardNumber')" />
          </b-form-group>
          <b-form-row>
            <b-col>
              <b-form-group :label="$t('dashboard.renewSubscriptionView.cardMonth')" :state="validateState('cardMonth')" :invalid-feedback="$t('dashboard.renewSubscriptionView.errorMessages.cardMonthRequired')">
                <b-input id="v-card-month" data-card-field v-model="creditCard.cardMonth" placeholder="12" :state="validateState('cardMonth')" />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group :label="$t('dashboard.renewSubscriptionView.cardYear')" :state="validateState('cardYear')" :invalid-feedback="$t('dashboard.renewSubscriptionView.errorMessages.cardYearRequired')">
                <b-input id="v-card-year" data-card-field v-model="creditCard.cardYear" placeholder="2021" :state="validateState('cardYear')" />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group :label="$t('dashboard.renewSubscriptionView.cardCvv')" :state="validateState('cardCvv')" :invalid-feedback="$t('dashboard.renewSubscriptionView.errorMessages.cardCvvRequired')">
                <b-input id="v-card-cvv" data-card-field v-model="creditCard.cardCvv" placeholder="000" :state="validateState('cardCvv')" />
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-button type="submit" variant="landing-secondary" block>{{ $t("dashboard.renewSubscriptionView.paymentFormButtonText") }}</b-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import subscriptionService from "@/services/subscriptionService";
import VuePayCard from "vue-paycard";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  components: { VuePayCard },

  data() {
    return {
      subscriptionTypes: [],
      selectedSubscriptionTypeId: "",
      creditCard: {
        cardName: "",
        cardNumber: "",
        cardMonth: "",
        cardYear: "",
        cardCvv: "",
      },
      labels: {
        cardHolder: this.$t("dashboard.renewSubscriptionView.cardHolder"),
        cardExpires: this.$t("dashboard.renewSubscriptionView.cardDate"),
        cardCvv: "CVV",
      },
      subscriptionModel: new FormData(),
      isSubscribe: true,
    };
  },

  validations: {
    creditCard: {
      cardName: {
        required,
      },
      cardNumber: {
        required,
        minLength: minLength(19),
      },
      cardMonth: {
        required,
      },
      cardYear: {
        required,
      },
      cardCvv: {
        required,
      },
    },
  },

  async mounted() {
    this.$title = this.$t("dashboard.renewSubscriptionView.tabTitle");
    const currentSubscription = await subscriptionService.checkSubscriptionStatus(this.$store.state.user.userId);
    if (currentSubscription.success && currentSubscription.message === "Expired") {
      const subscriptionTypesResponse = await subscriptionService.getSubscriptionTypes();
      if (subscriptionTypesResponse.success) {
        this.subscriptionTypes = subscriptionTypesResponse.data;
      }

      this.isSubscribe = false;
    }
  },

  methods: {
    async renewSubscription() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (!this.selectedSubscriptionTypeId) {
          this.$notify({
            group: "notify-top-right",
            text: this.$t("dashboard.renewSubscriptionView.errorMessages.subscriptionTypeRequired"),
            duration: 5000,
            type: "error",
          });

          return;
        }

        var loader = this.$loading.show();

        this.subscriptionModel.append("SubscriptionTypeId", this.selectedSubscriptionTypeId);
        this.subscriptionModel.append("CardHolder", this.creditCard.cardName);
        this.subscriptionModel.append("CardNumber", this.creditCard.cardNumber.replace(/ /g, ""));
        this.subscriptionModel.append("CardMonth", this.creditCard.cardMonth);
        this.subscriptionModel.append("CardYear", this.creditCard.cardYear);
        this.subscriptionModel.append("CardCvv", this.creditCard.cardCvv);

        const response = await subscriptionService.renewSubscription(this.$store.state.user.userId, this.subscriptionModel);
        if (response.success) {
          this.$notify({
            group: "notify-top-right",
            text: this.$t("dashboard.renewSubscriptionView.messages.subscriptionRenewedSuccessfully"),
            duration: 5000,
            type: "success",
          });

          setTimeout(() => {
            this.$router.push("/dashboard");
          }, 2000);
        } else {
          this.$v.$reset();
          var message = this.$t("dashboard.renewSubscriptionView.errorMessages.paymentCommon");
          console.log(response);

          switch (response.message) {
            case "10051":
              message = this.$t("dashboard.renewSubscriptionView.errorMessages.inadequateLimit");
              break;

            case "10005":
              message = this.$t("dashboard.renewSubscriptionView.errorMessages.notApproved");
              break;

            case "10012":
              message = this.$t("dashboard.renewSubscriptionView.errorMessages.invalidTransaction");
              break;

            case "10041":
            case "10051":
              message = this.$t("dashboard.renewSubscriptionView.errorMessages.lostStolenCard");
              break;

            case "10054":
              message = this.$t("dashboard.renewSubscriptionView.errorMessages.expiredCard");
              break;

            case "10084":
              message = this.$t("dashboard.renewSubscriptionView.errorMessages.invalidCvv");
              break;

            case "10057":
              message = this.$t("dashboard.renewSubscriptionView.errorMessages.cardHolderCant");
              break;

            case "10058":
              message = this.$t("dashboard.renewSubscriptionView.errorMessages.terminalCant");
              break;

            case "10093":
              message = this.$t("dashboard.renewSubscriptionView.errorMessages.unavailableForEcommerce");
              break;

            case "10201":
              message = this.$t("dashboard.renewSubscriptionView.errorMessages.cardDidntAllow");
              break;

            case "10206":
              message = this.$t("dashboard.renewSubscriptionView.errorMessages.invalidCvvLength");
              break;

            case "10207":
              message = this.$t("dashboard.renewSubscriptionView.errorMessages.bankConfirmation");
              break;

            case "10214":
              message = this.$t("dashboard.renewSubscriptionView.errorMessages.systemFailure");
              break;

            case "10215":
              message = this.$t("dashboard.renewSubscriptionView.errorMessages.invalidCardNumber");
              break;

            case "10216":
              message = this.$t("dashboard.renewSubscriptionView.errorMessages.bankNotFound");
              break;

            case "10217":
              message = this.$t("dashboard.renewSubscriptionView.errorMessages.3dSecureRequired");
              break;

            case "10219":
              message = this.$t("dashboard.renewSubscriptionView.errorMessages.timedOut");
              break;

            case "10225":
              message = this.$t("dashboard.renewSubscriptionView.errorMessages.limitedCard");
              break;

            case "10228":
              message = this.$t("dashboard.renewSubscriptionView.errorMessages.bankCannotProcess");
              break;

            case "10229":
              message = this.$t("dashboard.renewSubscriptionView.errorMessages.invalidExpirationDate");
              break;

            case "10232":
              message = this.$t("dashboard.renewSubscriptionView.errorMessages.invalidAmount");
              break;
          }

          this.$notify({
            group: "notify-top-right",
            text: message,
            duration: 5000,
            type: "error",
          });

          this.subscriptionModel = new FormData();
        }

        loader.hide();
      }
    },

    selectSubscriptionType(id) {
      this.selectedSubscriptionTypeId = id;
    },

    validateState(name) {
      const { $dirty, $error } = this.$v.creditCard[name];
      return $dirty ? !$error : null;
    },

    formatCardNumber(value) {
      value = value.replace(/\s/g, "");
      var newValue = "";

      for (var i = 0; i < value.length; i++) {
        if (i % 4 == 0 && i > 0) newValue = newValue.concat(" ");
        newValue = newValue.concat(value[i]);
      }

      this.creditCard.cardNumber = newValue;
    },
  },
};
</script>

<style>
.pricing-bordered {
  border-right: 1px solid var(--color-muted);
}

.renew-subscription h5 {
  font-weight: 500;
  color: var(--color-footer-text);
}

.pricing-price {
  font-weight: 700;
  color: var(--color-footer-text);
}

.renew-subscription-title {
  text-align: center;
  margin-bottom: 30px;
  letter-spacing: 2px;
  color: var(--color-footer-text);
}

.payment-form {
  display: flex;
  justify-content: center;
}

.payment-form form {
  width: 430px;
  margin-top: 50px;
}
</style>