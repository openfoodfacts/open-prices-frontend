<template>
  <v-data-table :headers="headers" :items="priceList" :items-per-page="tablePageLimit" fixed-header hide-default-footer>
    <template #[`item.product_name`]="{ item }">
      <span v-if="item.product">
        {{ getPriceProductTitle(item) }}
      </span>
      <PriceCategoryChip v-else :priceCategory="item.category_tag" />
    </template>
    <template #[`item.product_details`]="{ item }">
      <ProductDetailsRow v-if="item.product" :product="item.product" :hideActionMenuButton="true" :readonly="true" />
      <PriceCategoryDetailsRow v-else :price="item" />
    </template>
    <template #[`item.location`]="{ item }">
      <LocationChip :location="item.location" :locationId="item.location_id" :readonly="true" />
    </template>
    <template #[`item.date`]="{ item }">
      <DateChip :date="item.date" :readonly="true" />
    </template>
    <template #[`item.price`]="{ item }">
      <PricePriceRow :price="item" :productQuantity="item.product ? item.product.product_quantity : null" :productQuantityUnit="item.product ? item.product.product_quantity_unit : null" />
    </template>
    <template #[`item.receipt_quantity`]="{ item }">
      <PriceQuantityPurchasedChip :priceQuantityPurchased="item.receipt_quantity" />
    </template>
    <template #[`item.created`]="{ item }">
      <RelativeDateTimeChip :dateTime="item.created" />
    </template>
  </v-data-table>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'

export default {
  components: {
    PriceCategoryChip: defineAsyncComponent(() => import('../components/PriceCategoryChip.vue')),
    ProductDetailsRow: defineAsyncComponent(() => import('../components/ProductDetailsRow.vue')),
    PriceCategoryDetailsRow: defineAsyncComponent(() => import('../components/PriceCategoryDetailsRow.vue')),
    LocationChip: defineAsyncComponent(() => import('../components/LocationChip.vue')),
    DateChip: defineAsyncComponent(() => import('../components/DateChip.vue')),
    PricePriceRow: defineAsyncComponent(() => import('../components/PricePriceRow.vue')),
    PriceQuantityPurchasedChip: defineAsyncComponent(() => import('../components/PriceQuantityPurchasedChip.vue')),
    RelativeDateTimeChip: defineAsyncComponent(() => import('../components/RelativeDateTimeChip.vue')),
  },
  props: {
    priceList: {
      type: Array,
      default: () => []
    },
    source: {
      type: String,
      default: 'product',
      examples: ['product', 'proof', 'location', 'user', 'date']
    },
    proof: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      tablePageLimit: -1,  // all items
      defaultPriceHeaders: [
        { title: this.$t('Common.Product'), key: 'product_name' },
        { title: this.$t('Common.Details'), key: 'product_details', sortable: false },
        { title: this.$t('Common.Location'), key: 'location', sortRaw (a, b) { return a.location_id - b.location_id } },
        { title: this.$t('Common.Date'), key: 'date'},
        { title: this.$t('Common.Price'), key: 'price' },
        { title: this.$t('Common.Added'), key: 'created' },
        // { title: this.$t('Common.Actions'), key: 'actions' },
      ],
      proofReceiptPriceOwnerHeaders: [
        { title: this.$t('Common.Product'), key: 'product_name' },
        { title: this.$t('Common.Details'), key: 'product_details', sortable: false },
        { title: this.$t('Common.Price'), key: 'price' },
        { title: this.$t('Common.Quantity'), key: 'receipt_quantity' },
        { title: this.$t('Common.Added'), key: 'created' },
        // { title: this.$t('Common.Actions'), key: 'actions' },
      ],
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    userIsProofOwner() {
      return this.username && this.proof && (this.proof.owner === this.username)
    },
    sourceIsProof() {
      return this.source === 'proof'
    },
    proofIsTypeReceipt() {
      return this.proof && (this.proof.type === constants.PROOF_TYPE_RECEIPT)
    },
    headers() {
      if (this.sourceIsProof && this.userIsProofOwner && this.proofIsTypeReceipt) {
        return this.proofReceiptPriceOwnerHeaders
      } else if (this.source === 'product') {
        return this.defaultPriceHeaders.filter(h => !['product_name', 'product_details'].includes(h.key))
      } else if (this.source === 'location') {
        return this.defaultPriceHeaders.filter(h => !['location'].includes(h.key))
      } else if (this.source === 'proof') {
        return this.defaultPriceHeaders.filter(h => !['location', 'date'].includes(h.key))
      } else if (this.source === 'date') {
        return this.defaultPriceHeaders.filter(h => !['date'].includes(h.key))
      } else {
        return this.defaultPriceHeaders
      }
    }
  },
  methods: {
    getPriceProductTitle(price) {
      if (price.product && price.product.code) {
        return price.product.product_name || price.product_code
      }
    },
  }
}
</script>
