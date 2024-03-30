<template>
  <v-menu scroll-strategy="close">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" size="small" class="mr-2" rounded="xl" prepend-icon="mdi-filter-variant" :active="!!productFilter">{{ $t('Common.Filter') }}</v-btn>
    </template>
    <v-list>
      <v-list-item :slim="true" v-for="filter in productFilterList" :key="filter.key" :prepend-icon="(productFilter === filter.key) ? 'mdi-check-circle' : 'mdi-circle-outline'" :active="productFilter === filter.key" @click="selectProductFilter(filter.key)">
        {{ $t('Common.' + filter.value) }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import constants from '../constants'

export default {
  props: {
    'productFilter': String,
  },
  data() {
    return {
      productFilterList: constants.PRODUCT_FILTER_LIST,
    }
  },
  emits: ['update:productFilter'],
  methods: {
    selectProductFilter(filter) {
      this.$emit('update:productFilter', filter)
    }
  }
}
</script>
