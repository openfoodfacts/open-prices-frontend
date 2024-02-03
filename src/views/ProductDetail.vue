<template>
  <v-row>
    <v-col cols="12" sm="6">
      <ProductCard v-if="!loading && !productIsCategory" :product="product" elevation="1"></ProductCard>
      <v-card v-if="!loading && productIsCategory" :title="getCategoryName" prepend-icon="mdi-fruit-watermelon" elevation="1"></v-card>
    </v-col>
  </v-row>

  <v-row class="mt-0" v-if="!productNotFound">
    <v-col cols="12">
      <v-btn class="mr-2" size="small" color="primary" prepend-icon="mdi-plus" :to="'/add/single?code=' + product.code">{{ $t('ProductDetail.AddPrice') }}</v-btn>
      <OpenFoodFactsButton v-if="product.code && product.source" type="product" :value="product.code"></OpenFoodFactsButton>
      <ShareButton></ShareButton>
    </v-col>
  </v-row>

  <v-row class="mt-0" v-if="productOrCategoryNotFound">
    <v-col cols="12" sm="6">
      <p v-if="productNotFound" class="text-red">
        <i>
          <i18n-t keypath="ProductDetail.ProductNotFound" tag="span">
            <template #name>{{ OFF_NAME }}</template>
          </i18n-t>
        </i>
      </p>
      <p v-if="categoryNotFound" class="text-red">
        <i>{{ $t('ProductDetail.CategoryNotFound') }}</i>
      </p>
    </v-col>
  </v-row>

  <br />

  <h2 class="text-h6 mb-1">
    {{ $t('ProductDetail.LatestPrices') }}
    <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h2>

  <v-row>
    <v-col cols="12" sm="6" md="4" v-for="price in productPriceList" :key="price">
      <PriceCard :price="price" :product="product" :hideProductImage="true" :hideProductTitle="true" :hideProductDetails="productIsCategory ? false : true" elevation="1" height="100%"></PriceCard>
    </v-col>
  </v-row>

  <v-row v-if="productPriceList.length < productPriceTotal" class="mb-2">
    <v-col align="center">
      <v-btn size="small" :loading="loading" @click="getProductPrices">{{ $t('ProductDetail.LoadMore') }}</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import constants from '../constants'
import utils from '../utils.js'
import api from '../services/api'
import ProductCard from '../components/ProductCard.vue'
import PriceCard from '../components/PriceCard.vue'
import OpenFoodFactsButton from '../components/OpenFoodFactsButton.vue'
import ShareButton from '../components/ShareButton.vue'

export default {
  components: {
    ProductCard,
    PriceCard,
    OpenFoodFactsButton,
    ShareButton,
  },
  data() {
    return {
      OFF_NAME: constants.OFF_NAME,
      productId: this.$route.params.id,  // product_code or product_category
      product: { code: this.$route.params.id },
      productPriceList: [],
      productPriceTotal: null,
      productPricePage: 0,
      loading: false,
      // share
      shareLinkCopySuccessMessage: false,
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
      return utils.getCategoryName(this.productId)
    },
    productNotFound() {
      return !this.productIsCategory && (!this.product.code || !this.product.source)
    },
    categoryNotFound() {
      return this.productIsCategory && (this.getCategoryName === this.productId)
    },
    productOrCategoryNotFound() {
      return !this.loading && (this.productNotFound || this.categoryNotFound)
    }
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
  }
}
</script>
