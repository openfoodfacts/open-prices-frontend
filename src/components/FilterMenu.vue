<template>
  <v-menu scroll-strategy="close">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" size="x-small" class="mr-2" rounded="xl" prepend-icon="mdi-filter-variant" :active="!!currentFilter">{{ $t('Common.Filter') }}</v-btn>
    </template>
    <v-list>
      <v-list-item v-for="filter in filterList" :key="filter.key" :slim="true" :prepend-icon="(currentFilter === filter.key) ? 'mdi-check-circle' : 'mdi-circle-outline'" :active="currentFilter === filter.key" @click="selectFilter(filter.key)">
        {{ $t('Common.' + filter.value) }}
      </v-list-item>
      <v-sheet v-if="kind === 'product'">
        <v-divider></v-divider>
        <v-list-subheader class="text-uppercase">{{ $t('Common.Source') }}</v-list-subheader>
        <v-list-item v-for="source in productSourceList" :key="source.key" :slim="true" :prepend-icon="(currentSource === source.key) ? 'mdi-check-circle' : 'mdi-circle-outline'" :active="currentSource === source.key" @click="selectSource(source.key)">
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
    currentFilter: String,
    currentSource: {
      type: String,
      default: null
    },
    kind: {
      // product, price
      type: String,
      default: 'product'
    }
  },
  data() {
    return {
      productSourceList: constants.PRODUCT_SOURCE_LIST,
      productFilterList: constants.PRODUCT_FILTER_LIST,
      priceFilterList: constants.PRICE_FILTER_LIST,
    }
  },
  computed: {
    filterList() {
      return this.kind === 'product' ? this.productFilterList : this.priceFilterList
    }
  },
  emits: ['update:currentFilter', 'update:currentSource'],
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
