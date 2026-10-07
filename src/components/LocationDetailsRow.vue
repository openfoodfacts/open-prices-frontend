<template>
  <v-row>
    <v-col cols="12" class="pt-2 pb-2">
      <span class="chip-group">
        <LocationOSMTagChip v-if="locationOSMTag" :tag="locationOSMTag" />
        <LocationOSMIDChip v-if="showLocationOSMID" :location="location" />
        <template v-if="!hideCountryCity">
          <CountryCityChip
            v-if="hasLocationCity"
            type="city"
            :country="location.osm_address_country"
            :city="location.osm_address_city"
          />
          <CountryCityChip
            v-if="hasLocationCountry"
            type="country"
            :country="location.osm_address_country"
          />
        </template>
        <LocationOSMTagChip
          v-if="hasLocationOSMTagOrganic"
          tag="organic:only"
        />
      </span>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapStores } from "pinia";
import { useAppStore } from "../store";
import geo_utils from "../utils/geo.js";

export default {
  components: {
    LocationOSMTagChip: defineAsyncComponent(
      () => import("../components/LocationOSMTagChip.vue"),
    ),
    LocationOSMIDChip: defineAsyncComponent(
      () => import("../components/LocationOSMIDChip.vue"),
    ),
    CountryCityChip: defineAsyncComponent(
      () => import("../components/CountryCityChip.vue"),
    ),
  },
  props: {
    location: {
      type: Object,
      required: true,
    },
    hideLocationOSMID: {
      type: Boolean,
      default: false,
    },
    hideCountryCity: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapStores(useAppStore),
    locationOSMTag() {
      return geo_utils.getLocationOSMTag(this.location);
    },
    showLocationOSMID() {
      return (
        !this.hideLocationOSMID &&
        this.appStore.user.username &&
        this.appStore.user.location_display_osm_id
      );
    },
    hasLocationCity() {
      return this.location && this.location.osm_address_city;
    },
    hasLocationCountry() {
      return this.location && this.location.osm_address_country;
    },
    hasLocationOSMTagOrganic() {
      return geo_utils.hasLocationOSMTagFromName(this.location, "organic:only");
    },
  },
};
</script>
