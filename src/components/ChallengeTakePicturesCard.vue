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
    <v-card-actions>
      <v-row>
        <v-col>
          <v-btn 
            class="float-right"
            color="primary"
            variant="flat"
            to="/proofs/add/multiple"
          >
            {{ $t('Challenge.StepTakePictures.AddPictures') }}
          </v-btn>
        </v-col>
      </v-row>
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
  