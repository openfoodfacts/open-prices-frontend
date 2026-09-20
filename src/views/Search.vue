<template>
  <v-tabs v-model="currentTab" :grow="!$vuetify.display.smAndUp" class="mb-3">
    <v-tab value="product" prepend-icon="mdi-barcode" data-name="product-search-tab">
      {{ $t('Common.Product') }}
    </v-tab>
    <v-tab value="category" prepend-icon="mdi-basket-outline" data-name="category-search-tab">
      {{ $t('Common.Category') }}
    </v-tab>
  </v-tabs>

  <v-tabs-window v-model="currentTab" disabled>
    <v-tabs-window-item value="product">
      <v-form class="mb-3" @submit.prevent="search">
        <v-text-field
          ref="searchInput"
          v-model="productSearchForm.q"
          :label="$t('Search.ProductBarcode')"
          type="text"
          inputmode="numeric"
          pattern="[0-9]+"
          :rules="[fieldRequired]"
          hide-details="auto"
          :loading="loading"
          required
        >
          <template #prepend-inner>
            <v-icon :icon="formFilled ? 'mdi-barcode' : 'mdi-barcode-scan'" @click="showBarcodeScannerDialog" />
          </template>
          <template #append-inner>
            <v-btn color="primary" icon="mdi-magnify" @click="search" />
          </template>
        </v-text-field>
      </v-form>
      <p v-if="productTotal === 0" class="text-red">
        <i>{{ $t('ProductDetail.ProductNotFound') }}</i>
      </p>

      <v-row v-if="productTotal > 0" class="mt-0">
        <v-col v-for="product in productList" :key="product" cols="12" sm="6" md="4" xl="3">
          <ProductCard :product="product" :latestPrice="product.latest_price" elevation="1" height="100%" />
        </v-col>
      </v-row>
    </v-tabs-window-item>
    <v-tabs-window-item value="category">
      <v-autocomplete
        v-model="category"
        data-name="category-search-input"
        :label="$t('Common.Category')"
        :items="categoryTags"
        item-title="name"
        item-value="id"
        return-object
        clearable
        hide-details="auto"
        :loading="categoryLoading"
        :error-messages="categoryError ? $t('Common.ErrorServer') : []"
        @update:modelValue="searchCategory"
      />
      <v-row v-if="category && !categoryError" class="mt-0">
        <v-col cols="12" sm="6" md="4" xl="3">
          <CategoryCard
            :category="category"
            source="product"
            :priceCount="categoryPriceTotal"
            :loading="categoryLoading"
            :hideActionMenuButton="true"
            :to="{ name: 'product-detail', params: { id: category.id } }"
            elevation="1"
          />
        </v-col>
      </v-row>
    </v-tabs-window-item>
  </v-tabs-window>

  <BarcodeScannerDialog
    v-if="barcodeScannerDialog"
    v-model="barcodeScannerDialog"
    barcodeManualInputMode="add"
    @barcode="setProductCode($event)"
    @close="barcodeScannerDialog = false"
  />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'
import openPricesApi from '../services/openPricesApi'
import barcodeUtils from '../utils/barcode'
import data_utils from '../utils/data.js'

export default {
  components: {
    ProductCard: defineAsyncComponent(() => import('../components/ProductCard.vue')),
    CategoryCard: defineAsyncComponent(() => import('../components/CategoryCard.vue')),
    BarcodeScannerDialog: defineAsyncComponent(() => import('../components/BarcodeScannerDialog.vue'))
  },
  data() {
    return {
      currentTab: 'product',
      categoryTags: [],
      category: null,
      categoryPriceTotal: null,
      categoryLoading: false,
      categoryError: false,
      productSearchForm: {
        q: ''
      },
      productList: [],
      productTotal: null,
      loading: false,
      // barcode scanner
      barcodeScannerDialog: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    formFilled() {
      return Object.values(this.productSearchForm).every(x => !!x)
    }
  },
  watch: {
    $route (newRoute, oldRoute) { // only called when query changes to avoid having an API call when the path changes
      if (oldRoute.path === newRoute.path && JSON.stringify(oldRoute.query) !== JSON.stringify(newRoute.query)) {
        this.getProducts()
      }
    }
  },
  mounted() {
    data_utils.getLocaleCategoryTags(this.appStore.getUserLanguage).then((module) => {
      this.categoryTags = module.default
    })
    this.productSearchForm.q = this.$route.query[constants.QUERY_PARAM] || ''
    this.getProducts()
  },
  methods: {
    searchCategory(category) {
      this.categoryPriceTotal = null
      this.categoryError = false
      this.categoryLoading = !!category
      if (!category) return
      return openPricesApi.getPrices({ category_tag: category.id, size: 1 })
        .then((data) => {
          if (this.category?.id === category.id) this.categoryPriceTotal = data.total
        })
        .catch(() => {
          if (this.category?.id === category.id) this.categoryError = true
        })
        .finally(() => {
          if (this.category?.id === category.id) this.categoryLoading = false
        })
    },
    fieldRequired(v) {
      return !!v
    },
    showBarcodeScannerDialog() {
      this.$refs.searchInput.blur()
      this.barcodeScannerDialog = true
    },
    setProductCode(code) {
      this.productSearchForm.q = code
      this.search()
    },
    search() {
      this.$refs.searchInput.blur()
      this.$router.push({ query: { ...this.$route.query, [constants.QUERY_PARAM]: this.productSearchForm.q } })
    },
    getProducts() {
      if (this.productSearchForm.q) {
        this.productList = []
        this.productTotal = null
        this.loading = true
        // Normalizes UPC barcode to EAN 13 barcode
        const code = barcodeUtils.normalizeBarcode(this.productSearchForm.q)
        return openPricesApi.getProducts({ code: code })
          .then((data) => {
            if (!data.items) return
            this.productList.push(...data.items)
            this.productTotal = data.total
            if (data.items.length) {
              this.getProductLatestPrices()
            }
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    getProductLatestPrices() {
      this.productList.forEach((product) => {
        if (product.price_count && !product.latest_price) {
          this.getPrices(product)
        }
      })
    },
    getPrices(product) {
      return openPricesApi.getPrices({ product_code: product.code, size: 1, order_by: '-date' })
        .then((data) => {
          if (data.items.length) {
            product.latest_price = data.items[0]
          }
        })
    }
  }
}
</script>
