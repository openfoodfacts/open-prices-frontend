<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-card
    class="mb-4"
    height="100%"
    title="Label"
    prepend-icon="mdi-tag-outline"
    style="border: 1px solid transparent"
  >
    <template #append>
      <v-icon icon="mdi-delete" color="error" @click="removePrice()" />
    </template>
    <v-divider />
    <v-img
      height="200px"
      :src="productPriceForm.proofImage"
      contain
    />
    <v-card-text>
      <ProductInputRow :productForm="productPriceForm" :disableInitWhenSwitchingModes="true" @filled="productFormFilled = $event" />
      <v-alert
        v-if="productPriceForm.type === 'PRODUCT'"
        class="mb-2"
        type="info"
        variant="plain"
      >
        Detected barcode: {{ productPriceForm.detected_product_code }}
      </v-alert>
      <v-row>
        <v-col>
          <h3 class="required mb-1">
            Price
          </h3>
          <h3 v-if="productPriceForm.type == 'CATEGORY'" class="mb-1">
            <v-item-group v-model="productPriceForm.price_per" class="d-inline" mandatory>
              <v-item v-for="cpp in categoryPricePerList" :key="cpp.key" v-slot="{ isSelected, toggle }" :value="cpp.key">
                <v-chip class="mr-1" :style="isSelected ? 'border: 1px solid #9E9E9E' : 'border: 1px solid transparent'" @click="toggle">
                  <v-icon start :icon="isSelected ? 'mdi-checkbox-marked-circle' : 'mdi-circle-outline'" />
                  {{ cpp.value }}
                </v-chip>
              </v-item>
            </v-item-group>
          </h3>
          <PriceInputRow :priceForm="productPriceForm" :hideCurrencyChoice="true" @filled="pricePriceFormFilled = $event" />
        </v-col>
      </v-row>
    </v-card-text>
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