<template>
  <v-card v-if="showCard" class="mb-4" prepend-icon="mdi-tag-check-outline" style="border: 1px solid #4CAF50">
    <template #title>
      <i18n-t keypath="AddPriceMultiple.ProductPriceDetails.AlreadyUploaded" :plural="proofPriceUploadedList.length" tag="span">
        <template #priceAlreadyUploadedNumber>
          <span>{{ proofPriceUploadedList.length }}</span>
        </template>
      </i18n-t>
    </template>
    <template #append>
      <v-icon icon="mdi-checkbox-marked-circle" color="success" />
    </template>
    <v-divider />
    <v-card-text>
      <v-row>
        <v-col v-for="productPriceUploaded in proofPriceUploadedList" :key="productPriceUploaded" cols="12">
          <PriceCard :price="productPriceUploaded" :product="productPriceUploaded.product" :hideProductBarcode="false" :hidePriceFooterRow="true" :readonly="true" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-overlay v-model="disableCard" scrim="#E8F5E9" contained persistent />
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue')),
  },
  props: {
    proofPriceUploadedList: {
      type: Array,
      default: () => []
    },
    hideCardIfNoProofPriceUploaded: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      disableCard: true
    }
  },
  computed: {
    showCard() {
      return this.hideCardIfNoProofPriceUploaded && this.proofPriceUploadedList.length > 0
    }
  }
}
</script>
