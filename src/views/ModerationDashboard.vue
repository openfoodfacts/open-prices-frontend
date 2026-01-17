<template>
  <v-row>
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
          <v-btn v-if="item.status === 'CLOSED'" size="x-small" color="warning" variant="outlined" prepend-icon="mdi-flag" @click="toggleFlagStatus(item)">
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
import api from '../services/OpenPrices'
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
        { title: 'Object', key: 'object', sortRaw(a, b) { return `${a.content_type}${a.object_id}` - `${b.content_type}${b.object_id}` } },
        { title: 'Reason', key: 'reason' },
        { title: 'Status', key: 'status' },
        { title: 'Comment', key: 'comment' },
        { title: 'Date', key: 'created', width: '10%' },
        { title: 'Actions', key: 'actions', align: 'end', width: '15%' },
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
    getFlagObjectUrl(flag) {
      return `/${flag.content_type.toLowerCase()}s/${flag.object_id}`
    },
    toggleFlagStatus(flag) {
      const newStatus = (flag.status === 'OPEN') ? 'CLOSED' : 'OPEN'
      return api.updateFlag(flag.id, { status: newStatus })
        .then(() => {
          this.initFlagList()
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

<style>
/**
 * hide "sort by" on mobile
 * https://stackoverflow.com/a/78435096
 */
.v-data-table-headers--mobile {
  display: none;
}
</style>
