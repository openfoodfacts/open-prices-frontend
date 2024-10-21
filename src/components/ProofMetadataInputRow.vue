<template>
  <v-row>
    <v-col cols="6">
      <h3 class="mb-1">
        {{ $t('Common.Date') }}
      </h3>
      <v-text-field
        v-model="proofMetadataForm.date"
        :label="$t('Common.Date')"
        type="date"
        :max="currentDate"
        hide-details="auto"
      />
    </v-col>
    <v-col cols="6">
      <h3 class="mb-1">
        {{ $t('Common.Currency') }}
        <span class="text-caption font-weight-regular">
          <a href="#">{{ $t('Common.Help') }}</a>
          <v-tooltip activator="parent" open-on-click location="top">
            {{ $t('ChangeCurrencyDialog.AddCurrencies') }}
          </v-tooltip>
        </span>
      </h3>
      <v-select
        v-model="proofMetadataForm.currency"
        :label="$t('Common.Currency')"
        :items="userFavoriteCurrencies"
        hide-details="auto"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import utils from '../utils.js'

export default {
  props: {
    proofMetadataForm: {
      type: Object,
      default: () => ({ date: this.currentDate, currency: null })
    },
  },
  data() {
    return {
      currentDate: utils.currentDate(),
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
    }
  }
}
</script>
