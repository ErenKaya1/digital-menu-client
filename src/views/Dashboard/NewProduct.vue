<template>
  <div class="new-product">
    <div class="bg" @click="$router.go(-1)">
      <span class="close text-light">X</span>
    </div>
    <form @submit.prevent="submitProductForm" enctype="multipart/form-data">
      <h5 class="h5">{{ $t("dashboard.newProductView.formTitle") }}</h5>
      <hr />
      <b-form-group
        :label="$t('dashboard.newProductView.productNameTR')"
        :state="validateState('nameTR')"
        :invalid-feedback="!$v.product.nameTR.required ? $t('dashboard.newProductView.errorMessages.trRequired') : !$v.product.nameTR.maxLength ? $t('dashboard.newProductView.errorMessages.productNameMaxLength') : ''"
      >
        <b-input v-model.trim="product.nameTR" :state="validateState('nameTR')" />
      </b-form-group>
      <b-form-group
        :label="$t('dashboard.newProductView.productNameEN')"
        :state="!product.nameEN ? null : validateState('nameEN')"
        :invalid-feedback="!$v.product.nameEN.maxLength ? $t('dashboard.newProductView.errorMessages.productNameMaxLength') : ''"
      >
        <b-input v-model.trim="product.nameEN" :state="!product.nameEN ? null : validateState('nameEN')" />
      </b-form-group>
      <b-form-group :label="$t('dashboard.newProductView.price')" :state="validateState('price')" :invalid-feedback="!$v.product.price.required ? $t('dashboard.newProductView.errorMessages.priceRequired') : ''">
        <b-input v-model.trim="product.price" :state="validateState('price')" />
      </b-form-group>
      <b-form-group :label="$t('dashboard.newProductView.category')" :state="validateState('categoryId')" :invalid-feedback="!$v.product.categoryId.required ? $t('dashboard.newProductView.errorMessages.categoryRequired') : ''">
        <b-form-select v-model="product.categoryId" :options="categories" :state="validateState('categoryId')" />
      </b-form-group>
      <b-form-group :label="$t('dashboard.newProductView.descriptionTR')">
        <b-textarea rows="4" v-model.trim="product.descriptionTR" />
      </b-form-group>
      <b-form-group :label="$t('dashboard.newProductView.descriptionEN')">
        <b-textarea rows="4" v-model.trim="product.descriptionEN" />
      </b-form-group>
      <b-form-group :label="$t('dashboard.newProductView.productImage')">
        <b-form-file
          :browse-text="$t('dashboard.newProductView.productImageInputBrowseText')"
          @input="imagePreview"
          :placeholder="$t('dashboard.newProductView.productImageInputPlaceholder')"
          :drop-placeholder="$t('dashboard.newProductView.productImageInputDropPlaceholder')"
          accept="image/*"
        />
      </b-form-group>
      <b-form-group v-if="imageUrl">
        <img :src="imageUrl" class="image-preview" fluid />
      </b-form-group>
      <b-btn type="submit" variant="landing-secondary" class="mt-4">{{ $t("dashboard.newProductView.productFormButtonText") }}</b-btn>
      <b-btn @click="$router.go(-1)" variant="danger" class="mt-4 ml-2">{{ $t("dashboard.newProductView.cancelButtonText") }}</b-btn>
    </form>
  </div>
</template>

<script>
import productService from "@/services/productService";
import categoryService from "@/services/categoryService";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      product: {
        nameTR: "",
        nameEN: "",
        descriptionTR: "",
        descriptionEN: "",
        price: "0",
        categoryId: null,
      },

      categories: [{ value: null, text: "--Seçiniz--" }],
      productModel: new FormData(),
      imageUrl: "",
    };
  },

  validations: {
    product: {
      nameTR: {
        required,
        maxLength: maxLength(50),
      },
      nameEN: {
        maxLength: maxLength(50),
      },
      price: {
        required,
      },
      categoryId: {
        required,
      },
    },
  },

  async mounted() {
    this.$title = this.$t("dashboard.newProductView.tabTitle");
    const categoryData = await categoryService.getAllCategories(this.$store.state.user.userId);
    if (categoryData.success) {
      categoryData.data.map((category) => {
        this.categories.push({
          value: category.id,
          text: category.nameTR,
        });
      });
    } else {
      this.$notify({
        group: "notify-top-right",
        text: this.$t("dashboard.newProductView.errorMessages.categoriesCouldntFetched"),
        duration: 5000,
        type: "error",
      });
    }
  },

  methods: {
    async submitProductForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        var loader = this.$loading.show();
        this.$v.$reset();
        this.productModel.append("NameTR", this.product.nameTR);
        this.productModel.append("NameEN", this.product.nameEN);
        this.productModel.append("DescriptionTR", this.product.descriptionTR);
        this.productModel.append("DescriptionEN", this.product.descriptionEN);
        this.productModel.append("Price", this.product.price);
        this.productModel.append("CategoryId", this.product.categoryId);

        const data = await productService.insertProduct(this.$store.state.user.userId, this.productModel);
        if (data.success) {
          this.$notify({
            group: "notify-top-right",
            text: this.$t("dashboard.newProductView.messages.productSavedSuccessfully"),
            duration: 5000,
            type: "success",
          });

          this.$root.$emit("refreshProducts");
          this.$router.push("/dashboard/products");
        } else if (data.code === 400) {
          this.$notify({
            group: "notify-top-right",
            text: this.$t("dashboard.newProductView.errorMessages.maxProduct"),
            duration: 5000,
            type: "error",
          });
        }

        loader.hide();
      }
    },

    validateState(name) {
      const { $dirty, $error } = this.$v.product[name];
      return $dirty ? !$error : null;
    },

    imagePreview(event) {
      this.productModel.append("ImageFile", event, event.name);
      this.imageUrl = URL.createObjectURL(event);
    },
  },
};
</script>

<style>
.new-product {
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

.new-product .bg {
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
}

.new-product .bg span {
  position: absolute;
  right: 30px;
  top: 20px;
  cursor: pointer;
}

.new-product form {
  position: absolute;
  background-color: var(--color-white);
  height: 90%;
  padding: 20px;
  width: 40%;
  overflow-y: scroll;
  transition: width 0.4s ease;
}

@media screen and (max-width: 992px) {
  .new-product form {
    width: 70%;
  }

  .new-product .bg span {
    font-size: 18px;
  }
}

@media screen and (max-width: 576px) {
  .new-product form {
    width: 90%;
  }

  .new-product .bg span {
    right: 5px;
    top: 5px;
  }
}
</style>
