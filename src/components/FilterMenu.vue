<template>
  <v-menu scroll-strategy="close">
    <template #activator="{ props }">
      <v-btn v-bind="props" size="x-small" class="mr-2" prepend-icon="mdi-filter-variant" :append-icon="getCurrentFilterIcon" :active="hasCurrentFilter">
        <span v-if="$vuetify.display.smAndUp">{{ $t('Common.Filter') }}</span>
      </v-btn>
    </template>
    <v-list>
      <!-- title -->
      <v-list-item class="d-sm-none text-uppercase" :slim="true" disabled>
        {{ $t('Common.Filter') }}
      </v-list-item>
      <v-divider class="d-sm-none" />
      <!-- default filters -->
      <v-list-item v-for="filter in filterList" :key="filter.key" :slim="true" :prepend-icon="(currentFilterList.includes(filter.key)) ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'" :active="currentFilterList.includes(filter.key)" @click="selectFilter(filter.key)">
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
      <v-sheet v-if="showPriceTypeFilter">
        <v-divider />
        <v-list-subheader class="text-uppercase">
          {{ $t('Common.Type') }}
        </v-list-subheader>
        <v-list-item v-for="item in priceTypeList" :key="item.key" :slim="true" :active="currentType === item.key" @click="selectType(item.key)">
          <v-icon>{{ item.icon }}</v-icon>
          {{ $t('Common.' + item.value) }}
        </v-list-item>
      </v-sheet>
      <v-sheet v-if="showProofTypeFilter">
        <v-divider />
        <v-list-subheader class="text-uppercase">
          {{ $t('Common.Type') }}
        </v-list-subheader>
        <v-list-item v-for="item in proofTypeList" :key="item.key" :slim="true" :active="currentType === item.key" @click="selectType(item.key)">
          <v-icon>{{ item.icon }}</v-icon>
          {{ $t('Common.' + item.value) }}
        </v-list-item>
      </v-sheet>
      <v-sheet v-if="showLocationTypeFilter">
        <v-divider />
        <v-list-subheader class="text-uppercase">
          {{ $t('Common.Type') }}
        </v-list-subheader>
        <v-list-item v-for="item in locationTypeList" :key="item.key" :slim="true" :active="currentType === item.key" @click="selectType(item.key)">
          <v-icon>{{ item.icon }}</v-icon>
          {{ item.value }}
        </v-list-item>
      </v-sheet>
      <v-sheet v-if="showPriceProofKindFilter">
        <v-divider />
        <v-list-subheader class="text-uppercase">
          {{ $t('Common.Group') }}
        </v-list-subheader>
        <v-list-item v-for="item in priceProofKindList" :key="item.key" :slim="true" :active="currentKind === item.key" @click="selectKind(item.key)">
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
      examples: ['product', 'price', 'proof', 'priceTag', 'location', 'country', 'user']
    },
    currentFilterList: {
      type: Array,
      default: () => []
    },
    currentSource: {
      type: String,
      default: null
    },
    currentType: {
      type: String,
      default: null
    },
    currentKind: {
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
    },
    showKind: {
      type: Boolean,
      default: false
    },
  },
  emits: ['update:currentFilterList', 'update:currentSource', 'update:currentType', 'update:currentKind'],
  data() {
    return {
      // default filters
      productFilterList: constants.PRODUCT_FILTER_LIST,
      priceFilterList: constants.PRICE_FILTER_LIST,
      proofFilterList: constants.PROOF_FILTER_LIST,
      priceTagFilterList: constants.PRICE_TAG_FILTER_LIST,
      locationFilterList: constants.LOCATION_FILTER_LIST,
      countryFilterList: constants.LOCATION_COUNTRY_FILTER_LIST,
      userFilterList: constants.USER_FILTER_LIST,
      // other filters
      productSourceList: constants.PRODUCT_SOURCE_LIST,
      priceTypeList: constants.PRICE_TYPE_LIST,
      proofTypeList: constants.PROOF_TYPE_LIST,
      locationTypeList: constants.LOCATION_TYPE_LIST,
      priceProofKindList: constants.PRICE_PROOF_KIND_LIST,
    }
  },
  computed: {
    showProductSourceFilter() {
      return this.kind === 'product' && !this.hideSource
    },
    showPriceTypeFilter() {
      return this.kind === 'price' && !this.hideType
    },
    showProofTypeFilter() {
      return this.kind === 'proof' && !this.hideType
    },
    showLocationTypeFilter() {
      return this.kind === 'location' && !this.hideType
    },
    showPriceProofKindFilter() {
      return ['price', 'proof'].includes(this.kind) && this.showKind
    },
    filterList() {
      return this[`${this.kind}FilterList`]
    },
    hasCurrentFilter() {
      return !!this.currentFilterList.length || !!this.currentSource || !!this.currentType || !!this.currentKind
    },
    getCurrentFilterIcon() {
      if (this.kind === 'product') {
        let source = this.productSourceList.find(o => o.key === this.currentSource)
        return source ? source.icon : ''
      } else if (this.kind === 'price') {
        let type = this.priceTypeList.find(o => o.key === this.currentType)
        return type ? type.icon : ''
      } else if (this.kind === 'proof') {
        let type = this.proofTypeList.find(o => o.key === this.currentType)
        return type ? type.icon : ''
      } else if (this.kind === 'location') {
        let type = this.locationTypeList.find(o => o.key === this.currentType)
        return type ? type.icon : ''
      }
      return ''
    },
  },
  methods: {
    selectFilter(filter) {
      let newFilterList = this.currentFilterList.includes(filter) ? this.currentFilterList.filter(f => f !== filter) : [...this.currentFilterList, filter]
      this.$emit('update:currentFilterList', newFilterList)
    },
    selectSource(source) {
      this.$emit('update:currentSource', source)
    },
    selectType(type) {
      this.$emit('update:currentType', type)
    },
    selectKind(kind) {
      this.$emit('update:currentKind', kind)
    }
  }
}
</script>
