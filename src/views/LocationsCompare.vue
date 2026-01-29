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
            {{ $t('Loading Location 1:') }} {{ count1 }} {{ $t('/') }} {{ total1 || '?' }}
          </div>
          <v-progress-linear
            :model-value="total1 ? (count1 / total1) * 100 : 0" color="primary" height="10"
            striped :indeterminate="!total1"
          />
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card variant="outlined" class="pa-2">
          <div class="text-subtitle-2 mb-1">
            {{ $t('Loading Location 2:') }} {{ count2 }} {{ $t('/') }} {{ total2 || '?' }}
          </div>
          <v-progress-linear
            :model-value="total2 ? (count2 / total2) * 100 : 0" color="primary" height="10"
            striped :indeterminate="!total2"
          />
        </v-card>
      </v-col>
    </v-row>

    <!-- Products Table -->
    <v-row v-if="selectedboth && !loading" class="mt-4">
      <v-col v-if="productsList.length > 0" cols="12">
        <v-data-table :headers="headers" :items="productsList" item-value="product_code" class="elevation-1" />
      </v-col>
      <v-col v-else-if="!isLoadingAny && selectedLocation1 && selectedLocation2" cols="12">
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
	name: "LocationsCompare",
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
			},
			location2: {
				type: null,
				location_id: null,
				location_osm_id: null,
				location_osm_type: '',
			},
			selectedLocation1: null,
			selectedLocation2: null,
			loading: false,
			selectedboth: true,

			// Progressive loading state
			productsList: [],
			productMap: {}, // Persistent map for incremental updates
			count1: 0,
			total1: 0,
			count2: 0,
			total2: 0,
			fetching1: false,
			fetching2: false,

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
			return (this.fetching1 || this.fetching2)
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
				this.location1 = { type: null, location_id: null, location_osm_id: null, location_osm_type: '' }
				this.location2 = { type: null, location_id: null, location_osm_id: null, location_osm_type: '' }
				this.productsList = []
				this.productMap = {}
				this.count1 = 0
				this.total1 = 0
				this.count2 = 0
				this.total2 = 0
				this.fetching1 = false
				this.fetching2 = false
				this.selectedboth = true
				return
			}

			this.loading = true
			const p1 = this.fetchLocation(q.l1_id, q.l1_osm_id, q.l1_osm_type)
			const p2 = this.fetchLocation(q.l2_id, q.l2_osm_id, q.l2_osm_type)

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
			}
		},
		compareLocations() {
			let query = {}
			if (this.selectedLocation1 && this.selectedLocation2) {
				if (this.selectedLocation1.type === 'ONLINE') query.l1_id = this.selectedLocation1.id
				else {
					query.l1_osm_id = geo_utils.getLocationID(this.selectedLocation1)
					query.l1_osm_type = geo_utils.getLocationType(this.selectedLocation1)
				}
				if (this.selectedLocation2.type === 'ONLINE') query.l2_id = this.selectedLocation2.id
				else {
					query.l2_osm_id = geo_utils.getLocationID(this.selectedLocation2)
					query.l2_osm_type = geo_utils.getLocationType(this.selectedLocation2)
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
			this.count1 = 0
			this.total1 = 0
			this.count2 = 0
			this.total2 = 0

			// Start fetching in background
			this.fetchPricesProgressive(this.selectedLocation1, 'count1', 'total1', 'fetching1', 1)
			this.fetchPricesProgressive(this.selectedLocation2, 'count2', 'total2', 'fetching2', 2)
		},
		async fetchPricesProgressive(location, countKey, totalKey, fetchingKey, locIndex) {
			this[fetchingKey] = true
			const pageSize = 100

			// Helper to build params
			const getParams = (p) => {
				const params = { page: p, size: pageSize }
				if (location.type === 'ONLINE') {
					params.location_id = location.id
				} else if (location.type === 'OSM') {
					params.location_osm_id = geo_utils.getLocationID(location)
					params.location_osm_type = geo_utils.getLocationType(location)
				} else {
					const osmId = geo_utils.getLocationID(location)
					if (osmId) {
						params.location_osm_id = osmId
						params.location_osm_type = geo_utils.getLocationType(location)
					} else if (location.id) {
						params.location_id = location.id
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
								cheapest: null,
								inList: false // track if already added to UI list
							}
						}

						const entry = this.productMap[code]
						if (locIndex === 1) entry.price1 = p.price
						else entry.price2 = p.price

						if (entry.price1 !== null && entry.price2 !== null) {
							if (entry.price1 < entry.price2) entry.cheapest = 'price1'
							else entry.cheapest = 'price2'
							if (!entry.inList) {
								this.productsList.push(entry)
								entry.inList = true
							}
						}
					})

					this[countKey] += response.items.length
					return true
				}
				return false
			}

			try {
				// Fetch Page 1
				const params = getParams(1)
				const response = await openPricesApi.getPrices(params)
				this[totalKey] = response.total

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
				this[fetchingKey] = false
			}
		},
	},
}
</script>