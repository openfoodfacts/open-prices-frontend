<template>
  <v-banner class="border-grey" rounded>
    <v-banner-text>
      <h3 class="text-h6 mb-1">
        {{ $t('Challenge.Title') }}
      </h3>
      <p>
        {{ $t('Challenge.Subtitle', {challenge_title: `${challenge.icon} ${challenge.title} ${challenge.icon}`, challenge_subtitle: challenge.subtitle}) }}
      </p>
    </v-banner-text>
    <template #actions>
      <v-btn
        color="primary"
        variant="flat"
        prepend-icon="mdi-trophy-variant"
        to="/experiments/challenge"
      >
        {{ $t('Common.Join') }}
      </v-btn>
    </template>
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
