<template>
  <v-btn :style="style" icon size="small" density="comfortable" variant="text">
    <v-icon>mdi-dots-vertical</v-icon>
    <v-menu activator="parent" transition="slide-y-transition">
      <v-list>
        <v-list-item :slim="true" prepend-icon="mdi-pencil" @click="openEditDialog">{{ $t('Common.Edit') }}</v-list-item>
        <v-list-item :slim="true" prepend-icon="mdi-delete" @click="openDeleteConfirmationDialog">{{ $t('Common.Delete') }}</v-list-item>
      </v-list>
    </v-menu>
  </v-btn>

  <PriceEditDialog
    v-if="editDialog"
    v-model="editDialog"
    :price="price"
    @update="onPriceEditSuccess($event)"
    @close="closeEditDialog">
  </PriceEditDialog>

  <PriceDeleteConfirmationDialog
    v-if="deleteConfirmationDialog"
    v-model="deleteConfirmationDialog"
    :price="price"
    @delete="showDeleteSuccessMessage"
    @close="closeDeleteConfirmationDialog">
  </PriceDeleteConfirmationDialog>

  <v-snackbar
    v-model="editSuccessMessage"
    color="success"
    :timeout="2000"
  >{{ $t('PriceEdit.Success') }}</v-snackbar>
  <v-snackbar
    v-model="deleteSuccessMessage"
    color="success"
    :timeout="2000"
  >{{ $t('PriceDelete.Success') }}</v-snackbar>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    'PriceEditDialog': defineAsyncComponent(() => import('../components/PriceEditDialog.vue')),
    'PriceDeleteConfirmationDialog': defineAsyncComponent(() => import('../components/PriceDeleteConfirmationDialog.vue'))
  },
  props: {
    'price': null,
    'style': {
      type: String,
      default: 'position:absolute;bottom:6px;right:0;'
    }
  },
  data() {
    return {
      loading: false,
      editDialog: false,
      editSuccessMessage: false,
      deleteConfirmationDialog: false,
      deleteSuccessMessage: false
    }
  },
  methods: {
    onPriceEditSuccess(price) {
      // this.price = price
      this.showEditSuccessMessage()
    },
    openEditDialog() {
      this.editDialog = true
    },
    closeEditDialog() {
      this.editDialog = false
    },
    showEditSuccessMessage() {
      this.editSuccessMessage = true
    },
    openDeleteConfirmationDialog() {
      this.deleteConfirmationDialog = true
    },
    closeDeleteConfirmationDialog() {
      this.deleteConfirmationDialog = false
    },
    showDeleteSuccessMessage() {
      this.deleteSuccessMessage = true
    }
  }
}
</script>
