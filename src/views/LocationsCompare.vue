<template>
  <v-container>
    <!-- Location Input Rows -->
    <v-row v-if="!loading">
      <v-col>
        <LocationInputRow
          class="mt-0" :locationForm="location1" :existingLocation="selectedLocation1"
          @location="selectedLocation1 = $event"
        />
      </v-col>
      <v-col>
        <LocationInputRow
          class="mt-0" :locationForm="location2" :existingLocation="selectedLocation2"
          @location="selectedLocation2 = $event"
        />
      </v-col>
    </v-row>

    <!-- Loading State -->
    <v-row v-else class="justify-center">
      <v-progress-circular indeterminate />
    </v-row>
    <v-row class="justify-center mt-10">
      <p v-if="!selectedboth">
        {{ $t('Please select both locations') }}
      </p>
    </v-row>
    <v-row v-if="showCompareButton" class="justify-center mt-10">
      <v-btn color="primary" @click="compareLocations()">
        {{ $t('Common.LocationCompare') }}
      </v-btn>
    </v-row>

    <!-- Progress Bars -->
    <v-row v-if="isLoadingAny" class="mt-4">
      <v-col cols="12" md="6">
        <v-card variant="outlined" class="pa-2">
          <div class="text-subtitle-2 mb-1">
            {{ location1.count }} / {{ location1.total || '?' }}
          </div>
          <v-progress-linear
            :model-value="location1.total ? (location1.count / location1.total) * 100 : 0"
            color="primary" height="10" striped :indeterminate="!location1.total"
          />
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card variant="outlined" class="pa-2">
          <div class="text-subtitle-2 mb-1">
            {{ location2.count }} / {{ location2.total || '?' }}
          </div>
          <v-progress-linear
            :model-value="location2.total ? (location2.count / location2.total) * 100 : 0"
            color="primary" height="10" striped :indeterminate="!location2.total"
          />
        </v-card>
      </v-col>
    </v-row>

    <!-- Products Table -->
    <v-row v-if="selectedboth && !loading" class="mt-4">
      <v-col v-if="productsList.length > 0" cols="12">
        <v-data-table :headers="headers" :items="productsList" item-value="product_code" class="elevation-1">
          <template #tfoot>
            <tr>
              <td :colspan="headers.length" class="pa-0">
                <hr class="w-100">
              </td>
            </tr>
            <tr class="text-subtitle-1">
              <td class="pa-4">
                <strong>{{ $t('Total') }}</strong>
              </td>
              <td
                class="pa-4"
                :class="location1.totalPrice < location2.totalPrice ? 'text-success font-weight-bold' : ''"
              >
                {{ location1.totalPrice.toFixed(2) }}
              </td>
              <td
                class="pa-4"
                :class="location2.totalPrice < location1.totalPrice ? 'text-success font-weight-bold' : ''"
              >
                {{ location2.totalPrice.toFixed(2) }}
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
      <v-col v-else-if="isSharedItems" cols="12">
        <p class="text-center">
          {{ $t('No shared products found') }}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import openPricesApi from '../services/openPricesApi'
import geo_utils from '../utils/geo.js'

export default {
	components: {
		LocationInputRow: defineAsyncComponent(() => import('../components/LocationInputRow.vue')),
	},
	data() {
		return {
			location1: {
				type: null,
				location_id: null,
				location_osm_id: null,
				location_osm_type: '',
				count: 0,
				total: 0,
				totalPrice: 0,
				fetching: false,
			},
			location2: {
				type: null,
				location_id: null,
				location_osm_id: null,
				location_osm_type: '',
				count: 0,
				total: 0,
				totalPrice: 0,
				fetching: false,
			},
			selectedLocation1: null,
			selectedLocation2: null,
			loading: false,
			selectedboth: true,

			// Progressive loading state
			productsList: [],
			productMap: {}, // Persistent map for incremental updates

			headers: [
				{ title: 'Product Name', key: 'product_name' },
				{
					title: 'Price Location 1',
					key: 'price1',
					value: item => item.price1 || '-',
					cellProps: ({ item }) => {
						return { class: item.cheapest === 'price1' ? 'text-success font-weight-bold' : '' }
					}
				},
				{
					title: 'Price Location 2',
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
			return Object.keys(this.$route.query).length === 0
		},
		isLoadingAny() {
			return (this.location1.fetching || this.location2.fetching)
		},
		isSharedItems() {
			return this.productsList.length == 0 && !this.showCompareButton && !this.isLoadingAny
		}
	},
	watch: {
		'$route.query': 'initFromQuery',
	},
	mounted() {
		this.initFromQuery()
	},
	methods: {
		initFromQuery() {
			const q = this.$route.query
			if (Object.keys(q).length === 0) {
				// Reset state on navigation back to empty route
				this.selectedLocation1 = null
				this.selectedLocation2 = null
				this.location1 = { type: null, location_id: null, location_osm_id: null, location_osm_type: '', count: 0, total: 0, totalPrice: 0, fetching: false }
				this.location2 = { type: null, location_id: null, location_osm_id: null, location_osm_type: '', count: 0, total: 0, totalPrice: 0, fetching: false }
				this.productsList = []
				this.productMap = {}
				this.selectedboth = true
				return
			}

			this.loading = true
			const p1 = this.fetchLocation(q.location_a_id, q.location_a_osm_id, q.location_a_osm_type)
			const p2 = this.fetchLocation(q.location_b_id, q.location_b_osm_id, q.location_b_osm_type)

			Promise.all([p1, p2]).then(([l1, l2]) => {
				if (l1) {
					this.selectedLocation1 = l1
					this.location1 = this.mapLocationToForm(l1)
				}
				if (l2) {
					this.selectedLocation2 = l2
					this.location2 = this.mapLocationToForm(l2)
				}
				if (l1 && l2) {
					this.fetchComparisonData()
				}
			}).finally(() => {
				this.loading = false
			})
		},
		fetchLocation(id, osmId, osmType) {
			if (id) {
				return openPricesApi.getLocationById(id)
			}
			if (osmId && osmType) {
				return openPricesApi.getLocationByOsmTypeAndId(osmType, osmId)
			}
			return Promise.resolve(null)
		},
		mapLocationToForm(loc) {
			return {
				type: loc.type,
				location_id: loc.type === 'ONLINE' ? loc.id : null,
				location_osm_id: loc.type === 'OSM' ? geo_utils.getLocationID(loc) : null,
				location_osm_type: loc.type === 'OSM' ? geo_utils.getLocationType(loc) : '',
				count: 0,
				total: 0,
				totalPrice: 0,
				fetching: false,
			}
		},
		compareLocations() {
			let query = {}
			if (this.selectedLocation1 && this.selectedLocation2) {
				if (this.selectedLocation1.type === 'ONLINE') query.location_a_id = this.selectedLocation1.id
				else {
					query.location_a_osm_id = geo_utils.getLocationID(this.selectedLocation1)
					query.location_a_osm_type = geo_utils.getLocationType(this.selectedLocation1)
				}
				if (this.selectedLocation2.type === 'ONLINE') query.location_b_id = this.selectedLocation2.id
				else {
					query.location_b_osm_id = geo_utils.getLocationID(this.selectedLocation2)
					query.location_b_osm_type = geo_utils.getLocationType(this.selectedLocation2)
				}
				this.selectedboth = true
			}
			else {
				this.selectedboth = false
				return
			}

			this.$router.push({ name: 'locations-compare', query: query })
		},
		fetchComparisonData() {
			// Reset
			this.productsList = []
			this.productMap = {}
			this.location1.count = 0
			this.location1.total = 0
			this.location1.totalPrice = 0
			this.location2.count = 0
			this.location2.total = 0
			this.location2.totalPrice = 0

			// Start fetching in background
			this.fetchPricesProgressive(this.location1, 1)
			this.fetchPricesProgressive(this.location2, 2)
		},
		async fetchPricesProgressive(locationObj, locIndex) {
			locationObj.fetching = true
			const pageSize = 100

			// Helper to build params
			const getParams = (p) => {
				const params = { page: p, size: pageSize, order_by: '-date' }
				if (locationObj.type === 'ONLINE') {
					params.location_id = locationObj.location_id || locationObj.id
				} else if (locationObj.type === 'OSM') {
					params.location_osm_id = locationObj.location_osm_id
					params.location_osm_type = locationObj.location_osm_type
				} else {
					// Fallback if structure is slightly different (e.g. if passed selectedLocation object directly, but here we pass locationObj from data)
					// The locationObj in data has flat structure
					if (locationObj.location_osm_id) {
						params.location_osm_id = locationObj.location_osm_id
						params.location_osm_type = locationObj.location_osm_type
					} else if (locationObj.location_id) {
						params.location_id = locationObj.location_id
					}
				}
				return params
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
							this.location1.totalPrice -= entry.price1
						} else if (locIndex === 2 && entry.price2 !== null) {
							this.location2.totalPrice -= entry.price2
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
								this.location1.totalPrice += entry.price1
								this.location2.totalPrice += entry.price2
								entry.inList = true
							} else {
								if (locIndex === 1) 
									this.location1.totalPrice += entry.price1
								else 
									this.location2.totalPrice += entry.price2
							}
						}
					})

					locationObj.count += response.items.length
					return true
				}
				return false
			}

			try {
				// Fetch Page 1
				const params = getParams(1)
				const response = await openPricesApi.getPrices(params)
				locationObj.total = response.total

				processResponse(response)

				const total = response.total
				if (total > pageSize) {
					const totalPages = Math.ceil(total / pageSize)
					const promises = []

					// Fetch remaining pages in parallel
					for (let p = 2; p <= totalPages; p++) {
						promises.push(
							openPricesApi.getPrices(getParams(p))
								.then(res => processResponse(res))
								.catch(e => console.error(`Error fetching page ${p}`, e))
						)
					}

					await Promise.all(promises)
				}
			} catch (e) {
				console.error("Error calling getPrices", e)
			} finally {
				locationObj.fetching = false
			}
		},
	},
}
</script>
