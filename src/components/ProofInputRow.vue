<template>
  <v-row>
    <v-col v-if="!proofObject" cols="12">
      <!-- proof image -->
      <v-row>
        <v-col cols="8">
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
            ref="proofCamera" v-model="proofFormImage" class="d-none overflow-hidden" capture="environment"
            accept="image/*" :loading="loading" @update:modelValue="newProof('camera')" @click:clear="clearProof"
          />
          <v-file-input
            ref="proofGallery" v-model="proofFormImage" class="d-none overflow-hidden" accept="image/*, .heic"
            :loading="loading" @update:modelValue="newProof('gallery')" @click:clear="clearProof"
          />
          <p v-if="!loading" class="mt-2 mb-2">
            <i v-if="!proofFormImage" class="text-red">{{ $t('ProofCreate.SelectProof') }}</i>
            <i v-else class="text-green">{{ $t('ProofCreate.ProofSelected') }}</i>
          </p>
        </v-col>
        <v-col v-if="proofFormImagePreview" cols="4">
          <v-img :src="proofFormImagePreview" style="max-height:200px" />
        </v-col>
      </v-row>

      <!-- proof RECEIPT: warning message -->
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

      <LocationInputRow :locationForm="proofForm" @location="locationObject = $event" />

      <!-- proof date & currency -->
      <ProofDateCurrencyInputRow :proofDateCurrencyForm="proofForm" />

      <!-- proof upload button -->
      <v-row>
        <v-col>
          <v-btn color="success" :loading="loading" :disabled="!proofFormFilled || loading" @click="uploadProof">
            {{ $t('Common.Upload') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-col>

    <v-col v-else>
      <ProofCard :proof="proofObject" :hideProofHeader="true" :hideProofActions="true" :readonly="true" />
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
    ProofDateCurrencyInputRow: defineAsyncComponent(() => import('../components/ProofDateCurrencyInputRow.vue')),
    ProofCard: defineAsyncComponent(() => import('../components/ProofCard.vue')),
    LocationInputRow: defineAsyncComponent(() => import('../components/LocationInputRow.vue')),
  },
  props: {
    proofType: {
      type: String,
      default: null
    },
    proofForm: {
      type: Object,
      default: () => ({ proof_id: null, location_osm_id: null, location_osm_type: null, date: utils.currentDate(), currency: null })
    },
    hideRecentProofChoice: {
      type: Boolean,
      default: false
    },
  },
  emits: ['proof'],
  data() {
    return {
      proofFormImage: null,
      proofFormImagePreview: null,
      proofDateSuccessMessage: false,
      proofSuccessMessage: false,
      userRecentProofsDialog: false,
      proofSelectedSuccessMessage: false,
      proofObject: null,
      locationObject: null,
      loading: false,
    }
  },
  computed: {
    proofDateCurrencyFormFilled() {
      let keys = ['date', 'currency']
      return Object.keys(this.proofForm).filter(k => keys.includes(k)).every(k => !!this.proofForm[k])
    },
    proofFormFilled() {
      return !!this.proofFormImage && this.proofDateCurrencyFormFilled
    },
  },
  watch: {
    proofObject(newProofObject, oldProofObject) {  // eslint-disable-line no-unused-vars
      this.$emit('proof', newProofObject)
    }
  },
  mounted() {
    if (this.$route.query.proof_id) {
      this.getProofById(this.$route.query.proof_id)
    }
  },
  methods: {
    handleRecentProofSelected(selectedProof) {
      // update proofForm
      this.proofForm.proof_id = selectedProof.id
      if (selectedProof.location) {
        this.proofForm.location_osm_id = selectedProof.location_osm_id
        this.proofForm.location_osm_type = selectedProof.location_osm_type
      }
      if (selectedProof.date) {
        this.proofForm.date = selectedProof.date
      }
      if (selectedProof.currency) {
        this.proofForm.currency = selectedProof.currency
      }
      this.proofSelectedSuccessMessage = true
      // set proofObject
      this.proofObject = selectedProof
    },
    getProofById(proofId) {
      this.loading = true
      api.getProofById(proofId)
        .then(proof => {
          this.handleRecentProofSelected(proof)
          this.loading = false
        })
    },
    newProof(source) {
      this.proofFormImagePreview = this.getLocalProofUrl(this.proofFormImage)
      if (source === 'gallery') {
        // extract date from image exif
        ExifReader.load(this.proofFormImage).then((tags) => {
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
    },
    uploadProof() {
      this.loading = true
      new Promise((resolve, reject) => {
        new Compressor(this.proofFormImage, {
          success: resolve,
          error: reject
        })
      })
      .then((proofFormImageCompressed) => {
        api
          .createProof(proofFormImageCompressed, this.proofType, this.proofForm.location_osm_id, this.proofForm.location_osm_type, this.proofForm.date, this.proofForm.currency)
          .then((data) => {
            this.loading = false
            if (data.id) {
              this.proofForm.proof_id = data.id
              this.proofObject = {...data, ...{location: this.locationObject}}
              this.proofSuccessMessage = true
            } else {
              alert('Error: server error when creating proof')
              console.log(data)
            }
          })
          .catch((error) => {
            alert('Error: server error when creating proof')
            console.log(error)
            this.loading = false
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
      this.proofFormImage = null
      this.proofFormImagePreview = null
      this.proofForm.proof_id = null
      this.proofObject = null
    },
    getLocalProofUrl(blob) {
      // return 'https://prices.openfoodfacts.org/img/0002/qU59gK8PQw.webp'  // PRICE_TAG
      // return 'https://prices.openfoodfacts.net/img/0001/lZGFga9ZOT.webp'  // RECEIPT
      return URL.createObjectURL(blob)
    }
  }
}
</script>
