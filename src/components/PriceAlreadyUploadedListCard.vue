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

    <v-divider v-if="proofPriceUploadedList.length" />

    <v-card-actions v-if="proofPriceUploadedList.length">
      <v-row>
        <v-col cols="12">
          <v-chip class="mr-1" label size="small" density="comfortable">
            {{ $t('Common.PriceCount', { count: proofPriceUploadedList.length }) }}
          </v-chip>
          <v-chip class="mr-1" label size="small" density="comfortable">
            {{ getPriceValueDisplay(proofPriceUploadedListSum) }}
          </v-chip>
        </v-col>
      </v-row>
    </v-card-actions>

    <v-overlay v-model="disableCard" scrim="#E8F5E9" contained persistent />
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import utils from '../utils.js'

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
    },
    proofPriceUploadedListSum() {
      return this.proofPriceUploadedList.reduce((acc, priceUploaded) => {
        return acc + parseFloat(priceUploaded.price)
      }, 0)
    }
  },
  methods: {
    getPriceValue(priceValue, priceCurrency) {
      return utils.prettyPrice(priceValue, priceCurrency)
    },
    getPriceValueDisplay(price) {
      price = parseFloat(price)
      return this.getPriceValue(price, this.proofPriceUploadedList[0].currency)
    },
  }
}
</script>
