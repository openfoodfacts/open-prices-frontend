<template>
  <v-dialog scrollable max-height="80%" max-width="80%">
    <v-card>
      <v-card-title>
        {{ $t('PriceDelete.Title') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="closeDialog"></v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <p class="mb-1">{{ $t('PriceDelete.Confirmation') }}</p>
        <v-row>
          <v-col cols="12" md="6">
            <PriceCard :price="price" :product="price.product" :hidePriceFooter="true" :readonly="true"></PriceCard>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          color="error"
          elevation="1"
          prepend-icon="mdi-delete"
          :loading="loading"
          @click="deletePrice"
        >{{ $t('PriceDelete.Delete') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import api from '../services/api'

export default {
  components: {
    'PriceCard': defineAsyncComponent(() => import('../components/PriceCard.vue'))
  },
  props: {
    'price': null,
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    deletePrice() {
      this.loading = true
      api
        .deletePrice(this.price.id)
        .then((response) => {
          // if response.status == 204
          this.loading = false
          this.removePriceCard()
          this.$emit('delete')
          this.closeDialog()
        })
    },
    removePriceCard() {
      document.getElementById(`price_${this.price.id}`).remove()
    },
    closeDialog() {
      this.$emit('close')
    },
  }
}
</script>
