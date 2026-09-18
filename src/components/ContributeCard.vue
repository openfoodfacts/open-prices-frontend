<template>
  <v-card :to="contribute.url">
    <div class="d-flex justify-space-between">
      <v-card-text class="text-h6">
        {{ contribute.name }}
      </v-card-text>
      <v-avatar class="ma-3" rounded="0" size="150">
        <v-img v-if="contribute.background_image_url" :src="contribute.background_image_url" height="200px" cover />
      </v-avatar>
    </div>
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
