<template>
  <v-chip label size="small" density="comfortable" @click="goToCountryCity()">
    {{ getCountryCityName }}
  </v-chip>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'country',
      examples: ['country', 'city']
    },
    country: {
      type: String,
      default: null
    },
    city: {
      type: String,
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    getCountryCityName() {
      if (this.type === 'country') {
        return this.country
      } else if (this.type === 'city') {
        return this.city
      }
      return ''
    },
    getCountryCityUrl() {
      const countryUrl = `/countries/${this.country}`
      if (this.type === 'country') {
        return this.country ? countryUrl : null
      } else if (this.type === 'city') {
        return this.city ? `${countryUrl}/cities/${this.city}` : null
      }
      return null
    }
  },
  methods: {
    goToCountryCity() {
      if (this.readonly || !this.getCountryCityUrl) {
        return
      }
      this.$router.push({ path: this.getCountryCityUrl })
    },
  }
}
</script>
