<template>
  <v-dialog>
    <v-card>
      <v-card-title>{{ $t("ChangeCurrencyDialog.Title") }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="close"></v-btn>
      </v-card-title>
      <v-card-text>
        <v-select
          v-model="userLastCurrencyUsed"
          :label="$t('ChangeCurrencyDialog.Currency')"
          :items="userFavoriteCurrencies"
          hide-details="auto"
          class="mb-5"

        ></v-select>
        <v-col cols="12">
          <v-btn class="mb-2" size="small" prepend-icon="mdi-cog-outline" @click="goToSettings">
            <span>{{ $t('ChangeCurrencyDialog.AddCurrencies') }}</span>
          </v-btn>
          <p class="text-caption text-warning">
            <i>{{ $t('ChangeCurrencyDialog.AddCurrenciesWarning') }}</i>
          </p>
        </v-col>
        <v-col cols="12">
          <v-btn class="mt-2" color="success" @click="selectedCurrency">{{ $t('UserSettings.Save') }}</v-btn>
        </v-col>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { useAppStore } from '../store'
export default {
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
      this.$router.push({ path: "/settings/" })
    },
    close() {
      this.$emit('close')
    },
  }
}
</script>