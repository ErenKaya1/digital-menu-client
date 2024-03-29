<template>
  <div class="edit-product">
    <div class="bg" @click="$router.go(-1)">
      <span class="close text-light">X</span>
    </div>
    <form @submit.prevent="submitProductForm" enctype="multipart/form-data">
      <h5 class="h5">{{ $t("dashboard.editProductView.formTitle") }}</h5>
      <hr />
      <b-form-group
        :label="$t('dashboard.editProductView.productNameTR')"
        :state="validateState('nameTR')"
        :invalid-feedback="!$v.product.nameTR.required ? $t('dashboard.editProductView.errorMessages.trRequired') : !$v.product.nameTR.maxLength ? $t('dashboard.editProductView.errorMessages.productNameMaxLength') : ''"
      >
        <b-input v-model.trim="product.nameTR" :state="validateState('nameTR')" />
      </b-form-group>
      <b-form-group
        :label="$t('dashboard.editProductView.productNameEN')"
        :state="!product.nameEN ? null : validateState('nameEN')"
        :invalid-feedback="!$v.product.nameEN.maxLength ? $t('dashboard.editProductView.errorMessages.productNameMaxLength') : ''"
      >
        <b-input v-model.trim="product.nameEN" :state="!product.nameEN ? null : validateState('nameEN')" />
      </b-form-group>
      <b-form-group :label="$t('dashboard.editProductView.price')" :state="validateState('price')" :invalid-feedback="!$v.product.price.required ? $t('dashboard.editProductView.errorMessages.priceRequired') : ''">
        <b-input v-model.trim="product.price" :state="validateState('price')" />
      </b-form-group>
      <b-form-group :label="$t('dashboard.editProductView.category')" :state="validateState('categoryId')" :invalid-feedback="!$v.product.categoryId.required ? $t('dashboard.editProductView.errorMessages.categoryRequired') : ''">
        <b-form-select v-model="product.categoryId" :options="categories" :state="validateState('categoryId')" />
      </b-form-group>
      <b-form-group :label="$t('dashboard.editProductView.descriptionTR')">
        <b-textarea rows="4" v-model.trim="product.descriptionTR" />
      </b-form-group>
      <b-form-group :label="$t('dashboard.editProductView.descriptionEN')">
        <b-textarea rows="4" v-model.trim="product.descriptionEN" />
      </b-form-group>
      <b-form-group :label="$t('dashboard.editProductView.productImage')">
        <b-form-file
          :browse-text="$t('dashboard.editProductView.productImageInputBrowseText')"
          @input="imagePreview"
          :placeholder="$t('dashboard.editProductView.productImageInputPlaceholder')"
          :drop-placeholder="$t('dashboard.editProductView.productImageInputDropPlaceholder')"
          accept="image/*"
        />
      </b-form-group>
      <b-form-group v-if="product.imagePath">
        <img :src="product.imagePath" class="image-preview" fluid />
      </b-form-group>
      <b-btn type="submit" variant="landing-secondary" class="mt-4">{{ $t("dashboard.editProductView.productFormButtonText") }}</b-btn>
      <b-btn @click="$router.go(-1)" variant="danger" class="mt-4 ml-2">{{ $t("dashboard.editProductView.cancelButtonText") }}</b-btn>
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
        id: "",
        price: "",
        nameTR: "",
        nameEN: "",
        descriptionTR: "",
        descriptionEN: "",
        imagePath: "",
        categoryId: "",
      },

      categories: [],
      productModel: new FormData(),
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
    this.$title = this.$t("dashboard.editProductView.tabTitle");
    const categoryData = await categoryService.getAllCategories(this.$store.state.user.userId);
    if (categoryData.success) {
      categoryData.data.map((category) => {
        this.categories.push({
          value: category.id,
          text: category.nameTR,
        });
      });

      const productId = this.$route.params.id;
      const productData = await productService.getById(this.$store.state.user.userId, productId);
      if (productData.success) {
        this.product = {
          id: productData.data.id,
          price: productData.data.price,
          nameTR: productData.data.nameTR,
          nameEN: productData.data.nameEN,
          descriptionTR: productData.data.descriptionTR,
          descriptionEN: productData.data.descriptionEN,
          imagePath: productData.data.imagePath,
          categoryId: productData.data.categoryId,
        };
      } else {
        this.$notify({
          group: "notify-top-right",
          text: this.$t("dashboard.editProductView.errorMessages.productNotFound"),
          duration: 5000,
          type: "error",
        });

        this.$root.$emit("refreshProducts");
        this.$router.push("/dashboard/products");
      }
    } else {
      this.$notify({
        group: "notify-top-right",
        text: this.$t("dashboard.editProductView.errorMessages.categoriesCouldntFetched"),
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
        this.productModel.append("Id", this.product.id);
        this.productModel.append("Price", this.product.price);
        this.productModel.append("NameTR", this.product.nameTR);
        this.productModel.append("NameEN", this.product.nameEN);
        this.productModel.append("DescriptionTR", this.product.descriptionTR);
        this.productModel.append("DescriptionEN", this.product.descriptionEN);
        this.productModel.append("CategoryId", this.product.categoryId);

        const productData = await productService.updateProduct(this.$store.state.user.userId, this.productModel);
        if (productData.code === 200) {
          this.$notify({
            group: "notify-top-right",
            text: this.$t("dashboard.editProductView.messages.productUpdatedSuccessfully"),
            duration: 5000,
            type: "success",
          });
          this.$root.$emit("refreshProducts");
        } else {
          this.$notify({
            group: "notify-top-right",
            text: this.$t("dashboard.editProductView.errorMessages.productUpdateFailed"),
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
      this.product.imagePath = URL.createObjectURL(event);
    },
  },
};
</script>

<style>
.edit-product {
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

.edit-product .bg {
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
}

.edit-product .bg span {
  position: absolute;
  right: 30px;
  top: 20px;
  cursor: pointer;
}

.edit-product form {
  position: absolute;
  background-color: var(--color-white);
  height: 90%;
  padding: 20px;
  width: 40%;
  overflow-y: scroll;
  transition: width 0.4s ease;
}

@media screen and (max-width: 992px) {
  .edit-product form {
    width: 70%;
  }

  .edit-product .bg span {
    font-size: 18px;
  }
}

@media screen and (max-width: 576px) {
  .edit-product form {
    width: 90%;
  }

  .edit-product .bg span {
    right: 5px;
    top: 5px;
  }
}
</style>