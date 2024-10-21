<template>
  <v-row>
    <!-- FORM -->
    <v-col v-if="!proofObject" cols="12">
      <ProofTypeInputRow :proofTypeForm="proofForm" />
      <ProofImageInputRow :proofImageForm="proofForm" :hideRecentProofChoice="hideRecentProofChoice" @proof="proofImage = $event" />
      <LocationInputRow :locationForm="proofForm" @location="locationObject = $event" />
      <ProofMetadataInputRow :proofType="proofForm.type" :proofMetadataForm="proofForm" />
      <v-row>
        <v-col>
          <v-btn color="success" :loading="loading" :disabled="!proofFormFilled || loading" @click="uploadProof">
            {{ $t('Common.Upload') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <!-- CARD -->
    <v-col v-else>
      <ProofCard :proof="proofObject" :hideProofHeader="true" :hideProofActions="true" :readonly="true" />
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
  },
  emits: ['proof'],
  data() {
    return {
      proofDateSuccessMessage: false,
      proofSelectedSuccessMessage: false,
      proofSuccessMessage: false,
      proofImage: null,
      locationObject: null,
      proofObject: null,
      loading: false,
    }
  },
  computed: {
    proofTypeFormFilled() {
      return !!this.proofForm.type
    },
    proofImageFormFilled() {
      return !!this.proofImage
    },
    proofMetadataFormFilled() {
      let keys = ['date', 'currency']
      return Object.keys(this.proofForm).filter(k => keys.includes(k)).every(k => !!this.proofForm[k])
    },
    proofFormFilled() {
      return this.proofTypeFormFilled && this.proofImageFormFilled && this.proofMetadataFormFilled
    },
  },
  watch: {
    proofImage(newProofImage, oldProofImage) {  // eslint-disable-line no-unused-vars
      this.handleProofSelected(newProofImage)
    },
    proofObject(newProofObject, oldProofObject) {  // eslint-disable-line no-unused-vars
      this.$emit('proof', newProofObject)
    }
  },
  methods: {
    handleProofSelected(proofSelected) {
      console.log('handleProofSelected', proofSelected)
      // can be an existing proof, or a file
      // existing proof: update proofForm
      if (proofSelected.id) {
        // update proofForm
        this.proofForm.type = proofSelected.type
        this.proofForm.proof_id = proofSelected.id
        if (proofSelected.location) {
          this.proofForm.location_id = proofSelected.location.id
          this.proofForm.location_osm_id = (proofSelected.location.type === 'OSM') ? proofSelected.location_osm_id : null
          this.proofForm.location_osm_type = (proofSelected.location.type === 'OSM') ? proofSelected.location_osm_type : ''
        }
        if (proofSelected.date) {
          this.proofForm.date = proofSelected.date
        }
        if (proofSelected.currency) {
          this.proofForm.currency = proofSelected.currency
        }
        // set proofObject
        this.proofSelectedSuccessMessage = true
        this.proofObject = proofSelected
      }
      // new proof: extract exif data from file
      else {
        ExifReader.load(proofSelected).then((tags) => {
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
      console.log(this.proofForm)
    },
    uploadProof() {
      this.loading = true
      new Promise((resolve, reject) => {
        new Compressor(this.proofImage, {
          success: resolve,
          error: reject
        })
      })
      .then((proofImageCompressed) => {
        console.log(this.proofForm)
        api
          .createProof(proofImageCompressed, this.proofForm.type, this.proofForm.location_osm_id, this.proofForm.location_osm_type, this.proofForm.date, this.proofForm.currency, this.proofForm.receipt_price_count, this.proofForm.receipt_price_total)
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
  }
}
</script>
