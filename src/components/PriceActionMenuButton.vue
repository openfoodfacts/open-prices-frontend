<template>
  <v-btn :style="style" icon size="small" density="comfortable" variant="text">
    <v-icon>mdi-dots-vertical</v-icon>
    <v-menu activator="parent" transition="slide-y-transition">
      <v-list>
        <v-list-item :slim="true" prepend-icon="mdi-pencil" disabled>{{ $t('Common.Edit') }}</v-list-item>
        <v-list-item :slim="true" prepend-icon="mdi-delete" @click="openDeleteConfirmationDialog">{{ $t('Common.Delete') }}</v-list-item>
      </v-list>
    </v-menu>
  </v-btn>

  <PriceDeleteConfirmationDialog
    v-if="deleteConfirmationDialog"
    v-model="deleteConfirmationDialog"
    :price="price"
    @delete="showDeleteSuccessMessage"
    @close="closeDeleteConfirmationDialog">
  </PriceDeleteConfirmationDialog>

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
      deleteConfirmationDialog: false,
      deleteSuccessMessage: false
    }
  },
  computed: {
  },
  methods: {
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
