<template>
  <b-alert v-if="isCompanyCreated === false" variant="warning" show>Henüz işletme bilgilerinizi oluşturmadınız.</b-alert>
  <div v-else>
    <div class="border p-3 qrcode-form">
      <b-form-row>
        <b-col cols="12" sm="6">
          <b-form-group :label="$t('dashboard.qrView.margin')">
            <b-input @input="generateQRCode" v-model.trim="QRCodeOptions.margin" />
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6">
          <b-form-group :label="$t('dashboard.qrView.scale')">
            <b-input @input="generateQRCode" v-model.trim="QRCodeOptions.scale" />
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6">
          <b-form-group :label="$t('dashboard.qrView.qrCodeColor')">
            <b-input @input="generateQRCode" type="color" v-model.trim="QRCodeOptions.color.dark" />
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6">
          <b-form-group :label="$t('dashboard.qrView.backgroundColor')">
            <b-input @input="generateQRCode" type="color" v-model.trim="QRCodeOptions.color.light" />
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6">
          <b-form-group :label="$t('dashboard.qrView.fileFormat')">
            <b-form-select @input="generateQRCode" :options="imageTypes" v-model="QRCodeOptions.type" />
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6">
          <b-form-group :label="$t('dashboard.qrView.quality')">
            <b-input @input="generateQRCode" :disabled="QRCodeOptions.type === 'image/png'" v-model="QRCodeOptions.quality" />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group>
            <b-link download="digital_menu" :href="this.imageUrl" class="btn btn-landing-secondary">{{ $t("dashboard.qrView.downloadButtonText") }}</b-link>
          </b-form-group>
        </b-col>
      </b-form-row>
    </div>
    <b-container v-if="imageUrl" fluid class="text-center mt-5">
      <b-img :src="imageUrl" fluid />
    </b-container>
  </div>
</template>

<script>
import QRCode from "qrcode";
import accountService from "@/services/accountService";

export default {
  data() {
    return {
      QRCodeOptions: {
        margin: 4,
        scale: 4,
        quality: 0.92,
        type: "image/png",
        color: {
          dark: "",
          light: "",
        },
      },

      imageTypes: [
        { value: "image/png", text: "PNG" },
        { value: "image/jpeg", text: "JPEG" },
        { value: "image/webp", text: "WEBP" },
      ],

      imageUrl: "",
      company: {},
      isCompanyCreated: true,
    };
  },

  async mounted() {
    this.$title = this.$t("dashboard.qrView.tabTitle");
    const companyData = await accountService.getCompany(this.$store.state.user.userId);
    if (companyData.code === 200) {
      this.company = companyData.data;
    } else {
      this.isCompanyCreated = false;
    }

    await this.generateQRCode();
  },

  methods: {
    async generateQRCode() {
      this.imageUrl = await QRCode.toDataURL(`${process.env.VUE_APP_URL}/menu/${this.company.slug}`, this.QRCodeOptions);
    },
  },
};
</script>

<style>
.qrcode-form {
  border-radius: 10px;
}
</style>