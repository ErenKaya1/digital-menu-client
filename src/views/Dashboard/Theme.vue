<template>
  <table-loader v-if="!isLoaded" />
  <b-row v-else>
    <b-col cols="12" sm="6" xl="7">
      <form @submit.prevent="submitThemeForm" class="border p-3 theme-form">
        <b-form-row>
          <b-col cols="12" lg="6" xl="4">
            <b-form-group :label="$t('dashboard.themeView.background')">
              <b-input type="color" v-model.trim="styles.menu.backgroundColor" />
            </b-form-group>
          </b-col>
          <b-col cols="12" lg="6" xl="4">
            <b-form-group :label="$t('dashboard.themeView.texts')">
              <b-input type="color" v-model.trim="styles.text.color" />
            </b-form-group>
          </b-col>
          <b-col cols="12" lg="6" xl="4">
            <b-form-group :label="$t('dashboard.themeView.price')">
              <b-input type="color" v-model.trim="styles.price.color" />
            </b-form-group>
          </b-col>
          <b-col cols="12" lg="6" xl="4">
            <b-form-group :label="$t('dashboard.themeView.productBackground')">
              <b-input type="color" v-model.trim="styles.product.backgroundColor" />
            </b-form-group>
          </b-col>
          <b-col cols="12" lg="6" xl="4">
            <b-form-group :label="$t('dashboard.themeView.languageCurrencyBackground')">
              <b-input type="color" v-model.trim="styles.languageCurrency.backgroundColor" />
            </b-form-group>
          </b-col>
          <b-col cols="12" lg="6" xl="4">
            <b-form-group :label="$t('dashboard.themeView.languageCurrencyText')">
              <b-input type="color" v-model.trim="styles.languageCurrency.color" />
            </b-form-group>
          </b-col>
          <b-col cols="12" lg="6" xl="4">
            <b-form-group :label="$t('dashboard.themeView.categoryDescription')">
              <b-input type="color" v-model.trim="styles.category.description.color" />
            </b-form-group>
          </b-col>
          <b-col cols="12" lg="6" xl="4">
            <b-form-group :label="$t('dashboard.themeView.selectedCategoryBorder')">
              <b-input type="color" v-model.trim="styles.category.border.borderColor" />
            </b-form-group>
          </b-col>
          <b-col cols="12" lg="6" xl="4">
            <b-form-group :label="$t('dashboard.themeView.links')">
              <b-input type="color" v-model.trim="styles.link.color" />
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-button type="submit" variant="landing-secondary">{{ $t("dashboard.themeView.themeFormButtonText") }}</b-button>
      </form>
    </b-col>
    <b-col cols="12" sm="6" xl="5">
      <menu-preview :styles="styles" />
    </b-col>
  </b-row>
</template>

<script>
import MenuPreview from "@/components/Dashboard/Theme/MenuPreview.vue";
import menuService from "@/services/menuService";
import TableLoader from "@/components/TableLoader.vue";

export default {
  components: { MenuPreview, TableLoader },

  data() {
    return {
      styles: {
        menu: {
          backgroundColor: "#F5F5F5",
        },
        text: {
          color: "#3B3E42",
        },
        link: {
          color: "#4e5155",
        },
        price: {
          color: "#3AB5A1",
        },
        product: {
          backgroundColor: "#F5F5F5",
        },
        languageCurrency: {
          backgroundColor: "#3AB5A1",
          color: "#F5F5F5",
        },
        category: {
          description: {
            color: "#C1C1C1",
          },
          border: {
            borderBottom: "2px solid",
            borderColor: "#3AB5A1",
          },
        },
      },

      logo: null,
      themeModel: new FormData(),
      isLoaded: false,
    };
  },

  methods: {
    async submitThemeForm() {
      var loader = this.$loading.show();
      this.themeModel.append("BackgroundColor", this.styles.menu.backgroundColor);
      this.themeModel.append("TextColor", this.styles.text.color);
      this.themeModel.append("PriceColor", this.styles.price.color);
      this.themeModel.append("CategoryDescriptionColor", this.styles.category.description.color);
      this.themeModel.append("SelectedCategoryBorderColor", this.styles.category.border.borderColor);
      this.themeModel.append("ProductBackgroundColor", this.styles.product.backgroundColor);
      this.themeModel.append("LanguageCurrencyBackgroundColor", this.styles.languageCurrency.backgroundColor);
      this.themeModel.append("LanguageCurrencyTextColor", this.styles.languageCurrency.color);
      this.themeModel.append("LinkColor", this.styles.link.color);

      const response = await menuService.updateMenuTheme(this.$store.state.user.userId, this.themeModel);
      if (response.success) {
        this.$notify({
          group: "notify-top-right",
          text: this.$t("dashboard.themeView.messages.themeUpdatedSuccessfully"),
          duration: 5000,
          type: "success",
        });
      } else {
        this.$notify({
          group: "notify-top-right",
          text: this.$t("dashboard.themeView.errorMessages.themeUpdateFailed"),
          duration: 5000,
          type: "success",
        });
      }

      loader.hide();
    },
  },

  async mounted() {
    this.$title = this.$t("dashboard.themeView.tabTitle");
    const themeResponse = await menuService.getMenuTheme(this.$store.state.user.userId);
    if (themeResponse.success) {
      this.styles = {
        menu: {
          backgroundColor: themeResponse.data.backgroundColor,
        },
        text: {
          color: themeResponse.data.textColor,
        },
        link: {
          color: themeResponse.data.linkColor,
        },
        price: {
          color: themeResponse.data.priceColor,
        },
        product: {
          backgroundColor: themeResponse.data.productBackgroundColor,
        },
        languageCurrency: {
          backgroundColor: themeResponse.data.languageCurrencyBackgroundColor,
          color: themeResponse.data.languageCurrencyTextColor,
        },
        category: {
          description: {
            color: themeResponse.data.categoryDescriptionColor,
          },
          border: {
            borderBottom: "2px solid",
            borderColor: themeResponse.data.selectedCategoryBorderColor,
          },
        },
      };
    }

    this.isLoaded = true;
  },
};
</script>

<style>
.theme-form {
  border-radius: 10px;
}
</style>