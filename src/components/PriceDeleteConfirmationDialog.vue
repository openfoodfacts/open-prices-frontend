<template>
  <v-dialog scrollable max-height="80%" max-width="80%">
    <v-card>
      <v-card-title>
        {{ $t('PriceDeleteChip.DeleteTitle') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="closeDialog"></v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <p class="mb-1">{{ $t('PriceDeleteChip.Confirmation') }}</p>
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
          @click="deletePrice"
        >{{ $t('PriceDeleteChip.Delete') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    'PriceCard': defineAsyncComponent(() => import('../components/PriceCard.vue'))
  },
  props: {
    'price': null,
  },
  methods: {
    deletePrice() {
      this.$emit('delete')
    },
    closeDialog() {
      this.$emit('close')
    },
  }
}
</script>
