<template>
  <v-dialog :height="dialogHeight" :width="dialogWidth">
    <v-row class="mt-0">
      <v-col>
        <v-card
          class="mb-4"
          :title="$t('XXX.ReceiptAnonymize')"
          prepend-icon="mdi-image"
          height="100%"
        >
          <v-divider />
          <v-card-text>
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
                  :label="$t('XXX.EnableBoxDrawMode')"
                  :true-value="true"
                  hide-details="auto"
                />
                <v-switch
                  v-model="boxRemoveMode"
                  density="compact"
                  color="success"
                  :label="$t('XXX.EnableBoxRemoveMode')"
                  :true-value="true"
                  hide-details="auto"
                />
                <v-btn
                  color="primary"
                  variant="flat"
                  type="submit"
                  block
                  @click="save()"
                >
                  {{ $t('XXX.save') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script>

import { defineAsyncComponent } from 'vue'
import openPricesApi from '../services/openPricesApi'
import proof_utils from '../utils/proof.js'
import "vue-zoomable/dist/style.css"

export default {
  components: {
    ContributionAssistantDrawCanvas: defineAsyncComponent(() => import('../components/ContributionAssistantDrawCanvas.vue')),
    VueZoomable: defineAsyncComponent(() => import('vue-zoomable')),
  },
  props: {
    draftProof: {
      type: Object,
      default: () => ({

      })
    },
  },
  emits: ['done'],
  data() {
    return {
      boundingBoxesFromServer: null,
      extractedBoundings: [],
      imageEditMode: false,
      boxRemoveMode: false,
      panLevel: {x: 0, y: 0},
      proofImageSrc: null,
      zoomLevel: 1,
      proof: null
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
    this.proofImageSrc = proof_utils.getImageFullUrl(this.draftProof.file_path)
    this.loadProofAnonymizationPrediction()
  },
  methods: {
    loadProofAnonymizationPrediction() {
      let tries = 0
      const maxTries = 5
      const load = () => {
        openPricesApi.getDraftProofById(this.draftProof.id).then(proof => {
          this.proof = proof
          this.proofImageSrc = proof_utils.getImageFullUrl(this.proof.file_path)
          const anonymizationPrediction = (proof?.predictions || []).find(prediction => prediction.type === "RECEIPT_ANONYMIZATION")
          if (anonymizationPrediction?.data?.words) {
            this.boundingBoxesFromServer = anonymizationPrediction.data.words.map(word => {
              return { boundingBox: [
                word.bounding_box[1], // y_min
                word.bounding_box[0], // x_min
                word.bounding_box[3], // y_max
                word.bounding_box[2], // x_max
              ]}
            })
          } else {
            tries += 1
            if (tries < maxTries) {
              setTimeout(load, 5000) 
            } else {
              this.boundingBoxesFromServer = []
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
        this.$emit('done')
      })
    }
  },
}
</script>
