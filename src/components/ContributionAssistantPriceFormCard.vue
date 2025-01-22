<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-card class="d-flex flex-column">
    <v-card-text class="flex-grow-1">
      <ProofImageCropped class="mb-4" height="200px" :proofImageFilePath="productPriceForm.proofImage" :boundingBox="productPriceForm.bounding_box" @croppedImage="setCroppedImage($event)" />
      <v-row v-if="showProductNameField">
        <v-col>
          <v-text-field
            :model-value="productPriceForm.product_name"
            :label="$t('Common.ProductName')"
            type="text"
            hide-details="auto"
          />
        </v-col>
      </v-row>
      <ProductInputRow :productForm="productPriceForm" :mode="mode" :disableInitWhenSwitchingType="true" :hideProductBarcode="false" :hideBarcodeScannerTab="true" @filled="productFormFilled = $event" />
      <PriceInputRow class="mt-0" :priceForm="productPriceForm" :product="productPriceForm.product" :mode="mode" :hideCurrencyChoice="true" @filled="pricePriceFormFilled = $event" />
    </v-card-text>
    <v-divider v-if="!hideProofDetails" />
    <v-card-text v-if="!hideProofDetails" class="flex-grow-0">
      <ProofFooterRow :proof="productPriceForm.proof" :showProofChip="true" :hideProofType="true" :hideProofActions="true" :readonly="true" />
    </v-card-text>
    <v-divider v-if="!hideActions" />
    <v-card-actions v-if="!hideActions">
      <v-menu scroll-strategy="close">
        <template #activator="{ props }">
          <v-btn v-bind="props" color="error" variant="outlined" append-icon="mdi-menu-down">
            {{ $t('Common.Error') }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item :slim="true" prepend-icon="mdi-crop" @click="removePriceTag(3)">
            {{ $t('Common.Truncated') }}
          </v-list-item>
          <v-divider class="mt-2 mb-2" />
          <v-list-item :slim="true" prepend-icon="mdi-eye-off-outline" @click="removePriceTag(2)">
            {{ $t('Common.Unreadable') }}
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer />
      <v-btn
        v-if="mode === 'display'"
        color="warning"
        variant="outlined"
        prepend-icon="mdi-pencil"
        @click="mode = 'Edit'"
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
        {{ $t('Common.Upload') }}
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
        currency: null,
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
    }
  },
  emits: ['removePriceTag', 'validatePriceTag'],
  data() {
    return {
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
    }
  },
  mounted() {
    this.mode = this.appStore.user.price_form_default_mode
  },
  methods: {
    resetMode() {
      this.mode = 'Display'
    },
    setCroppedImage(croppedImage) {
      this.productPriceForm.croppedImage = croppedImage
    },
    removePriceTag(status=null) {
      this.$emit('removePriceTag', status)
      this.resetMode()
    },
    validatePriceTag() {
      this.$emit('validatePriceTag')
      this.resetMode()
    }
  }
}
</script>
