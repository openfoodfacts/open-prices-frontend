<template>
  <v-chip label size="small" density="comfortable" :to="getCountryCityUrl">
    {{ getCountryCityName }}
  </v-chip>
</template>

<script>
export default {
  props: {
    location: {
      type: Object,
      default: null
    },
    type: {
      type: String,
      default: 'country'  // 'country' or 'city'
    }
  },
  computed: {
    getCountryCityName() {
      if (this.type === 'country') {
        return this.location.osm_address_country
      } else if (this.type === 'city') {
        return this.location.osm_address_city
      }
      return ''
    },
    getCountryCityUrl() {
      const countryUrl = `/countries/${this.location.osm_address_country}`
      if (this.type === 'country') {
        return this.location && this.location.osm_address_country ? countryUrl : null
      } else if (this.type === 'city') {
        return this.location && this.location.osm_address_city ? `${countryUrl}/cities/${this.location.osm_address_city}` : null
      }
      return null
    }
  }
}
</script>
