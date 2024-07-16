<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-card
        :title="date"
        prepend-icon="mdi-calendar-today"
      >
        <v-card-text>
          <PriceCountChip :count="datePriceTotal" :withLabel="true" />
          <v-chip
            v-for="dp in dateParentList"
            :key="dp.name"
            label size="small" density="comfortable" class="mr-1" @click="$router.push(dp.path)"
          >
            {{ dp.name }}
          </v-chip>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col cols="12">
      <ShareButton />
    </v-col>
  </v-row>

  <br>

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

export default {
  components: {
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    OrderMenu: defineAsyncComponent(() => import('../components/OrderMenu.vue')),
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue')),
    ShareButton: defineAsyncComponent(() => import('../components/ShareButton.vue'))
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
      if (this.date) {
        if (this.date.match(constants.DATE_FULL_REGEX_MATCH)) {
          return 'DAY'
        } else {
          // YYYY-MM
          const matches = this.date.match(constants.DATE_YEAR_MONTH_REGEX_MATCH)
          if (matches) {
            return 'MONTH'
          // YYYY
          } else if (this.date.match(constants.DATE_YEAR_REGEX_MATCH)) {
            return 'YEAR'
          } else {
            return null
          }
        }
      }
      return null
    },
    dateParentList() {
      let dateParentList = []
      if (this.dateType === 'DAY') {
        const matches = this.date.match(constants.DATE_FULL_REGEX_MATCH)
        const year = matches[1]
        const month = `${year}-${matches[2]}`
        dateParentList.push({ name: month, path: `/dates/${month}` })
        dateParentList.push({ name: year, path: `/dates/${year}` })
      } else if (this.dateType === 'MONTH') {
        const matches = this.date.match(constants.DATE_YEAR_MONTH_REGEX_MATCH)
        const year = matches[1]
        dateParentList.push({ name: year, path: `/dates/${year}` })
      }
      return dateParentList
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
