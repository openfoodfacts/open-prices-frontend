<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-card
        :title="date"
        prepend-icon="mdi-calendar-today"
      >
        <v-card-text>
          <v-chip label size="small" density="comfortable" class="mr-1">
            <v-icon start icon="mdi-food-outline" />
            {{ $t('Common.PriceCount', { count: datePriceTotal }) }}
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
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="price in datePriceList" :key="price" cols="12" sm="6" md="4">
      <PriceCard :price="price" :product="price.product" :hidePriceLocation="true" elevation="1" height="100%" />
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

export default {
  components: {
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
    }
  },
  watch: {
    $route (newDate, oldDate) {
      if (oldDate && newDate && newDate.name == 'date-detail' && oldDate.fullPath != newDate.fullPath) {
        this.initDate()
      }
    }
  },
  mounted() {
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
      return api.getPrices({ date: this.date, page: this.datePricePage })
        .then((data) => {
          this.datePriceList.push(...data.items)
          this.datePriceTotal = data.total
          this.loading = false
        })
    },
  }
}
</script>
