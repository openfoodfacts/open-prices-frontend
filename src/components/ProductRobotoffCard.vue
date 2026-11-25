<template>
  <v-card v-if="product && product.code" data-name="product-robotoff-card">
    <v-card-title class="text-subtitle-1 d-flex align-center pb-0">
      <v-icon icon="mdi-robot-outline" start />
      <span class="flex-grow-1">{{
        $t("CreateOffProduct.EnrichProduct")
      }}</span>
      <v-btn
        v-if="editUrl"
        size="small"
        density="comfortable"
        variant="text"
        prepend-icon="mdi-pencil"
        append-icon="mdi-open-in-new"
        :href="editUrl"
        target="_blank"
        rel="noopener"
        :title="$t('Common.Edit')"
      >
        {{ $t("Common.Edit") }}
      </v-btn>
    </v-card-title>
    <v-card-text class="pa-2">
      <off-webcomponents-configuration
        :api-url="ROBOTOFF_API_URL"
        :img-url="OFF_IMAGE_URL"
        :language-code="userLanguage"
      />
      <robotoff-question :product-code="product.code" />
    </v-card-text>
  </v-card>
</template>

<script>
import "@webcomponents/webcomponentsjs/webcomponents-loader.js";
import "@openfoodfacts/openfoodfacts-webcomponents";
import { mapStores } from "pinia";
import { useAppStore } from "../store";
import openFoodFactsApi from "../services/openFoodFactsApi";
import constants from "../constants";

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      ROBOTOFF_API_URL: constants.ROBOTOFF_API_URL,
      OFF_IMAGE_URL: constants.OFF_IMAGE_URL,
    };
  },
  computed: {
    ...mapStores(useAppStore),
    userLanguage() {
      return this.appStore.getUserLanguage || "en";
    },
    editUrl() {
      return openFoodFactsApi.getProductEditUrl(
        this.product.code,
        this.product.source,
        this.appStore?.getUserCountry || "fr",
      );
    },
  },
};
</script>

<style scoped>
robotoff-question {
  --robotoff-question-bg-dark: transparent;
  display: block;
}
</style>
