<template>
  <v-chip
    v-if="hasProductCategories"
    label
    size="small"
    density="comfortable"
    @click="showProductCategoriesDialog"
  >
    <i>{{
      $t("ProductCard.CategoryTotal", { count: productCategories.length })
    }}</i>
    <ProductCategoriesDialog
      v-if="productCategoriesDialog"
      v-model="productCategoriesDialog"
      :categories="productCategories"
      @close="productCategoriesDialog = false"
    />
  </v-chip>
  <v-chip
    v-else
    label
    size="small"
    density="comfortable"
    prepend-icon="mdi-help"
    color="warning"
    :href="getEditUrl"
    :target="getEditUrl ? '_blank' : null"
    :rel="getEditUrl ? 'noopener' : null"
  >
    <i>{{ $t("ProductCard.CategoriesLower") }}</i>
    <v-tooltip
      activator="parent"
      :open-on-click="!getEditUrl"
      open-on-hover
      location="top"
    >
      {{ $t("ProductCard.CategoriesMissing") }}
    </v-tooltip>
  </v-chip>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapStores } from "pinia";
import { useAppStore } from "../store";
import openFoodFactsApi from "../services/openFoodFactsApi";

export default {
  components: {
    ProductCategoriesDialog: defineAsyncComponent(
      () => import("../components/ProductCategoriesDialog.vue"),
    ),
  },
  props: {
    productCategories: {
      type: Array,
      default: () => [],
    },
    productCode: {
      type: String,
      default: null,
    },
    productSource: {
      type: String,
      default: "off",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      productCategoriesDialog: false,
    };
  },
  computed: {
    ...mapStores(useAppStore),
    hasProductCategories() {
      return this.productCategories && this.productCategories.length;
    },
    getEditUrl() {
      if (this.readonly || !this.productCode) {
        return null;
      }
      return openFoodFactsApi.getProductEditUrl(
        this.productCode,
        this.productSource,
        this.appStore?.getUserCountry || "fr",
      );
    },
  },
  methods: {
    showProductCategoriesDialog() {
      this.productCategoriesDialog = true;
    },
  },
};
</script>
