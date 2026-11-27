<template>
  <template v-if="productBrands">
    <template v-if="productBrandsList.length <= 2">
      <BrandChip
        v-for="brand in productBrandsList"
        :key="brand.name"
        :brand="brand.name"
        :brandTag="brand.tag"
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
  >
    <i class="text-lowercase">{{ $t("Common.Brand") }}</i>
    <v-tooltip activator="parent" open-on-click location="top">
      {{ $t("ProductCard.BrandMissing") }}
    </v-tooltip>
  </v-chip>
</template>

<script>
import { defineAsyncComponent } from "vue";

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
    productBrandsTags: {
      type: Array,
      default: () => [],
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
    productBrandsList() {
      // display the brands as typed, link to their tags (e.g. "xx:albert-heijn")
      // both lists are in the same order. If their lengths differ (e.g. parent brands
      // added to the tags), the tags can't be matched: no link
      const brandNames = this.productBrands.split(",").filter((b) => b.trim());
      const brandTags = this.productBrandsTags || [];
      const brandTagsMatch = brandNames.length === brandTags.length;
      return brandNames.map((name, index) => ({
        name,
        tag: brandTagsMatch ? brandTags[index] : null,
      }));
    },
  },
  methods: {
    showProductBrandsDialog() {
      this.productBrandsDialog = true;
    },
  },
};
</script>
