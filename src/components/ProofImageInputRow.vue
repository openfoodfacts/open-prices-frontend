<template>
  <v-row>
    <v-col :cols="showProofImagePreviewList ? '8' : '12'">
      <h3 class="required mb-1">
        {{ $t('Common.Image') }}
      </h3>

      <!-- User buttons -->
      <v-btn
        class="mb-2 mr-2" size="small" prepend-icon="mdi-camera" :loading="loading"
        :disabled="loading" @click.prevent="$refs.proofCamera.click()"
      >
        <span class="d-sm-none">{{ $t('AddPriceSingle.PriceDetails.Picture') }}</span>
        <span class="d-none d-sm-inline-flex">{{ $t('AddPriceSingle.PriceDetails.TakePicture') }}</span>
      </v-btn>
      <v-btn
        class="mb-2 mr-2" size="small" prepend-icon="mdi-image-plus" :loading="loading"
        :disabled="loading" @click.prevent="$refs.proofGallery.click()"
      >
        <span class="d-sm-none">{{ $t('AddPriceSingle.PriceDetails.Gallery') }}</span>
        <span class="d-none d-sm-inline-flex">{{ $t('AddPriceSingle.PriceDetails.SelectFromGallery') }}</span>
      </v-btn>
      <v-btn
        v-if="!hideRecentProofChoice" class="mb-2" size="small" prepend-icon="mdi-receipt-text-clock" :loading="loading"
        :disabled="loading" @click="userRecentProofsDialog = true"
      >
        <span class="d-sm-none">{{ $t('AddPriceSingle.PriceDetails.RecentProof') }}</span>
        <span class="d-none d-sm-inline-flex">{{ $t('AddPriceSingle.PriceDetails.SelectRecentProof') }}</span>
      </v-btn>

      <!-- Hidden inputs -->
      <v-file-input
        ref="proofCamera" v-model="proofImageList" class="d-none overflow-hidden" capture="environment" accept="image/*"
        :multiple="multiple" :loading="loading" @click:clear="clearProof"
      />
      <v-file-input
        ref="proofGallery" v-model="proofImageList" class="d-none overflow-hidden" accept="image/*, .heic"
        :multiple="multiple" :loading="loading" @click:clear="clearProof"
      />

      <!-- pending or success message -->
      <p v-if="!loading" class="mb-2">
        <i v-if="!hasProofImageSelected" class="text-red">{{ $t('ProofCreate.SelectProof') }}</i>
        <i v-else class="text-green">{{ $t('ProofCreate.ProofSelected') }}</i>
      </p>

      <!-- RECEIPT: warning message -->
      <v-alert
        v-if="proofImageForm && proofImageForm.type === PROOF_TYPE_RECEIPT"
        type="warning"
        variant="outlined"
        density="compact"
        :text="$t('AddPriceMultiple.ProofDetails.ReceiptWarning')"
      />
    </v-col>
    <v-col v-if="showProofImagePreviewList" cols="4">
      <v-img v-for="proofImagePreview in proofImagePreviewList" :key="proofImagePreview" :src="proofImagePreview" style="padding:10px;max-height:200px" />
    </v-col>
  </v-row>

  <UserRecentProofsDialog
    v-if="userRecentProofsDialog"
    v-model="userRecentProofsDialog"
    :filterType="proofImageForm.type"
    @recentProofSelected="recentProofSelected($event)"
    @close="userRecentProofsDialog = false"
  />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import api from '../services/api'
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
    hasProofImageSelected() {
      return Array.isArray(this.proofImageList) ? this.proofImageList.length : !!this.proofImageList
    },
    showProofImagePreviewList() {
      return !this.hideProofImagePreview && this.proofImagePreviewList.length
    }
  },
  watch: {
    proofImageList(newProofImageList, oldProofImageList) {  // eslint-disable-line no-unused-vars
      // v-file-input returns an object (single) or an array (multiple)
      if (!Array.isArray(newProofImageList)) {
        newProofImageList = [newProofImageList]
      }
      this.proofImagePreviewList = newProofImageList.map(proofImage => this.getLocalProofUrl(proofImage))
      this.$emit('proofList', newProofImageList)
    }
  },
  mounted() {
    if (this.$route.query.proof_id) {
      this.getProofById(this.$route.query.proof_id)
    }
  },
  methods: {
    getProofById(proofId) {
      this.loading = true
      api.getProofById(proofId)
        .then(proof => {
          this.recentProofSelected(proof)
          this.loading = false
        })
    },
    recentProofSelected(proof) {
      this.proofImageList = [proof]
    },
    clearProof() {
      this.proofImageList = []
      this.proofImagePreviewList = []
      this.proofImageForm.proof_id = null
    },
    getLocalProofUrl(blob) {
      // return 'https://prices.openfoodfacts.org/img/0002/qU59gK8PQw.webp'  // PRICE_TAG
      // return 'https://prices.openfoodfacts.net/img/0001/lZGFga9ZOT.webp'  // RECEIPT
      return URL.createObjectURL(blob)
    }
  }
}
</script>
