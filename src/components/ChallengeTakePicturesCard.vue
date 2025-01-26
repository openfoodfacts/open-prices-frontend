<template>
  <v-card :title="$t('Challenge.StepTakePictures.Title')">
    <v-divider />
    <v-card-text class="pb-0">
      <p class="mb-2">
        {{ $t('Challenge.StepTakePictures.line1') }}
      </p>
      <a :href="challenge.exampleProofUrl" target="_blank">
        <v-img :src="challenge.exampleProofUrl" style="max-height: 200px" />
      </a>
      <p class="mb-2 mt-2">
        {{ $t('Challenge.StepTakePictures.line2') }}
      </p>
      <p class="mb-2">
        {{ $t('ProofAdd.HowToMultipleShort') }}
      </p>
    </v-card-text>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <StatCard :value="challenge.numberOfProofs" :subtitle="statSubtitleProofCount" />
        </v-col>
        <v-col cols="6">
          <StatCard :value="challenge.userProofContributions" :subtitle="statSubtitleProofOwnerCount" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-spacer v-if="$vuetify.display.smAndUp" />
      <v-btn
        color="primary"
        variant="flat"
        :block="!$vuetify.display.smAndUp"
        prepend-icon="mdi-image-plus"
        to="/proofs/add/multiple"
      >
        {{ $t('Challenge.StepTakePictures.AddPictures') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
  
<script>
import { defineAsyncComponent } from 'vue'
export default {
  components: {
    StatCard: defineAsyncComponent(() => import('../components/StatCard.vue')),
  },
  props: {
    challenge: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    statSubtitleProofCount() {
      return this.$vuetify.display.smAndUp ? this.$t('Common.PicturesAdded') : this.$t('Common.Pictures')
    },
    statSubtitleProofOwnerCount() {
      return this.$vuetify.display.smAndUp ? this.$t('Common.PicturesAddedByYou') : this.$t('Common.PicturesByYou')
    }
  }
}
</script>
  