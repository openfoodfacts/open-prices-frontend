<template>
  <v-dialog max-height="80%" min-width="50%" width="auto">
    <v-card>
      <v-card-title>
        {{ $t("ChangeCurrencyDialog.Title") }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="close" />
      </v-card-title>

      <v-divider />

      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-select
              v-model="userLastCurrencyUsed"
              :label="$t('ChangeCurrencyDialog.Currency')"
              :items="userFavoriteCurrencies"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12">
            <v-btn class="mb-2" size="small" prepend-icon="mdi-cog-outline" @click="goToSettings">
              <span>{{ $t('ChangeCurrencyDialog.AddCurrencies') }}</span>
            </v-btn>
            <p class="text-caption text-warning">
              <i>{{ $t('ChangeCurrencyDialog.AddCurrenciesWarning') }}</i>
            </p>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-btn elevation="1" @click="selectedCurrency">
          {{ $t('ChangeCurrencyDialog.Select', { currency_code: userLastCurrencyUsed }) }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { useAppStore } from '../store'

export default {
  emits: ['newCurrencySelected', 'close'],
  data() {
    return {
      userFavoriteCurrencies: [],
      userLastCurrencyUsed: null,
    }
  },
  computed: {
  },
  mounted() {
    this.getCurrencyData()
  },
  methods: {
    getCurrencyData() {
      const appStore = useAppStore()
      this.userFavoriteCurrencies = appStore.getUserFavoriteCurrencies
      this.userLastCurrencyUsed = appStore.getUserLastCurrencyUsed
    },
    selectedCurrency() {
      const appStore = useAppStore()
      appStore.setLastCurrencyUsed(this.userLastCurrencyUsed)
      this.$emit('newCurrencySelected', this.userLastCurrencyUsed)
      this.close()
    },
    goToSettings() {
      this.$router.push({ path: "/settings" })
    },
    close() {
      this.$emit('close')
    },
  }
}
</script>
