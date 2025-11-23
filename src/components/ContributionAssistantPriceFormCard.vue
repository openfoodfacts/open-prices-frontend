<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-card class="d-flex flex-column">
    <template v-if="isInDialog" #title>
      {{ $t("PriceEdit.Title") }}
    </template>
    <template v-if="isInDialog" #prepend>
      <v-icon icon="mdi-pencil" />
    </template>
    <template v-if="isInDialog" #append>
      <v-icon icon="mdi-close" @click="close" />
    </template>
    <v-divider v-if="isInDialog" />
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
      <ProductInputRow :productForm="productPriceForm" :disableInitWhenSwitchingType="true" :hideProductBarcode="false" :hideBarcodeScannerTab="hideProductBarcodeScannerTab" @filled="productFormFilled = $event" />
      <PriceInputRow :priceForm="productPriceForm" :product="productPriceForm.product" :proofType="productPriceForm.proof ? productPriceForm.proof.type : null" @filled="pricePriceFormFilled = $event" />
      <v-alert
        v-if="!productPriceFormValid"
        class="mt-4 mb-4"
        type="warning"
        variant="outlined"
        density="compact"
        :text="formInvalidAlertText"
      />
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
          <template v-for="(errorStatus, index) in PRICE_TAG_STATUS_ERROR_LIST" :key="errorStatus.key">
            <v-list-item :slim="true" :prepend-icon="errorStatus.icon" @click="updatePriceTagStatus(errorStatus.key)">
              {{ $t(errorStatus.textSmallScreen) }}
            </v-list-item>
            <v-divider v-if="index !== PRICE_TAG_STATUS_ERROR_LIST.length - 1" class="mt-2 mb-2" />
          </template>
        </v-list>
      </v-menu>
      <v-spacer />
      <v-btn
        v-if="!hideUploadAction"
        color="primary"
        variant="flat"
        :prepend-icon="!productPriceFormValid ? 'mdi-alert-circle' : ''"
        :disabled="!productPriceFormValid"
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
        product_name: null,
        product_code: null,
        category_tag: null,
        origins_tags: [],
        labels_tags: [],
        price: null,
        price_per: null,
        price_is_discounted: false,
        price_without_discount: null,
        discount_type: null,
        currency: null,
        receipt_quantity: null,
        proof: null,
        proofImage: null,
        croppedImage: null,
        detected_product_code: null,
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
      PRICE_TAG_STATUS_ERROR_LIST: constants.PRICE_TAG_STATUS_ERROR_LIST,
      // data
      productFormFilled: false,
      pricePriceFormFilled: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    priceTagIsTypeProduct() {
      return this.productPriceForm.type === constants.PRICE_TYPE_PRODUCT
    },
    priceTagIsTypeCategory() {
      return this.productPriceForm.type === constants.PRICE_TYPE_CATEGORY
    },
    productPriceFormValid() {
      return this.productPriceForm &&
             ((this.priceTagIsTypeProduct && this.productPriceForm.product_code) || (this.priceTagIsTypeCategory && this.productPriceForm.category_tag)) &&
             this.productPriceForm.price
    },
    showOverlay() {
      return this.loading
    },
    formInvalidAlertText() {
      if (this.priceTagIsTypeProduct && !this.productPriceForm.product_code) {
        return this.$t('Common.ProductMissing')
      } else if (this.priceTagIsTypeCategory && !this.productPriceForm.category_tag) {
        return this.$t('Common.CategoryMissing')
      } else if (!this.productPriceForm.price) {
        return this.$t('Common.PriceMissing')
      }
      return this.$t('Common.Error')
    },
    errorButtonText() {
      if (this.productPriceForm.status === constants.PRICE_TAG_STATUS_UNREADABLE) {
        return this.$t('Common.Unreadable')
      } else if (this.productPriceForm.status === constants.PRICE_TAG_STATUS_TRUNCATED) {
        return this.$t('Common.Truncated')
      } else if (this.productPriceForm.status === constants.PRICE_TAG_STATUS_NOT_A_PRICE) {
        return this.$t('Common.NotAPrice')
      } else if (this.productPriceForm.status === constants.PRICE_TAG_STATUS_NO_BARCODE) {
        return this.$t('Common.NoBarcode')
      } else if (this.productPriceForm.status === constants.PRICE_TAG_STATUS_OTHER) {
        return this.$t('Common.Other')
      } else {
        return this.$t('Common.Error')
      }
    }
  },
  unmounted() {
    if (this.productPriceForm.croppedImage) {
      URL.revokeObjectURL(this.productPriceForm.croppedImage)
    }
  },
  methods: {
    setCroppedImage(croppedImage) {
      this.productPriceForm.croppedImage = croppedImage
    },
    updatePriceTagStatus(status=null) {
      this.$emit('updatePriceTagStatus', status)
    },
    validatePriceTag() {
      this.$emit('validatePriceTag', this.productPriceForm)
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
