<template>
  <v-data-table :headers="headers" :items="priceList" hide-default-footer>
    <template #[`item.location`]="{ item }">
      <LocationChip :location="item.location" :locationId="item.location_id" :readonly="true" />
    </template>
    <template #[`item.date`]="{ item }">
      <DateChip :date="item.date" :readonly="true" />
    </template>
    <template #[`item.price`]="{ item }">
      <PricePriceRow :price="item" :productQuantity="item.product ? item.product.product_quantity : null" :productQuantityUnit="item.product ? item.product.product_quantity_unit : null" />
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
    LocationChip: defineAsyncComponent(() => import('../components/LocationChip.vue')),
    DateChip: defineAsyncComponent(() => import('../components/DateChip.vue')),
    PricePriceRow: defineAsyncComponent(() => import('../components/PricePriceRow.vue')),
    RelativeDateTimeChip: defineAsyncComponent(() => import('../components/RelativeDateTimeChip.vue')),
  },
  props: {
    priceList: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      headers: [
        { title: 'Location', key: 'location' },
        { title: 'Date', key: 'date'},
        { title: 'Price', key: 'price' },
        { title: 'Added', key: 'created' },
        // { title: 'Actions', key: 'actions' },
      ],
    }
  }
}
</script>
