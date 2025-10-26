<template>
  <v-card
    v-if="step !== 3"
    height="100%"
  >
    <template v-if="!hideHeader" #title>
      {{ cardTitle }}
    </template>
    <template v-if="!hideHeader" #prepend>
      <v-icon>{{ cardPrependIcon }}</v-icon>
    </template>
    <v-divider v-if="!hideHeader" />
    <v-card-text>
      <v-sheet v-if="step === 1">
        <ProofTypeInputRow :proofTypeForm="proofForm" :typePriceTagOnly="typePriceTagOnly" :typeReceiptOnly="typeReceiptOnly" />
        <v-alert
          v-if="typePriceTagOnly && multiple"
          class="mt-4 mb-4"
          type="warning"
          variant="outlined"
          density="compact"
          :text="$t('ProofAdd.HowToMultipleShort')"
        />
        <ProofPriceTagAddMultiplePromoBanner v-if="proofIsTypePriceTag && !multiple" class="mt-4 mb-4" />
        <ReceiptAssistantPromoBanner v-if="proofIsTypeReceipt && !assistedByAI" class="mt-4 mb-4" />
        <LocationInputRow :locationForm="proofForm" @location="locationObject = $event" />
        <ProofImageInputRow :proofImageForm="proofForm" :typePriceTagOnly="typePriceTagOnly" :typeReceiptOnly="typeReceiptOnly" :hideRecentProofChoice="hideRecentProofChoice" :multiple="multiple" @proofList="proofImageList = $event" />
        <ProofMetadataInputRow :proofMetadataForm="proofForm" :proofType="proofForm.type" :multiple="multiple" :assistedByAI="assistedByAI" :locationType="locationObject?.type" />
      </v-sheet>
      <v-sheet v-else-if="step === 2">
        <v-progress-linear
          v-model="proofObjectList.length"
          :max="proofImageList.length"
          :color="proofImageList.length === proofObjectList.length ? 'success' : 'primary'"
          height="25"
          :indeterminate="proofObjectList.length ? false : true"
          :striped="proofImageList.length !== proofObjectList.length"
          rounded
        />
      </v-sheet>
    </v-card-text>
    <v-divider v-if="step === 1" />
    <v-card-actions v-if="step === 1">
      <v-spacer v-if="$vuetify.display.smAndUp" />
      <v-btn
        class="float-right"
        color="primary"
        variant="flat"
        type="submit"
        :block="!$vuetify.display.smAndUp"
        :disabled="!proofFormFilled"
        @click="uploadProofList"
      >
        <span v-if="multiple && proofImageList.length">{{ $t('Common.UploadMultipleProofs', { count: proofImageList.length }) }}</span>
        <span v-else>{{ $t('Common.Upload') }}</span>
      </v-btn>
    </v-card-actions>
  </v-card>

  <v-sheet v-else>
    <ProofCard v-for="(proofObject, index) in proofObjectList" :key="index" mode="Uploaded" :proof="proofObject" :hideActionMenuButton="true" :showImageThumb="proofCardShowImageThumb" :readonly="true" />
  </v-sheet>

  <v-snackbar
    v-model="proofDateSuccessMessage"
    color="primary"
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
</template>

<script>
import Compressor from 'compressorjs'
import ExifReader from 'exifreader'
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'
import constants from '../constants'
import date_utils from '../utils/date.js'

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
    ProofPriceTagAddMultiplePromoBanner: defineAsyncComponent(() => import('../components/ProofPriceTagAddMultiplePromoBanner.vue')),
    ReceiptAssistantPromoBanner: defineAsyncComponent(() => import('../components/ReceiptAssistantPromoBanner.vue')),
    LocationInputRow: defineAsyncComponent(() => import('../components/LocationInputRow.vue')),
    ProofImageInputRow: defineAsyncComponent(() => import('../components/ProofImageInputRow.vue')),
    ProofMetadataInputRow: defineAsyncComponent(() => import('../components/ProofMetadataInputRow.vue')),
    ProofCard: defineAsyncComponent(() => import('../components/ProofCard.vue')),
  },
  props: {
    hideHeader: {
      type: Boolean,
      default: false
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
    multiple: {
      type: Boolean,
      default: false
    },
    assistedByAI: {
      type: Boolean,
      default: false
    },
  },
  emits: ['proof', 'done'],
  data() {
    return {
      step: 1,  // 1: form; 2: uploading; 3: done
      // form
      proofForm: {
        type: null,  // see initProofForm
        location_id: null,
        location_osm_id: null,
        location_osm_type: '',
        date: date_utils.currentDate(),
        currency: null,  // see initProofForm
        receipt_price_count: null,
        receipt_price_total: null,
        receipt_online_delivery_costs: null,
        owner_consumption: true,  // will be ignored if type is not receipt
        owner_comment: null,
        ready_for_price_tag_validation: null,  // see initProofForm
        proof_id: null
      },
      // data
      locationObject: null,  // location selected
      proofDateSuccessMessage: false,
      proofSelectedSuccessMessage: false,
      proofSuccessMessage: false,
      proofImageList: [],  // images to upload
      proofObjectList: [],  // images uploaded
      loading: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    cardTitle() {
      return this.multiple ? this.$t('Common.Proofs') : this.$t('Common.Proof')
    },
    cardPrependIcon() {
      return this.multiple ? 'mdi-image-multiple' : 'mdi-image'
    },
    proofTypeFormFilled() {
      return !!this.proofForm.type
    },
    proofIsTypePriceTag() {
      return this.proofTypeFormFilled && (this.proofForm.type === constants.PROOF_TYPE_PRICE_TAG)
    },
    proofIsTypeReceipt() {
      return this.proofTypeFormFilled && (this.proofForm.type === constants.PROOF_TYPE_RECEIPT)
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
      this.handleProofImageList()
    },
    proofObjectList(newProofObjectList, oldProofObjectList) {  // eslint-disable-line no-unused-vars
      this.$emit('proof', newProofObjectList[0])
      if (this.proofObjectList.length === this.proofImageList.length) {
        this.step = 3
        this.$emit('done', this.proofObjectList.length)
      }
    },
    typePriceTagOnly(newTypePriceTagOnly, oldTypePriceTagOnly) {  // eslint-disable-line no-unused-vars
      this.initProofForm()
    },
    typeReceiptOnly(newTypeReceiptOnly, oldTypeReceiptOnly) {  // eslint-disable-line no-unused-vars
      this.initProofForm()
    }
  },
  mounted() {
    this.initProofForm()
  },
  methods: {
    initProofForm() {
      if (this.typePriceTagOnly) {
        this.proofForm.type = constants.PROOF_TYPE_PRICE_TAG
        if (this.multiple) {
          this.proofForm.ready_for_price_tag_validation = true
        }
      }
      if (this.typeReceiptOnly) {
        this.proofForm.type = constants.PROOF_TYPE_RECEIPT
      }
      this.proofForm.currency = this.appStore.getUserLastCurrencyUsed
    },
    handleProofImageList() {
      if (this.proofImageList.length === 0) {
        // The list was fully cleared, nothing to do
        return
      }
      // can be an existing proof, or a file
      // existing proof: update proofForm + set proofObject
      if (this.proofImageList[0].id) {
        // update proofForm
        this.proofForm.type = this.proofImageList[0].type
        this.proofForm.proof_id = this.proofImageList[0].id
        if (this.proofImageList[0].location) {
          this.proofForm.location_id = this.proofImageList[0].location.id
          this.proofForm.location_osm_id = (this.proofImageList[0].location.type === constants.LOCATION_TYPE_OSM) ? this.proofImageList[0].location_osm_id : null
          this.proofForm.location_osm_type = (this.proofImageList[0].location.type === constants.LOCATION_TYPE_OSM) ? this.proofImageList[0].location_osm_type : ''
        }
        if (this.proofImageList[0].date) {
          this.proofForm.date = this.proofImageList[0].date
        }
        if (this.proofImageList[0].currency) {
          this.proofForm.currency = this.proofImageList[0].currency
        }
        // set proofObject
        this.proofSelectedSuccessMessage = true
        this.proofObjectList = [this.proofImageList[0]]
      }
      // new proof: extract exif data from file
      else {
        ExifReader.load(this.proofImageList[0]).then((tags) => {
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
      this.step = 2
      // loop on images
      Promise.all(
        this.proofImageList.map(proofImage => this.uploadProof(proofImage))
      )
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
            } else {
              alert(`Error: ${JSON.stringify(data)}`)
              console.log(JSON.stringify(data))
            }
          })
          .catch((error) => {
            alert(`Error: ${JSON.stringify(error)}`)
            console.log(JSON.stringify(error))
            this.loading = false
          })
      })
      .catch((error) => {
        alert('Error: compression')
        console.log(JSON.stringify(error))
      })
      // .finally(() => {
      //   console.log('Compress complete')
      // })
    },
  }
}
</script>
