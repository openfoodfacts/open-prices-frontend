<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col cols="12">
          <div class="text-body-2 required">
            <span v-if="multiple">{{ $t('Common.Pictures') }}</span>
            <span v-else>{{ $t('Common.Picture') }}</span>
          </div>

          <!-- Selection menu -->
          <v-menu scroll-strategy="close" :disabled="loading">
            <template #activator="{ props }">
              <v-btn v-bind="props" class="text-body-2" block spaced="end" prepend-icon="mdi-image" append-icon="mdi-menu-down" :class="hasProofImageSelected ? 'border-success' : 'border-error'">
                <span v-if="hasProofImageSelected">{{ $t('Common.PictureSelectedCount', { count: numberProofsSelected }) }}</span>
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

export default {
  components: {
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
    },
    numberProofsSelected: {
      type: Number,
      default: 0
    }
  },
  emits: ['proofList'],
  data() {
    return {
      PROOF_TYPE_RECEIPT: constants.PROOF_TYPE_RECEIPT,
      // data
      proofImageList: [],
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
      return this.numberProofsSelected > 0
    },
  },
  watch: {
    proofImageList: {
      handler(newProofImageList, oldProofImageList) {  // eslint-disable-line no-unused-vars
        // v-file-input returns an object (single) or an array (multiple)
        if (!Array.isArray(newProofImageList)) {
          newProofImageList = [newProofImageList]
        }
        this.$emit('proofList', newProofImageList)
      },
      // deep: true
    }
  },
  methods: {
    recentProofSelected(proof) {
      this.proofImageList = [proof]
    },
    clearProof() {
      this.proofImageList = []
      this.proofImageForm.proof_id = null
    },
  }
}
</script>
