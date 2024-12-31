<template>
  <v-dialog scrollable :height="dialogHeight" :width="dialogWidth">
    <v-card :title="$t('Common.LocationFindShop')">
      <template #append>
        <v-icon icon="mdi-close" @click="close" />
      </template>

      <v-divider />

      <v-card-text>
        <v-tabs v-model="currentDisplay">
          <v-tab v-for="item in displayItems" :key="item.key" :value="item.key">
            <v-icon start>
              {{ item.icon }}
            </v-icon>
            <span v-if="$vuetify.display.smAndUp">{{ $t('Common.' + item.value) }}</span>
            <span v-else>
              <span v-if="item.valueSmallScreen">{{ $t('Common.' + item.valueSmallScreen) }}</span>
            </span>
          </v-tab>
        </v-tabs>

        <v-tabs-window v-model="currentDisplay" disabled>
          <v-tabs-window-item value="recent">
            <LocationRecentChip v-for="(location, index) in recentLocations" :key="index" :location="location" :withRemoveAction="true" @click="selectLocation(location)" @click:close="removeRecentLocation(location)" />
            <br>
            <v-btn v-if="recentLocations.length" size="small" class="" @click="clearRecentLocations">
              {{ $t('Common.Clear') }}
            </v-btn>
            <p v-else>
              {{ $t('LocationSelector.RecentLocations', recentLocations.length) }}
            </p>
          </v-tabs-window-item>

          <v-tabs-window-item value="osm">
            <v-form @submit.prevent="locationOsmSearch">
              <v-text-field
                ref="locationOsmSearchInput"
                v-model="locationOsmSearchForm.q"
                :label="$t('Common.LocationSearchByName')"
                :hint="$t('Common.ExamplesWithColonAndValue', { value: 'Carrefour rue la fayette 75010 paris ; Auchan Grenoble ; N12208020359' })"
                type="text"
                :loading="loading"
                clearable
                persistent-hint
              >
                <template #append-inner>
                  <v-btn icon="mdi-magnify" :disabled="!locationOsmSearchForm.q" @click="locationOsmSearch" />
                </template>
              </v-text-field>
            </v-form>

            <p v-if="searchProvider === 'nominatim'" class="text-caption text-warning mt-2">
              <i18n-t keypath="LocationSelector.Warning" tag="i">
                <template #newline>
                  <br>
                </template>
              </i18n-t>
            </p>

            <v-sheet v-if="results">
              <h3 class="mt-4 mb-1">
                <i18n-t keypath="LocationSelector.Result" tag="span">
                  <template #resultNumber>
                    <small>{{ Array.isArray(results) ? results.length : 0 }}</small>
                  </template>
                </i18n-t>
              </h3>
              <v-row v-if="Array.isArray(results)">
                <v-col cols="12" sm="6">
                  <v-card
                    v-for="location in results" :key="getLocationUniqueID(location)" class="mb-2" width="100%"
                    elevation="1" @click="selectLocation(location)"
                  >
                    <v-card-text>
                      <h4>{{ getLocationTitle(location, true, false, false) }}</h4>
                      {{ getLocationTitle(location, false, true, true) }}<br>
                      <LocationOSMTagChip :location="location" class="mr-1" />
                      <LocationOSMIDChip v-if="showLocationOSMID" :location="location" />
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" style="min-height:400px">
                  <LeafletMap :locations="results" />
                </v-col>
              </v-row>

              <p v-else-if="typeof results === 'string'">
                {{ results }}
              </p>
            </v-sheet>
          </v-tabs-window-item>

          <v-tabs-window-item value="online">
            <v-form v-model="locationOnlineFormValid" @submit.prevent="createOnline">
              <v-text-field
                ref="locationOnlineFormInput"
                v-model="locationOnlineForm.website_url"
                :label="$t('Common.Website')"
                :hint="$t('Common.ExampleWithColonAndValue', { value: 'https://www.example.com' })"
                type="text"
                :rules="urlRules"
                :loading="loading"
                clearable
                persistent-hint
              >
                <template #append-inner>
                  <v-btn icon="mdi-plus" :disabled="!locationOnlineFormValid" @click="createOnline" />
                </template>
              </v-text-field>
            </v-form>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>

      <v-divider v-if="currentDisplay === 'osm'" />

      <v-card-actions v-if="currentDisplay === 'osm'" class="justify-end">
        <div>
          <i18n-t keypath="LocationSelector.PoweredBy.text" tag="span">
            <template #url>
              <a v-if="searchProvider === 'nominatim'" :href="OSM_NOMINATIM_URL" target="_blank">
                {{ OSM_NOMINATIM_ATTRIBUTION }}
              </a>
              <a v-if="searchProvider === 'photon'" :href="OSM_PHOTON_URL" target="_blank">
                {{ OSM_PHOTON_ATTRIBUTION }}
              </a>
            </template>
          </i18n-t>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'
import constants from '../constants'
import utils from '../utils.js'

export default {
  components: {
    LocationRecentChip: defineAsyncComponent(() => import('../components/LocationRecentChip.vue')),
    LocationOSMTagChip: defineAsyncComponent(() => import('../components/LocationOSMTagChip.vue')),
    LocationOSMIDChip: defineAsyncComponent(() => import('../components/LocationOSMIDChip.vue')),
    LeafletMap: defineAsyncComponent(() => import('../components/LeafletMap.vue')),
  },
  emits: ['location', 'close'],
  data() {
    return {
      // location forms
      locationOsmSearchForm: {
        q: ''
      },
      locationOnlineForm: {
        website_url: '',
      },
      locationOnlineFormValid: false,
      loading: false,
      results: null,
      // config
      searchProvider: constants.LOCATION_SEARCH_PROVIDER_LIST[1].key,  // photon
      displayItems: constants.LOCATION_SELECTOR_DISPLAY_LIST,
      currentDisplay: null,  // see mounted
      OSM_NOMINATIM_URL: constants.OSM_NOMINATIM_URL,
      OSM_NOMINATIM_ATTRIBUTION: constants.OSM_NOMINATIM_ATTRIBUTION,
      OSM_PHOTON_URL: constants.OSM_PHOTON_URL,
      OSM_PHOTON_ATTRIBUTION: constants.OSM_PHOTON_ATTRIBUTION,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    dialogHeight() {
      return this.$vuetify.display.smAndUp ? '80%' : '100%'
    },
    dialogWidth() {
      return this.$vuetify.display.smAndUp ? '80%' : '100%'
    },
    recentLocations() {
      return this.appStore.getRecentLocations()
    },
    showLocationOSMID() {
      return this.appStore.user.username && this.appStore.user.location_display_osm_id
    },
    urlRules() {
      if (!this.locationOnlineForm.website_url) return [() => true]  // optional field
      return [
        (v) => utils.isURL(v) || this.$t('Common.URLInvalid'),
      ]
    },
  },
  watch: {
    currentDisplay(value) {
      if (value === constants.LOCATION_SELECTOR_DISPLAY_LIST[1].key) {
        window.setTimeout(() => this.$refs.locationOsmSearchInput.focus(), 200)
      } else if (value === constants.LOCATION_SELECTOR_DISPLAY_LIST[2].key) {
        window.setTimeout(() => this.$refs.locationOnlineFormInput.focus(), 200)
      }
    }
  },
  mounted() {
    this.currentDisplay = this.appStore.user.location_finder_default_mode
  },
  methods: {
    fieldRequired(v) {
      return !!v
    },
    locationOsmSearch() {
      if (!this.locationOsmSearchForm.q) return
      this.$refs.locationOsmSearchInput.blur()
      this.results = null
      this.loading = true
      // search by id (N12208020359, 12208020359)
      if (utils.isNumber(this.locationOsmSearchForm.q.substring(1))) {
        const id = utils.isNumber(this.locationOsmSearchForm.q.substring(0, 1)) ? this.locationOsmSearchForm.q : this.locationOsmSearchForm.q.substring(1)
        api.openstreetmapNominatimLookup(id)
          .then((data) => {
            this.loading = false
            if (data.length) {
              this.results = data
            } else {
              this.results = this.$t('LocationSelector.NoResult')
            }
          })
        // search by name
      } else {
        api.openstreetmapSearch(this.locationOsmSearchForm.q, this.searchProvider)
          .then((data) => {
            this.loading = false
            if (data.length) {
              this.results = data
            } else {
              this.results = this.$t('LocationSelector.NoResult')
            }
          })
      }
    },
    getLocationTitle(location, withName = true, withRoad = false, withCity = true) {
      return utils.getLocationOSMTitle(location, withName, withRoad, withCity)
    },
    getLocationUniqueID(location) {
      return utils.getLocationUniqueID(location)
    },
    createOnline() {
      if (!this.locationOnlineFormValid) return
      this.loading = true
      const website_url_cleaned = utils.getURLOrigin(this.locationOnlineForm.website_url)
      api.createLocationOnline({website_url: website_url_cleaned})
        .then((location) => {
          this.loading = false
          this.selectLocation(location)
        })
    },
    selectLocation(location) {
      this.$emit('location', location)
      this.close()
    },
    removeRecentLocation(location) {
      this.appStore.removeRecentLocation(location)
    },
    clearRecentLocations() {
      this.appStore.clearRecentLocations()
    },
    close() {
      this.$emit('close')
    },
  },
}
</script>
