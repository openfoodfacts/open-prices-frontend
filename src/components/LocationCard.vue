<template>
  <v-card v-if="location" :id="'location_' + location.id" :class="isSelected ? 'border-success' : ''" data-name="location-card">
    <v-card-text class="pa-2">
      <v-row>
        <v-col class="pr-0" style="max-width:20%;">
          <v-img v-if="getLocationBrandLogo" :src="getLocationBrandLogo" width="100px" />
          <v-img v-else :src="locationImageDefault" width="100px" style="filter:invert(.9);" />
        </v-col>
        <v-col style="max-width:80%;">
          <v-row>
            <v-col :cols="!isSelected ? '12' : '10'" @click="clickLocation()">
              <h3>{{ getLocationTitle }}</h3>
              <p>{{ getLocationSubtitle }}</p>
              <LocationDetailsRow v-if="showLocationDetailsRow" class="mt-0" :location="location" :hideLocationOSMID="hideLocationOSMID" :hideCountryCity="hideCountryCity" />
            </v-col>
            <v-col v-if="isSelected" cols="2" class="pl-0">
              <v-btn class="float-right" icon="mdi-pencil" size="x-small" density="comfortable" variant="text" :title="$t('Common.Edit')" @click="clickLocation()" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <LocationFooterRow v-if="showLocationFooterRow" class="mt-0" :location="location" :hideActionMenuButton="hideActionMenuButton" :readonly="readonly" />
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
    LocationDetailsRow: defineAsyncComponent(() => import('../components/LocationDetailsRow.vue')),
    LocationFooterRow: defineAsyncComponent(() => import('../components/LocationFooterRow.vue')),
  },
  props: {
    location: {
      type: Object,
      required: true
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    hideLocationOSMID: {
      type: Boolean,
      default: false
    },
    hideCountryCity: {
      type: Boolean,
      default: false
    },
    hideLocationFooterRow: {
      type: Boolean,
      default: false
    },
    hideActionMenuButton: {
      type: Boolean,
      default: false
    },
    readonly: {
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
      return geo_utils.getLocationOSMTitle(this.location, true, false, true, false, true)
    },
    getLocationSubtitle() {
      if (this.isTypeONLINE) {
        return ''
      }
      return geo_utils.getLocationOSMTitle(this.location, false, true, false, false, false)
    },
    getLocationBrandLogo() {
      return geo_utils.getLocationBrandLogo(this.location)
    },
    showLocationDetailsRow() {
      return !this.isTypeONLINE
    },
    showLocationFooterRow() {
      return !this.hideLocationFooterRow
    }
  },
  methods: {
    clickLocation() {
      if (this.isSelected) {
        this.$emit('editLocation', this.location)
        return
      }
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/locations/${this.location.id}` })
    }
  }
}
</script>
