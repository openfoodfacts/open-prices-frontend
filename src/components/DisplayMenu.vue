<template>
  <v-menu scroll-strategy="close">
    <template #activator="{ props }">
      <v-btn v-bind="props" size="x-small" prepend-icon="mdi-laptop" :append-icon="getCurrentDisplayIcon" :active="!!currentDisplay">
        <span v-if="$vuetify.display.smAndUp">{{ $t('Common.Display') }}</span>
      </v-btn>
    </template>
    <v-list>
      <v-list-item class="d-sm-none text-uppercase" :slim="true" disabled>
        {{ $t('Common.Display') }}
      </v-list-item>
      <v-divider class="d-sm-none" />
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
      default: null,
    },
    kind: {
      type: String,
      default: 'price',
      examples: ['price', 'location']
    },
    hide: {
      type: Array,
      default: () => []
    },
  },
  emits: ['update:currentDisplay'],
  data() {
    return {
      priceDisplayList: constants.PRICE_DISPLAY_LIST,
      locationDisplayList: constants.LOCATION_DISPLAY_LIST,
    }
  },
  computed: {
    displayList() {
      return this[`${this.kind}DisplayList`].filter(o => !this.hide.includes(o.key))
    },
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
