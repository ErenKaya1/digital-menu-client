<template>
  <form class="my-5 px-3" @submit.prevent="submitCompanyForm" enctype="multipart/form-data">
    <b-row>
      <b-col cols="12" sm="6">
        <b-form-group :label="$t('dashboard.accountView.logo')">
          <b-form-file :browse-text="$t('dashboard.accountView.logoInputBrowseText')" @input="imagePreview" :placeholder="$t('dashboard.accountView.logoInputPlaceholder')" :drop-placeholder="$t('dashboard.accountView.logoInputDropPlaceholder')" />
        </b-form-group>
      </b-col>
      <b-col cols="12" sm="6">
        <b-img v-if="this.imageUrl" :src="imageUrl" class="logo-preview" fluid />
      </b-col>
    </b-row>
    <b-form-group :label="$t('dashboard.accountView.companyName')">
      <b-input v-model.trim="company.name" @input="updateCompanySlug" />
    </b-form-group>
    <b-form-group :label="$t('dashboard.accountView.createMyOwnLink')">
      <b-form-checkbox v-model.trim="customSlug" />
    </b-form-group>
    <b-form-group :label="$t('dashboard.accountView.linkInputLabel')">
      <b-input-group :prepend="appUrl">
        <b-form-input v-model.trim="company.slug" :disabled="!customSlug" />
      </b-input-group>
    </b-form-group>
    <b-btn type="submit" variant="landing-secondary" class="mt-4">{{ $t("dashboard.accountView.companyFormButtonText") }}</b-btn>
  </form>
</template>

<script>
import accountService from "@/services/accountService";
export default {
  data() {
    return {
      company: {
        name: "",
        slug: "",
      },
      customSlug: false,
      imageUrl: "",
      companyModel: new FormData(),
      appUrl: process.env.VUE_APP_URL + "/menu",
    };
  },

  async mounted() {
    const companyData = await accountService.getCompany(this.$store.state.user.userId);
    if (companyData.code === 200) {
      this.company = companyData.data;
      if (companyData.data.logoName) this.imageUrl = companyData.data.logoName;
    }
  },

  methods: {
    updateCompanySlug() {
      if (!this.customSlug) {
        this.company.slug = this.company.name.toLowerCase().replaceAll("ü", "u").replaceAll("ı", "i").replaceAll("ğ", "g").replaceAll("ş", "s").replaceAll("ö", "o").replaceAll(" ", "-").replaceAll(".", "-");
      }
    },

    async submitCompanyForm() {
      var loader = this.$loading.show();
      this.companyModel.append("name", this.company.name);
      this.companyModel.append("slug", this.company.slug);

      const data = await accountService.updateCompany(this.$store.state.user.userId, this.companyModel);
      if (data.success) {
        this.company = data.data;
        this.$notify({
          group: "notify-top-right",
          text: this.$t("dashboard.accountView.messages.companyUpdatedSuccessfully"),
          duration: 5000,
          type: "success",
        });

        this.companyModel = new FormData();
      } else {
        var errorMessage = "";

        switch (data.errorCode) {
          // duplicated slug
          case 0:
            errorMessage = this.$t("dashboard.accountView.messages.duplicatedCompanySlug");
            break;
        }

        this.$notify({
          group: "notify-top-right",
          text: errorMessage,
          duration: 5000,
          type: "error",
        });
      }

      loader.hide();
    },

    imagePreview(event) {
      const fileExtension = event.name.split(".")[1];
      this.companyModel.append("logoFile", event, this.$store.state.user.userId + "." + fileExtension);
      this.imageUrl = URL.createObjectURL(event);
    },
  },
};
</script>

<style>
.logo-preview {
  max-height: 75px;
}
</style>