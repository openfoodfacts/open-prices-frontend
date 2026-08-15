<template>
  <v-btn
    data-name="nearby-price-filter-button"
    size="x-small"
    class="mr-2"
    prepend-icon="mdi-crosshairs-gps"
    :active="hasCurrentFilter"
    :aria-label="$t('NearbyPriceFilter.Button')"
    @click="openDialog"
  >
    <span v-if="$vuetify.display.smAndUp">
      {{ hasCurrentFilter ? $t('NearbyPriceFilter.ActiveButton', { radius: currentFilter.radius_km }) : $t('NearbyPriceFilter.Button') }}
    </span>
    <span v-else-if="hasCurrentFilter">{{ $t('NearbyPriceFilter.RadiusValue', { radius: currentFilter.radius_km }) }}</span>
  </v-btn>

  <v-dialog v-model="dialog" :width="dialogWidth">
    <v-card :title="$t('NearbyPriceFilter.Title')">
      <template #append>
        <v-icon icon="mdi-close" :aria-label="$t('Common.Close')" @click="closeDialog" />
      </template>

      <v-divider />

      <v-card-text>
        <v-alert
          v-if="centerSelected"
          class="mb-4"
          color="primary"
          variant="outlined"
          density="compact"
          icon="mdi-map-marker-check-outline"
        >
          <strong>{{ centerLabel }}</strong><br>
          <span class="text-caption">{{ centerCoordinates }}</span>
        </v-alert>

        <v-alert
          v-if="errorMessage"
          class="mb-4"
          type="error"
          variant="outlined"
          density="compact"
        >
          {{ errorMessage }}
        </v-alert>

        <v-row>
          <v-col cols="12" sm="6">
            <v-btn
              data-name="nearby-price-use-position-button"
              block
              prepend-icon="mdi-crosshairs-gps"
              :loading="geolocationLoading"
              @click="requestCurrentPosition"
            >
              {{ $t('NearbyPriceFilter.UseCurrentPosition') }}
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn
              data-name="nearby-price-choose-area-button"
              block
              prepend-icon="mdi-map-search-outline"
              @click="locationSelectorDialog = true"
            >
              {{ $t('NearbyPriceFilter.ChooseArea') }}
            </v-btn>
          </v-col>
        </v-row>

        <v-select
          v-model="form.radius_km"
          class="mt-4"
          :items="radiusOptions"
          :label="$t('NearbyPriceFilter.Radius')"
          suffix="km"
          hide-details="auto"
        />

        <p class="text-caption mt-4 mb-0">
          {{ $t('NearbyPriceFilter.LocationSourceHelp') }}
        </p>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-btn
          v-if="hasCurrentFilter"
          data-name="nearby-price-filter-clear-button"
          color="error"
          variant="text"
          @click="clearFilter"
        >
          {{ $t('Common.Clear') }}
        </v-btn>
        <v-spacer />
        <v-btn variant="text" @click="closeDialog">
          {{ $t('Common.Close') }}
        </v-btn>
        <v-btn
          data-name="nearby-price-filter-apply-button"
          color="primary"
          variant="flat"
          :disabled="!formFilled"
          @click="applyFilter"
        >
          {{ $t('Common.Confirm') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <LocationSelectorDialog
    v-if="locationSelectorDialog"
    v-model="locationSelectorDialog"
    :physicalOnly="true"
    @location="setLocationCenter($event)"
    @close="locationSelectorDialog = false"
  />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import geo_utils from '../utils/geo.js'

export default {
  components: {
    LocationSelectorDialog: defineAsyncComponent(() => import('../components/LocationSelectorDialog.vue')),
  },
  props: {
    currentFilter: {
      type: Object,
      default: null
    },
  },
  emits: ['update:currentFilter'],
  data() {
    return {
      dialog: false,
      locationSelectorDialog: false,
      geolocationLoading: false,
      errorMessage: '',
      centerLabel: '',
      form: {
        lat: null,
        lon: null,
        radius_km: 5,
      },
      radiusOptions: geo_utils.NEARBY_FILTER_RADIUS_OPTIONS,
    }
  },
  computed: {
    dialogWidth() {
      return this.$vuetify.display.smAndUp ? 600 : '100%'
    },
    hasCurrentFilter() {
      return !!geo_utils.getNearbyFilter(this.currentFilter || {})
    },
    centerSelected() {
      return Number.isFinite(this.form.lat) && Number.isFinite(this.form.lon)
    },
    centerCoordinates() {
      if (!this.centerSelected) return ''
      return `${this.form.lat.toFixed(5)}, ${this.form.lon.toFixed(5)}`
    },
    formFilled() {
      return !!geo_utils.getNearbyFilter(this.form)
    },
  },
  methods: {
    openDialog() {
      const nearbyFilter = geo_utils.getNearbyFilter(this.currentFilter || {})
      this.form = nearbyFilter ? { ...nearbyFilter } : { lat: null, lon: null, radius_km: 5 }
      this.centerLabel = nearbyFilter ? this.$t('NearbyPriceFilter.SelectedArea') : ''
      this.errorMessage = ''
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
      this.errorMessage = ''
    },
    requestCurrentPosition() {
      this.errorMessage = ''
      if (!window.navigator.geolocation) {
        this.errorMessage = this.$t('NearbyPriceFilter.GeolocationUnsupported')
        return
      }

      this.geolocationLoading = true
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          this.form.lat = Number(position.coords.latitude.toFixed(5))
          this.form.lon = Number(position.coords.longitude.toFixed(5))
          this.centerLabel = this.$t('NearbyPriceFilter.CurrentPosition')
          this.geolocationLoading = false
        },
        () => {
          this.errorMessage = this.$t('NearbyPriceFilter.GeolocationFailed')
          this.geolocationLoading = false
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
      )
    },
    setLocationCenter(location) {
      this.locationSelectorDialog = false
      if (!geo_utils.hasLocationCoordinates(location)) {
        this.errorMessage = this.$t('NearbyPriceFilter.MissingCoordinates')
        return
      }

      const [lat, lon] = geo_utils.getLocationOSMLatLng(location)
      this.form.lat = Number(lat)
      this.form.lon = Number(lon)
      this.centerLabel = geo_utils.getLocationOSMTitle(location, true, false, true) || this.$t('NearbyPriceFilter.SelectedArea')
      this.errorMessage = ''
    },
    applyFilter() {
      if (!this.formFilled) return
      this.$emit('update:currentFilter', { ...this.form })
      this.closeDialog()
    },
    clearFilter() {
      this.$emit('update:currentFilter', null)
      this.closeDialog()
    },
  }
}
</script>
