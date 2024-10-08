<template>
  <v-row>
    <v-col cols="8">
      <h3 class="mb-1">
        {{ $t('Common.Image') }}
      </h3>
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
      <v-file-input
        ref="proofCamera" v-model="proofImage" class="d-none overflow-hidden" capture="environment"
        accept="image/*" :loading="loading" @update:modelValue="newProof('camera')" @click:clear="clearProof"
      />
      <v-file-input
        ref="proofGallery" v-model="proofImage" class="d-none overflow-hidden" accept="image/*, .heic"
        :loading="loading" @update:modelValue="newProof('gallery')" @click:clear="clearProof"
      />
      <p v-if="!loading" class="mt-2 mb-2">
        <i v-if="!proofImage" class="text-red">{{ $t('ProofCreate.SelectProof') }}</i>
        <i v-else class="text-green">{{ $t('ProofCreate.ProofSelected') }}</i>
      </p>
    </v-col>
    <v-col v-if="proofImagePreview" cols="4">
      <v-img :src="proofImagePreview" style="max-height:200px" />
    </v-col>
  </v-row>

  <!-- RECEIPT: warning message -->
  <v-row v-if="proofImageForm && proofImageForm.type === 'RECEIPT'" class="mt-0">
    <v-col>
      <h3 class="mb-1">
        {{ $t('ProofDetail.Privacy') }}
      </h3>
      <p class="text-caption text-warning">
        <i>{{ $t('AddPriceMultiple.ProofDetails.ReceiptWarning') }}</i>
      </p>
    </v-col>
  </v-row>

  <UserRecentProofsDialog
    v-if="userRecentProofsDialog"
    v-model="userRecentProofsDialog"
    :filterType="proofImageForm.type"
    @recentProofSelected="newProof('recent', $event)"
    @close="userRecentProofsDialog = false"
  />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import api from '../services/api'

export default {
  components: {
    UserRecentProofsDialog: defineAsyncComponent(() => import('../components/UserRecentProofsDialog.vue')),
  },
  props: {
    proofImageForm: {
      type: Object,
      default: () => ({ type: null, proof_id: null })
    },
    hideRecentProofChoice: {
      type: Boolean,
      default: false
    },
  },
  emits: ['proof'],
  data() {
    return {
      proofImage: null,
      proofImagePreview: null,
      userRecentProofsDialog: false,
      loading: false
    }
  },
  watch: {
    proofImage(newProofImage, oldProofImage) {  // eslint-disable-line no-unused-vars
      this.$emit('proof', newProofImage)
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
          this.newProof('recent', proof)
          this.loading = false
        })
    },
    newProof(source, proof=null) {
      if (source === 'recent') {
        this.proofImage = proof
      } else {
        this.proofImagePreview = this.getLocalProofUrl(this.proofImage)
      }
    },
    clearProof() {
      this.proofImage = null
      this.proofImagePreview = null
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
