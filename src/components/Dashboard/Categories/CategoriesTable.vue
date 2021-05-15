<template>
  <table-loader v-if="!isLoaded" />
  <div v-else>
    <b-table :items="categories" :fields="fields" thead-class="table-header" bordered hover head-variant="dark" v-if="categories.length > 0" class="dashboard-table">
      <template #cell(nameTR)="row">{{ row.value }}</template>
      <template #cell(nameEN)="row">{{ row.value }}</template>
      <template #cell(actions)="row">
        <b-button @click="$router.push(`/dashboard/category/edit/${row.item.id}`)" size="sm" variant="info" class="mr-1">{{ $t("dashboard.categoriesView.editCategoryButtonText") }}</b-button>
        <b-button size="sm" variant="danger" @click="deleteCategory(row.item)" class="mr-1">{{ $t("dashboard.categoriesView.deleteCategoryButtonText") }}</b-button>
      </template>
    </b-table>
    <b-alert variant="warning" show v-else>{{ $t("dashboard.categoriesView.messages.noCategoryAdded") }}</b-alert>
  </div>
</template>

<script>
import categoryService from "@/services/categoryService";
import TableLoader from "@/components/TableLoader.vue";

export default {
  components: { TableLoader },
  data() {
    return {
      categories: [],
      fields: [
        { key: "nameTR", label: this.$t("dashboard.categoriesView.tableFields.categoryNameTR"), sortable: true },
        { key: "nameEN", label: this.$t("dashboard.categoriesView.tableFields.categoryNameEN"), sortable: true },
        { key: "actions", label: this.$t("dashboard.categoriesView.tableFields.options"), tdClass: "options-column", thClass: "options-column" },
      ],
      isLoaded: false,
    };
  },

  async mounted() {
    await this.fetchCategories();

    this.$root.$on("refreshCategories", async () => {
      this.isLoaded = false;
      await this.fetchCategories();
    });
  },

  methods: {
    deleteCategory(category) {
      this.$bvModal
        .msgBoxConfirm(this.$t("dashboard.categoriesView.messages.confirmDeleteCategory"), {
          title: this.$t("dashboard.categoriesView.messages.confirmDeleteCategoryTitle"),
          centered: true,
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: this.$t("common.yes").toUpperCase(),
          cancelTitle: this.$t("common.no").toUpperCase(),
          cancelVariant: "dark",
        })
        .then(async (value) => {
          if (value) {
            const response = await categoryService.deleteCategory(this.$store.state.user.userId, category.id);
            if (response.code === 200) {
              this.$notify({
                group: "notify-top-right",
                text: this.$t("dashboard.categoriesView.messages.categoryDeletedSuccessfully"),
                duration: 5000,
                type: "info",
              });

              this.refreshCategories();
            }
          }
        });
    },

    async refreshCategories() {
      await this.fetchCategories();
    },

    async fetchCategories() {
      const categoryData = await categoryService.getAllCategories(this.$store.state.user.userId);
      if (categoryData.code === 200) {
        this.categories = categoryData.data;
      }

      this.isLoaded = true;
    },
  },
};
</script>
