<template>
  <v-card>
    <template #title>
      {{ $t('ReceiptAssistant.ReceiptItems') }}
    </template>

    <v-divider />

    <v-card-text>
      <v-data-table :headers="headers" :items="items" :items-per-page="tablePageLimit" class="elevation-1" fixed-header hide-default-footer mobile-breakpoint="md" :mobile="null" :disable-sort="true" density="comfortable">
        <template #[`item.product_name`]="{ item }">
          <v-text-field
            v-if="item.manuallyAdded"
            v-model="item.product_name"
            density="compact"
            :rules="rules"
            :hide-details="true"
          />
          <p v-else>
            {{ item.product_name }}
          </p>
          <p v-if="showInfoDetails">
            <span v-if="item.existingPrice" class="text-caption text-warning">{{ $t('ReceiptAssistant.PriceAlreadyCreated') }}</span>
            <span v-else-if="!item.price" class="text-caption text-error">{{ $t('Common.PriceMissing') }}</span>
            <span v-else-if="itemIsCategory(item) ? !item.category_tag : !item.product_code" class="text-caption text-error">{{ $t('Common.ProductMissing') }}</span>
            <span v-else class="text-caption text-success">{{ $t('ReceiptAssistant.PriceReadyToBeAdded') }}</span>
          </p>
        </template>
        <template #[`item.product`]="{ item }">
          <template v-if="!itemIsCategory(item)">
            <ProductCard v-if="item.existingPrice" :product="item.product" :hideCategoriesAndLabels="true" :hideActionMenuButton="true" :readonly="true" elevation="1" />
            <ProductInputRow v-else :productForm="item" :hideProductTypeInput="true" :hideProductBarcode="false" />
            <div v-if="showProductCodeSuggestion(item)" class="text-caption">
              {{ $t('Common.SuggestedBarcode') }}
              <a class="fake-link" role="link" tabindex="0" @click="handleClickProductCodeSuggestion(item)" @keydown.enter="handleClickProductCodeSuggestion(item)">
                {{ item.predicted_product_code }}
              </a>
            </div>
          </template>
          <template v-else>
            <PriceCategoryChip :priceCategory="item.category_tag" />
            <PriceCategoryDetailsRow :price="item" />
          </template>
        </template>
        <template #[`item.price`]="{ item }">
          <PricePriceRow v-if="item.existingPrice" :price="item" />
          <v-text-field
            v-else
            v-model="item.price"
            :class="item.price ? 'outline-border-success' : 'outline-border-error'"
            density="compact"
            variant="outlined"
            type="text"
            inputmode="decimal"
            :rules="priceRules"
            :suffix="itemPriceSuffix(item)"
            :hide-details="true"
            @update:modelValue="newValue => item.price = replaceCommaWithDot(newValue)"
          />
        </template>
        <template #[`item.receipt_quantity`]="{ item }">
          <PriceQuantityPurchasedChip :priceQuantityPurchased="item.receipt_quantity" />
        </template>
        <template #[`item.actions`]="{ item }">
          <v-row class="float-right">
            <v-btn size="x-small" icon="mdi-pencil" @click="showEditProductDialog(item)" />
            <v-btn size="x-small" icon="mdi-delete" @click="deleteItem(item)" />
          </v-row>
        </template>
      </v-data-table>
    </v-card-text>

    <v-divider />

    <v-card-actions>
      <v-row>
        <v-col cols="6">
          <ProofReceiptPriceCountChip v-if="proof && items" class="mr-1" :uploadedCount="items.length" :totalCount="proof.receipt_price_count" />
          <ProofReceiptPriceTotalChip v-if="proof && items" :uploadedCount="proofPriceListSum" :totalCount="proof.receipt_price_total" :currency="proof.currency" />
        </v-col>
        <v-spacer />
        <v-col>
          <v-btn
            class="float-right"
            color="primary"
            variant="flat"
            @click="addItem"
          >
            {{ $t('ReceiptAssistant.AddNewItem') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>

  <v-dialog v-model="editProductDialog" max-width="500px">
    <ContributionAssistantPriceFormCard
      v-if="editProductItem"
      :productPriceForm="editProductItem"
      :showProductNameField="true"
      :hideProductBarcodeScannerTab="false"
      :hideProofDetails="true"
      :hideActions="false"
      :hideUploadAction="false"
      :hidePriceTagStatusMenu="true"
      :isInDialog="true"
      @validatePriceTag="confirmProduct($event)"
      @close="editProductDialog = false"
    />
  </v-dialog>
</template>
  
<script>
import { defineAsyncComponent } from 'vue'
import api from '../services/api'
import constants from '../constants'
import price_utils from '../utils/price.js'
import utils from '../utils.js'

const NEW_ITEM = {
  type: constants.PRICE_TYPE_PRODUCT,
  product: null,
  product_name: '',
  product_code: '',
  category_tag: null,
  price: null,
  receipt_quantity: 1,
}

export default {
  components: {
    ProductCard: defineAsyncComponent(() => import('../components/ProductCard.vue')),
    ProductInputRow: defineAsyncComponent(() => import('../components/ProductInputRow.vue')),
    PriceCategoryChip: defineAsyncComponent(() => import('../components/PriceCategoryChip.vue')),
    PriceCategoryDetailsRow: defineAsyncComponent(() => import('../components/PriceCategoryDetailsRow.vue')),
    PricePriceRow: defineAsyncComponent(() => import('../components/PricePriceRow.vue')),
    PriceQuantityPurchasedChip: defineAsyncComponent(() => import('../components/PriceQuantityPurchasedChip.vue')),
    ProofReceiptPriceCountChip: defineAsyncComponent(() => import('../components/ProofReceiptPriceCountChip.vue')),
    ProofReceiptPriceTotalChip: defineAsyncComponent(() => import('../components/ProofReceiptPriceTotalChip.vue')),
    ContributionAssistantPriceFormCard: defineAsyncComponent(() => import('../components/ContributionAssistantPriceFormCard.vue')),
  },
  props: {
    proof: {
      type: Object,
      default: null
    },
    receiptItems: {
      type: Array,
      default: () => []
    },
    proofPriceExistingList: {
      type: Array,
      default: () => []
    }
  },
  emits: ['receiptItemsUpdated'],
  data() {
    return {
      items: [],
      headers: [
        { title: this.$t('Common.Text'), key: 'product_name' },
        { title: this.$t('Common.Product'), key: 'product' },
        { title: this.$t('Common.Price'), key: 'price', minWidth: '150px' },
        { title: this.$t('Common.Quantity'), key: 'receipt_quantity' },
        { title: this.$t('Common.Actions'), key: 'actions' },
      ],
      tablePageLimit: -1,  // all items
      showInfoDetails: true,
      editProductDialog: false,
      editProductItem: null,
      rules: [
        value => !!value || '',
      ],
    }
  },
  computed: {
    priceRules() {
      return [
        value => !!value && !!value.toString().trim() || this.$t('PriceRules.AmountRequired'),
        value => !value.toString().trim().match(/ /) || this.$t('PriceRules.NoSpaces'),
        value => !isNaN(value) || this.$t('PriceRules.Number'),
        value => Number(value) >= 0 || this.$t('PriceRules.Positive'),
        value => !value.toString().match(/\.\d{3}/) || this.$t('PriceRules.TwoDecimals'),
        value => !!value && !!this.proof.currency || this.$t('Common.CurrencyMissing'),
      ]
    },
    proofPriceListSum() {
      return price_utils.priceSum(this.items.map(item => {
        return {
          price: item.price,
          receipt_quantity: item.receipt_quantity
        }
      }))
    },
  },
  watch: {
    items: {
      handler(newReceiptItems) {
        this.$emit('receiptItemsUpdated', newReceiptItems)
      },
      deep: true
    },
    proof() {
      this.init()
    },
    proofPriceExistingList() {
      this.init()
    }
  }, 
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (!this.receiptItems?.length) return
      this.items = this.receiptItems.map((item) => {
        if (item.price_id) {
          item.existingPrice = this.proofPriceExistingList.find(price => price.id === item.price_id)
          Object.assign(item, item.existingPrice)
        } else {
          const categoryPredicted = ![null, '', 'unknown', 'other'].includes(item.predicted_data.product)
          Object.assign(item, NEW_ITEM, {
            manuallyAdded: false,
            product_name: item.predicted_data.product_name,
            category_tag: categoryPredicted ? item.predicted_data.product : null,
            price: item.predicted_data.price || null,
            price_per: categoryPredicted ? "KILOGRAM" : null,
            predicted_product_code: item.predicted_data.predicted_product_code || null,
          })
        }
        return item
      })
    },
    replaceCommaWithDot(input) {
      return utils.replaceCommaWithDot(input)
    },
    itemPriceSuffix(item) {
      let suffix = this.proof.currency
      if (this.itemIsCategory(item) && item.category_tag) {
        suffix += '/' + (item.price_per === 'UNIT' ? 'U' : 'KG')
      }
      return suffix
    },
    findProduct(item) {
      api
        .getProductByCode(item.product_code)
        .then((data) => {
          const product = data.id ? data : {'code': item.product_code, 'price_count': 0}
          item.product = product
        })
        .catch((error) => {
          console.log(error)
          item.product = null
        })
    },
    deleteItem(item) {
      this.items.splice(this.items.indexOf(item), 1)
    },
    addItem() {
      this.items.push({
        ...NEW_ITEM,
        manuallyAdded: true
      })
    },
    showEditProductDialog(item) {
      this.editProductDialog = true
      this.editProductItem = {
        index: this.items.indexOf(item),
        ...item,
        currency: this.proof.currency,
        proof: this.proof,
        proofImage: null,
        croppedImage: null
      }
    },
    confirmProduct(product) {
      this.editProductDialog = false
      Object.assign(this.items[this.editProductItem.index], product)
    },
    itemIsCategory(item) {
      return item.type === constants.PRICE_TYPE_CATEGORY
    },
    showProductCodeSuggestion(item) {
      return item.predicted_product_code && !(item.existingPrice || item.product_code)
    },
    handleClickProductCodeSuggestion(item) {
      item.product_code = item.predicted_product_code
      this.findProduct(item)
    }
  }
}
</script>

<style>
@media (max-width: 960px) {
  /**
   * first & last column padding fix
   * 16? same as left & right padding
   */
  .v-table__wrapper > table > tbody > tr:first-child > td:first-child {
    padding-top: 0 !important;
  }
  .v-table__wrapper > table > tbody > tr:not(:first-child) > td:first-child {
    padding-top: 16px !important;
  }
  .v-table__wrapper > table > tbody > tr > td:last-child {
    padding-bottom: 16px !important;
  }
  /**
   * last column (actions) height fix
   */
  .v-table__wrapper > table > tbody > tr > td:last-child > div:first-child {
    height: 44px !important;
    align-content: center !important;
  }
  /**
   * grid: 1/3 label 2/3 value
   */
  .v-data-table__tr--mobile > td {
    grid-template-columns: 1fr 2fr;
  }
  /**
   * hide "sort by" on mobile
   * https://stackoverflow.com/a/78435096
   */
  .v-data-table-headers--mobile {
    display: none;
  }
}
</style>
