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

  <!-- Progress Bars -->
  <v-row v-if="startedComparing && isLoadingAny" class="mt-4">
    <v-col cols="12" md="6">
      <v-card variant="outlined" class="pa-2">
        <div class="text-subtitle-2 mb-1">
          {{ selectedLocationA.count }} / {{ selectedLocationA.total || '?' }}
        </div>
        <v-progress-linear
          :model-value="selectedLocationA.total ? (selectedLocationA.count / selectedLocationA.total) * 100 : 0"
          color="primary" height="10" striped :indeterminate="!selectedLocationA.total"
        />
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card variant="outlined" class="pa-2">
        <div class="text-subtitle-2 mb-1">
          {{ selectedLocationB.count }} / {{ selectedLocationB.total || '?' }}
        </div>
        <v-progress-linear
          :model-value="selectedLocationB.total ? (selectedLocationB.count / selectedLocationB.total) * 100 : 0"
          color="primary" height="10" striped :indeterminate="!selectedLocationB.total"
        />
      </v-card>
    </v-col>
  </v-row>

  <!-- Products Table -->
  <v-row v-if="startedComparing && !isLoadingAny" class="mt-4">
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
      productMap: {}, // Persistent map for incremental updates

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
    isLoadingAny() {
      return (this.selectedLocationA.fetching || this.selectedLocationB.fetching)
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
      this.productsList = []
      this.productMap = {}
      this.selectedLocationA.fetching = true
      this.selectedLocationA.count = 0
      this.selectedLocationA.total = 0
      this.selectedLocationA.totalPrice = 0
      this.selectedLocationB.fetching = true
      this.selectedLocationB.count = 0
      this.selectedLocationB.total = 0
      this.selectedLocationB.totalPrice = 0

      // Start fetching in background
      this.fetchPricesProgressive(this.selectedLocationA, 1)
      this.fetchPricesProgressive(this.selectedLocationB, 2)
    },
    async fetchPricesProgressive(location, locIndex) {
      const pageSize = 100

      // Helper to build params
      const getParams = (p) => {
        return { location_id: location.id, page: p, size: pageSize, order_by: '-date' }
      }

      // Helper to process response incrementally
      const processResponse = (response) => {
        if (response.items && response.items.length > 0) {
          response.items.forEach(p => {
            const code = p.product_code || (p.product ? p.product.code : null)
            if (!code) return

            if (!this.productMap[code]) {
              this.productMap[code] = {
                product_code: code,
                product_name: p.product_name || (p.product ? p.product.product_name : ''),
                price1: null,
                price2: null,
                date1: null,
                date2: null,
                cheapest: null,
                inList: false // track if already added to UI list
              }
            }

            const entry = this.productMap[code]

            // Check if price for this location is already set
            // If set, we only update if the new price is MORE RECENT (date > existing date)
            let shouldUpdate = false
            const newDate = p.date || '' // assume ISO string or comparable
            if (locIndex === 1) {
              if (entry.price1 === null) {
                shouldUpdate = true
              } else {
                // Explicit comparison: if new date is newer than stored date
                if (newDate > (entry.date1 || '')) shouldUpdate = true
              }
            } else {
              if (entry.price2 === null) {
                shouldUpdate = true
              } else {
                if (newDate > (entry.date2 || '')) shouldUpdate = true
              }
            }

            if (!shouldUpdate) return

            // If we are updating an existing price, we need to adjust the total first
            if (locIndex === 1 && entry.price1 !== null) {
              this.selectedLocationA.totalPrice -= entry.price1
            } else if (locIndex === 2 && entry.price2 !== null) {
              this.selectedLocationB.totalPrice -= entry.price2
            }

            // Update price and date
            if (locIndex === 1) {
              entry.price1 = p.price
              entry.date1 = newDate
            } else {
              entry.price2 = p.price
              entry.date2 = newDate
            }

            if (entry.price1 !== null && entry.price2 !== null) {
              if (entry.price1 < entry.price2) entry.cheapest = 'price1'
              else if (entry.price1 > entry.price2) entry.cheapest = 'price2'
              else entry.cheapest = 'equal'

              if (!entry.inList) {
                this.productsList.push(entry)
                this.selectedLocationA.totalPrice += entry.price1
                this.selectedLocationB.totalPrice += entry.price2
                entry.inList = true
              } else {
                if (locIndex === 1)
                  this.selectedLocationA.totalPrice += entry.price1
                else
                  this.selectedLocationB.totalPrice += entry.price2
              }
            }
          })

          location.count += response.items.length
          return true
        }
        return false
      }

      try {
        let p = 1
        let currentReq = openPricesApi.getPrices(getParams(p))

        while (currentReq) {
          try {
            const res = await currentReq

            if (p === 1 && res.total !== undefined) location.total = res.total
            
            if (p === res.pages) {
              break
            }

            let nextReq = null
            p++
            nextReq = openPricesApi.getPrices(getParams(p))

            processResponse(res)
            currentReq = nextReq
          } catch (e) {  // eslint-disable-line no-unused-vars
            break
          }
        }
      } finally {
        location.fetching = false
      }
    },
    // Step 4: reset comparison = clear query params
    resetComparison() {
      this.$router.push({ name: 'locations-compare' })
    }
  },
}
</script>
