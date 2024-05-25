<template>
  <v-menu scroll-strategy="close">
    <template #activator="{ props }">
      <v-btn v-bind="props" size="x-small" class="mr-2" rounded="xl" prepend-icon="mdi-filter-variant" :append-icon="getCurrentFilterIcon" :active="currentFilterOrSource">
        {{ $t('Common.Filter') }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="filter in filterList" :key="filter.key" :slim="true" :prepend-icon="(currentFilter === filter.key) ? 'mdi-check-circle' : 'mdi-circle-outline'" :active="currentFilter === filter.key" @click="selectFilter(filter.key)">
        {{ $t('Common.' + filter.value) }}
      </v-list-item>
      <v-sheet v-if="showSource">
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
    currentFilter: {
      type: String,
      default: null
    },
    currentSource: {
      type: String,
      default: null
    },
    kind: {
      // product, price
      type: String,
      default: 'product'
    },
    hideSource: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:currentFilter', 'update:currentSource'],
  data() {
    return {
      productSourceList: constants.PRODUCT_SOURCE_LIST,
      productFilterList: constants.PRODUCT_FILTER_LIST,
      priceFilterList: constants.PRICE_FILTER_LIST,
    }
  },
  computed: {
    showSource() {
      return this.kind === 'product' && !this.hideSource
    },
    filterList() {
      return this.kind === 'product' ? this.productFilterList : this.priceFilterList
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
