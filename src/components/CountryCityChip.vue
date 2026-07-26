<template>
  <v-chip label size="small" density="comfortable" :to="getCountryCityUrl">
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
        return this.country && !this.readonly ? countryUrl : null
      } else if (this.type === 'city') {
        return this.city && !this.readonly ? `/cities/${this.country}/${this.city}` : null
      }
      return null
    }
  },
}
</script>
