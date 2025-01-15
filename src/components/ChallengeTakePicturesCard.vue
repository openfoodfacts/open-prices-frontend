<template>
  <v-card v-if="exampleProofUrl">
    <v-card-title>
      {{ $t('Challenge.StepTakePictures.Title') }}
    </v-card-title>
    <v-card-text>
      <p class="mb-2">
        {{ $t('Challenge.StepTakePictures.line1') }}
      </p>
      <v-img :src="exampleProofUrl" style="max-height: 200px" />
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
        to="/proofs/add/multiple"
      >
        {{ $t('Challenge.StepTakePictures.AddPictures') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
  
<script>
export default {
  props: {
    exampleProofUrl: {
      type: String,
      default: () => {}
    }
  },
}
</script>
  