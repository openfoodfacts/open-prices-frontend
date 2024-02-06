<template>
  <v-chip
    style="padding-left:5px;padding-right:5px"
    label
    size="small"
    density="comfortable"
    color="error"
    :title="$t('PriceDeleteChip.Delete')"
    @click="openDialog">
    <v-icon icon="mdi-delete"></v-icon>
  </v-chip>

  <v-dialog v-model="dialog" max-height="80%" max-width="80%">
    <v-card>
      <v-card-title>
        {{ $t('PriceDeleteChip.DeleteTitle') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="closeDialog"></v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p class="mb-1">{{ $t('PriceDeleteChip.Confirmation') }}</p>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <PriceCard v-if="price" :price="price" :hidePriceFooter="true" :readonly="true"></PriceCard>
          </v-col>
        </v-row>
        <v-btn
          class="mt-2"
          size="small"
          color="error"
          prepend-icon="mdi-delete"
          :loading="loading"
          @click="deletePrice"
        >{{ $t('PriceDeleteChip.Delete') }}</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import api from '../services/api'
// import PriceCard from '../components/PriceCard.vue'

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
      dialog: false
    }
  },
  computed: {
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
          this.closeDialog()
        })
    },
    removePriceCard() {
      const priceCardCol = document.getElementById(`price_${this.price.id}`)
      priceCardCol.remove()
    },
    openDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    }
  }
}
</script>
