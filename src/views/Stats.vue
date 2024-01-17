<template>
  <h1 class="mb-1">
    {{ $t('Stats.Title') }} <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h1>

  <v-row>
    <v-col cols="12" md="6" lg="4">
      <v-card :title="$t('Stats.Prices')" height="100%">
        <v-card-text>
          <p>
            Total
            <strong>{{ priceTotal }}</strong>
          </p>
          <p>
            With a product <v-chip label size="small" density="comfortable" class="mr-1">barcode</v-chip>
            <strong>{{ priceWithProduct }}</strong>
          </p>
          <p>
            Without a product <v-chip label size="small" density="comfortable" class="mr-1">category</v-chip>
            <strong>{{ priceWithoutProductTotal }}</strong>
          </p>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="6" lg="4">
      <v-card title="Products" height="100%">
        <v-card-text>
          <p>
            Total
            <strong>{{ productTotal }}</strong>
          </p>
          <p>
            With a price
            <strong>{{ productWithPriceTotal }}</strong>
          </p>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="6" lg="4">
      <v-card title="Locations" height="100%">
        <v-card-text>
          <p>
            Total
            <strong>{{ locationTotal }}</strong>
          </p>
          <p>
            With a price
            <strong>{{ locationWithPriceTotal }}</strong>
          </p>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="6" lg="4">
      <v-card title="Users" height="100%">
        <v-card-text>
          <p>
            Total
            <strong>{{ userTotal }}</strong>
          </p>
          <p>
            With a price
            <strong>{{ userWithPriceTotal }}</strong>
          </p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'

export default {
  data() {
    return {
      priceTotal: null,
      // priceWithProduct: null,
      priceWithoutProductTotal: null,
      productTotal: null,
      productWithPriceTotal: null,
      locationTotal: null,
      locationWithPriceTotal: null,  // same
      userTotal: null,
      userWithPriceTotal: null,
      loading: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    priceWithProduct() {
      return this.priceTotal - this.priceWithoutProductTotal
    }
  },
  mounted() {
    if (!this.appStore.stats.last_updated) {
      api.updateStats()
    }
  },
  methods: {
  }
}
</script>
