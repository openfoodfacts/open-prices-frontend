<template>
  <v-chip
    style="padding-left:5px;padding-right:5px"
    label
    size="small"
    density="comfortable"
    color="error"
    :title="$t('PriceDeleteChip.Delete')"
    @click="openConfirmationDialog">
    <v-icon icon="mdi-delete"></v-icon>
  </v-chip>

  <PriceDeleteConfirmationDialog
    v-if="confirmationDialog"
    v-model="confirmationDialog"
    :price="price"
    @delete="deletePrice($event)"
    @close="confirmationDialog = false">
  </PriceDeleteConfirmationDialog>

  <v-snackbar
    v-model="deleteSuccessMessage"
    color="success"
    :timeout="2000"
  >{{ $t('PriceDeleteChip.Success') }}</v-snackbar>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import api from '../services/api'

export default {
  components: {
    'PriceDeleteConfirmationDialog': defineAsyncComponent(() => import('../components/PriceDeleteConfirmationDialog.vue'))
  },
  props: {
    'price': null,
  },
  data() {
    return {
      loading: false,
      confirmationDialog: false,
      deleteSuccessMessage: false
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
          this.deleteSuccessMessage = true
          this.removePriceCard()
          this.closeConfirmationDialog()
        })
    },
    removePriceCard() {
      document.getElementById(`price_${this.price.id}`).remove()
    },
    openConfirmationDialog() {
      this.confirmationDialog = true
    },
    closeConfirmationDialog() {
      this.confirmationDialog = false
    }
  }
}
</script>
