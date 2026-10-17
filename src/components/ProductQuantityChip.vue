<template>
  <v-chip v-if="productQuantity" label size="small" density="comfortable">
    {{ productQuantityWithUnitDisplay }}
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
    <i>{{ productQuantityUnitDisplay }}</i>
    <v-tooltip activator="parent" :open-on-click="!getEditUrl" open-on-hover location="top">
      {{ $t("ProductCard.QuantityMissing") }}
    </v-tooltip>
  </v-chip>
</template>

<script>
import { mapStores } from "pinia";
import { useAppStore } from "../store";
import openFoodFactsApi from "../services/openFoodFactsApi";
import constants from "../constants";

export default {
  props: {
    productQuantity: {
      type: Number,
      default: null,
    },
    productQuantityUnit: {
      type: String,
      default: constants.PRODUCT_QUANTITY_UNIT_G,
      examples: [
        constants.PRODUCT_QUANTITY_UNIT_G,
        constants.PRODUCT_QUANTITY_UNIT_ML,
      ],
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
  computed: {
    ...mapStores(useAppStore),
    productQuantityUnitDisplay() {
      return this.productQuantityUnit || constants.PRODUCT_QUANTITY_UNIT_G;
    },
    productQuantityWithUnitDisplay() {
      if (this.productQuantityUnit === constants.PRODUCT_QUANTITY_UNIT_ML) {
        if (this.productQuantity >= 1000) {
          return this.$t("ProductCard.ProductQuantityLitre", [
            this.productQuantity / 1000,
          ]);
        } else {
          return this.$t("ProductCard.ProductQuantityMililitre", [
            this.productQuantity,
          ]);
        }
      }
      if (this.productQuantity >= 1000) {
        return this.$t("ProductCard.ProductQuantityKilogram", [
          this.productQuantity / 1000,
        ]);
      }
      return this.$t("ProductCard.ProductQuantityGram", [this.productQuantity]);
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
};
</script>
