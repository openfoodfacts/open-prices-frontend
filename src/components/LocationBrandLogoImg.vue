<template>
  <v-img
    v-if="logo"
    :src="currentSrc"
    :width="width"
    :height="height"
    @error="onError"
  />
  <v-img
    v-else
    :src="locationImageDefault"
    :width="width"
    :height="height"
    style="filter:invert(.9);"
  />
</template>

<script>
import constants from '../constants'

export default {
  name: 'LocationBrandLogoImg',
  props: {
    logo: {
      type: String,
      default: null
    },
    width: {
      type: [String, Number],
      default: '100px'
    },
    height: {
      type: [String, Number],
      default: undefined
    }
  },
  data() {
    return {
      triedPng: false,
      locationImageDefault: constants.LOCATION_IMAGE_DEFAULT_URL,
    }
  },
  computed: {
    currentSrc() {
      if (!this.logo) return null
      return this.triedPng ? `${this.logo}.png` : `${this.logo}.svg`
    }
  },
  methods: {
    onError(e) {
      if (!this.triedPng && this.logo) {
        this.triedPng = true
        e.target.src = `${this.logo}.png`
      } else {
        e.target.src = this.locationImageDefault
      }
    }
  }
}
</script>
