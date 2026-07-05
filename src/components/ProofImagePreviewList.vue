<template>
  <v-row class="mt-0">
    <v-col v-for="(proof, index) in proofObjectPreviewList" :key="proof" cols="6">
      <v-card class="d-flex flex-column" height="100%">
        <v-card-text class="flex-grow-1 pa-2">
          <v-img :src="proof.image_thumb_path || proof.image_placeholder" max-height="200px">
            <template v-if="proof.image_placeholder">
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular
                  color="grey-lighten-4"
                  indeterminate
                />
              </div>
            </template>
          </v-img>
        </v-card-text>
        <v-divider />
        <v-card-actions v-if="allProofsHaveBeenUploaded">
          <v-btn v-if="!$vuetify.display.smAndUp" color="error" variant="outlined" icon="mdi-delete" size="small" density="comfortable" :aria-label="$t('Common.Delete')" @click="removeProof(index)" />
          <v-btn
            v-else
            color="error"
            variant="outlined"
            prepend-icon="mdi-delete"
            size="small"
            @click="removeProof(index)"
          >
            {{ $t('Common.Delete') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import proof_utils from '../utils/proof.js'

export default {
  props: {
    proofObjectList: {
      type: Array,
      default: () => ([])
    },
  },
  emits: ['removeProof'],
  data() {
    return {
      proofObjectPreviewList: [],
    }
  },
  computed: {
    allProofsHaveBeenUploaded() {
      return this.proofObjectPreviewList.every(proof => proof.image_thumb_path)
    }
  },
  watch: {
    proofObjectList: {
      handler(newProofObjectList, oldProofObjectList) {  // eslint-disable-line no-unused-vars
        if (!this.proofObjectPreviewList.length) {
          this.proofObjectPreviewList = newProofObjectList.map(proof => {
            return {
              image_placeholder: URL.createObjectURL(proof.blob),
              localId: proof.localId
            }
          })
        } else {
          for (let i = 0; i < this.proofObjectPreviewList.length; i++) {
            const correspondingProof = newProofObjectList.find(proof => proof.localId === this.proofObjectPreviewList[i].localId)
            if (correspondingProof?.image_thumb_path) {
              this.proofObjectPreviewList[i] = {
                image_thumb_path: proof_utils.getImageFullUrl(correspondingProof.image_thumb_path),
                localId: correspondingProof.localId
              }
            }
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    removeProof(index) {
      const removedLocalId = this.proofObjectPreviewList[index].localId
      this.proofObjectPreviewList.splice(index, 1)
      this.$emit('removeProof', removedLocalId)
    }
  },
}
</script>
