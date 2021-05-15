<template>
  <div class="edit-category">
    <div class="bg" @click="$router.go(-1)">
      <span class="close text-light">X</span>
    </div>
    <form @submit.prevent="submitCategoryForm" enctype="multipart/form-data">
      <h5 class="h5">{{ $t("dashboard.editCategoryView.formTitle") }}</h5>
      <hr />
      <b-form-group
        :label="$t('dashboard.editCategoryView.categoryNameTR')"
        :state="validateState('nameTR')"
        :invalid-feedback="!$v.category.nameTR.required ? $t('dashboard.editCategoryView.errorMessages.trRequired') : !$v.category.nameTR.maxLength ? $t('dashboard.editCategoryView.errorMessages.categoryNameMaxLength') : ''"
      >
        <b-input v-model="category.nameTR" :state="validateState('nameTR')" />
      </b-form-group>
      <b-form-group
        :label="$t('dashboard.editCategoryView.categoryNameEN')"
        :state="!category.nameEN ? null : validateState('nameEN')"
        :invalid-feedback="!$v.category.nameEN.maxLength ? $t('dashboard.editCategoryView.errorMessages.categoryNameMaxLength') : ''"
      >
        <b-input v-model="category.nameEN" :state="!category.nameEN ? null : validateState('nameEN')" />
      </b-form-group>
      <b-form-group :label="$t('dashboard.editCategoryView.descriptionTR')">
        <b-textarea rows="4" v-model.trim="category.descriptionTR" />
      </b-form-group>
      <b-form-group :label="$t('dashboard.editCategoryView.descriptionEN')">
        <b-textarea rows="4" v-model.trim="category.descriptionEN" />
      </b-form-group>
      <b-form-group :label="$t('dashboard.editCategoryView.categoryImage')">
        <b-form-file
          :browse-text="$t('dashboard.editCategoryView.categoryImageInputBrowseText')"
          @input="imagePreview"
          :placeholder="$t('dashboard.editCategoryView.categoryImageInputPlaceholder')"
          :drop-placeholder="$t('dashboard.editCategoryView.categoryImageInputDropPlaceholder')"
          accept="image/*"
        />
      </b-form-group>
      <b-form-group v-if="category.imagePath">
        <img :src="category.imagePath" class="image-preview" fluid />
      </b-form-group>
      <b-btn type="submit" variant="landing-secondary" class="mt-4">{{ $t("dashboard.editCategoryView.categoryFormButtonText") }}</b-btn>
      <b-btn @click="$router.go(-1)" variant="danger" class="mt-4 ml-2">{{ $t("dashboard.editCategoryView.cancelButtonText") }}</b-btn>
    </form>
  </div>
</template>

<script>
import categoryService from "@/services/categoryService";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      category: {
        id: "",
        nameTR: "",
        nameEN: "",
        descriptionTR: "",
        descriptionEN: "",
        imagePath: "",
      },

      categoryModel: new FormData(),
    };
  },

  validations: {
    category: {
      nameTR: {
        required,
        maxLength: maxLength(50),
      },
      nameEN: {
        maxLength: maxLength(50),
      },
    },
  },

  async mounted() {
    this.$title = this.$t("dashboard.editCategoryView.tabTitle");
    const categoryId = this.$route.params.id;
    const categoryData = await categoryService.getById(this.$store.state.user.userId, categoryId);
    if (categoryData.success) {
      this.category = {
        id: categoryData.data.id,
        nameTR: categoryData.data.nameTR,
        nameEN: categoryData.data.nameEN,
        descriptionTR: categoryData.data.descriptionTR,
        descriptionEN: categoryData.data.descriptionEN,
        imagePath: categoryData.data.imagePath,
      };
    }
  },

  methods: {
    async submitCategoryForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        var loader = this.$loading.show();
        this.$v.$reset();
        this.categoryModel.append("Id", this.category.id);
        this.categoryModel.append("NameTR", this.category.nameTR);
        this.categoryModel.append("NameEN", this.category.nameEN);
        this.categoryModel.append("DescriptionTR", this.category.descriptionTR);
        this.categoryModel.append("DescriptionEN", this.category.descriptionEN);

        const categoryData = await categoryService.updateCategory(this.$store.state.user.userId, this.categoryModel);
        if (categoryData.success) {
          this.$notify({
            group: "notify-top-right",
            text: this.$t("dashboard.editCategoryView.messages.categoryUpdatedSuccessfully"),
            duration: 5000,
            type: "success",
          });

          this.$root.$emit("refreshCategories");
        } else {
          this.$notify({
            group: "notify-top-right",
            text: this.$t("dashboard.editCategoryView.errorMessages.categoryUpdateFailed"),
            duration: 5000,
            type: "error",
          });
        }

        loader.hide();
      }
    },

    validateState(name) {
      const { $dirty, $error } = this.$v.category[name];
      return $dirty ? !$error : null;
    },

    imagePreview(event) {
      this.categoryModel.append("ImageFile", event, event.name);
      this.category.imagePath = URL.createObjectURL(event);
    },
  },
};
</script>


<style>
.edit-category {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
}

.edit-category .bg {
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
}

.edit-category .bg span {
  position: absolute;
  right: 30px;
  top: 20px;
  cursor: pointer;
}

.edit-category form {
  position: absolute;
  background-color: var(--color-white);
  height: 90%;
  padding: 20px;
  width: 40%;
  overflow-y: scroll;
  transition: width 0.4s ease;
}

@media screen and (max-width: 992px) {
  .edit-category form {
    width: 70%;
  }

  .edit-category .bg span {
    font-size: 18px;
  }
}

@media screen and (max-width: 576px) {
  .edit-category form {
    width: 90%;
  }

  .edit-category .bg span {
    right: 5px;
    top: 5px;
  }
}
</style>