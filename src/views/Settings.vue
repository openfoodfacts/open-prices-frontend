<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-btn class="mx-2" variant="text" :prepend-icon="themeInfo.icon" @click="swapTheme">
        {{ $t(themeInfo.label) }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { useTheme } from 'vuetify'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'

export default {
  data() {
    return {
      theme: useTheme()
    }
  },
  computed: {
    ...mapStores(useAppStore),
    themeInfo() {
      if (this.theme.global.name === "light") {
        return {
          icon: 'mdi-white-balance-sunny',
          label: 'Theme.LightMode' 
        }
      }
      return {
        icon: 'mdi-moon-waning-crescent',
        label: 'Theme.DarkMode' 
      }
    }
  },
  methods: {
    swapTheme() {
      const newTheme = this.theme.global.name === "light" ? 'dark' : 'light'
      this.appStore.user.preferedTheme = newTheme
      this.theme.global.name = newTheme
    }
  }
}
</script>
