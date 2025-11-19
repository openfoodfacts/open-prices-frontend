<template>
  <v-row>
    <v-col cols="12">
      <v-data-table :headers="tableHeaders" :items="flagList" :items-per-page="tablePageLimit" class="elevation-1" fixed-header hide-default-footer mobile-breakpoint="md" :mobile="null" :disable-sort="true" density="comfortable">
        <template #[`item.reason`]="{ item }">
          <ModerationReasonChip :reason="item.reason" />
        </template>
        <template #[`item.status`]="{ item }">
          <ModerationStatusChip :status="item.status" />
        </template>
        <template #[`item.created`]="{ item }">
          <RelativeDateTimeChip :dateTime="item.created" />
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
import api from '../services/api'
import utils from '../utils.js'

export default {
  components: {
    ModerationReasonChip: defineAsyncComponent(() => import('../components/ModerationReasonChip.vue')),
    ModerationStatusChip: defineAsyncComponent(() => import('../components/ModerationStatusChip.vue')),
    RelativeDateTimeChip: defineAsyncComponent(() => import('../components/RelativeDateTimeChip.vue')),
  },
  data() {
    return {
      // data
      flagList: [],
      flagTotal: null,
      flagPage: 0,
      loading: false,
      // table
      tableHeaders: [
        { title: 'Object', key: 'content_type' },
        { title: 'Reason', key: 'reason' },
        { title: 'Status', key: 'status' },
        { title: 'Date', key: 'created' },
      ],
      tablePageLimit: -1,  // all items
      // filter & order
      currentOrder: '-id'
    }
  },
  computed: {
    getFlagsParams() {
      let defaultParams = { order_by: this.currentOrder, page: this.flagPage }
      return defaultParams
    }
  },
  mounted() {
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
      this.flagPage = 0
      this.getFlags()
    },
    getFlags() {
      if ((this.flagTotal != null) && (this.flagList.length >= this.flagTotal)) return
      this.loading = true
      this.flagPage += 1
      return api.getFlags(this.getFlagsParams)
        .then((data) => {
          this.flagList.push(...data.items)
          this.flagTotal = data.total
          this.loading = false
        })
    },
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getFlags()
      }
    },
  }
}
</script>
