<template>
  <template v-if="productBrands">
    <template v-if="productBrandsList.length <= 2">
      <BrandChip
        v-for="brand in productBrandsList"
        :key="brand"
        :brand="brand"
        :readonly="readonly"
      />
    </template>
    <v-chip
      v-else
      label
      size="small"
      density="comfortable"
      @click="showProductBrandsDialog"
    >
      <i>{{
        $t("ProductCard.BrandTotal", { count: productBrandsList.length })
      }}</i>
    </v-chip>
    <ProductBrandsDialog
      v-if="productBrands.length && productBrandsDialog"
      v-model="productBrandsDialog"
      :brands="productBrandsList"
      :readonly="readonly"
      @close="productBrandsDialog = false"
    />
  </template>
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
    <i class="text-lowercase">{{ $t("Common.Brand") }}</i>
    <v-tooltip
      activator="parent"
      :open-on-click="!getEditUrl"
      open-on-hover
      location="top"
    >
      {{ $t("ProductCard.BrandMissing") }}
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
    BrandChip: defineAsyncComponent(
      () => import("../components/BrandChip.vue"),
    ),
    ProductBrandsDialog: defineAsyncComponent(
      () => import("../components/ProductBrandsDialog.vue"),
    ),
  },
  props: {
    productBrands: {
      type: String,
      default: null,
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
      productBrandsDialog: false,
    };
  },
  computed: {
    ...mapStores(useAppStore),
    productBrandsList() {
      return this.productBrands.split(",").filter((b) => b.trim());
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
    showProductBrandsDialog() {
      this.productBrandsDialog = true;
    },
  },
};
</script>
