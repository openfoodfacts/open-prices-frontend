<template>
  <v-data-table :headers="headers" :items="proofList" :items-per-page="tablePageLimit" fixed-header hide-default-footer>
    <template #[`item.type`]="{ item }">
      <ProofTypeChip :proofType="item.type" />
    </template>
    <template #[`item.price_count`]="{ item }">
      <PriceCountChip :count="item.price_count" :withLabel="true" source="proof" />
    </template>
    <template #[`item.location`]="{ item }">
      <LocationChip :location="item.location" :locationId="item.location_id" :readonly="true" />
    </template>
    <template #[`item.date`]="{ item }">
      <DateChip :date="item.date" :readonly="true" />
    </template>
    <template #[`item.currency`]="{ item }">
      <CurrencyChip :currency="item.currency" :readonly="true" />
    </template>
    <template #[`item.created`]="{ item }">
      <RelativeDateTimeChip :dateTime="item.created" />
    </template>
  </v-data-table>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    ProofTypeChip: defineAsyncComponent(() => import('../components/ProofTypeChip.vue')),
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    LocationChip: defineAsyncComponent(() => import('../components/LocationChip.vue')),
    DateChip: defineAsyncComponent(() => import('../components/DateChip.vue')),
    CurrencyChip: defineAsyncComponent(() => import('../components/CurrencyChip.vue')),
    RelativeDateTimeChip: defineAsyncComponent(() => import('../components/RelativeDateTimeChip.vue')),
  },
  props: {
    proofList: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      tablePageLimit: -1,  // all items
      tableHeaders: [
        { title: 'Type', key: 'type' },
        { title: 'Prices', key: 'price_count' },
        { title: 'Location', key: 'location', sortRaw (a, b) { return a.location_id - b.location_id } },
        { title: 'Date', key: 'date'},
        { title: 'Currency', key: 'currency' },
        { title: 'Added', key: 'created' },
        // { title: 'Actions', key: 'actions' },
      ],
    }
  },
  computed: {
    headers() {
      return this.tableHeaders
    }
  },
}
</script>
