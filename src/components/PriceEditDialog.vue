<template>
  <v-dialog scrollable :height="dialogHeight" :width="dialogWidth">
    <v-card :title="$t('PriceEdit.Title')">
      <template #append>
        <v-icon icon="mdi-close" @click="close" />
      </template>

      <v-divider />

      <v-card-text>
        <v-row>
          <v-col cols="12">
            <PriceCard v-if="price" :price="price" :product="price.product" :hidePriceFooterRow="false" :hideActionMenuButton="true" :readonly="true" />
          </v-col>
        </v-row>
        <!-- moderator-only alerts -->
        <v-row v-if="!userIsPriceOwner && userIsModerator">
          <v-col cols="12">
            <v-alert data-name="user-not-price-owner-alert" type="info" density="compact" variant="outlined" icon="mdi-account-off">
              {{ $t('Common.UserIsNotPriceOwner') }}
            </v-alert>
          </v-col>
        </v-row>
        <v-row v-if="!userIsPriceOwner && userIsModerator">
          <v-col cols="12">
            <v-alert data-name="user-price-edit-moderator-alert" type="info" density="compact" variant="outlined" icon="mdi-shield-account">
              {{ $t('Common.UserIsModeratorCanEditPrice') }}
            </v-alert>
          </v-col>
        </v-row>
        <!-- form -->
        <ProductInputRow v-if="productIsTypeCategory" :productForm="updatePriceForm" :hideBarcodeMode="true" />
        <PriceInputRow :priceForm="updatePriceForm" :product="price.product" :proofType="price.proof ? price.proof.type : null" />
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer v-if="$vuetify.display.smAndUp" />
        <v-btn
          color="primary"
          variant="flat"
          :block="!$vuetify.display.smAndUp"
          :loading="loading"
          @click="updatePrice"
        >
          {{ $t('PriceEdit.Save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'
import constants from '../constants'

export default {
  components: {
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue')),
    ProductInputRow: defineAsyncComponent(() => import('../components/ProductInputRow.vue')),
    PriceInputRow: defineAsyncComponent(() => import('../components/PriceInputRow.vue')),
  },
  props: {
    price: {
      type: Object,
      default: null
    },
  },
  emits: ['update', 'close'],
  data() {
    return {
      updatePriceForm: {
        type: null,
        product: null,
        product_code: '',
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
        owner_comment: null,
        // date: null,
      },
      productMode: null,
      loading: false
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    userIsPriceOwner() {
      return this.username && this.price && this.price.owner === this.username
    },
    userIsModerator() {
      return this.username && this.appStore.user.is_moderator
    },
    productIsTypeCategory() {
      return this.updatePriceForm && this.updatePriceForm.type === constants.PRICE_TYPE_CATEGORY
    },
    dialogHeight() {
      return this.$vuetify.display.smAndUp ? '80%' : '100%'
    },
    dialogWidth() {
      return this.$vuetify.display.smAndUp ? '80%' : '100%'
    },
  },
  mounted() {
    this.initUpdatePriceForm()
  },
  methods: {
    initUpdatePriceForm() {
      this.productMode = this.price.product_code ? 'barcode' : 'category'
      Object.keys(this.updatePriceForm).forEach((key) => {
        this.updatePriceForm[key] = this.price[key]
      })
    },
    updatePrice() {
      // update price
      api
        .updatePrice(this.price.id, this.updatePriceForm)
        .then((response) => {
          // if response.status == 204
          this.$emit('update', response.data)
          this.close()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    close() {
      this.$emit('close')
    },
  }
}
</script>
