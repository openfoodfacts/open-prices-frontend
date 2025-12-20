<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col cols="12">
          <!-- RECEIPT: warning message -->
          <ProofReceiptWarningAlert v-if="proofIsTypeReceipt" class="mb-4" />

          <!-- Selection menu -->
          <v-menu scroll-strategy="close" :disabled="loading">
            <template #activator="{ props }">
              <v-btn v-bind="props" class="text-body-2" block spaced="end" prepend-icon="mdi-image" append-icon="mdi-menu-down" :class="hasProofImageSelected ? 'border-success' : 'border-error'">
                <span v-if="hasProofImageSelected">{{ $t('Common.PictureSelectedCount', { count: proofImagePreviewList.length }) }}</span>
                <span v-else-if="multiple">{{ $t('Common.PictureSelectMultiple') }}</span>
                <span v-else>{{ $t('Common.PictureSelect') }}</span>
              </v-btn>
            </template>
            <v-list>
              <v-list-item :slim="true" prepend-icon="mdi-camera" @click.prevent="$refs.proofCamera.click()">
                <span class="d-sm-none">{{ $t('AddPriceSingle.PriceDetails.Picture') }}</span>
                <span class="d-none d-sm-inline-flex">{{ $t('AddPriceSingle.PriceDetails.TakePicture') }}</span>
              </v-list-item>
              <v-divider class="mt-2 mb-2" />
              <v-list-item :slim="true" prepend-icon="mdi-image-plus" @click.prevent="$refs.proofGallery.click()">
                <span class="d-sm-none">{{ $t('AddPriceSingle.PriceDetails.Gallery') }}</span>
                <span class="d-none d-sm-inline-flex">{{ $t('AddPriceSingle.PriceDetails.SelectFromGallery') }}</span>
              </v-list-item>
              <v-divider v-if="!hideRecentProofChoice" class="mt-2 mb-2" />
              <v-list-item v-if="!hideRecentProofChoice" :slim="true" prepend-icon="mdi-receipt-text-clock" @click="userRecentProofsDialog = true">
                <span class="d-sm-none">{{ $t('AddPriceSingle.PriceDetails.RecentProof') }}</span>
                <span class="d-none d-sm-inline-flex">{{ $t('AddPriceSingle.PriceDetails.SelectRecentProof') }}</span>
              </v-list-item>
            </v-list>
          </v-menu>

          <!-- Hidden inputs -->
          <v-file-input
            ref="proofCamera" v-model="proofImageList" class="d-none overflow-hidden" capture="environment" accept="image/*"
            :multiple="multiple" :loading="loading" @click:clear="clearProof"
          />
          <v-file-input
            ref="proofGallery" v-model="proofImageList" class="d-none overflow-hidden" accept="image/*, .heic"
            :multiple="multiple" :loading="loading" @click:clear="clearProof"
          />
        </v-col>
      </v-row>

      <v-row v-if="showProofImagePreviewList" class="mt-0">
        <v-col v-for="(proofImagePreview, index) in proofImagePreviewList" :key="proofImagePreview" cols="6">
          <v-card class="d-flex flex-column" height="100%">
            <v-card-text class="flex-grow-1 pa-2">
              <v-img :src="proofImagePreview" max-height="200px" />
            </v-card-text>
            <v-divider />
            <v-card-actions>
              <v-btn v-if="!$vuetify.display.smAndUp" color="error" variant="outlined" icon="mdi-delete" size="small" density="comfortable" :aria-label="$t('Common.Delete')" @click="removeImage(index)" />
              <v-btn
                v-else
                color="error"
                variant="outlined"
                prepend-icon="mdi-delete"
                size="small"
                @click="removeImage(index)"
              >
                {{ $t('Common.Delete') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <UserRecentProofsDialog
        v-if="userRecentProofsDialog"
        v-model="userRecentProofsDialog"
        :typePriceTagOnly="typePriceTagOnly"
        :typeReceiptOnly="typeReceiptOnly"
        @recentProofSelected="recentProofSelected($event)"
        @close="userRecentProofsDialog = false"
      />
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'
import proof_utils from '../utils/proof.js'

export default {
  components: {
    ProofReceiptWarningAlert: defineAsyncComponent(() => import('../components/ProofReceiptWarningAlert.vue')),
    UserRecentProofsDialog: defineAsyncComponent(() => import('../components/UserRecentProofsDialog.vue')),
  },
  props: {
    proofImageForm: {
      type: Object,
      default: () => ({
        type: null,
        proof_id: null
      })
    },
    typePriceTagOnly: {
      type: Boolean,
      default: false
    },
    typeReceiptOnly: {
      type: Boolean,
      default: false
    },
    hideRecentProofChoice: {
      type: Boolean,
      default: false
    },
    hideProofImagePreview: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  emits: ['proofList'],
  data() {
    return {
      PROOF_TYPE_RECEIPT: constants.PROOF_TYPE_RECEIPT,
      // data
      proofImageList: [],
      proofImagePreviewList: [],
      userRecentProofsDialog: false,
      loading: false
    }
  },
  computed: {
    proofTypeFormFilled() {
      return !!this.proofImageForm.type
    },
    proofIsTypePriceTag() {
      return this.proofTypeFormFilled && (this.proofImageForm.type === constants.PROOF_TYPE_PRICE_TAG)
    },
    proofIsTypeReceipt() {
      return this.proofTypeFormFilled && (this.proofImageForm.type === constants.PROOF_TYPE_RECEIPT)
    },
    hasProofImageSelected() {
      return Array.isArray(this.proofImageList) ? this.proofImageList.length : !!this.proofImageList
    },
    showProofImagePreviewList() {
      return !this.hideProofImagePreview && this.proofImagePreviewList.length
    }
  },
  watch: {
    proofImageList: {
      handler(newProofImageList, oldProofImageList) {  // eslint-disable-line no-unused-vars
        // v-file-input returns an object (single) or an array (multiple)
        if (!Array.isArray(newProofImageList)) {
          newProofImageList = [newProofImageList]
        }
        this.proofImagePreviewList = newProofImageList.map(proofImage => this.getLocalProofUrl(proofImage))
        this.$emit('proofList', newProofImageList)
      },
      // deep: true
    }
  },
  methods: {
    recentProofSelected(proof) {
      this.proofImageList = [proof]
    },
    removeImage(index) {
      if (!Array.isArray(this.proofImageList)) {
        // Only one proof was selected with v-file-input, so we clear everything
        this.clearProof()
      } else {
        this.proofImageList.splice(index, 1)
        this.proofImagePreviewList.splice(index, 1)
        this.$emit('proofList', this.proofImageList)
      }
    },
    clearProof() {
      this.proofImageList = []
      this.proofImagePreviewList = []
      this.proofImageForm.proof_id = null
    },
    getLocalProofUrl(blob) {
      if (blob.image_thumb_path) {
        return proof_utils.getImageFullUrl(blob.image_thumb_path)
      }
      return URL.createObjectURL(blob)
    }
  }
}
</script>
