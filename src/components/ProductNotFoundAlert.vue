<template>
  <v-alert data-name="product-not-found-alert" type="error" variant="outlined" density="compact">
    <p>
      <i18n-t keypath="ProductDetail.ProductNotFound" tag="span">
        <template #name>
          {{ OFF_NAME }}
        </template>
      </i18n-t>
    </p>
    <OpenFoodFactsAddMenu v-if="showOpenFoodFactsAddMenu" :productCode="productCode" />
  </v-alert>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'

export default {
  components: {
    OpenFoodFactsAddMenu: defineAsyncComponent(() => import('../components/OpenFoodFactsAddMenu.vue')),
  },
  props: {
    productCode: {
      type: String,
      default: '',
    },
    showOpenFoodFactsAddMenu: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      OFF_NAME: constants.OFF_NAME,
    }
  }
}
</script>
