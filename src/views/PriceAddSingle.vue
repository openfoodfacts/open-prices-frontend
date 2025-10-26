<template>
  <v-form @submit.prevent="createPrice">
    <v-row>
      <v-col cols="12">
        <v-alert
          type="warning"
          variant="outlined"
          density="compact"
          :text="$t('Common.PageNotMaintainedAnymore')"
        />
      </v-col>
      <!-- Step 1: product -->
      <v-col cols="12" md="6" lg="4">
        <v-card
          :class="productFormFilled ? 'border-success' : 'border-transparent'"
          :title="$t('AddPriceSingle.ProductInfo.Title')"
          prepend-icon="mdi-database-outline"
          height="100%"
        >
          <template v-if="productFormFilled" #append>
            <v-icon icon="mdi-checkbox-marked-circle" color="success" />
          </template>
          <v-divider />
          <v-card-text>
            <ProductInputRow :productForm="addPriceSingleForm" @filled="productFormFilled = $event" />
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Step 2: proof (image, location, date & currency) -->
      <v-col cols="12" md="6" lg="4">
        <ProofUploadCard @proof="onProofUploaded($event)" />
      </v-col>

      <!-- Step 3: price -->
      <v-col cols="12" md="6" lg="4">
        <v-card
          :class="priceFormFilled ? 'border-success' : 'border-transparent'"
          :title="$t('AddPriceSingle.PriceDetails.Title')"
          prepend-icon="mdi-tag-plus-outline"
          height="100%"
        >
          <template v-if="priceFormFilled" #append>
            <v-icon icon="mdi-checkbox-marked-circle" color="success" />
          </template>
          <v-divider />
          <v-card-text>
            <PriceInputRow :priceForm="addPriceSingleForm" :product="addPriceSingleForm.product" :hideCurrencyChoice="true" @filled="priceFormFilled = $event" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn
          type="submit"
          class="float-right"
          color="primary"
          :loading="loading"
          :disabled="!formFilled"
        >
          {{ $t('Common.Upload') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'
import date_utils from '../utils/date.js'

export default {
  components: {
    ProductInputRow: defineAsyncComponent(() => import('../components/ProductInputRow.vue')),
    ProofUploadCard: defineAsyncComponent(() => import('../components/ProofUploadCard.vue')),
    PriceInputRow: defineAsyncComponent(() => import('../components/PriceInputRow.vue')),
  },
  data() {
    return {
      // price form
      addPriceSingleForm: {
        type: '',
        product: null,
        product_code: '',
        category_tag: null,
        origins_tags: '',
        labels_tags: [],
        price: null,
        price_per: null,
        price_is_discounted: false,
        price_without_discount: null,
        discount_type: null,
        currency: null,  // see ProofUploadCard
        receipt_quantity: null,
        owner_comment: null,
        location_id: null,
        location_osm_id: null,
        location_osm_type: '',
        date: date_utils.currentDate(),
        proof_id: null,
      },
      productFormFilled: false,
      priceFormFilled: false,
      loading: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    proofFormFilled() {
      let keys = ['proof_id']
      return Object.keys(this.addPriceSingleForm).filter(k => keys.includes(k)).every(k => !!this.addPriceSingleForm[k])
    },
    formFilled() {
      return this.productFormFilled && this.proofFormFilled && this.priceFormFilled
    },
  },
  methods: {
    fieldRequired(v) {
      return !!v
    },
    onProofUploaded(proof) {
      // fill the price form with the proof data
      this.addPriceSingleForm.proof_id = proof.id
      this.addPriceSingleForm.location_id = proof.location_id
      this.addPriceSingleForm.location_osm_id = proof.location_osm_id
      this.addPriceSingleForm.location_osm_type = proof.location_osm_type
      this.addPriceSingleForm.date = proof.date
      this.addPriceSingleForm.currency = proof.currency
    },
    createPrice() {
      this.loading = true
      api
        .createPrice(this.addPriceSingleForm, this.$route.path)
        .then((data) => {
          this.loading = false
          if (data.id) {
            this.goToUserDashboard()
          } else {
            alert(`Error: ${JSON.stringify(data)}`)
            console.log(JSON.stringify(data))
          }
        })
        .catch((error) => {
          alert(this.$t('Common.ServerError'))
          console.log(error)
          this.loading = false
        })
    },
    goToUserDashboard() {
      this.$router.push({ path: '/dashboard', query: { singleSuccess: 'true' } })
    }
  }
}
</script>
