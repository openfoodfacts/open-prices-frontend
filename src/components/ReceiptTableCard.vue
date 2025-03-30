<template>
  <v-card>
    <template #title>
      {{ $t('ReceiptAssistant.ReceiptItemsCheck') }}
    </template>
    <v-divider />

    <v-card-text>
      <v-data-table :headers="headers" :items="items" class="elevation-1" fixed-header hide-default-footer mobile-breakpoint="md" :mobile="null" items-per-page="100">
        <template #[`item.product_name`]="{ item }">
          <v-text-field v-if="item.manuallyAdded" v-model="item.product_name" :hide-details="true" :rules="rules" dense single-line />
          <p v-else>
            {{ item.predicted_data.product_name }}
          </p>
          <p v-if="showInfoDetails">
            <span v-if="item.existingPrice" class="text-caption text-warning">{{ $t('ReceiptAssistant.PriceAlreadyCreatedForItem') }}</span>
            <span v-else-if="!item.predicted_data.price" class="text-caption text-error">{{ $t('ReceiptAssistant.MissingPrice') }}</span>
            <span v-else-if="!item.product_code && !item.category_tag" class="text-caption text-error">{{ $t('ReceiptAssistant.MissingBarcodeOrCategory') }}</span>
            <span v-else class="text-caption text-success">{{ $t('ReceiptAssistant.PriceReadyToBeAdded') }}</span>
          </p>
        </template>
        <template #[`item.product`]="{ item }">
          <PriceCategoryChip v-if="item.isCategory" :priceCategory="item.category_tag" />
          <v-text-field 
            v-if="!item.isCategory && !item.productFound" 
            v-model="item.product_code" 
            :hide-details="true" 
            :rules="rules" 
            :append-inner-icon="item.product_code ? 'mdi-magnify' : 'mdi-barcode-scan'" 
            @click:append-inner="item.product_code ? findProduct(item) : launchBarcodeScanner(item)"
            @keydown.enter="findProduct(item)" 
          />
          <ProductCard v-if="!item.isCategory && item.productFound" :product="item.productFound" :hideCategoriesAndLabels="true" :hideActionMenuButton="true" :readonly="true" elevation="1" />
        </template>
        <template #[`item.price`]="{ item }">
          <v-text-field v-model="item.predicted_data.price" :suffix="itemPriceSuffix(item)" :hide-details="true" :rules="rules" dense single-line />
        </template>
        <template #[`item.actions`]="{ item }">
          <v-row>
            <v-btn size="x-small" icon="mdi-pencil" @click="showEditProductDialog(item)" />
            <v-btn size="x-small" icon="mdi-delete" @click="deleteItem(item)" />
          </v-row>
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn
        color="primary"
        variant="flat"
        @click="addItem"
      >
        {{ $t('ReceiptAssistant.AddNewItem') }}
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-dialog v-model="editProductDialog" max-width="500px">
    <ContributionAssistantPriceFormCard
      v-if="editProductItem"
      :productPriceForm="editProductItem"
      :hideActions="false"
      :hideUploadAction="false"
      :hidePriceTagStatusMenu="true"
      :isinDialog="true"
      forceMode="edit"
      showProductNameField
      @validatePriceTag="confirmProduct($event)"
      @close="editProductDialog = false"
    />
  </v-dialog>
  <BarcodeScannerDialog
    v-if="barcodeScannerDialog"
    v-model="barcodeScannerDialog"
    @barcode="setProductCodeFromScanner($event)"
    @close="barcodeScannerDialog = false"
  />
</template>
  
<script>
import api from '../services/api'
import { defineAsyncComponent } from 'vue'
import constants from '../constants'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'

export default {
  components: {
    ProductCard: defineAsyncComponent(() => import('../components/ProductCard.vue')),
    PriceCategoryChip: defineAsyncComponent(() => import('../components/PriceCategoryChip.vue')),
    ContributionAssistantPriceFormCard: defineAsyncComponent(() => import('../components/ContributionAssistantPriceFormCard.vue')),
    BarcodeScannerDialog: defineAsyncComponent(() => import('../components/BarcodeScannerDialog.vue')),
  },
  props: {
    proof: {
      type: Object,
      default: null
    },
    proofPriceExistingList: {
      type: Array,
      default: () => []
    }
  },
  emits: ['receiptItemsUpdated'],
  data() {
    return {
      showInfoDetails: true,
      items: [],
      headers: [
        { title: 'Product Name', key: 'product_name', sortable: false },
        { title: 'Product', key: 'product', sortable: false },
        { title: 'Price', key: 'price', sortable: false },
        { title: 'Actions', key: 'actions', sortable: false },
      ],
      editProductDialog: false,
      editProductItem: null,
      barcodeScannerDialog: false,
      barcodeScannerItem: null,
      rules: [
        v => !!v || '',
      ],
    }
  },

  computed: {
    ...mapStores(useAppStore),
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
      if (!this?.proof?.receiptItems?.length) return
      this.items = this.proof.receiptItems.map((item) => {
        if (item.price_id) {
          item.existingPrice = this.proofPriceExistingList.find(price => price.id === item.price_id)
          item.productFound = item.existingPrice.product
          item.product_code = item.existingPrice.product?.code
          item.category_tag = item.existingPrice.category_tag
          item.isCategory = ![null, '', 'unknown', 'other'].includes(item.existingPrice.category_tag)
          item.price_per = item.existingPrice.price_per
          item.predicted_data.price = item.existingPrice.price
          if (!item.predicted_data.product_name) {
            item.predicted_data.product_name = item.existingPrice.product_name
          }
        } else {
          item.isCategory = ![null, '', 'unknown', 'other'].includes(item.predicted_data.product)
          item.productFound = null
          if (item.isCategory) {
            item.category_tag = item.predicted_data.product
            item.price_per = "KILOGRAM"
          } else {
            item.product_code = ""
          }
        }
        return item
      })
    },
    itemPriceSuffix(item) {
      let suffix = this.proof.currency
      if (item.isCategory && item.category_tag) {
        suffix += '/' + (item.price_per === 'UNIT' ? 'U' :'KG')
      }
      return suffix
    },
    findProduct(item) {
      api
        .getProductByCode(item.product_code)
        .then((data) => {
          const product = data.id ? data : {'code': item.product_code, 'price_count': 0}
          item.productFound = product
        })
        .catch((error) => {
          console.log(error)
          item.productFound = null
        })
    },
    deleteItem(item) {
      this.items.splice(this.items.indexOf(item), 1)
    },
    addItem() {
      this.items.push({
        manuallyAdded: true,
        product_code: '',
        product_name: '',
        price: null,
        productFound: null,
        isCategory: false,
        category_tag: null,
        predicted_data: {}
      })
    },
    showEditProductDialog(item) {
      this.editProductDialog = true
      this.editProductItem = {
        item_id: this.items.indexOf(item),
        type: item.isCategory ? constants.PRICE_TYPE_CATEGORY : constants.PRICE_TYPE_PRODUCT,
        category_tag: item.isCategory && ![null, '', 'unknown', 'other'].includes(item.category_tag) ? item.category_tag : null,
        origins_tags: [],
        labels_tags: [],
        price: item.predicted_data.price,
        price_per: item.price_per,
        price_is_discounted: false,
        currency: this.appStore.getUserLastCurrencyUsed,
        proof: this.proof,
        proofImage: null,
        croppedImage: null,
        product_code: item.product_code,
        detected_product_code: item.product_code,
        product_name: item.predicted_data.product_name,
        loading: false
      }
    },
    confirmProduct() {
      this.editProductDialog = false
      this.items[this.editProductItem.item_id].productFound = this.editProductItem.product
      this.items[this.editProductItem.item_id].isCategory = this.editProductItem.type === constants.PRICE_TYPE_CATEGORY
      this.items[this.editProductItem.item_id].category_tag = this.editProductItem.type === constants.PRICE_TYPE_CATEGORY ? this.editProductItem.category_tag : null
      this.items[this.editProductItem.item_id].predicted_data.product_name = this.editProductItem.product_name
      this.items[this.editProductItem.item_id].predicted_data.price = this.editProductItem.price
      Object.assign(this.items[this.editProductItem.item_id], this.editProductItem)
      this.editProductItem = null
    },
    launchBarcodeScanner(item) {
      this.barcodeScannerDialog = true
      this.barcodeScannerItem = item
    },
    setProductCodeFromScanner(code) {
      this.barcodeScannerDialog = false
      this.barcodeScannerItem.product_code = code
      this.findProduct(this.barcodeScannerItem)
    }
  }
}
</script>

<style>
@media (max-width: 960px) {
  .v-table__wrapper > table > tbody > tr > td:first-child {
      padding-top: 40px !important;
  }
  .v-table__wrapper > table > tbody > tr > td:last-child {
      padding-bottom: 40px !important;
  }
  .v-table__wrapper > table > tbody > tr > td:last-child > div:first-child {
      height: 56px !important;
      align-content: center !important;
  }
}
</style>