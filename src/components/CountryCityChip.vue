<template>
  <v-chip label size="small" density="comfortable" @click="goToCountryCity()">
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
      default: 'country',
      examples: ['country', 'city']
    },
    readonly: {
      type: Boolean,
      default: false
    },
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
  },
  methods: {
    goToCountryCity() {
      if (this.readonly || !this.location || !this.getCountryCityUrl) {
        return
      }
      this.$router.push({ path: this.getCountryCityUrl })
    },
  }
}
</script>
