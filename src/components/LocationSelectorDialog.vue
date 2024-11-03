<template>
  <v-dialog scrollable max-height="80%" width="80%">
    <v-card>
      <v-card-title>
        {{ $t('LocationSelector.Title') }} <v-btn
          style="float:right;" variant="text" density="compact" icon="mdi-close"
          @click="close"
        />
      </v-card-title>

      <v-divider />

      <v-card-text>
        <v-btn-toggle v-model="currentDisplay" class="mb-2">
          <v-btn v-for="item in displayItems" :key="item.key" :value="item.key">
            <v-icon start>
              {{ item.icon }}
            </v-icon>
            <span v-if="item.key === 'osm'">{{ item.value }}</span>
            <span v-else>{{ $t('Common.' + item.value) }}</span>
            <span v-if="item.key === 'recent'">
              <LoadedCountChip :totalCount="recentLocations.length" />
            </span>
          </v-btn>
        </v-btn-toggle>

        <v-window v-model="currentDisplay" disabled>
          <v-window-item value="osm">
            <v-form @submit.prevent="osmSearch">
              <v-text-field
                ref="locationInput"
                v-model="locationOsmSearchForm.q"
                :label="$t('LocationSelector.SearchByName')"
                :hint="$t('Common.ExamplesWithColonAndValue', { value: 'Carrefour rue la fayette 75010 paris ; Auchan Grenoble ; N12208020359' })"
                type="text"
                append-inner-icon="mdi-magnify"
                :loading="loading"
                persistent-hint
                @click:append-inner="osmSearch"
              />
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
          </v-window-item>

          <v-window-item value="online">
            <v-form @submit.prevent="createOnline">
              <v-text-field
                ref="locationInput"
                v-model="locationOnlineForm.website_url"
                :label="$t('Common.Website')"
                :hint="$t('Common.ExampleWithColonAndValue', { value: 'https://www.example.com' })"
                type="text"
                append-inner-icon="mdi-plus"
                :loading="loading"
                persistent-hint
                @click:append-inner="createOnline"
              />
            </v-form>
          </v-window-item>

          <v-window-item value="recent">
            <LocationRecentChip v-for="(location, index) in recentLocations" :key="index" :location="location" :withRemoveAction="true" @click="selectLocation(location)" @click:close="removeRecentLocation(location)" />
            <br>
            <v-btn size="small" @click="clearRecentLocations">
              {{ $t('LocationSelector.Clear') }}
            </v-btn>
          </v-window-item>
        </v-window>
      </v-card-text>

      <v-divider />

      <v-card-actions class="justify-end">
        <div>
          <i18n-t keypath="LocationSelector.PoweredBy.text" tag="span">
            <template #url>
              <a
                v-if="searchProvider === 'nominatim'" href="https://nominatim.openstreetmap.org"
                target="_blank"
              >Nominatim (OpenStreetMap)</a>
              <a v-if="searchProvider === 'photon'" href="https://photon.komoot.io" target="_blank">Komoot Photon
                (OpenStreetMap)</a>
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
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    LocationRecentChip: defineAsyncComponent(() => import('../components/LocationRecentChip.vue')),
    LocationOSMTagChip: defineAsyncComponent(() => import('../components/LocationOSMTagChip.vue')),
    LocationOSMIDChip: defineAsyncComponent(() => import('../components/LocationOSMIDChip.vue')),
    LeafletMap: defineAsyncComponent(() => import('../components/LeafletMap.vue')),
  },
  emits: ['location', 'close'],
  data() {
    return {
      // location forms
      locationOnlineForm: {
        website_url: '',
      },
      locationOsmSearchForm: {
        q: ''
      },
      loading: false,
      results: null,
      // config
      searchProvider: constants.LOCATION_SEARCH_PROVIDER_LIST[1].key,  // photon
      displayItems: constants.LOCATION_SELECTOR_DISPLAY_LIST,
      currentDisplay: constants.LOCATION_SELECTOR_DISPLAY_LIST[0].key,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    formFilled() {
      return Object.values(this.locationOsmSearchForm).every(x => !!x)
    },
    recentLocations() {
      return this.appStore.getRecentLocations()
    },
    showLocationOSMID() {
      return this.appStore.user.username && this.appStore.user.location_display_osm_id
    }
  },
  mounted() {
    this.$refs.locationInput.focus()
  },
  methods: {
    fieldRequired(v) {
      return !!v
    },
    osmSearch() {
      this.$refs.locationInput.blur()
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
      this.loading = true
      api.createLocationOnline({website_url: this.locationOnlineForm.website_url})
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
