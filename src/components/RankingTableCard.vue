<template>
  <v-card>
    <template #title>
      <small>{{ title }}</small>
    </template>
  
    <v-card-text>
      <v-data-table :headers="headers" :items="itemsDisplayed" :items-per-page="tablePageLimit" hide-default-header hide-default-footer>
        <template #[`item.rank`]="{ index }">
          {{ index + 1 }}
        </template>
        <template #[`item.owner`]="{ item }">
          {{ item.owner }}
        </template>
        <template #[`item.osm_address_country`]="{ item }">
          <span v-if="item.id">{{ getLocationTitle(item) }}</span>
          <span v-else>{{ getCityCountryTitle(item) }}</span>
        </template>
        <template #[`item.product_name`]="{ item }">
          <ProductCard :product="item" :hidePriceCount="true" :hideCategoriesAndLabels="true" :hideActionMenuButton="true" :readonly="true" elevation="1" />
        </template>
        <template #[`item.count`]="{ item }">
          <div class="float-right">
            {{ item.count }}
          </div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import geo_utils from '../utils/geo.js'

export default {
  components: {
    ProductCard: defineAsyncComponent(() => import('../components/ProductCard.vue')),
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    },
    itemsDisplayedCount: {
      type: Number,
      default: 3
    },
    hideRank: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tablePageLimit: -1,  // all items
    }
  },
  computed: {
    headers() {
      let allHeaders = [
        { text: this.$t('Common.Rank'), key: 'rank', width: '10%' },
        { text: this.$t('Common.User'), key: 'owner' },  // field only in user ranking
        { text: this.$t('Common.Country'), key: 'osm_address_country' },  // field only in location rankings
        { text: this.$t('Common.Product'), key: 'product_name' },  // field only in product ranking
        { text: this.$t('Common.Count'), key: 'count' },
      ]
      return allHeaders.filter((header, index) => (!this.hideRank && index === 0) || this.items.some(item => item[header.key] !== undefined))
    },
    itemsDisplayed() {
      return this.items.slice(0, this.itemsDisplayedCount)
    }
  },
  methods: {
    getLocationTitle(location) {
      return geo_utils.getLocationOSMTitle(location, true, false, true, false, true) 
    },
    getCityCountryTitle(location) {
      return geo_utils.getLocationOSMTitle(location, false, false, true, true, true) 
    },
  }
}
</script>
