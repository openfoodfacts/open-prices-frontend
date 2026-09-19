<template>
  <v-card :to="contribute.url">
    <div class="d-flex justify-space-between">
      <div>
        <v-card-text class="text-h6">
          {{ contribute.name }}
        </v-card-text>
        <v-card-text v-if="contribute.community">
          <v-chip v-if="contribute.community" class="mr-1" density="comfortable" prepend-icon="mdi-account-group">
            {{ $t('Common.Community') }}
          </v-chip>
        </v-card-text>
      </div>
      <v-avatar class="ma-3" rounded="0" size="160">
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
