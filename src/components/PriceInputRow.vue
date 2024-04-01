<template>
  <v-row>
    <v-col :cols="priceForm.price_is_discounted ? '6' : '12'" sm="6">
      <v-text-field
        v-model="priceForm.price"
        :label="priceForm.price_is_discounted ? $t('PriceForm.LabelDiscounted') : $t('PriceForm.Label')"
        type="number"
        inputmode="decimal"
        min="0"
        hide-details="auto"
        :suffix="priceForm.currency">
        <template v-slot:prepend-inner>
          <!-- image from https://www.svgrepo.com/svg/32717/currency-exchange -->
          <img src="/currency-exchange-svgrepo-com.svg" class="icon-info-currency" @click="changeCurrencyDialog = true" />
        </template>
    </v-text-field>
    </v-col>
    <v-col v-if="priceForm.price_is_discounted" cols="6">
      <v-text-field
        v-model="priceForm.price_without_discount"
        :label="$t('PriceForm.LabelFull')"
        type="number"
        inputmode="decimal"
        min="0"
        hide-details="auto"
        :suffix="priceForm.currency">
      </v-text-field>
    </v-col>
  </v-row>
  <div class="d-inline">
    <v-checkbox v-model="priceForm.price_is_discounted" :label="$t('PriceForm.Discount')" hide-details="auto"></v-checkbox>
  </div>

  <ChangeCurrencyDialog
    v-if="changeCurrencyDialog"
    v-model="changeCurrencyDialog"
    @newCurrencySelected="setCurrencyData($event)"
    @close="changeCurrencyDialog = false">
  </ChangeCurrencyDialog>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    'ChangeCurrencyDialog': defineAsyncComponent(() => import('../components/ChangeCurrencyDialog.vue')),
  },
  props: {
    priceForm: null,  // price, currency, price_is_discounted, price_without_discount
  },
  data() {
    return {
      // currency selection
      changeCurrencyDialog: false,
    }
  },
  methods: {
    setCurrencyData(currency) {
      this.priceForm.currency = currency
    },
  }
}
</script>

<style scoped>
.icon-info-currency {
  cursor: pointer;
  width: 24px;
  height: 24px;
}
</style>
