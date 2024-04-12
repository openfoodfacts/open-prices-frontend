<template>
  <v-dialog>
    <v-card>
      <v-card-title>
        {{ $t('PriceEdit.Title') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="close"></v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <PriceCard :price="price" :product="price.product" :hidePriceFooterRow="true" :readonly="true"></PriceCard>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text>
        <PriceInputRow :priceForm="updatePriceForm"></PriceInputRow>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          elevation="1"
          :loading="loading"
          @click="updatePrice"
        >{{ $t('PriceEdit.Save') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import api from '../services/api'

export default {
  components: {
    'PriceCard': defineAsyncComponent(() => import('../components/PriceCard.vue')),
    'PriceInputRow': defineAsyncComponent(() => import('../components/PriceInputRow.vue')),
  },
  props: {
    price: null,
  },
  data() {
    return {
      updatePriceForm: {
        price: null,
        price_per: null,
        price_is_discounted: false,
        price_without_discount: null,
        currency: null,
      },
      productMode: null,
      loading: false
    }
  },
  emits: ['update', 'close'],
  mounted() {
    this.initUpdatePriceForm()
  },
  methods: {
    initUpdatePriceForm() {
      this.productMode = this.price.product_code ? 'barcode' : 'category'
      Object.keys(this.updatePriceForm).forEach((key) => {
        this.updatePriceForm[key] = this.price[key]
      })
    },
    updatePrice() {
      // cleanup form
      if (!this.updatePriceForm.price_is_discounted) {
        this.updatePriceForm.price_without_discount = null
      }
      // update price
      api
        .updatePrice(this.price.id, this.updatePriceForm)
        .then((response) => {
          // if response.status == 204
          this.$emit('update', response.data)
          this.close()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    close() {
      this.$emit('close')
    },
  }
}
</script>
