<template>
  <v-row>
    <v-col>
      <v-chip label variant="text" prepend-icon="mdi-tag-outline">
        {{ $t('Common.PriceCount', { count: priceTotal }) }}
      </v-chip>

      <template v-if="!loading">
        <LoadedCountChip
          :loadedCount="priceList.length"
          :totalCount="priceTotal"
        />
        <FilterMenu
          kind="price"
          :currentFilterList="currentFilterList"
          :currentType="currentType"
          @update:currentFilterList="updateFilterList"
          @update:currentType="togglePriceType"
        />
      </template>
    </v-col>
  </v-row>

  <!-- Price comparison prototype -->
  <v-row v-if="comparePriceA !== null && comparePriceB !== null">
    <v-col>
      <v-card class="pa-4 mb-4" outlined>
        <h3>{{ $t('Prices.ComparisonPrototype') }}</h3>
          <p>{{ $t('Prices.PriceA') }} {{ comparePriceA }}</p>
          <p>{{ $t('Prices.PriceB') }} {{ comparePriceB }}</p>
          <p>{{ $t('Prices.CheaperLocation') }}</p>
          <p>{{ $t('Prices.NoPricesFound') }}</p>

      </v-card>
    </v-col>
  </v-row>

  <!-- Price list -->
  <v-row class="mt-0">
    <v-col
      v-for="price in priceList"
      :key="price.id"
      cols="12"
      sm="6"
      md="4"
      xl="3"
    >
      <PriceCard
        :price="price"
        :product="price.product"
        elevation="1"
        height="100%"
      />
    </v-col>
  </v-row>

  <!-- Empty state -->
  <v-row v-if="!loading && priceList.length === 0">
    <v-col align="center" class="py-8">
      <v-icon size="48" color="grey">
        mdi-database-off-outline
      </v-icon>
      <p class="mt-4 text-grey">
        No prices found for the selected filters.
      </p>
    </v-col>
  </v-row>

  <!-- Error state -->
  <v-row v-if="error">
    <v-col align="center">
      <v-alert type="error" variant="tonal">
        {{ error }}
      </v-alert>
    </v-col>
  </v-row>

  <!-- Loading -->
  <v-row v-if="loading">
    <v-col align="center">
      <v-progress-circular indeterminate :size="30" />
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import openPricesApi from '../services/openPricesApi'
import constants from '../constants'
import date_utils from '../utils/date.js'
import utils from '../utils.js'

export default {
  components: {
    LoadedCountChip: defineAsyncComponent(() =>
      import('../components/LoadedCountChip.vue')
    ),
    FilterMenu: defineAsyncComponent(() =>
      import('../components/FilterMenu.vue')
    ),
    PriceCard: defineAsyncComponent(() =>
      import('../components/PriceCard.vue')
    )
  },

  data () {
    return {
      priceList: [],
      priceTotal: null,
      pricePage: 0,
      loading: false,
      error: null,

      currentFilterList: [],
      currentType: '',
      currentOrder: constants.PRICE_ORDER_LIST[3].key,

      comparePriceA: null,
      comparePriceB: null,
      cheaperLocation: null
    }
  },

  computed: {
    getPricesParams () {
      const params = {
        order_by: this.currentOrder,
        page: this.pricePage
      }

      if (this.currentFilterList.includes('show_last_month')) {
        params.date__gte = date_utils.oneMonthAgoDate()
      }

      if (this.currentType) {
        params[constants.TYPE_PARAM] = this.currentType
      }

      return params
    }
  },

  watch: {
    $route (newRoute, oldRoute) {
      if (
        oldRoute.path === newRoute.path &&
        JSON.stringify(oldRoute.query) !== JSON.stringify(newRoute.query)
      ) {
        this.initPrices()
      }
    }
  },

  mounted () {
    this.currentFilterList =
      utils.toArray(this.$route.query[constants.FILTER_PARAM]) ||
      this.currentFilterList

    this.currentType =
      this.$route.query[constants.TYPE_PARAM] || this.currentType

    this.initPrices()

    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100)
    window.addEventListener('scroll', this.handleDebouncedScroll)
  },

  unmounted () {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },

  methods: {
    initPrices () {
      this.priceList = []
      this.priceTotal = null
      this.pricePage = 0
      this.getPrices()
    },

    getPrices () {
      if (
        this.priceTotal !== null &&
        this.priceList.length >= this.priceTotal
      ) {
        return
      }

      this.loading = true
      this.error = null
      this.pricePage += 1

      return api
        .getPrices(this.getPricesParams)
        .then((data) => {
          this.priceList.push(...data.items)
          this.priceTotal = data.total
          this.compareFirstTwoPrices()
        })
        .catch((err) => {
          console.error('Failed to fetch prices', err)
          this.error = 'Unable to load prices. Please try again later.'
        })
        .finally(() => {
          this.loading = false
        })
    },

    updateFilterList (newFilterList) {
      this.currentFilterList = newFilterList
      this.$router.push({
        query: {
          ...this.$route.query,
          [constants.FILTER_PARAM]: this.currentFilterList
        }
      })
    },

    togglePriceType (sourceKey) {
      this.currentType = this.currentType !== sourceKey ? sourceKey : ''
      this.$router.push({
        query: {
          ...this.$route.query,
          [constants.TYPE_PARAM]: this.currentType
        }
      })
    },

    handleScroll () {
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getPrices()
      }
    },

    compareFirstTwoPrices () {
      if (this.priceList.length < 2) return

      const priceA = this.priceList[0]
      const priceB = this.priceList[1]

      this.comparePriceA = priceA.price ?? priceA.price_value
      this.comparePriceB = priceB.price ?? priceB.price_value

      if (this.comparePriceA == null || this.comparePriceB == null) return

      this.cheaperLocation =
        this.comparePriceA < this.comparePriceB
          ? priceA.location?.name || 'Location A'
          : priceB.location?.name || 'Location B'
    }
  }
}
</script>
