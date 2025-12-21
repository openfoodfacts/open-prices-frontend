<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col cols="6">
          <div class="text-body-2 required">
            {{ $t('Common.Date') }}
            <v-icon class="float-right" size="small" icon="mdi-information-outline" />
            <v-tooltip activator="parent" open-on-click location="top">
              {{ $t('Common.DateProofHelpText') }}
              {{ $t('Common.DateProofHelpTextExif') }}
              <span v-if="proofIsTypeReceipt">{{ $t('Common.DateProofHelpTextReceipt') }}</span>
            </v-tooltip>
          </div>
          <v-text-field
            v-model="proofMetadataForm.date"
            :class="proofMetadataForm.date ? 'outline-border-success' : 'outline-border-error'"
            density="compact"
            variant="outlined"
            type="date"
            :max="currentDate"
            hide-details="auto"
          />
        </v-col>
        <v-col cols="6">
          <div class="text-body-2 required">
            {{ $t('Common.Currency') }}
            <v-icon class="float-right" size="small" icon="mdi-information-outline" />
            <v-tooltip activator="parent" open-on-click location="top">
              {{ $t('Common.CurrencyProofHelpTextSettings') }}
            </v-tooltip>
          </div>
          <v-select
            v-model="proofMetadataForm.currency"
            :class="proofMetadataForm.date ? 'outline-border-success' : 'outline-border-error'"
            density="compact"
            variant="outlined"
            :items="userFavoriteCurrencies"
            hide-details="auto"
          />
        </v-col>
      </v-row>

      <!--Receipt-only fields: receipt_price_count, receipt_price_total, receipt_online_delivery_costs -->
      <v-row v-if="proofIsTypeReceipt" class="mt-0">
        <v-col cols="6">
          <div class="text-body-2">
            <v-icon size="small" :icon="PROOF_TYPE_RECEIPT_ICON" /> {{ $t('Common.ReceiptPriceCount') }}
          </div>
          <v-text-field
            v-model="proofMetadataForm.receipt_price_count"
            density="compact"
            variant="outlined"
            type="text"
            inputmode="numeric"
            :rules="priceCountRules"
            hide-details="auto"
          />
        </v-col>
        <v-col cols="6">
          <div class="text-body-2">
            <v-icon size="small" :icon="PROOF_TYPE_RECEIPT_ICON" /> {{ $t('Common.ReceiptPriceTotal') }}
          </div>
          <v-text-field
            v-model="proofMetadataForm.receipt_price_total"
            density="compact"
            variant="outlined"
            type="text"
            inputmode="decimal"
            :rules="priceTotalRules"
            :suffix="proofMetadataForm.currency"
            hide-details="auto"
            @update:modelValue="newValue => proofMetadataForm.receipt_price_total = replaceCommaWithDot(newValue)"
          />
        </v-col>
      </v-row>
      <v-row v-if="proofIsTypeReceipt && locationIsTypeOnline" class="mt-0">
        <v-col cols="6">
          <div class="text-body-2">
            <v-icon size="small" :icon="LOCATION_TYPE_ONLINE_ICON" /> {{ $t('Common.ReceiptOnlineDeliveryCosts') }}
          </div>
          <v-text-field
            v-model="proofMetadataForm.receipt_online_delivery_costs"
            density="compact"
            variant="outlined"
            type="text"
            inputmode="decimal"
            :rules="priceOnlineDeliveryCostsRules"
            :suffix="proofMetadataForm.currency"
            hide-details="auto"
            @update:modelValue="newValue => proofMetadataForm.receipt_online_delivery_costs = replaceCommaWithDot(newValue)"
          />
        </v-col>
      </v-row>
      <v-row v-if="!multiple" class="mt-0">
        <v-col v-if="!displayOwnerCommentField" cols="12">
          <a class="fake-link text-body-2" role="link" tabindex="0" @click="displayOwnerCommentField = true" @keydown.enter="displayOwnerCommentField = true">
            {{ $t('Common.AddComment') }}
          </a>
        </v-col>
        <v-col v-else cols="12">
          <div class="text-body-2">
            {{ $t('Common.Comment') }}
          </div>
          <v-textarea
            v-model="proofMetadataForm.owner_comment"
            rows="2"
            density="compact"
            variant="outlined"
            type="text"
            hide-details="auto"
            clearable
          />
        </v-col>
      </v-row>
      <v-row v-if="assistedByAI" class="mt-0">
        <v-col cols="12">
          <v-alert
            v-if="proofIsTypePriceTag"
            type="info"
            density="compact"
            variant="outlined"
            :text="$t('ProofAdd.PriceTagAIWarning')"
          />
          <v-alert
            v-else-if="proofIsTypeReceipt"
            type="info"
            density="compact"
            variant="outlined"
            :text="$t('ProofAdd.ReceiptAIWarning')"
          />
        </v-col>
      </v-row>
      <v-row v-if="assistedByAI && proofIsTypePriceTag" class="mt-0">
        <v-col cols="12" class="pb-1">
          <v-switch
            v-model="proofMetadataForm.ready_for_price_tag_validation"
            density="compact"
            color="success"
            :true-value="true"
            hide-details="auto"
          >
            <template #label>
              <span class="text-body-2">{{ $t('ProofAdd.PriceTagAllowCommunityValidation') }}</span>
            </template>
          </v-switch>
        </v-col>
      </v-row>
      <v-row v-if="proofIsTypeReceipt" class="mt-0">
        <v-col cols="12" class="pb-1">
          <v-switch
            v-model="proofMetadataForm.owner_consumption"
            density="compact"
            color="success"
            :true-value="true"
            hide-details="auto"
          >
            <template #label>
              <span class="text-body-2">{{ $t('Common.ReceiptOwnerConsumption') }}</span>
            </template>
          </v-switch>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'
import date_utils from '../utils/date.js'
import utils from '../utils.js'

export default {
  props: {
    proofMetadataForm: {
      type: Object,
      default: () => ({
        date: this.currentDate,
        currency: null,
        receipt_price_count: null,
        receipt_price_total: null,
        receipt_online_delivery_costs: null,
        owner_consumption: true,
        owner_comment: null,
        ready_for_price_tag_validation: null,
      })
    },
    proofType: {
      type: String,
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    assistedByAI: {
      type: Boolean,
      default: false
    },
    locationType: {
      type: String,
      default: null
    },
  },
  data() {
    return {
      displayOwnerCommentField: null,  // see initProofMetadataForm
      currentDate: date_utils.currentDate(),
      PROOF_TYPE_RECEIPT_ICON: constants.PROOF_TYPE_RECEIPT_ICON,
      LOCATION_TYPE_ONLINE_ICON: constants.LOCATION_TYPE_ONLINE_ICON,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    proofMetadataFormFilled() {
      let keys = ['date', 'currency']
      return Object.keys(this.proofMetadataForm).filter(k => keys.includes(k)).every(k => !!this.proofMetadataForm[k])
    },
    userFavoriteCurrencies() {
      return this.appStore.getUserFavoriteCurrencies
    },
    proofIsTypePriceTag() {
      return this.proofType === constants.PROOF_TYPE_PRICE_TAG
    },
    proofIsTypeReceipt() {
      return this.proofType === constants.PROOF_TYPE_RECEIPT
    },
    locationIsTypeOnline() {
      return this.locationType === constants.LOCATION_TYPE_ONLINE
    },
    priceCountRules() {
      if (!this.proofMetadataForm.receipt_price_count) return [() => true]  // optional field
      return [
        value => !isNaN(value) || this.$t('PriceRules.Number'),
        value => Number(value) >= 1 || this.$t('PriceRules.Positive'),
      ]
    },
    priceTotalRules() {
      if (!this.proofMetadataForm.receipt_price_total) return [() => true]  // optional field
      return [
        value => !!value && !value.toString().trim().match(/ /) || this.$t('PriceRules.NoSpaces'),
        value => !isNaN(value) || this.$t('PriceRules.Number'),
        value => Number(value) >= 0 || this.$t('PriceRules.Positive'),
        value => !value.toString().match(/\.\d{3}/) || this.$t('PriceRules.TwoDecimals'),
      ]
    },
    priceOnlineDeliveryCostsRules() {
      if (!this.proofMetadataForm.receipt_online_delivery_costs) return [() => true]  // optional field
      return [
        value => !!value && !value.toString().trim().match(/ /) || this.$t('PriceRules.NoSpaces'),
        value => !isNaN(value) || this.$t('PriceRules.Number'),
        value => Number(value) >= 0 || this.$t('PriceRules.Positive'),
        value => !value.toString().match(/\.\d{3}/) || this.$t('PriceRules.TwoDecimals'),
      ]
    },
  },
  mounted() {
    this.initProofMetadataForm()
  },
  methods: {
    initProofMetadataForm() {
      this.displayOwnerCommentField = !!this.proofMetadataForm.owner_comment
    },
    replaceCommaWithDot(input) {
      return utils.replaceCommaWithDot(input)
    },
  }
}
</script>
