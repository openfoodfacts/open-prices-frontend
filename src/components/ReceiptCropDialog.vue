<template>
  <v-dialog :height="dialogHeight" :width="dialogWidth">
    <v-row class="mt-0">
      <v-col>
        <v-card
          class="mb-4"
          :title="$t('ReceiptCrop.Title')"
          prepend-icon="mdi-crop"
          height="100%"
        >
          <v-divider />
          <v-card-text>
            <h2 class="text-h6">
              {{ $t('ReceiptCrop.DrawCropArea') }}
            </h2>
            <VueZoomable v-if="proofImageSrc" v-model:zoom="zoomLevel" v-model:pan="panLevel" :maxZoom="10" :panEnabled="false" selector="#content">
              <div id="content" style="width: 100%;">
                <ContributionAssistantDrawCanvas
                  ref="ContributionAssistantDrawCanvas"
                  :imageSrc="proofImageSrc"
                  mode="Crop"
                  @extractedLabels="onCropDrawn($event)"
                />
              </div>
            </VueZoomable>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-btn
              color="primary"
              variant="flat"
              :loading="loading"
              @click="save"
            >
              {{ $t('ReceiptCrop.Save') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script>

import { defineAsyncComponent } from 'vue'
import "vue-zoomable/dist/style.css"

export default {
  components: {
    ContributionAssistantDrawCanvas: defineAsyncComponent(() => import('../components/ContributionAssistantDrawCanvas.vue')),
    VueZoomable: defineAsyncComponent(() => import('vue-zoomable')),
  },
  props: {
    proofImage: {
      type: File,
      required: true
    },
  },
  emits: ['done'],
  data() {
    return {
      proofImageSrc: null,
      croppedBlob: null,
      panLevel: {x: 0, y: 0},
      zoomLevel: 1,
      loading: false,
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
  mounted() {
    this.proofImageSrc = URL.createObjectURL(this.proofImage)
  },
  beforeUnmount() {
    URL.revokeObjectURL(this.proofImageSrc)
  },
  methods: {
    onCropDrawn(extractedCrops) {
      this.croppedBlob = extractedCrops.length ? extractedCrops[0].blob : null
    },
    save() {
      if (!this.croppedBlob) {
        // no crop area was drawn, keep the original picture
        this.$emit('done', this.proofImage)
        return
      }
      this.$emit('done', new File([this.croppedBlob], this.proofImage.name, { type: this.croppedBlob.type }))
    }
  },
}
</script>
