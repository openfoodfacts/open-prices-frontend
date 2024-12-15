<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-card
    height="100%"
    title="Label"
    prepend-icon="mdi-tag-outline"
  >
    <v-divider />
    <v-card-text>
      <v-img
        class="mb-4"
        height="200px"
        :src="productPriceForm.proofImage"
        contain
      />
      <ProductInputRow :productForm="productPriceForm" :disableInitWhenSwitchingType="true" @filled="productFormFilled = $event" />
      <v-alert
        v-if="productIsTypeProduct"
        type="info"
        variant="outlined"
      >
        {{ $t('ContributionAssistant.DetectedBarcode', { barcode: productPriceForm.detected_product_code }) }}
      </v-alert>
      <PriceInputRow class="mt-0" :priceForm="productPriceForm" :hideCurrencyChoice="true" @filled="pricePriceFormFilled = $event" />
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn
        color="error"
        variant="outlined"
        prepend-icon="mdi-delete"
        @click="removePrice"
      >
        {{ $t('Common.Delete') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'

export default {
  components: {
  ProductInputRow: defineAsyncComponent(() => import('../components/ProductInputRow.vue')),
  PriceInputRow: defineAsyncComponent(() => import('../components/PriceInputRow.vue')),
  },
  props: {
    productPriceForm: {
      type: Object,
      default: () => ({
        type: null,
        category_tag: null,
        origins_tags: '',
        labels_tags: [],
        price: null,
        price_per: null,
        price_is_discounted: false,
        price_without_discount: null,
        currency: null,
        proofImage: null,
        processed: null,
        detected_product_code: null
      })
    },
  },
  emits: ['removePrice'],
  data() {
    return {
      productFormFilled: false,
      pricePriceFormFilled: false,
    }
  },
  computed: {
    productIsTypeProduct() {
      return this.productPriceForm.type === constants.PRICE_TYPE_PRODUCT
    }
  },
  methods: {
    removePrice() {
      this.$emit('removePrice')
    }
  }
}
</script>
