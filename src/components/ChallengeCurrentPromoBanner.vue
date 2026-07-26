<template>
  <v-banner
    class="border-grey"
    :icon="CHALLENGE_ICON"
    rounded
    density="compact"
    @click="$router.push(getUrl)"
  >
    <v-banner-text>
      <h3 class="text-h6 mb-1">
        {{ $t('Challenge.Title') }}
      </h3>
      <p>
        {{ $t('Challenge.Subtitle', {challenge_title: `${challenge.icon} ${challenge.title} ${challenge.icon}`, challenge_subtitle: challenge.subtitle}) }}
      </p>
    </v-banner-text>
    <v-spacer /><!-- needed to push v-banner-actions to the right on big screens -->
    <v-banner-actions>
      <v-btn icon="mdi-arrow-right" :aria-label="$t('Common.Join')" :to="getUrl" />
    </v-banner-actions>
  </v-banner>
</template>

<script>
import constants from '../constants'

export default {
  props: {
    challenge: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      CHALLENGE_ICON: constants.CHALLENGE_ICON,
    }
  },
  computed: {
    getUrl() {
      return `/challenge`
    }
  }
}
</script>
