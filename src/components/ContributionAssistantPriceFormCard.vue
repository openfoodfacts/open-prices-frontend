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
        v-if="productPriceForm.type === 'PRODUCT'"
        type="info"
        variant="outlined"
      >
        {{ $t('ContributionAssistant.DetectedBarcode', { barcode: productPriceForm.detected_product_code }) }}
      </v-alert>
      <v-row v-if="productPriceForm.type == 'CATEGORY'">
        <v-col>
          <v-item-group v-model="productPriceForm.price_per" class="d-inline" mandatory>
            <v-item v-for="cpp in categoryPricePerList" :key="cpp.key" v-slot="{ isSelected, toggle }" :value="cpp.key">
              <v-chip class="mr-1" :class="isSelected ? 'border-grey' : 'border-transparent'" @click="toggle">
                <v-icon start :icon="isSelected ? 'mdi-checkbox-marked-circle' : 'mdi-circle-outline'" />
                {{ cpp.value }}
              </v-chip>
            </v-item>
          </v-item-group>
        </v-col>
      </v-row>
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

export default {
  components: {
  ProductInputRow: defineAsyncComponent(() => import('../components/ProductInputRow.vue')),
  PriceInputRow: defineAsyncComponent(() => import('../components/PriceInputRow.vue')),
  },
  props: {
    productPriceForm: {
      type: Object,
      default: () => ({
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
      categoryPricePerList: [
      {key: 'KILOGRAM', value: "per kg", icon: 'mdi-weight-kilogram'},
      {key: 'UNIT', value: "per unit", icon: 'mdi-numeric-1-circle'}
      ],
    }
  },
  methods: {
    removePrice() {
      this.$emit('removePrice')
    }
  }
}
</script>