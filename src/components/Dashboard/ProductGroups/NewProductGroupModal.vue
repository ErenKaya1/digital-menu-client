<template>
  <b-modal id="new-product-group" title="Yeni Ürün Grubu" scrollable hide-footer>
    <form @submit.prevent="submitProductGroupForm" class="px-3" enctype="multipart/form-data">
      <b-form-group
        label="Grup Adı (TR)"
        :state="validateState('nameTR')"
        :invalid-feedback="!$v.productGroup.nameTR.required ? 'Türkçe varsayılan dil olduğu için boş bırakılamaz' : !$v.productGroup.nameTR.maxLength ? 'Ürün grup adı 50 karakterden uzun olamaz.' : ''"
      >
        <b-input v-model.trim="productGroup.nameTR" :state="validateState('nameTR')" />
      </b-form-group>
      <b-form-group label="Grup Adı (EN)" :state="!productGroup.nameEN ? null : validateState('nameEN')" :invalid-feedback="!$v.productGroup.nameEN.maxLength ? 'Ürün grup adı 50 karakterden uzun olamaz.' : ''">
        <b-input v-model.trim="productGroup.nameEN" :state="!productGroup.nameEN ? null : validateState('nameEN')" />
      </b-form-group>
      <b-form-group label="Ücret" :state="validateState('price')" :invalid-feedback="!$v.productGroup.price.required ? 'Fiyat alanı zorunludur.' : ''">
        <b-input v-model.trim="productGroup.price" :state="validateState('price')" />
      </b-form-group>
      <b-form-group label="Kategori" :state="validateState('categoryId')" :invalid-feedback="!$v.productGroup.categoryId.required ? 'Kategori Seçiniz' : ''">
        <b-form-select v-model="productGroup.categoryId" :options="categories" :state="validateState('categoryId')" />
      </b-form-group>
      <b-form-group label="Ürünler">
        <multiselect v-model="productGroup.products" :options="products" :multiple="true" placeholder="Ara" track-by="value" label="text" selectLabel="Ürünü Ekle" />
      </b-form-group>
      <b-form-group label="Açıklama (TR)">
        <b-textarea rows="4" v-model.trim="productGroup.descriptionTR" />
      </b-form-group>
      <b-form-group label="Açıklama (EN)">
        <b-textarea rows="4" v-model.trim="productGroup.descriptionEN" />
      </b-form-group>
      <b-form-group label="Grup Görseli">
        <b-form-file @input="imagePreview" placeholder="Dosya Seç veya Sürükle" drop-placeholder="Buraya Bırak" accept="image/*" />
      </b-form-group>
      <b-form-group v-if="imageUrl">
        <b-img :src="imageUrl" class="image-preview" fluid />
      </b-form-group>
      <b-btn type="submit" variant="landing-secondary" class="mt-4">Kaydet</b-btn>
      <b-btn @click="closeModal" variant="danger" class="mt-4 ml-2">Vazgeç</b-btn>
    </form>
  </b-modal>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
import productService from "@/services/productService";
import categoryService from "@/services/categoryService";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import productGroupService from "@/services/productGroupService";

export default {
  components: { Multiselect },
  data() {
    return {
      productGroup: {
        nameTR: "",
        nameEN: "",
        price: 0,
        descriptionTR: "",
        descriptionEN: "",
        products: [],
        categoryId: null,
      },

      categories: [{ value: null, text: "--Seçiniz--" }],
      products: [],
      productGroupModel: new FormData(),
      imageUrl: "",
    };
  },

  validations: {
    productGroup: {
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
    const productsData = await productService.getAllProducts(this.$store.state.user.userId);
    if (productsData.success) {
      productsData.data.map((product) => {
        this.products.push({
          value: product.id,
          text: product.nameTR,
        });
      });
    } else {
      this.$notify({
        group: "notify-top-right",
        text: "Ürünler yüklenirken bir hata oluştu.",
        duration: 5000,
        type: "error",
      });
    }

    const categoriesData = await categoryService.getAllCategories(this.$store.state.user.userId);
    if (categoriesData.success) {
      categoriesData.data.map((category) => {
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
    async submitProductGroupForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.productGroupModel.append("NameTR", this.productGroup.nameTR);
        this.productGroupModel.append("NameEN", this.productGroup.nameEN);
        this.productGroupModel.append("Price", this.productGroup.price);
        this.productGroupModel.append("DescriptionTR", this.productGroup.descriptionTR);
        this.productGroupModel.append("DescriptionEN", this.productGroup.descriptionEN);
        this.productGroupModel.append("CategoryId", this.productGroup.categoryId);
        console.log(this.productGroup.products);
        // this.productGroupModel.append("Products", this.productGroup.products);

        const userId = this.$store.state.user.userId;
        const data = await productGroupService.insertProductGroup(userId, this.productGroupModel);
        if (data.success) {
          this.$notify({
            group: "notify-top-right",
            text: "Ürün grubu başarıyla kaydedildi.",
            duration: 5000,
            type: "success",
          });
        } else {
          this.$notify({
            group: "notify-top-right",
            text: "Bir hata oluştu.",
            duration: 5000,
            type: "error",
          });
        }

        this.productGroupModel = new FormData();
      }
    },

    validateState(name) {
      const { $dirty, $error } = this.$v.productGroup[name];
      return $dirty ? !$error : null;
    },

    imagePreview(event) {
      this.productGroupModel.append("ImageFile", event, event.name);
      this.imageUrl = URL.createObjectURL(event);
    },

    closeModal() {
      this.$bvModal.hide("new-product-group");
    },
  },
};
</script>