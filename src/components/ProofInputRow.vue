<template>
  <v-row>
    <!-- FORM -->
    <v-col v-if="!proofObjectList.length" cols="12">
      <ProofTypeInputRow :proofTypeForm="proofForm" />
      <ProofImageInputRow :proofImageForm="proofForm" :hideRecentProofChoice="hideRecentProofChoice" :multiple="multiple" @proofList="proofImageList = $event" />
      <LocationInputRow :locationForm="proofForm" />
      <ProofMetadataInputRow :proofMetadataForm="proofForm" :proofType="proofForm.type" />
      <v-row>
        <v-col>
          <v-btn
            class="float-right"
            color="success"
            :loading="loading"
            :disabled="!proofFormFilled || loading"
            @click="uploadProofList"
          >
            <span v-if="multiple">{{ $t('Common.UploadMultipleImages', proofImageList.length) }}</span>
            <span v-else>{{ $t('Common.Upload') }}</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <!-- CARD -->
    <v-col v-else>
      <ProofCard v-for="(proofObject, index) in proofObjectList" :key="index" :proof="proofObject" :hideProofHeader="true" :hideProofActions="true" :showImageThumb="proofCardShowImageThumb" :readonly="true" />
    </v-col>
  </v-row>

  <v-snackbar
    v-model="proofDateSuccessMessage"
    color="info"
    :timeout="2000"
  >
    {{ $t('AddPriceSingle.PriceDetails.ProofDateChanged') }}
  </v-snackbar>
  <v-snackbar
    v-model="proofSelectedSuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('AddPriceSingle.PriceDetails.ProofSelected') }}
  </v-snackbar>
  <v-snackbar
    v-model="proofSuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('AddPriceSingle.PriceDetails.ProofUploaded') }}
  </v-snackbar>
</template>

<script>
import Compressor from 'compressorjs'
import ExifReader from 'exifreader'
import { defineAsyncComponent } from 'vue'
import api from '../services/api'
import constants from '../constants'
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
    ProofTypeInputRow: defineAsyncComponent(() => import('../components/ProofTypeInputRow.vue')),
    ProofImageInputRow: defineAsyncComponent(() => import('../components/ProofImageInputRow.vue')),
    ProofMetadataInputRow: defineAsyncComponent(() => import('../components/ProofMetadataInputRow.vue')),
    ProofCard: defineAsyncComponent(() => import('../components/ProofCard.vue')),
    LocationInputRow: defineAsyncComponent(() => import('../components/LocationInputRow.vue')),
  },
  props: {
    proofForm: {
      type: Object,
      default: () => ({
        type: null,
        proof_id: null,
        location_id: null,
        location_osm_id: null,
        location_osm_type: null,
        date: utils.currentDate(),
        currency: null,
        receipt_price_count: null,
        receipt_price_total: null,
      })
    },
    hideRecentProofChoice: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  emits: ['proof'],
  data() {
    return {
      proofDateSuccessMessage: false,
      proofSelectedSuccessMessage: false,
      proofSuccessMessage: false,
      proofImageList: [],
      proofObjectList: [],
      loading: false,
    }
  },
  computed: {
    proofTypeFormFilled() {
      return !!this.proofForm.type
    },
    proofImageFormFilled() {
      return !!this.proofImageList.length
    },
    proofLocationFormFilled() {
      let keysOSM = ['location_osm_id', 'location_osm_type']
      let keysONLINE = ['location_id']
      return Object.keys(this.proofForm).filter(k => keysOSM.includes(k)).every(k => !!this.proofForm[k]) || Object.keys(this.proofForm).filter(k => keysONLINE.includes(k)).every(k => !!this.proofForm[k])
    },
    proofMetadataFormFilled() {
      let keys = ['date', 'currency']
      return Object.keys(this.proofForm).filter(k => keys.includes(k)).every(k => !!this.proofForm[k])
    },
    proofFormFilled() {
      return this.proofTypeFormFilled && this.proofImageFormFilled && this.proofLocationFormFilled && this.proofMetadataFormFilled
    },
    proofCardShowImageThumb() {
      return this.multiple ? true : false
    }
  },
  watch: {
    proofImageList(newProofImageList, oldProofImageList) {  // eslint-disable-line no-unused-vars
      this.handleProofSelectedList(newProofImageList)
    },
    proofObjectList(newProofObjectList, oldProofObjectList) {  // eslint-disable-line no-unused-vars
      // TODO: update to proofList?
      this.$emit('proof', newProofObjectList[0])
    }
  },
  methods: {
    handleProofSelectedList(proofSelectedList) {
      // can be an existing proof, or a file
      // existing proof: update proofForm + set proofObject
      if (proofSelectedList[0].id) {
        // update proofForm
        this.proofForm.type = proofSelectedList[0].type
        this.proofForm.proof_id = proofSelectedList[0].id
        if (proofSelectedList[0].location) {
          this.proofForm.location_id = proofSelectedList[0].location.id
          this.proofForm.location_osm_id = (proofSelectedList[0].location.type === constants.LOCATION_TYPE_OSM) ? proofSelectedList[0].location_osm_id : null
          this.proofForm.location_osm_type = (proofSelectedList[0].location.type === constants.LOCATION_TYPE_OSM) ? proofSelectedList[0].location_osm_type : ''
        }
        if (proofSelectedList[0].date) {
          this.proofForm.date = proofSelectedList[0].date
        }
        if (proofSelectedList[0].currency) {
          this.proofForm.currency = proofSelectedList[0].currency
        }
        // set proofObject
        this.proofSelectedSuccessMessage = true
        this.proofObjectList = [proofSelectedList[0]]
      }
      // new proof: extract exif data from file
      else {
        ExifReader.load(proofSelectedList[0]).then((tags) => {
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
    uploadProofList() {
      for (let proofImage of this.proofImageList) {
        this.uploadProof(proofImage)
      }
    },
    uploadProof(proofImage) {
      this.loading = true
      new Promise((resolve, reject) => {
        new Compressor(proofImage, {
          success: resolve,
          error: reject
        })
      })
      .then((proofImageCompressed) => {
        api
          .createProof(proofImageCompressed, this.proofForm, this.$route.path)
          .then((data) => {
            this.loading = false
            if (data.id) {
              this.proofForm.proof_id = data.id
              this.proofForm.location_id = data.location_id
              this.proofObjectList = this.proofObjectList.concat(data)
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
  }
}
</script>
