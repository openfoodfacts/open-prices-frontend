<template>
  <v-row>
    <v-col cols="8">
      <v-btn
        class="mb-2 mr-2" size="small" prepend-icon="mdi-camera" :loading="createProofLoading"
        :disabled="createProofLoading" @click.prevent="$refs.proofCamera.click()"
      >
        <span class="d-sm-none">{{ $t('AddPriceSingle.PriceDetails.Picture') }}</span>
        <span class="d-none d-sm-inline-flex">{{ $t('AddPriceSingle.PriceDetails.TakePicture') }}</span>
      </v-btn>
      <v-btn
        class="mb-2 mr-2" size="small" prepend-icon="mdi-image-plus" :loading="createProofLoading"
        :disabled="createProofLoading" @click.prevent="$refs.proofGallery.click()"
      >
        <span class="d-sm-none">{{ $t('AddPriceSingle.PriceDetails.Gallery') }}</span>
        <span class="d-none d-sm-inline-flex">{{ $t('AddPriceSingle.PriceDetails.SelectFromGallery') }}</span>
      </v-btn>
      <v-btn v-if="!hideRecentProofOption" class="mb-2" size="small" prepend-icon="mdi-receipt-text-clock" @click="showUserRecentProofsDialog">
        <span class="d-sm-none">{{ $t('AddPriceSingle.PriceDetails.RecentProof') }}</span>
        <span class="d-none d-sm-inline-flex">{{ $t('AddPriceSingle.PriceDetails.SelectRecentProof') }}</span>
      </v-btn>
      <v-file-input
        ref="proofCamera" v-model="proofImage" class="d-none overflow-hidden" capture="environment"
        accept="image/*" :loading="createProofLoading" @change="newProof('camera')" @click:clear="clearProof"
      />
      <v-file-input
        ref="proofGallery" v-model="proofImage" class="d-none overflow-hidden" accept="image/*, .heic"
        :loading="createProofLoading" @change="newProof('gallery')" @click:clear="clearProof"
      />
      <p v-if="proofFormFilled && !createProofLoading" class="text-green mt-2 mb-2">
        <i v-if="!proofisSelected">{{ $t('AddPriceSingle.PriceDetails.ProofUploaded') }}</i>
        <i v-if="proofisSelected">{{ $t('AddPriceSingle.PriceDetails.ProofSelected') }}</i>
      </p>
      <p v-if="!proofFormFilled && !createProofLoading" class="text-red mt-2 mb-2">
        <i>{{ $t('AddPriceSingle.PriceDetails.UploadProof') }}</i>
      </p>
    </v-col>
    <v-col v-if="proofFormFilled" cols="4">
      <v-img :src="proofImagePreview" style="max-height:200px" />
    </v-col>
  </v-row>
  <v-row v-if="proofType === 'RECEIPT'" class="mt-0">
    <v-col>
      <h3 class="mb-1">
        {{ $t('ProofDetail.Privacy') }}
      </h3>
      <p class="text-caption text-warning">
        <i>{{ $t('AddPriceMultiple.ProofDetails.ReceiptWarning') }}</i>
      </p>
    </v-col>
  </v-row>

  <v-snackbar
    v-model="proofSuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('AddPriceSingle.PriceDetails.ProofUploaded') }}
  </v-snackbar>
  <v-snackbar
    v-model="proofSelectedSuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('AddPriceSingle.PriceDetails.ProofSelected') }}
  </v-snackbar>

  <UserRecentProofsDialog
    v-if="userRecentProofsDialog"
    v-model="userRecentProofsDialog"
    :filterType="proofType"
    @recentProofSelected="handleRecentProofSelected($event)"
    @close="userRecentProofsDialog = false"
  />
</template>

<script>
import Compressor from 'compressorjs'
import ExifReader from 'exifreader'
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'
import utils from '../utils.js'

Compressor.setDefaults({
  checkOrientation: true,  // default
  retainExif: true,
  // quality: 0.6,
  mimeType: 'image/webp',
  // maxWidth: 3000
})

export default {
  components: {
    UserRecentProofsDialog: defineAsyncComponent(() => import('../components/UserRecentProofsDialog.vue')),
  },
  props: {
    proofType: {
      type: String,
      default: null
    },
    proofForm: {
      type: Object,
      default: () => ({ proof_id: null, date: utils.currentDate() })
    },
    hideRecentProofOption: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      proofImage: null,
      proofImagePreview: null,
      createProofLoading: false,
      proofDateSuccessMessage: false,
      proofSuccessMessage: false,
      userRecentProofsDialog: false,
      proofSelectedSuccessMessage: false,
      proofisSelected: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    proofFormFilled() {
      let keys = ['proof_id']
      return Object.keys(this.proofForm).filter(k => keys.includes(k)).every(k => !!this.proofForm[k])
    },
  },
  mounted() {
    if (this.$route.query.proof_id) {
      this.getProofById(this.$route.query.proof_id)
    }
  },
  methods: {
    showUserRecentProofsDialog() {
      this.userRecentProofsDialog = true
    },
    handleRecentProofSelected(selectedProof) {
      this.proofForm.proof_id = selectedProof.id
      this.proofImagePreview = this.getProofUrl(selectedProof)
      if (selectedProof.date) {
        this.proofForm.date = selectedProof.date
        this.proofDateSuccessMessage = true
      }
      this.proofSelectedSuccessMessage = true
      this.proofisSelected = true
    },
    getProofById(proofId) {
      this.createProofLoading = true
      api.getProofById(proofId)
        .then(proof => {
          this.handleRecentProofSelected(proof)
          this.createProofLoading = false
        })
    },
    getProofUrl(proof) {
      // return 'https://prices.openfoodfacts.org/img/0002/qU59gK8PQw.webp'
      return `${import.meta.env.VITE_OPEN_PRICES_APP_URL}/img/${proof.file_path}`
    },
    newProof(source) {
      if (source === 'gallery') {
        ExifReader.load(this.proofImage[0]).then((tags) => {
          if (tags['DateTimeOriginal'] && tags['DateTimeOriginal'].description) {
            // exif DateTimeOriginal format: '2024:01:31 20:23:52'
            const imageDateString = tags['DateTimeOriginal'].description.substring(0, 10).replaceAll(':', '-')
            if (imageDateString !== this.proofForm.date) {
              this.proofForm.date = imageDateString
              this.proofDateSuccessMessage = true
            }
          }
        })
      }
      this.uploadProof()
    },
    uploadProof() {
      this.createProofLoading = true
      new Promise((resolve, reject) => {
        new Compressor(this.proofImage[0], {
          success: resolve,
          error: reject
        })
      })
      .then((proofImageCompressed) => {
        api
          .createProof(proofImageCompressed, this.proofType)  // this.proofForm.date
          .then((data) => {
            this.createProofLoading = false
            if (data.id) {
              const store = useAppStore()
              store.addProof(data)
              this.proofForm.proof_id = data.id
              this.proofImagePreview = this.getProofUrl(data)
              this.proofSuccessMessage = true
            } else {
              alert('Error: server error')
              console.log(data)
            }
          })
          .catch((error) => {
            alert('Error: server error')
            console.log(error)
            this.createProofLoading = false
          })
      })
      .catch((error) => {
        alert('Error: compression')
        console.log(error)
      })
      // .finally(() => {
      //   console.log('Compress complete')
      // })
    },
    clearProof() {
      this.proofImage = null
      this.proofImagePreview = null
      this.proofForm.proof_id = null
    },
  }
}
</script>
