<template>
  <v-container>
    <v-alert v-if="drawCanvasLoaded && !boundingBoxesFromServer.length && !proofWithBoundingBoxesLoading" class="mb-2" type="info" variant="outlined" icon="mdi-alert">
      {{ $t('ContributionAssistant.BoundingBoxesFromServerWarning') }}
    </v-alert>
    <v-alert v-if="drawCanvasLoaded && proofWithBoundingBoxesLoading" class="mb-2" type="info" variant="outlined" icon="mdi-magnify">
      {{ $t('ContributionAssistant.FindBoundingBoxesRunning') }}
      <v-progress-circular indeterminate />
    </v-alert>
    <v-row>
      <v-col cols="12" lg="6">
        <h3 class="mb-4">
          {{ $t('ContributionAssistant.LabelsExtractionSteps.DrawBoundingBoxes') }}
        </h3>
        <v-progress-circular v-if="!drawCanvasLoaded" indeterminate />
        <ContributionAssistantDrawCanvas ref="ContributionAssistantDrawCanvas" :key="proofId" :image="image" :boundingBoxesFromServer="boundingBoxesFromServer" @extractedLabels="onExtractedLabels($event)" @loaded="drawCanvasLoaded = true" />
      </v-col>
      <v-col cols="12" lg="6">
        <h3 class="mb-4">
          {{ $t('ContributionAssistant.LabelsExtractionSteps.CheckLabels') }}
        </h3>
        <ContributionAssistantLabelList :labels="extractedLabels" @removeLabel="removeLabel($event)" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { defineAsyncComponent } from 'vue'
import api from '../services/api'

export default {
  components: {
    ContributionAssistantDrawCanvas: defineAsyncComponent(() => import('../components/ContributionAssistantDrawCanvas.vue')),
    ContributionAssistantLabelList: defineAsyncComponent(() => import('../components/ContributionAssistantLabelList.vue')),
  },
  props: {
    proof: {
      type: Object,
      default: null
    },
  },
  emits: ['priceTags'],
  data() {
    return {
      drawCanvasLoaded: false,
      extractedLabels: [],
      image: new Image(),
      proofWithBoundingBoxesLoading: false,
      processLabelsLoading: false,
      priceTags: [],
    }
  },
  computed: {
    boundingBoxesFromServer() {
      return this.priceTags.map(priceTag => {
        return {boundingBox: priceTag.bounding_box, id: priceTag.id, status: priceTag.status}
      })
    }
  },
  mounted() {
    // A new proof was selected by the user, or loaded from the query param
    this.extractedLabels = []
    this.boundingBoxesFromServer = []
  
    // proof image
    const image = new Image()
    image.src = `${import.meta.env.VITE_OPEN_PRICES_APP_URL}/img/${this.proof.file_path}`
    image.crossOrigin = 'Anonymous'
    this.image = image

    this.proofWithBoundingBoxesLoading = true
    // Try to load any automatically detected price tags on proof upload
    this.loadPriceTagsWithPredictions(1, priceTags => {
      this.priceTags = priceTags
      this.proofWithBoundingBoxesLoading = false
    })
  },
  methods: {
    loadPriceTagsWithPredictions(minNumberOfPriceTagWithPredictions, callback) {
      // Call price tag API every 3 seconds until we have at least minNumberOfPriceTagWithPredictions, max 6 times
      // Question: callback vs Promise ? Neither are really used in the rest of the code base
      let tries = 0
      const load = () => {
        tries += 1
        if (tries > 5) {
          callback([])
          return
        }
        api.getPriceTags({proof_id: this.proof.id, size: 100}).then(data => {
          const validPriceTags = data.items.filter(priceTag => priceTag.status == 1 || priceTag.status == null)
          const numberOfPriceTagsWithPredictions = validPriceTags.filter(priceTag => priceTag.predictions.length).length
          if (numberOfPriceTagsWithPredictions >= minNumberOfPriceTagWithPredictions) {
            callback(validPriceTags)
          } else {
            setTimeout(load, 3000)
          }
        })
      }
      load()
    },
    onExtractedLabels(extractedLabels) {
      // Called every time a label is drawn on the canvas
      this.extractedLabels = extractedLabels
      let newLabelsAddedWithCanvas = extractedLabels.filter(label => !label.id)
      newLabelsAddedWithCanvas.forEach(label => {
        api.createPriceTag({
          bounding_box: label.boundingBox,
          proof_id: this.proof.id
        }).then(priceTag => {
          this.priceTags.push(priceTag)
        })
      })
    },
    removeLabel(index) {
      this.$refs.ContributionAssistantDrawCanvas.removeBoundingBox(index) // This will trigger onExtractedLabels event
    },
    handlePriceTags() {
      this.emit('priceTags', this.priceTags)
    }
  }
}
</script>