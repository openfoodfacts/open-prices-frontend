<template>
  <v-menu scroll-strategy="close">
    <template #activator="{ props }">
      <v-btn v-bind="props" size="x-small" class="mr-2" prepend-icon="mdi-filter-variant" :append-icon="getCurrentFilterIcon" :active="hasCurrentFilter">
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
        <v-list-item v-for="item in productSourceList" :key="item.key" :slim="true" :active="currentSource === item.key" @click="selectSource(item.key)">
          <v-icon>{{ item.icon }}</v-icon>
          {{ item.value }}
        </v-list-item>
      </v-sheet>
      <v-sheet v-if="showProofTypeFilter">
        <v-divider />
        <v-list-subheader class="text-uppercase">
          {{ $t('Common.Type') }}
        </v-list-subheader>
        <v-list-item v-for="item in proofTypeList" :key="item.key" :slim="true" :active="currentType === item.key" @click="selectType(item.key)">
          <v-icon>{{ item.icon }}</v-icon>
          {{ item.value }}
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
    currentType: {
      type: String,
      default: null
    },
    hideSource: {
      type: Boolean,
      default: false
    },
    hideType: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:currentFilter', 'update:currentSource', 'update:currentType'],
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
      proofTypeList: constants.PROOF_TYPE_LIST,
    }
  },
  computed: {
    showProductSourceFilter() {
      return this.kind === 'product' && !this.hideSource
    },
    showProofTypeFilter() {
      return this.kind === 'proof' && !this.hideType
    },
    filterList() {
      return this[`${this.kind}FilterList`]
    },
    hasCurrentFilter() {
      return !!this.currentFilter || !!this.currentSource || !!this.currentType
    },
    getCurrentFilterIcon() {
      if (this.kind === 'product') {
        let source = this.productSourceList.find(o => o.key === this.currentSource)
        return source ? source.icon : ''
      } else if (this.kind === 'proof') {
        let type = this.proofTypeList.find(o => o.key === this.currentType)
        return type ? type.icon : ''
      }
      return ''
    },
  },
  methods: {
    selectFilter(filter) {
      this.$emit('update:currentFilter', filter)
    },
    selectSource(source) {
      this.$emit('update:currentSource', source)
    },
    selectType(source) {
      this.$emit('update:currentType', source)
    }
  }
}
</script>
