<template>
  <v-card :class="isSelected ? 'border-success' : ''" data-name="location-search-result-card">
    <v-card-text class="pa-2">
      <v-row>
        <v-col class="pr-0" style="max-width:20%;">
          <v-img :src="locationImageDefault" width="100px" style="filter:invert(.9);" />
        </v-col>
        <v-col style="max-width:80%;">
          <v-row>
            <v-col :cols="!isSelected ? '12' : '10'" :class="isSelected ? 'pr-0' : ''" @click="clickLocation()">
              <h4>{{ getLocationTitle }}</h4>
              <p>{{ getLocationSubtitle }}</p>
              <template v-if="!isTypeONLINE">
                <LocationOSMTagChip class="mr-1" :location="location" />
                <LocationOSMIDChip v-if="showLocationOSMID" :location="location" />
              </template>
            </v-col>
            <v-col v-if="isSelected" cols="2">
              <v-btn class="float-right" icon="mdi-pencil" size="x-small" density="comfortable" variant="text" :title="$t('Common.Edit')" @click="clickLocation()" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'
import geo_utils from '../utils/geo.js'

export default {
  components: {
    LocationOSMTagChip: defineAsyncComponent(() => import('../components/LocationOSMTagChip.vue')),
    LocationOSMIDChip: defineAsyncComponent(() => import('../components/LocationOSMIDChip.vue')),
  },
  props: {
    location: {
      type: [Object, null],
      required: true
    },
    isSelected: {
      type: Boolean,
      default: false
    },
  },
  emits: ['editLocation'],
  data() {
    return {
      locationImageDefault: constants.LOCATION_IMAGE_DEFAULT_URL,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    isTypeONLINE() {
      return this.location && this.location.type === constants.LOCATION_TYPE_ONLINE
    },
    getLocationTitle() {
      if (this.isTypeONLINE) {
        return geo_utils.getLocationONLINETitle(this.location)
      }
      return geo_utils.getLocationOSMTitle(this.location, true, false, false)
    },
    getLocationSubtitle() {
      if (this.isTypeONLINE) {
        return ''
      }
      return geo_utils.getLocationOSMTitle(this.location, false, true, true)
    },
    showLocationOSMID() {
      return this.appStore.user.username && this.appStore.user.location_display_osm_id
    },
  },
  methods: {
    clickLocation() {
      if (this.isSelected) {
        this.$emit('editLocation', this.location)
      }
    }
  }
}
</script>
