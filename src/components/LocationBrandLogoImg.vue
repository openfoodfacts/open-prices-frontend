<template>
  <v-img
    v-if="logoDisplayed"
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
      trySvgInsteadOfPng: false,  // default to png, and try svg if png fails
      fallbackToDefault: false,
      locationImageDefault: constants.LOCATION_IMAGE_DEFAULT_URL,
    }
  },
  computed: {
    logoDisplayed() {
      return this.logo && !this.fallbackToDefault
    },
    currentSrc() {
      if (!this.logo) return null
      return this.trySvgInsteadOfPng ? `${this.logo}.svg` : `${this.logo}.png`
    }
  },
  methods: {
    onError() {
      if (!this.trySvgInsteadOfPng && this.logo) {
        this.trySvgInsteadOfPng = true
      } else {
        this.fallbackToDefault = true
      }
    }
  }
}
</script>
