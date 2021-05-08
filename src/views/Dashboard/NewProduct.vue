<template>
  <div class="new-product">
    <div class="bg" @click="$router.go(-1)">
      <span class="close text-light">X</span>
    </div>
    <form @submit.prevent="submitProductForm" enctype="multipart/form-data">
      <h5 class="h5">Yeni Ürün Ekle</h5>
      <hr />
      <b-form-group label="Ürün Adı (TR)" :state="validateState('nameTR')" :invalid-feedback="!$v.product.nameTR.required ? 'Türkçe varsayılan dil olduğu için zorunludur.' : !$v.product.nameTR.maxLength ? 'Ürün adı 50 karakterden uzun olamaz.' : ''">
        <b-input v-model.trim="product.nameTR" :state="validateState('nameTR')" />
      </b-form-group>
      <b-form-group label="Ürün Adı (EN)" :state="!product.nameEN ? null : validateState('nameEN')" :invalid-feedback="!$v.product.nameTR.maxLength ? 'Ürün adı 50 karakterden uzun olamaz.' : ''">
        <b-input v-model.trim="product.nameEN" :state="!product.nameEN ? null : validateState('nameEN')" />
      </b-form-group>
      <b-form-group label="Ücret" :state="validateState('price')" :invalid-feedback="!$v.product.price.required ? 'Fiyat alanı zorunludur.' : ''">
        <b-input v-model.trim="product.price" :state="validateState('price')" />
      </b-form-group>
      <b-form-group label="Kategori" :state="validateState('categoryId')" :invalid-feedback="!$v.product.categoryId.required ? 'Kategori seçiniz.' : ''">
        <b-form-select v-model="product.categoryId" :options="categories" :state="validateState('categoryId')" />
      </b-form-group>
      <b-form-group label="Açıklama (TR)">
        <b-textarea rows="4" v-model.trim="product.descriptionTR" />
      </b-form-group>
      <b-form-group label="Açıklama (EN)">
        <b-textarea rows="4" v-model.trim="product.descriptionEN" />
      </b-form-group>
      <b-form-group label="Ürün Görseli">
        <b-form-file @input="imagePreview" placeholder="Dosya Seç veya Sürükle" drop-placeholder="Buraya Bırak" accept="image/*" />
      </b-form-group>
      <b-form-group v-if="imageUrl">
        <img :src="imageUrl" class="image-preview" fluid />
      </b-form-group>
      <b-btn type="submit" variant="landing-secondary" class="mt-4">Kaydet</b-btn>
      <b-btn @click="$router.go(-1)" variant="danger" class="mt-4 ml-2">Vazgeç</b-btn>
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
        text: "Kategoriler yüklenirken bir hata oluştu.",
        duration: 5000,
        type: "error",
      });
    }
  },

  methods: {
    async submitProductForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.productModel.append("NameTR", this.product.nameTR);
        this.productModel.append("NameEN", this.product.nameEN);
        this.productModel.append("DescriptionTR", this.product.descriptionTR);
        this.productModel.append("DescriptionEN", this.product.descriptionEN);
        this.productModel.append("Price", this.product.price);
        this.productModel.append("CategoryId", this.product.categoryId);

        const data = await productService.insertProduct(this.$store.state.user.userId, this.productModel);
        if (data.code === 200) {
          this.$notify({
            group: "notify-top-right",
            text: "Ürün başarıyla kaydedildi.",
            duration: 5000,
            type: "success",
          });
          
          this.$root.$emit("refreshProducts");
          this.$router.push("/dashboard/products");
        } else if (data.code === 400) {
          this.$notify({
            group: "notify-top-right",
            text: "Maksimum ürün sayısına ulaşıldı.",
            duration: 5000,
            type: "error",
          });
        }
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
  z-index: 9999;
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
  overflow: scroll;
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
