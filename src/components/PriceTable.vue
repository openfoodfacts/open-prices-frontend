<template>
  <v-data-table :headers="headers" :items="priceList" fixed-header hide-default-footer>
    <template #[`item.product_name`]="{ item }">
      {{ getPriceProductTitle(item) }}
    </template>
    <template #[`item.product_details`]="{ item }">
      <ProductDetails v-if="item.product" :product="item.product" :readonly="true" />
      <PriceCategoryDetails v-else :price="item" />
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
      {{ item.receipt_quantity }}
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
    ProductDetails: defineAsyncComponent(() => import('../components/ProductDetails.vue')),
    PriceCategoryDetails: defineAsyncComponent(() => import('../components/PriceCategoryDetails.vue')),
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
    source: {
      type: String,
      default: 'product',
      examples: ['product', 'proof']
    },
    proof: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      productPriceHeaders: [
        { title: 'Location', key: 'location' },
        { title: 'Date', key: 'date'},
        { title: 'Price', key: 'price' },
        { title: 'Added', key: 'created' },
        // { title: 'Actions', key: 'actions' },
      ],
      proofPriceHeaders: [
        { title: 'Product', key: 'product_name' },
        { title: 'Details', key: 'product_details' },
        { title: 'Price', key: 'price' },
        { title: 'Added', key: 'created' },
        // { title: 'Actions', key: 'actions' },
      ],
      proofReceiptPriceOwnerHeaders: [
        { title: 'Product', key: 'product_name' },
        { title: 'Details', key: 'product_details' },
        { title: 'Price', key: 'price' },
        { title: 'Quantity', key: 'receipt_quantity' },
        { title: 'Added', key: 'created' },
        // { title: 'Actions', key: 'actions' },
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
      }
      return this[`${this.source}PriceHeaders`]
    }
  },
  methods: {
    getPriceProductTitle(price) {
      if (price.product && price.product.code) {
        return price.product.product_name || price.product_code
      } else if (price.category_tag) {
        return price.category_tag
        // TODO: manage async
        // return utils.getLocaleCategoryTag(this.appStore.getUserLanguage, price.category_tag).then((category) => {
        //   return category.name
        // })
      }
    },
  }
}
</script>
