<template>
  <v-menu scroll-strategy="close">
    <template #activator="{ props }">
      <v-btn v-bind="props" size="x-small" rounded="xl" prepend-icon="mdi-laptop" :append-icon="getCurrentDisplayIcon" :active="!!currentDisplay">
        {{ $t('Common.Display') }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="display in displayList" :key="display.key" :slim="true" :prepend-icon="display.icon" :active="currentDisplay === display.key" @click="selectDisplay(display.key)">
        {{ $t('Common.' + display.value) }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import constants from '../constants'

export default {
  props: {
    currentDisplay: {
      type: String,
      default: null
    },
  },
  emits: ['update:currentDisplay'],
  data() {
    return {
      displayList: constants.PRICE_DISPLAY_LIST,
    }
  },
  computed: {
    getCurrentDisplayIcon() {
      let display = this.displayList.find(o => o.key === this.currentDisplay)
      return display ? display.icon : ''
    },
  },
  methods: {
    selectDisplay(display) {
      this.$emit('update:currentDisplay', display)
    }
  }
}
</script>
