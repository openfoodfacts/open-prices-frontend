<template>
  <v-row>
    <v-col cols="12" sm="6">
      <DateCard :date="date" :priceCount="datePriceTotal" />
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <h2 class="text-h6 d-inline mr-2">
        {{ $t('Common.LatestPrices') }}
      </h2>
      <v-progress-circular v-if="loading" indeterminate :size="30" />
      <OrderMenu v-if="!loading" kind="price" :currentOrder="currentOrder" @update:currentOrder="selectPriceOrder($event)" />
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="price in datePriceList" :key="price" cols="12" sm="6" md="4">
      <PriceCard :price="price" :product="price.product" elevation="1" height="100%" />
    </v-col>
  </v-row>

  <v-row v-if="datePriceList.length < datePriceTotal" class="mb-2">
    <v-col align="center">
      <v-btn size="small" :loading="loading" @click="getDatePrices">
        {{ $t('Common.LoadMore') }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import api from '../services/api'
import constants from '../constants'
import utils from '../utils.js'

export default {
  components: {
    DateCard: defineAsyncComponent(() => import('../components/DateCard.vue')),
    OrderMenu: defineAsyncComponent(() => import('../components/OrderMenu.vue')),
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue'))
  },
  data() {
    return {
      // data
      date: null,  // see init
      datePriceList: [],
      datePriceTotal: null,
      datePricePage: 0,
      loading: false,
      // filter & order
      currentOrder: constants.PRICE_ORDER_LIST[1].key,
    }
  },
  computed: {
    dateType() {
      return utils.dateType(this.date)
    },
    getPricesParams() {
      let defaultParams = { order_by: this.currentOrder, page: this.datePricePage }
      // YYYY-MM-DD
      if (this.dateType === 'DAY') {
        defaultParams['date'] = this.date
      } else if (this.dateType === 'MONTH') {
        // YYYY-MM
        const matches = this.date.match(constants.DATE_YEAR_MONTH_REGEX_MATCH)
        defaultParams['date__year'] = matches[1]
        defaultParams['date__month'] = matches[2]
      } else if (this.dateType === 'YEAR') {
        // YYYY
        defaultParams['date__year'] = this.date
      }
      return defaultParams
    },
  },
  watch: {
    $route (newDate, oldDate) {
      if (oldDate && newDate && newDate.name == 'date-detail' && oldDate.fullPath != newDate.fullPath) {
        this.initDate()
      }
    }
  },
  mounted() {
    this.currentOrder = this.$route.query[constants.ORDER_PARAM] || this.currentOrder
    this.initDate()
  },
  methods: {
    initDate() {
      this.date = this.$route.params.date
      this.datePriceList = []
      this.datePriceTotal = null
      this.datePricePage = 0
      this.getDatePrices()
    },
    getDatePrices() {
      this.loading = true
      this.datePricePage += 1
      return api.getPrices(this.getPricesParams)
        .then((data) => {
          this.datePriceList.push(...data.items)
          this.datePriceTotal = data.total
          this.loading = false
        })
    },
    selectPriceOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.currentOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.currentOrder } })
        // this.initDate() will be called in watch $route
      }
    }
  }
}
</script>
