<template>
  <!-- Location Input Rows -->
  <v-row v-if="!loading">
    <v-col>
      <LocationCard v-if="selectedLocationA && selectedLocationA.id" :location="selectedLocationA" readonly />
      <template v-else>
        <LocationInputRow @location="selectLocation($event, 'a')" />
        <v-alert v-if="selectedLocationA && !selectedLocationA.id" class="mt-4" data-name="location-not-found-alert" type="error" variant="outlined" density="compact">
          {{ $t('Common.LocationNotFound') }}
        </v-alert>
      </template>
    </v-col>
    <v-col>
      <LocationCard v-if="selectedLocationB && selectedLocationB.id" :location="selectedLocationB" readonly />
      <template v-else>
        <LocationInputRow @location="selectLocation($event, 'b')" />
        <v-alert v-if="selectedLocationB && !selectedLocationB.id" class="mt-4" data-name="location-not-found-alert" type="error" variant="outlined" density="compact">
          {{ $t('Common.LocationNotFound') }}
        </v-alert>
      </template>
    </v-col>
  </v-row>

  <!-- Compare Button -->
  <v-row v-if="!startedComparing">
    <v-col cols="12" align="center">
      <v-btn color="primary" :disabled="!readyToCompare" @click="fetchComparisonData">
        {{ $t('Common.LocationsCompare') }}
      </v-btn>
      <v-btn class="ml-4" color="primary" @click="resetComparison">
        {{ $t('Common.Reset') }}
      </v-btn>
    </v-col>
  </v-row>

  <!-- Products Table -->
  <v-row v-if="startedComparing && !loading" class="mt-4">
    <v-col v-if="productsList.length > 0" cols="12">
      <v-data-table :headers="headers" :items="productsList" hide-default-footer>
        <template #tfoot>
          <tr>
            <td :colspan="headers.length" class="pa-0">
              <hr class="w-100">
            </td>
          </tr>
          <tr class="text-subtitle-1">
            <td class="pa-4">
              {{ $t('Common.ProductCount', { count: productsList.length }) }}
            </td>
            <td
              class="pa-4"
              :class="selectedLocationA.totalPrice < selectedLocationB.totalPrice ? 'text-success' : ''"
            >
              {{ selectedLocationA.totalPrice.toFixed(2) }}
            </td>
            <td
              class="pa-4"
              :class="selectedLocationB.totalPrice < selectedLocationA.totalPrice ? 'text-success' : ''"
            >
              {{ selectedLocationB.totalPrice.toFixed(2) }}
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-col>
    <v-col v-else-if="!hasSharedProducts" cols="12" align="center">
      <v-alert type="warning" variant="outlined" density="compact">
        {{ $t('LocationSelector.NoResult') }}
      </v-alert>
    </v-col>
    <v-col cols="12" align="center">
      <v-btn color="primary" @click="resetComparison">
        {{ $t('Common.Reset') }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import openPricesApi from '../services/openPricesApi'
import geo_utils from '../utils/geo.js'

export default {
  components: {
    LocationInputRow: defineAsyncComponent(() => import('../components/LocationInputRow.vue')),
    LocationCard: defineAsyncComponent(() => import('../components/LocationCard.vue')),
  },
  data() {
    return {
      LOCATION_KEYS: ['a', 'b'],
      selectedLocationA: null,  // id, type, osm_id, osm_type, price_count
      selectedLocationB: null,
      loading: false,

      // matching products
      productsList: null,

      // table
      tablePageLimit: -1,  // all items
      headers: [
        { title: 'Product Name', key: 'product_name' },
        {
          title: 'Price Location A',
          key: 'price1',
          value: item => item.price1 || '-',
          cellProps: ({ item }) => {
            return { class: item.cheapest === 'price1' ? 'text-success font-weight-bold' : '' }
          }
        },
        {
          title: 'Price Location B',
          key: 'price2',
          value: item => item.price2 || '-',
          cellProps: ({ item }) => {
            return { class: item.cheapest === 'price2' ? 'text-success font-weight-bold' : '' }
          }
        },
      ],
    }
  },
  computed: {
    showCompareButton() {
      return Object.keys(this.$route.query).length > 0
    },
    readyToCompare() {
      return this.selectedLocationA && this.selectedLocationA.id && this.selectedLocationB && this.selectedLocationB.id
    },
    startedComparing() {
      return this.readyToCompare && this.productsList !== null
    },
    hasSharedProducts() {
      return this.productsList.length > 0
    }
  },
  watch: {
    $route(newRoute, oldRoute) { // only called when query changes
      if (oldRoute.path === newRoute.path && JSON.stringify(oldRoute.query) !== JSON.stringify(newRoute.query)) {
        this.initLocations()
      }
    }
  },
  mounted() {
    this.initLocations()
  },
  methods: {
    // Step 1: select locations = update query params
    selectLocation(location, key) {
      let query = JSON.parse(JSON.stringify(this.$route.query))
      if (location.type === 'ONLINE') {
        this[`selectedLocation${key.toUpperCase()}`] = location  // returned from location selector
        query[`location_${key}_id`] = location.id
        this.$router.push({ name: 'locations-compare', query: query })
      }
      else {
        openPricesApi.getLocationByOsmTypeAndId(geo_utils.getLocationType(location), geo_utils.getLocationID(location)).then((location) => {
          this[`selectedLocation${key.toUpperCase()}`] = location
          query[`location_${key}_id`] = location.id
          this.$router.push({ name: 'locations-compare', query: query })
        })
      }

      this.$router.push({ name: 'locations-compare', query: query })
    },
    // Step 2: fetch location(s) based on query params
    initLocations() {
      const query = this.$route.query
      if (Object.keys(this.$route.query).length) {
        this.LOCATION_KEYS.forEach(key => {
          if (!this[`selectedLocation${key.toUpperCase()}`] || !this[`selectedLocation${key.toUpperCase()}`].id) {
            if (query[`location_${key}_id`]) {
              openPricesApi.getLocationById(query[`location_${key}_id`]).then((location) => {
                this[`selectedLocation${key.toUpperCase()}`] = location
              })
            }
          }
        })
      } else {
        this.selectedLocationA = null
        this.selectedLocationB = null
      }
    },
    // Step 3: fetch comparison data based on selected locations
    fetchComparisonData() {
      // Reset
      this.loading = true
      this.productsList = []
      this.selectedLocationA.totalPrice = 0
      this.selectedLocationB.totalPrice = 0

      openPricesApi.getLocationsCompare(this.selectedLocationA.id, this.selectedLocationB.id).then((response) => {
        this.loading = false
        this.productsList = response.shared_products.map(product => {
          return {
            product_name: product.product_name,
            price1: product.location_a.price,
            price2: product.location_b.price,
            cheapest: !product.location_a.price ? 'price2' : !product.location_b.price ? 'price1' : (product.location_a.price < product.location_b.price ? 'price1' : 'price2')
          }
        })
        this.selectedLocationA.totalPrice = response.total_sum_location_a
        this.selectedLocationB.totalPrice = response.total_sum_location_b
      })
    },
    // Step 4: reset comparison = clear query params
    resetComparison() {
      this.$router.push({ name: 'locations-compare' })
    }
  },
}
</script>
