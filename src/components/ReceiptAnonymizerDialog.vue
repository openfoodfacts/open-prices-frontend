<template>
  <v-dialog :height="dialogHeight" :width="dialogWidth">
    <v-row class="mt-0">
      <v-col>
        <v-card
          class="mb-4"
          :title="$t('ReceiptAnonymize.Title')"
          prepend-icon="mdi-image"
          height="100%"
        >
          <v-divider />
          <div v-if="step === 1">
            <v-card-text>
              <h2 class="text-h6">
                {{ $t('ReceiptAnonymize.WaitingForReceiptUpload') }}
              </h2>
              <v-progress-linear
                indeterminate
              />
            </v-card-text>
          </div>
          <div v-if="step === 2">
            <v-card-text>
              <h2 class="text-h6">
                {{ $t('ReceiptAnonymize.WaitingForAnonymizationPrediction') }}
              </h2>
              <v-progress-linear
                indeterminate
              />
            </v-card-text>
          </div>
          <div v-else-if="step === 3">
            <v-card-text>
              <h2 class="text-h6">
                {{ $t('ReceiptAnonymize.EditRedactBoxes') }}
              </h2>
              <VueZoomable v-if="proofImageSrc" v-model:zoom="zoomLevel" v-model:pan="panLevel" :maxZoom="10" :panEnabled="!imageEditMode" selector="#content">
                <div id="content" style="width: 100%;">
                  <ContributionAssistantDrawCanvas 
                    ref="ContributionAssistantDrawCanvas" 
                    :imageSrc="proofImageSrc" 
                    :boundingBoxesFromServer="boundingBoxesFromServer" 
                    :preventDrawing="!imageEditMode"
                    :removeMode="boxRemoveMode"
                    mode="Redact"
                    @extractedLabels="onProductImageDraw($event)" 
                  />
                </div>
              </VueZoomable>
            </v-card-text>
            <v-divider />
            <v-card-actions>
              <v-row>
                <v-col cols="6">
                  <v-switch
                    v-model="imageEditMode"
                    density="compact"
                    color="success"
                    :label="$t('ReceiptAnonymize.EnableBoxDrawMode')"
                    :true-value="true"
                    hide-details="auto"
                  />
                  <v-switch
                    v-model="boxRemoveMode"
                    density="compact"
                    color="success"
                    :label="$t('ReceiptAnonymize.EnableBoxRemoveMode')"
                    :true-value="true"
                    hide-details="auto"
                  />
                  <v-btn
                    color="primary"
                    variant="flat"
                    :loading="loading"
                    @click="save"
                  >
                    {{ $t('ReceiptAnonymize.Save') }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script>

import { defineAsyncComponent } from 'vue'
import Compressor from 'compressorjs'
import constants from '../constants'
import openPricesApi from '../services/openPricesApi'
import proof_utils from '../utils/proof.js'
import "vue-zoomable/dist/style.css"

export default {
  components: {
    ContributionAssistantDrawCanvas: defineAsyncComponent(() => import('../components/ContributionAssistantDrawCanvas.vue')),
    VueZoomable: defineAsyncComponent(() => import('vue-zoomable')),
  },
  props: {
    proofImage: {
      type: Object,
      default: () => ({

      })
    },
  },
  emits: ['done'],
  data() {
    return {
      step: 0,
      boundingBoxesFromServer: null,
      extractedBoundings: [],
      imageEditMode: false,
      boxRemoveMode: false,
      panLevel: {x: 0, y: 0},
      proofImageSrc: null,
      zoomLevel: 1,
      loading: false,
      draftProof: null
    }
  },
  computed: {
    dialogHeight() {
      return this.$vuetify.display.smAndUp ? '80%' : '100%'
    },
    dialogWidth() {
      return this.$vuetify.display.smAndUp ? '80%' : '100%'
    },
  },
  watch: {
    boxRemoveMode(newBoxRemoveMode, oldBoxRemoveMode) {  // eslint-disable-line no-unused-vars
      if (newBoxRemoveMode) {
        this.imageEditMode = false
      }
    },
    imageEditMode(newImageEditMode, oldImageEditMode) {  // eslint-disable-line no-unused-vars
      if (newImageEditMode) {
        this.boxRemoveMode = false
      }
    }
  },
  mounted() {
    if (this.proofImage) {
      this.proofImageSrc = proof_utils.getImageFullUrl(this.proofImage.file_path)
      this.step = 1
      this.uploadProofAsDraft(this.proofImage)
    }
  },
  methods: {
    compressProof(proofImage) {
      return new Promise((resolve, reject) => {
        new Compressor(proofImage, {
          success: resolve,
          error: reject
        })
      })
      .catch((error) => {
        alert('Error: compression')
        console.log(JSON.stringify(error))
      })
    },
    uploadProofAsDraft(proofImage) {
      this.loading = true
      this.compressProof(proofImage)
        .then((proofImageCompressed) => {
          openPricesApi
            .createDraftProof(proofImageCompressed, constants.PROOF_TYPE_RECEIPT)
            .then((data) => {
              this.loading = false
              if (data.id) {
                this.draftProof = data
                this.loadProofAnonymizationPrediction()
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
    },
    loadProofAnonymizationPrediction() {
      this.step = 2
      this.loading = true
      let tries = 0
      const maxTries = 5
      const load = () => {
        openPricesApi.getDraftProofById(this.draftProof.id).then(draftProof => {
          this.draftProof = draftProof
          this.proofImageSrc = proof_utils.getImageFullUrl(this.draftProof.file_path)
          const anonymizationPrediction = (draftProof?.predictions || []).find(prediction => prediction.type === "RECEIPT_ANONYMIZATION")
          if (anonymizationPrediction?.data?.words) {
            this.boundingBoxesFromServer = anonymizationPrediction.data.words.map(word => {
              return { boundingBox: [
                word.bounding_box[1], // y_min
                word.bounding_box[0], // x_min
                word.bounding_box[3], // y_max
                word.bounding_box[2], // x_max
              ]}
            })
            this.loading = false
            this.step = 3
          } else {
            tries += 1
            if (tries < maxTries) {
              setTimeout(load, 5000) 
            } else {
              this.boundingBoxesFromServer = []
              this.loading = false
              this.step = 3
            }
          }
        })
      }
      load()
    },
    onProductImageDraw(extractedBoundings) {
      this.extractedBoundings = extractedBoundings.map(extract => extract.redactBoundingBox)
    },
    save() {
      this.loading = true
      openPricesApi.anonymizeDraftProof(this.draftProof.id, this.extractedBoundings).then((response) => {  // eslint-disable-line no-unused-vars
        this.loading = false
        this.$emit('done', this.draftProof)
      })
    }
  },
}
</script>
