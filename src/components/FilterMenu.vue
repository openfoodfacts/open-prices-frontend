<template>
  <v-menu scroll-strategy="close">
    <template #activator="{ props }">
      <v-btn v-bind="props" size="x-small" class="mr-2" prepend-icon="mdi-filter-variant" :append-icon="getCurrentFilterIcon" :active="currentFilterOrSource">
        <span v-if="$vuetify.display.smAndUp">{{ $t('Common.Filter') }}</span>
      </v-btn>
    </template>
    <v-list>
      <!-- title -->
      <v-list-item class="d-sm-none" :slim="true" disabled>
        {{ $t('Common.Filter') }}
      </v-list-item>
      <v-divider class="d-sm-none" />
      <!-- default filters -->
      <v-list-item v-for="filter in filterList" :key="filter.key" :slim="true" :prepend-icon="(currentFilter === filter.key) ? 'mdi-check-circle' : 'mdi-circle-outline'" :active="currentFilter === filter.key" @click="selectFilter(filter.key)">
        {{ $t('Common.' + filter.value) }}
      </v-list-item>
      <!-- extra filters -->
      <v-sheet v-if="showProductSourceFilter">
        <v-divider />
        <v-list-subheader class="text-uppercase">
          {{ $t('Common.Source') }}
        </v-list-subheader>
        <v-list-item v-for="source in productSourceList" :key="source.key" :slim="true" :active="currentSource === source.key" @click="selectSource(source.key)">
          <v-icon>{{ source.icon }}</v-icon>
          {{ source.value }}
        </v-list-item>
      </v-sheet>
    </v-list>
  </v-menu>
</template>

<script>
import constants from '../constants'

export default {
  props: {
    kind: {
      type: String,
      default: 'product',
      examples: ['product', 'price', 'proof', 'location', 'user']
    },
    currentFilter: {
      type: String,
      default: null
    },
    currentSource: {
      type: String,
      default: null
    },
    hideSource: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:currentFilter', 'update:currentSource'],
  data() {
    return {
      // default filters
      productFilterList: constants.PRODUCT_FILTER_LIST,
      priceFilterList: constants.PRICE_FILTER_LIST,
      proofFilterList: constants.PROOF_FILTER_LIST,
      locationFilterList: constants.LOCATION_FILTER_LIST,
      userFilterList: constants.USER_FILTER_LIST,
      // other filters
      productSourceList: constants.PRODUCT_SOURCE_LIST,
    }
  },
  computed: {
    showProductSourceFilter() {
      return this.kind === 'product' && !this.hideSource
    },
    filterList() {
      return this[`${this.kind}FilterList`]
    },
    currentFilterOrSource() {
      return !!this.currentFilter || !!this.currentSource
    },
    getCurrentFilterIcon() {
      let source = this.productSourceList.find(o => o.key === this.currentSource)
      return source ? source.icon : ''
    },
  },
  methods: {
    selectFilter(filter) {
      this.$emit('update:currentFilter', filter)
    },
    selectSource(source) {
      this.$emit('update:currentSource', source)
    }
  }
}
</script>
