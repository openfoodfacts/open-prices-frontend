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
      tryPngInsteadOfSvg: false,
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
      return this.tryPngInsteadOfSvg ? `${this.logo}.png` : `${this.logo}.svg`
    }
  },
  methods: {
    onError() {
      if (!this.tryPngInsteadOfSvg && this.logo) {
        this.tryPngInsteadOfSvg = true
      } else {
        this.fallbackToDefault = true
      }
    }
  }
}
</script>
