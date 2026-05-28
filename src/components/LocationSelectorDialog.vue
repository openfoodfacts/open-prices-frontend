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
            <template v-if="recentLocations.length">
              <v-row>
                <v-col v-for="(location, index) in recentLocations" :key="index" cols="12" sm="6">
                  <LocationCard class="mb-2" :location="location" :hideLocationFooterRow="true" :readonly="true" height="100%" width="100%" elevation="1" @click="selectLocation(location)" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-btn size="small" color="primary" @click="clearRecentLocations">
                    {{ $t('Common.Clear') }}
                  </v-btn>
                </v-col>
              </v-row>
            </template>
            <p v-else>
              {{ $t('LocationSelector.RecentLocations', recentLocations.length) }}
            </p>
          </v-tabs-window-item>

          <v-tabs-window-item value="osm">
            <v-form class="mb-4" @submit.prevent="locationOsmSearch">
              <v-text-field
                ref="locationOsmSearchInput"
                v-model="locationOsmSearchForm.q"
                :label="$t('Common.LocationSearchByName')"
                :hint="$t('Common.ExamplesWithColonAndValue', { value: OSM_EXAMPLES })"
                type="text"
                :loading="loading"
                clearable
                persistent-hint
              >
                <template #append-inner>
                  <v-btn color="primary" icon="mdi-magnify" :disabled="!locationOsmSearchForm.q" @click="locationOsmSearch" />
                </template>
              </v-text-field>
            </v-form>

            <p v-if="searchProvider === 'osm'" class="text-caption text-warning mt-2">
              <i18n-t keypath="LocationSelector.Warning" tag="i">
                <template #newline>
                  <br>
                </template>
              </i18n-t>
            </p>

            <!-- results -->
            <v-sheet v-if="results !== null">
              <v-row v-if="results.length">
                <v-col cols="12" sm="6">
                  <LocationCard v-for="(location, index) in results" :key="index" :location="location" :hideLocationFooterRow="true" :readonly="true" class="mb-2" width="100%" elevation="1" @click="selectLocation(location)" />
                </v-col>
                <v-col cols="12" sm="6" style="min-height:400px">
                  <LeafletMap :locations="results" :showActions="true" @locationSelected="selectLocation" />
                </v-col>
              </v-row>

              <p v-else>
                <v-alert class="mb-2" color="primary" variant="outlined" density="compact" icon="mdi-information">
                  {{ $t('LocationSelector.NoResultHelpKeywords') }}
                </v-alert>
                <v-alert class="mb-2" color="primary" variant="outlined" density="compact" icon="mdi-information">
                  <i18n-t keypath="LocationSelector.NoResultHelpOSM" tag="span">
                    <template #osm_name>
                      {{ OSM_NAME }}
                    </template>
                    <template #osm_url>
                      <a :href="OSM_URL" target="_blank">
                        {{ OSM_URL }}
                      </a>
                    </template>
                  </i18n-t>
                </v-alert>
              </p>
            </v-sheet>
          </v-tabs-window-item>

          <v-tabs-window-item value="online">
            <v-form @submit.prevent="createOnline">
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
                  <v-btn color="primary" icon="mdi-plus" :disabled="!locationOnlineFormFilled" @click="createOnline" />
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
import openStreetMapApi from '../services/openStreetMapApi'
import openPricesApi from '../services/openPricesApi'
import constants from '../constants'
import utils from '../utils.js'

export default {
  components: {
    LocationCard: defineAsyncComponent(() => import('../components/LocationCard.vue')),
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
      loading: false,
      results: null,
      // config
      searchProvider: constants.LOCATION_SEARCH_PROVIDER_LIST[1].key,  // photon
      displayItems: constants.LOCATION_SELECTOR_DISPLAY_LIST,
      currentDisplay: null,  // see mounted
      OSM_EXAMPLES: 'Carrefour rue la fayette 75010 paris ; Auchan Grenoble ; N12208020359',
      OSM_NAME: constants.OSM_NAME,
      OSM_URL: constants.OSM_URL,
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
    locationOnlineFormFilled() {
      return !!this.locationOnlineForm.website_url && this.urlRules.every(rule => rule(this.locationOnlineForm.website_url) === true)
    },
    urlRules() {
      return [
        // v => !!v || this.$t('Common.FieldIsRequired'),
        v => !v || utils.isURL(v) || this.$t('Common.URLInvalid'),
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
      this.$refs.locationOsmSearchInput.blur()
      this.results = null
      this.loading = true
      // search by id (N12208020359, 12208020359)
      if (utils.isNumber(this.locationOsmSearchForm.q.substring(1))) {
        const id = utils.isNumber(this.locationOsmSearchForm.q.substring(0, 1)) ? this.locationOsmSearchForm.q : this.locationOsmSearchForm.q.substring(1)
        openStreetMapApi.openstreetmapNominatimLookup(id)
          .then((data) => {
            this.loading = false
            this.results = data
          })
        // search by name
      } else {
        openStreetMapApi.openstreetmapSearch(this.locationOsmSearchForm.q, this.searchProvider)
          .then((data) => {
            this.loading = false
            this.results = data
          })
      }
    },
    createOnline() {
      this.loading = true
      const website_url_cleaned = utils.getURLOrigin(this.locationOnlineForm.website_url)
      openPricesApi.createLocationOnline({website_url: website_url_cleaned})
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
