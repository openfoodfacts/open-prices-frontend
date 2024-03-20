<template>
  <v-btn :style="style" icon size="small" density="comfortable" variant="text">
    <v-icon>mdi-dots-vertical</v-icon>
    <v-menu activator="parent" scroll-strategy="close" transition="slide-y-transition">
      <v-list>
        <v-list-item :slim="true" prepend-icon="mdi-pencil" @click="openEditDialog" :disabled="!proofIsReceipt">{{ $t('Common.Edit') }}</v-list-item>
        <v-list-item :slim="true" prepend-icon="mdi-delete" @click="openDeleteConfirmationDialog" :disabled="!userCanDeleteProof">{{ $t('Common.Delete') }}</v-list-item>
      </v-list>
    </v-menu>
  </v-btn>

  <ProofEditDialog
    v-if="editDialog"
    :proof="proof"
    v-model="editDialog"
    @update="showEditSuccessMessage"
    @close="closeEditDialog"
  ></ProofEditDialog>

  <ProofDeleteConfirmationDialog
    v-if="deleteConfirmationDialog"
    v-model="deleteConfirmationDialog"
    :proof="proof"
    @delete="showDeleteSuccessMessage"
    @close="closeDeleteConfirmationDialog">
  </ProofDeleteConfirmationDialog>

  <v-snackbar
    v-model="editSuccessMessage"
    color="success"
    :timeout="2000"
  >{{ $t('ProofEdit.Success') }}</v-snackbar>
  <v-snackbar
    v-model="deleteSuccessMessage"
    color="success"
    :timeout="2000"
  >{{ $t('ProofDelete.Success') }}</v-snackbar>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    'ProofEditDialog': defineAsyncComponent(() => import('../components/ProofEditDialog.vue')),
    'ProofDeleteConfirmationDialog': defineAsyncComponent(() => import('../components/ProofDeleteConfirmationDialog.vue'))
  },
  props: {
    'proof': null,
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
  computed: {
    proofIsReceipt() {
      return this.proof.type === 'RECEIPT'
    },
    userCanDeleteProof() {
      // user must be proof owner
      // and proof must not have any prices
      return this.proof.price_count === 0
    },
  },
  methods: {
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
