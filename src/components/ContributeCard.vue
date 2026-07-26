<template>
  <v-card :to="contribute.url">
    <v-img v-if="contribute.background_image_url" :src="contribute.background_image_url" height="200px" cover />
    <v-card-title>{{ contribute.name }}</v-card-title>
    <v-card-text>{{ contribute.description }}</v-card-text>
    <v-card-text>
      <v-chip v-if="contribute.community" class="mr-1" density="comfortable" prepend-icon="mdi-account-group">
        {{ $t('Common.Community') }}
      </v-chip>
      <v-chip v-if="contribute.experiment" density="comfortable" :prepend-icon="EXPERIMENTS_ICON">
        {{ $t('Common.Experiment') }}
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
import constants from '../constants'

export default {
  props: {
    contribute: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      EXPERIMENTS_ICON: constants.EXPERIMENTS_ICON
    }
  }
}
</script>
