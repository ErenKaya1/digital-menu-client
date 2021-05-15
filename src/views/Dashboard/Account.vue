<template>
  <b-card no-body>
    <b-tabs card>
      <b-tab :title="$t('dashboard.accountView.accountSettingsTitle')" title-link-class="text-secondary" active>
        <account-form />
      </b-tab>
      <b-tab :title="$t('dashboard.accountView.companySettingsTitle')" title-link-class="text-secondary">
        <company-form />
      </b-tab>
      <b-tab :title="$t('dashboard.accountView.passwordSettingsTitle')" title-link-class="text-secondary">
        <password-form />
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import AccountForm from "../../components/Dashboard/Account/AccountForm.vue";
import CompanyForm from "../../components/Dashboard/Account/CompanyForm.vue";
import PasswordForm from "../../components/Dashboard/Account/PasswordForm.vue";
export default {
  components: { AccountForm, CompanyForm, PasswordForm },
  async mounted() {
    this.$title = this.$t("dashboard.accountView.tabTitle");
  },
};
</script>
