<template>
  <v-menu scroll-strategy="close">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" size="x-small" class="mr-2" rounded="xl" prepend-icon="mdi-filter-variant" :active="!!currentFilter">{{ $t('Common.Filter') }}</v-btn>
    </template>
    <v-list>
      <v-list-item :slim="true" v-for="filter in filterList" :key="filter.key" :prepend-icon="(currentFilter === filter.key) ? 'mdi-check-circle' : 'mdi-circle-outline'" :active="currentFilter === filter.key" @click="selectFilter(filter.key)">
        {{ $t('Common.' + filter.value) }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import constants from '../constants'

export default {
  props: {
    currentFilter: String,
    kind: {
      type: String,
      default: 'product'
    }
  },
  data() {
    return {
      productFilterList: constants.PRODUCT_FILTER_LIST,
      priceFilterList: constants.PRICE_FILTER_LIST,
    }
  },
  computed: {
    filterList() {
      return this.kind === 'product' ? this.productFilterList : this.priceFilterList
    }
  },
  emits: ['update:currentFilter'],
  methods: {
    selectFilter(filter) {
      this.$emit('update:currentFilter', filter)
    }
  }
}
</script>
