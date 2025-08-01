<template>
  <v-btn :style="style" icon size="small" density="comfortable" variant="text">
    <v-icon :icon="ACTION_MENU_ICON" />
    <v-menu activator="parent" scroll-strategy="close" transition="slide-y-transition">
      <v-list>
        <v-list-subheader class="text-uppercase" :slim="true" disabled>
          {{ $t('Common.Proof') }}
        </v-list-subheader>
        <v-divider />
        <PriceAddLink v-if="userIsProofOwner && proofIsTypePriceTag" :proofId="proof.id" display="list-item" target="contribution-assistant" :disabled="!userCanAddPrice" />
        <PriceAddLink v-else-if="userIsProofOwner && proofIsTypeReceipt" :proofId="proof.id" display="list-item" target="receipt-assistant" :disabled="!userCanAddPrice" />
        <PriceAddLink v-if="userIsProofOwner" :proofId="proof.id" display="list-item" :disabled="!userCanAddPrice" />
        <ShareLink v-if="showProofShare" :overrideUrl="getShareLinkUrl" display="list-item" />
        <v-list-item :slim="true" prepend-icon="mdi-eye-outline" :to="getProofDetailUrl">
          {{ $t('Common.Details') }}
        </v-list-item>
        <v-list-item :slim="true" prepend-icon="mdi-open-in-new" :href="getProofImageFullUrl" target="_blank">
          {{ $t('Common.PictureFull') }}
        </v-list-item>
        <v-list-item v-if="userIsProofOwner" :slim="true" prepend-icon="mdi-pencil" :disabled="!userCanEditProof" @click="openEditDialog">
          {{ $t('Common.Edit') }}
        </v-list-item>
        <v-list-item v-if="userIsProofOwner" :slim="true" prepend-icon="mdi-delete" :disabled="!userCanDeleteProof" @click="openDeleteConfirmationDialog">
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
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'
import proof_utils from '../utils/proof.js'

export default {
  components: {
    PriceAddLink: defineAsyncComponent(() => import('../components/PriceAddLink.vue')),
    ShareLink: defineAsyncComponent(() => import('../components/ShareLink.vue')),
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
      ACTION_MENU_ICON: constants.ACTION_MENU_ICON,
      // data
      editDialog: false,
      loading: false,
      // success messages
      editSuccessMessage: false,
      deleteConfirmationDialog: false,
      deleteSuccessMessage: false
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    userIsProofOwner() {
      return this.username && this.proof && (this.proof.owner === this.username)
    },
    proofIsTypePriceTag() {
      return this.proof && (this.proof.type === constants.PROOF_TYPE_PRICE_TAG)
    },
    proofIsTypeReceipt() {
      return this.proof && (this.proof.type === constants.PROOF_TYPE_RECEIPT)
    },
    getProofImageFullUrl() {
      return proof_utils.getProofImageFullUrl(this.proof)
    },
    getProofDetailUrl() {
      return `/proofs/${this.proof.id}`
    },
    showProofShare() {
      return this.$route.path === this.getProofDetailUrl
    },
    getShareLinkUrl() {
      return this.getProofDetailUrl
    },
    userCanAddPrice() {
      return this.proof && this.userIsProofOwner && constants.PROOF_TYPE_USER_EDITABLE_LIST.includes(this.proof.type)
    },
    userCanEditProof() {
      // user must be proof owner (already checked in parent component)
      // only allow edition of certain proof types
      return this.userIsProofOwner && constants.PROOF_TYPE_USER_EDITABLE_LIST.includes(this.proof.type)
    },
    userCanDeleteProof() {
      // user must be proof owner (already checked in parent component)
      // and proof must not have any prices
      return this.userIsProofOwner && this.proof.price_count === 0
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
