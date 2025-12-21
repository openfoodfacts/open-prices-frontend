<template>
  <v-banner
    class="border-grey"
    icon="mdi-trophy-variant"
    rounded
    density="compact"
    @click="$router.push('/experiments/challenge')"
  >
    <v-banner-text>
      <h3 class="text-h6 mb-1">
        {{ $t('Challenge.Title') }}
      </h3>
      <p>
        {{ $t('Challenge.Subtitle', {challenge_title: `${challenge.icon} ${challenge.title} ${challenge.icon}`, challenge_subtitle: challenge.subtitle}) }}
      </p>
    </v-banner-text>
    <v-banner-actions>
      <v-btn icon="mdi-arrow-right" :aria-label="$t('Common.Join')" to="/experiments/challenge" />
    </v-banner-actions>
  </v-banner>
</template>

<script>
export default {
  props: {
    challenge: {
      type: Object,
      default: () => ({}),
    }
  }
}
</script>
