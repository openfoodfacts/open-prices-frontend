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
        <NewChip v-if="isNew" />
        <EndingSoonChip v-else-if="isEndingSoon" />
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
import { defineAsyncComponent } from 'vue'
import constants from '../constants'

export default {
  components: {
    NewChip: defineAsyncComponent(() => import('./NewChip.vue')),
    EndingSoonChip: defineAsyncComponent(() => import('./EndingSoonChip.vue')),
  },
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
    isNew() {
      // a challenge usually lasts 1 month
      // new = first 7 days of the challenge
      const today = new Date()
      const startDate = new Date(this.challenge.start_date)
      const sevenDaysFromStartDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000)
      return today <= sevenDaysFromStartDate
    },
    isEndingSoon() {
      // a challenge usually lasts 1 month
      // ending soon = last 7 days of the challenge
      const today = new Date()
      const endDate = new Date(this.challenge.end_date)
      const sevenDaysBeforeEndDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000)
      return today >= sevenDaysBeforeEndDate
    },
    getUrl() {
      return `/challenge`
    }
  }
}
</script>
