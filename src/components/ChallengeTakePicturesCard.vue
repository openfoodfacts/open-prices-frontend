<template>
  <v-card v-if="challenge.exampleProofUrl">
    <v-card-title>
      {{ $t('Challenge.StepTakePictures.Title') }}
    </v-card-title>
    <v-card-text>
      <v-row class="mb-2">
        <v-col cols="12" sm="6">
          <StatCard :value="challenge.numberOfProofs" variant="outlined" :subtitle="$t('Common.PicturesAdded')" />
        </v-col>
        <v-col cols="12" sm="6">
          <StatCard :value="challenge.userProofContributions" variant="outlined" :subtitle="$t('Challenge.PicturesAddedByYou')" />
        </v-col>
      </v-row>
      <p class="mb-2">
        {{ $t('Challenge.StepTakePictures.line1') }}
      </p>
      <a :href="challenge.exampleProofUrl" target="_blank">
        <v-img :src="challenge.exampleProofUrl" style="max-height: 200px" />
      </a>
      <p class="mb-2 mt-2">
        {{ $t('Challenge.StepTakePictures.line2') }}
      </p>
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
}
</script>
  