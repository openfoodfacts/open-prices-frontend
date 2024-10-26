<template>
  <v-btn :style="style" icon size="small" density="comfortable" variant="text">
    <v-icon>mdi-dots-vertical</v-icon>
    <v-menu activator="parent" scroll-strategy="close" transition="slide-y-transition">
      <v-list>
        <v-list-subheader class="text-uppercase" :slim="true" disabled>
          {{ $t('Common.Proof') }}
        </v-list-subheader>
        <v-divider />
        <PriceAddLink :proofId="proof.id" display="list-item" :disabled="!userCanAddPrice" />
        <v-list-item :slim="true" prepend-icon="mdi-eye-outline" :to="getProofDetailUrl">
          {{ $t('Common.Details') }}
        </v-list-item>
        <v-list-item :slim="true" prepend-icon="mdi-open-in-new" :href="getProofFullUrl" target="_blank">
          {{ $t('Common.ImageFull') }}
        </v-list-item>
        <v-list-item :slim="true" prepend-icon="mdi-pencil" :disabled="!userCanEditProof" @click="openEditDialog">
          {{ $t('Common.Edit') }}
        </v-list-item>
        <v-list-item :slim="true" prepend-icon="mdi-delete" :disabled="!userCanDeleteProof" @click="openDeleteConfirmationDialog">
          {{ $t('Common.Delete') }}
        </v-list-item>
      </v-list>
    </v-menu>
  </v-btn>

  <ProofEditDialog
    v-if="editDialog"
    v-model="editDialog"
    :proof="proof"
    @update="showEditSuccessMessage"
    @close="closeEditDialog"
  />

  <ProofDeleteConfirmationDialog
    v-if="deleteConfirmationDialog"
    v-model="deleteConfirmationDialog"
    :proof="proof"
    @delete="showDeleteSuccessMessage"
    @close="closeDeleteConfirmationDialog"
  />

  <v-snackbar
    v-model="editSuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('ProofEdit.Success') }}
  </v-snackbar>
  <v-snackbar
    v-model="deleteSuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('ProofDelete.Success') }}
  </v-snackbar>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'

export default {
  components: {
    PriceAddLink: defineAsyncComponent(() => import('../components/PriceAddLink.vue')),
    ProofEditDialog: defineAsyncComponent(() => import('../components/ProofEditDialog.vue')),
    ProofDeleteConfirmationDialog: defineAsyncComponent(() => import('../components/ProofDeleteConfirmationDialog.vue'))
  },
  props: {
    proof: {
      type: Object,
      default: null
    },
    style: {
      type: String,
      default: 'position:absolute;bottom:6px;right:0;'
    }
  },
  data() {
    return {
      editDialog: false,
      loading: false,
      // success messages
      editSuccessMessage: false,
      deleteConfirmationDialog: false,
      deleteSuccessMessage: false
    }
  },
  computed: {
    getProofFullUrl() {
      // return 'https://prices.openfoodfacts.org/img/0002/qU59gK8PQw.webp'  // PRICE_TAG
      // return 'https://prices.openfoodfacts.net/img/0001/lZGFga9ZOT.webp'  // RECEIPT
      return `${import.meta.env.VITE_OPEN_PRICES_APP_URL}/img/${this.proof.file_path}`
    },
    getProofDetailUrl() {
      return `/proofs/${this.proof.id}`
    },
    userCanAddPrice() {
      return this.proof && constants.PROOF_TYPE_USER_EDITABLE_LIST.includes(this.proof.type)
    },
    userCanEditProof() {
      // user must be proof owner (already checked in parent component)
      // only allow edition of certain proof types
      return constants.PROOF_TYPE_USER_EDITABLE_LIST.includes(this.proof.type)
    },
    userCanDeleteProof() {
      // user must be proof owner (already checked in parent component)
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
