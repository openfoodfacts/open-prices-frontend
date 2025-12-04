<template>
  <v-btn v-bind="$attrs" :style="style" icon size="small" density="comfortable" variant="text">
    <v-icon :icon="ACTION_MENU_ICON" />
    <v-menu activator="parent" scroll-strategy="close" transition="slide-y-transition">
      <v-list>
        <!-- Proof actions -->
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
        <v-sheet v-if="userCanEditProof">
          <v-list-item :slim="true" prepend-icon="mdi-pencil" :disabled="!proofCanBeEdited" @click="openEditDialog">
            {{ $t('Common.Edit') }}
          </v-list-item>
          <v-list-item :slim="true" prepend-icon="mdi-delete" :disabled="!proofCanBeDeleted" @click="openDeleteConfirmationDialog">
            {{ $t('Common.Delete') }}
          </v-list-item>
          <!-- Moderation -->
          <v-sheet v-if="userIsLoggedIn">
            <v-list-subheader class="text-uppercase" :slim="true" disabled>
              {{ $t('Common.Moderation') }}
            </v-list-subheader>
            <v-divider />
            <v-list-item :slim="true" prepend-icon="mdi-flag" @click="moderationFlagCreateDialog = true">
              {{ $t('Common.ReportProblem') }}
            </v-list-item>
          </v-sheet>
        </v-sheet>
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

  <ModerationFlagCreateDialog
    v-if="moderationFlagCreateDialog"
    v-model="moderationFlagCreateDialog"
    :proof="proof"
    @flag="showModerationFlagSuccessMessage = true"
    @close="moderationFlagCreateDialog = false"
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
  <v-snackbar
    v-model="showModerationFlagSuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('Common.ModerationFlagCreateSuccess') }}
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
    ProofDeleteConfirmationDialog: defineAsyncComponent(() => import('../components/ProofDeleteConfirmationDialog.vue')),
    ModerationFlagCreateDialog: defineAsyncComponent(() => import('../components/ModerationFlagCreateDialog.vue'))
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
      deleteSuccessMessage: false,
      moderationFlagCreateDialog: false,
      showModerationFlagSuccessMessage: false
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    proofIsTypePriceTag() {
      return this.proof && (this.proof.type === constants.PROOF_TYPE_PRICE_TAG)
    },
    proofIsTypeReceipt() {
      return this.proof && (this.proof.type === constants.PROOF_TYPE_RECEIPT)
    },
    getProofImageFullUrl() {
      return proof_utils.getImageFullUrl(this.proof.file_path)
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
    userIsLoggedIn() {
      return !!this.username
    },
    userIsProofOwner() {
      return this.userIsLoggedIn && this.proof && (this.proof.owner === this.username)
    },
    userCanAddPrice() {
      return this.proof && this.userIsProofOwner && constants.PROOF_TYPE_USER_EDITABLE_LIST.includes(this.proof.type)
    },
    userIsModerator() {
      return this.userIsLoggedIn && this.appStore.user.is_moderator
    },
    userCanEditProof() {
      return this.userIsProofOwner || this.userIsModerator
    },
    proofCanBeEdited() {
      // only allow edition of certain proof types
      return constants.PROOF_TYPE_USER_EDITABLE_LIST.includes(this.proof.type)
    },
    proofCanBeDeleted() {
      // only allow deletion of proofs without prices
      return this.proof.price_count === 0
    }
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
