<template>
  <v-row>
    <v-col cols="12" sm="6">
      <PriceCard v-if="product" :product="product" :readonly="true" elevation="1"></PriceCard>
      <v-card v-if="productIsCategory" :title="getCategoryName" prepend-icon="mdi-fruit-watermelon"></v-card>
    </v-col>
  </v-row>

  <v-row class="mt-0" v-if="product">
    <v-col cols="12" sm="6">
      <v-btn v-if="product.code && product.source" size="small" append-icon="mdi-open-in-new" :href="getProductOFFUrl(product)" target="_blank">
        Open Food Facts
      </v-btn>
      <p v-if="!product.code || !product.source" class="text-red">
        <i>Product not found in Open Food Facts... Don't hesitate to add it :)</i>
      </p>
    </v-col>
  </v-row>

  <br />

  <h2 class="mb-1">
    Latest prices
    <small>{{ productPriceTotal }}</small>
    <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h2>

  <v-row>
    <v-col cols="12" sm="6" md="4" v-for="price in productPriceList" :key="price">
      <PriceCard :price="price" :product="product" :hideProductImage="true" :hideProductTitle="true" :hideProductDetails="productIsCategory ? false : true" elevation="1" height="100%"></PriceCard>
    </v-col>
  </v-row>

  <v-row v-if="productPriceList.length < productPriceTotal" class="mb-2">
    <v-col align="center">
      <v-btn size="small" @click="getProductPrices">Load more</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import utils from '../utils.js'
import api from '../services/api'
import PriceCard from '../components/PriceCard.vue'

export default {
  components: {
    PriceCard,
  },
  data() {
    return {
      productId: this.$route.params.id,  // product_code or product_category
      product: null,
      productPriceList: [],
      productPriceTotal: null,
      productPricePage: 0,
      loading: false,
    }
  },
  mounted() {
    this.getProduct(),
    this.getProductPrices()
  },
  computed: {
    productIsCategory() {
      return this.productId.startsWith('en')
    },
    getCategoryName() {
      if (this.productIsCategory) {
        const tag = utils.getCategory(this.productId)
        return tag ? tag.name : this.productId
      }
    },
  },
  methods: {
    getProduct() {
      if (!this.productIsCategory) {
        return api.getProductByCode(this.productId)
          .then((data) => {
            if (data.id) {
              this.product = data
            }
          })
      }
    },
    getProductPrices() {
      this.loading = true
      this.productPricePage += 1
      return api.getPrices({ [this.productIsCategory ? 'category_tag' : 'product_code']: this.productId, page: this.productPricePage })
        .then((data) => {
          this.productPriceList.push(...data.items)
          this.productPriceTotal = data.total
          this.loading = false
        })
    },
    getProductOFFUrl(product) {
      return `https://world.openfoodfacts.org/product/${product.code}`
    }
  }
}
</script>
