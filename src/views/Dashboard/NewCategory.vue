<template>
  <div class="new-category">
    <div class="bg" @click="$router.go(-1)">
      <span class="close text-light">X</span>
    </div>
    <form @submit.prevent="submitCategoryForm" enctype="multipart/form-data">
      <h5 class="h5">{{ $t("dashboard.newCategoryView.formTitle") }}</h5>
      <hr />
      <b-form-group
        :label="$t('dashboard.newCategoryView.categoryNameTR')"
        :state="validateState('nameTR')"
        :invalid-feedback="!$v.category.nameTR.required ? $t('dashboard.newCategoryView.errorMessages.trRequired') : !$v.category.nameTR.maxLength ? $t('dashboard.newCategoryView.errorMessages.categoryNameMaxLength') : ''"
      >
        <b-input v-model="category.nameTR" :state="validateState('nameTR')" />
      </b-form-group>
      <b-form-group :label="$t('dashboard.newCategoryView.categoryNameEN')" :state="!category.nameEN ? null : validateState('nameEN')" :invalid-feedback="!$v.category.nameEN.maxLength ? $t('dashboard.newCategoryView.errorMessages.categoryNameMaxLength') : ''">
        <b-input v-model="category.nameEN" :state="!category.nameEN ? null : validateState('nameEN')" />
      </b-form-group>
      <b-form-group :label="$t('dashboard.newCategoryView.descriptionTR')">
        <b-textarea rows="4" v-model.trim="category.descriptionTR" />
      </b-form-group>
      <b-form-group :label="$t('dashboard.newCategoryView.descriptionEN')">
        <b-textarea rows="4" v-model.trim="category.descriptionEN" />
      </b-form-group>
      <b-form-group :label="$t('dashboard.newCategoryView.categoryImage')">
        <b-form-file
          :browse-text="$t('dashboard.newCategoryView.categoryImageInputBrowseText')"
          @input="imagePreview"
          :placeholder="$t('dashboard.newCategoryView.categoryImageInputPlaceholder')"
          :drop-placeholder="$t('dashboard.newCategoryView.categoryImageInputDropPlaceholder')"
          accept="image/*"
        />
      </b-form-group>
      <b-form-group v-if="imageUrl">
        <img :src="imageUrl" class="image-preview" fluid />
      </b-form-group>
      <b-btn type="submit" variant="landing-secondary" class="mt-4">{{ $t("dashboard.newCategoryView.categoryFormButtonText") }}</b-btn>
      <b-btn @click="$router.go(-1)" variant="danger" class="mt-4 ml-2">{{ $t("dashboard.newCategoryView.cancelButtonText") }}</b-btn>
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
        nameTR: "",
        nameEN: "",
        descriptionTR: "",
        descriptionEN: "",
      },
      categoryModel: new FormData(),
      imageUrl: "",
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

  mounted() {
    this.$title = this.$t("dashboard.newCategoryView.tabTitle");
  },

  methods: {
    async submitCategoryForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        var loader = this.$loading.show();
        this.categoryModel.append("NameTR", this.category.nameTR);
        this.categoryModel.append("NameEN", this.category.nameEN);
        this.categoryModel.append("DescriptionTR", this.category.descriptionTR);
        this.categoryModel.append("DescriptionEN", this.category.descriptionEN);

        const data = await categoryService.insertCategory(this.$store.state.user.userId, this.categoryModel);
        if (data.code === 200) {
          this.$notify({
            group: "notify-top-right",
            text: this.$t("dashboard.newCategoryView.messages.categorySavedSuccessfully"),
            duration: 5000,
            type: "success",
          });
        }

        this.$root.$emit("refreshCategories");
        this.$router.push("/dashboard/categories");
        loader.hide();
      }
    },

    validateState(name) {
      const { $dirty, $error } = this.$v.category[name];
      return $dirty ? !$error : null;
    },

    imagePreview(event) {
      this.categoryModel.append("ImageFile", event, event.name);
      this.imageUrl = URL.createObjectURL(event);
    },
  },
};
</script>

<style>
.new-category {
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

.new-category .bg {
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
}

.new-category .bg span {
  position: absolute;
  right: 30px;
  top: 20px;
  cursor: pointer;
}

.new-category form {
  position: absolute;
  background-color: var(--color-white);
  height: 90%;
  padding: 20px;
  width: 40%;
  overflow-y: scroll;
  transition: width 0.4s ease;
}

@media screen and (max-width: 992px) {
  .new-category form {
    width: 70%;
  }

  .new-category .bg span {
    font-size: 18px;
  }
}

@media screen and (max-width: 576px) {
  .new-category form {
    width: 90%;
  }

  .new-category .bg span {
    right: 5px;
    top: 5px;
  }
}
</style>