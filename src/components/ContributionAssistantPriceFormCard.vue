<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-card class="d-flex flex-column">
    <v-card-title v-if="isInDialog">
      {{ $t("PriceEdit.Title") }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="close" />
    </v-card-title>
    <v-card-text class="flex-grow-1">
      <ProofImageCropped v-if="productPriceForm.proofImage" class="mb-4" height="200px" :proofImageFilePath="productPriceForm.proofImage" :boundingBox="productPriceForm.bounding_box" @croppedImage="setCroppedImage($event)" />
      <v-row v-if="showProductNameField">
        <v-col>
          <v-text-field
            v-model="productPriceForm.product_name"
            :label="$t('Common.ProductName')"
            type="text"
            hide-details="auto"
          />
        </v-col>
      </v-row>
      <ProductInputRow :productForm="productPriceForm" :mode="mode" :disableInitWhenSwitchingType="true" :hideProductBarcode="false" :hideBarcodeScannerTab="hideProductBarcodeScannerTab" @filled="productFormFilled = $event" />
      <PriceInputRow :priceForm="productPriceForm" :mode="mode" :hideCurrencyChoice="true" :product="productPriceForm.product" :proofType="productPriceForm.proof ? productPriceForm.proof.type : null" @filled="pricePriceFormFilled = $event" />
    </v-card-text>
    <v-divider v-if="!hideProofDetails" />
    <v-card-text v-if="!hideProofDetails" class="flex-grow-0">
      <ProofFooterRow :proof="productPriceForm.proof" :showProofChip="true" :hideProofType="true" :hideActionMenuButton="true" :readonly="true" />
    </v-card-text>
    <v-divider v-if="!hideActions" />
    <v-card-actions v-if="!hideActions">
      <v-menu v-if="!hidePriceTagStatusMenu" scroll-strategy="close">
        <template #activator="{ props }">
          <v-btn v-bind="props" color="error" variant="outlined" append-icon="mdi-menu-down">
            {{ errorButtonText }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-if="productPriceForm.status > 1" :slim="true" prepend-icon="mdi-check-circle-outline" @click="updatePriceTagStatus(0)">
            {{ $t('Common.NotAnError') }}
          </v-list-item>
          <v-divider v-if="productPriceForm.status > 1" class="mt-2 mb-2" />
          <v-list-item :slim="true" prepend-icon="mdi-eye-off-outline" @click="updatePriceTagStatus(PRICE_TAG_STATUS_UNREADABLE)">
            {{ $t('Common.Unreadable') }}
          </v-list-item>
          <v-divider class="mt-2 mb-2" />
          <v-list-item :slim="true" prepend-icon="mdi-crop" @click="updatePriceTagStatus(PRICE_TAG_STATUS_TRUNCATED)">
            {{ $t('Common.Truncated') }}
          </v-list-item>
          <v-divider class="mt-2 mb-2" />
          <v-list-item :slim="true" prepend-icon="mdi-currency-usd-off" @click="updatePriceTagStatus(PRICE_TAG_STATUS_NOT_A_PRICE)">
            {{ $t('Common.NotAPrice') }}
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer />
      <v-btn
        v-if="mode === 'display'"
        color="warning"
        variant="outlined"
        prepend-icon="mdi-pencil"
        @click="mode = 'edit'"
      >
        {{ $t('Common.Fix') }}
      </v-btn>
      <v-spacer />
      <v-btn
        v-if="!hideUploadAction"
        color="primary"
        variant="flat"
        @click="validatePriceTag"
      >
        {{ $t('Common.Confirm') }}
      </v-btn>
    </v-card-actions>

    <v-overlay v-model="showOverlay" class="align-center justify-center" contained persistent>
      <v-progress-circular
        color="primary"
        size="small"
        indeterminate
      />
    </v-overlay>
  </v-card>
</template>


<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'

export default {
  components: {
    ProofImageCropped: defineAsyncComponent(() => import('../components/ProofImageCropped.vue')),
    ProductInputRow: defineAsyncComponent(() => import('../components/ProductInputRow.vue')),
    PriceInputRow: defineAsyncComponent(() => import('../components/PriceInputRow.vue')),
    ProofFooterRow: defineAsyncComponent(() => import('../components/ProofFooterRow.vue')),
  },
  props: {
    productPriceForm: {
      type: Object,
      default: () => ({
        id: null,
        type: null,
        category_tag: null,
        origins_tags: '',
        labels_tags: [],
        price: null,
        price_per: null,
        price_is_discounted: false,
        price_without_discount: null,
        discount_type: null,
        currency: null,
        receipt_quantity: null,
        proofImage: null,
        processed: null,
        detected_product_code: null,
        product_name: null,
      })
    },
    showProductNameField: {
      type: Boolean,
      default: false
    },
    hideProductBarcodeScannerTab: {
      type: Boolean,
      default: false
    },
    hideProofDetails: {
      type: Boolean,
      default: false
    },
    hideActions: {
      type: Boolean,
      default: false
    },
    hideUploadAction: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    forceMode: {
      type: String,
      default: null
    },
    hidePriceTagStatusMenu: {
      type: Boolean,
      default: false
    },
    isInDialog: {
      type: Boolean,
      default: false,
      description: 'Whether this card is displayed in a dialog'
    }
  },
  emits: ['updatePriceTagStatus', 'validatePriceTag', 'close'],
  data() {
    return {
      PRICE_TAG_STATUS_UNREADABLE: constants.PRICE_TAG_STATUS_UNREADABLE,
      PRICE_TAG_STATUS_TRUNCATED: constants.PRICE_TAG_STATUS_TRUNCATED,
      PRICE_TAG_STATUS_NOT_A_PRICE: constants.PRICE_TAG_STATUS_NOT_A_PRICE,
      // data
      mode: null,  // see mounted
      productFormFilled: false,
      pricePriceFormFilled: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    productIsTypeProduct() {
      return this.productPriceForm.type === constants.PRICE_TYPE_PRODUCT
    },
    showOverlay() {
      return this.loading
    },
    errorButtonText() {
      if (this.productPriceForm.status === constants.PRICE_TAG_STATUS_UNREADABLE) {
        return this.$t('Common.Unreadable')
      } else if (this.productPriceForm.status === constants.PRICE_TAG_STATUS_TRUNCATED) {
        return this.$t('Common.Truncated')
      } else if (this.productPriceForm.status === constants.PRICE_TAG_STATUS_NOT_A_PRICE) {
        return this.$t('Common.NotAPrice')
      } else {
        return this.$t('Common.Error')
      }
    }
  },
  mounted() {
    this.resetMode()
  },
  unmounted() {
    if (this.productPriceForm.croppedImage) {
      URL.revokeObjectURL(this.productPriceForm.croppedImage)
    }
  },
  methods: {
    resetMode() {
      this.mode = this.forceMode || this.appStore.user.price_form_default_mode
    },
    setCroppedImage(croppedImage) {
      this.productPriceForm.croppedImage = croppedImage
    },
    updatePriceTagStatus(status=null) {
      this.$emit('updatePriceTagStatus', status)
      this.resetMode()
    },
    validatePriceTag() {
      this.$emit('validatePriceTag', this.productPriceForm)
      this.resetMode()
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
