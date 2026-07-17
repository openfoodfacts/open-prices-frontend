<template>
  <v-row>
    <v-col>
      <CountTextChip kind="report" :count="flagTotal" />
      <template v-if="!loading">
        <LoadedCountChip :loadedCount="flagList.length" :totalCount="flagTotal" />
        <FilterMenu kind="flag" :currentFilterList="currentFilterList" :currentType="currentType" :currentKind="currentKind" :showKind="true" @update:currentFilterList="updateFilterList($event)" @update:currentType="toggleFlagType($event)" @update:currentKind="toggleFlagKind($event)" />
        <OrderMenu kind="flag" :currentOrder="currentOrder" @update:currentOrder="updateOrder($event)" />
      </template>
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col cols="12">
      <v-data-table :headers="tableHeaders" :items="flagList" :items-per-page="tablePageLimit" class="elevation-1" fixed-header hide-default-footer mobile-breakpoint="md" :mobile="null" :disable-sort="true" density="comfortable">
        <template #[`item.object`]="{ item }">
          <router-link :to="getFlagObjectUrl(item)" target="_blank">
            {{ item.content_type }} {{ item.object_id }}
          </router-link>
        </template>
        <template #[`item.reason`]="{ item }">
          <ModerationReasonChip :reason="item.reason" />
        </template>
        <template #[`item.status`]="{ item }">
          <ModerationStatusChip :status="item.status" />
        </template>
        <template #[`item.created`]="{ item }">
          <RelativeDateTimeChip :dateTime="item.created" />
        </template>
        <template #[`item.actions`]="{ item }">
          <v-btn v-if="item.status === 'OPEN'" size="x-small" color="success" variant="outlined" prepend-icon="mdi-check-bold" @click="toggleFlagStatus(item)">
            {{ $t('Common.Close') }}
          </v-btn>
          <v-btn v-if="item.status === 'CLOSED'" size="x-small" color="warning" variant="outlined" :prepend-icon="REPORT_ICON" @click="toggleFlagStatus(item)">
            {{ $t('Common.Re-open') }}
          </v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
  <v-row v-if="loading">
    <v-col align="center">
      <v-progress-circular indeterminate :size="30" />
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import openPricesApi from '../services/openPricesApi'
import constants from '../constants'
import utils from '../utils.js'

export default {
  components: {
    CountTextChip: defineAsyncComponent(() => import('../components/CountTextChip.vue')),
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    FilterMenu: defineAsyncComponent(() => import('../components/FilterMenu.vue')),
    OrderMenu: defineAsyncComponent(() => import('../components/OrderMenu.vue')),
    ModerationReasonChip: defineAsyncComponent(() => import('../components/ModerationReasonChip.vue')),
    ModerationStatusChip: defineAsyncComponent(() => import('../components/ModerationStatusChip.vue')),
    RelativeDateTimeChip: defineAsyncComponent(() => import('../components/RelativeDateTimeChip.vue')),
  },
  data() {
    return {
      REPORT_ICON: constants.REPORT_ICON,
      // data
      flagList: [],
      flagTotal: null,
      flagPage: 0,
      loading: false,
      // table
      tableHeaders: [
        { title: 'Object', key: 'object', sortRaw(a, b) { return `${a.content_type}${a.object_id}` - `${b.content_type}${b.object_id}` } },
        { title: 'Reason', key: 'reason' },
        { title: 'Status', key: 'status' },
        { title: 'Comment', key: 'comment' },
        { title: 'Date', key: 'created', width: '10%' },
        { title: 'Actions', key: 'actions', align: 'end', width: '15%' },
      ],
      tablePageLimit: -1,  // all items
      // filter & order
      currentFilterList: [],
      currentType: '',
      currentKind: '',
      currentOrder: constants.MODERATION_FLAG_ORDER_LIST[0].key,  // created first
    }
  },
  computed: {
    getFlagsParams() {
      let defaultParams = { order_by: this.currentOrder, page: this.flagPage }
      if (!this.currentFilterList.includes('show_closed')) {
        defaultParams['status'] = 'OPEN'
      }
      if (this.currentType) {
        defaultParams['content_type'] = this.currentType
      }
      if (this.currentKind) {
        defaultParams['reason'] = this.currentKind
      }
      return defaultParams
    }
  },
  watch: {
    $route (newRoute, oldRoute) { // only called when query changes to avoid having an API call when the path changes
      if (oldRoute.path === newRoute.path && JSON.stringify(oldRoute.query) !== JSON.stringify(newRoute.query)) {
        this.initFlagList()
      }
    }
  },
  mounted() {
    this.currentFilterList = utils.toArray(this.$route.query[constants.FILTER_PARAM]) || this.currentFilterList
    this.currentType = this.$route.query[constants.TYPE_PARAM] || this.currentType
    this.currentKind = this.$route.query[constants.KIND_PARAM] || this.currentKind
    this.currentOrder = this.$route.query[constants.ORDER_PARAM] || this.currentOrder
    this.initFlagList()
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100)
    window.addEventListener('scroll', this.handleDebouncedScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  methods: {
    initFlagList() {
      this.flagList = []
      this.flagTotal = null
      this.flagPage = 0
      this.getFlags()
    },
    getFlags() {
      if ((this.flagTotal != null) && (this.flagList.length >= this.flagTotal)) return
      this.loading = true
      this.flagPage += 1
      return openPricesApi.getFlags(this.getFlagsParams)
        .then((data) => {
          this.flagList.push(...data.items)
          this.flagTotal = data.total
          this.loading = false
        })
    },
    getFlagObjectUrl(flag) {
      return `/${flag.content_type.toLowerCase()}s/${flag.object_id}`
    },
    toggleFlagStatus(flag) {
      const newStatus = (flag.status === 'OPEN') ? 'CLOSED' : 'OPEN'
      return openPricesApi.updateFlag(flag.id, { status: newStatus })
        .then(() => {
          this.initFlagList()
        })
    },
    updateFilterList(newFilterList) {
      this.currentFilterList = newFilterList
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.currentFilterList } })
      // this.initFlagList() will be called in watch $route
    },
    toggleFlagType(sourceKey) {
      this.currentType = (this.currentType !== sourceKey) ? sourceKey : ''
      this.$router.push({ query: { ...this.$route.query, [constants.TYPE_PARAM]: this.currentType } })
      // this.initFlagList() will be called in watch $route
    },
    toggleFlagKind(kindKey) {
      this.currentKind = (this.currentKind !== kindKey) ? kindKey : ''
      this.$router.push({ query: { ...this.$route.query, [constants.KIND_PARAM]: this.currentKind } })
      // this.initFlagList() will be called in watch $route
    },
    updateOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.currentOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.currentOrder } })
        // this.initFlagList() will be called in watch $route
      }
    },
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getFlags()
      }
    },
  }
}
</script>

<style>
/**
 * hide "sort by" on mobile
 * https://stackoverflow.com/a/78435096
 */
.v-data-table-headers--mobile {
  display: none;
}
</style>
