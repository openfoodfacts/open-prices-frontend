<template>
  <v-dialog max-height="80%" min-width="50%" width="auto">
    <v-card>
      <v-card-title>
        {{ $t('BarcodeManualInput.Title') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="close" />
      </v-card-title>

      <v-divider />

      <v-card-text>
        <v-form @submit.prevent="onSubmit">
          <v-text-field
            ref="barcodeInput"
            v-model="barcodeForm.barcode"
            :label="$t('BarcodeManualInput.Barcode')"
            type="number"
            inputmode="numeric"
            prepend-inner-icon="mdi-barcode"
            :hint="barcodeForm.barcode.length.toString()"
            persistent-hint
          />
          <v-btn
            v-if="barcodeForm.barcode.length !== 13"
            type="submit"
            class="mt-2"
            :disabled="!formFilled"
          >
            {{ $t('BarcodeManualInput.Submit') }}
          </v-btn>

          <h3 v-if="showInvalidBarcodeMessage" class="mb-1">
            {{ $t('BarcodeManualInput.InvalidBarcode') }}
          </h3>
          <v-row class="mt-0">
            <v-col v-if="!products" cols="12" sm="6" md="4" xl="3">
              <v-skeleton-loader type="card" />
            </v-col>
            <v-col v-for="product in products" :key="product.code" cols="12" sm="6" md="4" xl="3">
              <ProductCard :product="product" elevation="1" height="100%" :readonly="true" :hideProductActions="true" :hideProductBarcode="false" @click="productSelected(product)" />
            </v-col>
          </v-row>
          <v-btn
            v-if="showInvalidBarcodeMessage && products && products.length === 0"
            class="mt-2"
            @click="onSubmit()"
          >
            {{ $t('BarcodeManualInput.NoProductsFoundSubmit') }}
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import utils from '../utils.js'
import api from '../services/api'

export default {
  components: {
    ProductCard: defineAsyncComponent(() => import('../components/ProductCard.vue')),
  },
  props: {
    preFillValue: {
      type: String,
      default: ''
    }
  },
  emits: ['barcode', 'close'],
  data() {
    return {
      barcodeForm: {
        barcode: '',
      },
      products : [],
      showInvalidBarcodeMessage: false
    }
  },
  computed: {
    formFilled() {
      return Object.values(this.barcodeForm).every(x => !!x)
    }
  },
  watch: {
    'barcodeForm.barcode'(barcode) {
      this.showInvalidBarcodeMessage = false
      this.products = []
      if (barcode && barcode.length === 13) {
        this.products = null
        if (this.isValidBarcode(barcode)) {
          this.showInvalidBarcodeMessage = false
          this.getProduct(barcode).then(product => this.products = [product])
        } else {
          this.showInvalidBarcodeMessage = true
          this.getProductsFromAdjacentBarcodes(barcode)
        }
      }
    }
  },
  mounted() {
    if (this.preFillValue) {
      this.barcodeForm.barcode = this.preFillValue
    }
    this.$refs.barcodeInput.focus()
  },
  methods: {
    onSubmit() {
      this.$emit('barcode', this.barcodeForm.barcode)
      this.close()
    },
    close() {
      this.$emit('close')
    },
    isValidBarcode(barcode) {
      return utils.isValidBarcode(barcode)
    },
    getProduct(barcode) {
      return api.getProductByCode(barcode)
      .then((data) => {
        if (data.id) {
          return data
        } 
        return { code: barcode }
      })
    },
    async getProductsFromAdjacentBarcodes(barcode) {
      const adjacentBarcodes = utils.findAdjacentValidBarcodes(barcode)
      let products = []
      for (let i = 0; i < adjacentBarcodes.length; i++) {
        const product = await this.getProduct(adjacentBarcodes[i])
        if (product.id) {
          products.push(product)
        }
      }
      this.products = products
    },
    productSelected(product) {
      this.barcodeForm.barcode = product.code
      this.onSubmit()
    },
  }
}
</script>
