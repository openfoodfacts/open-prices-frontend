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
  data() {
    return {
      challenge: {
        title: "Nutella",
        icon: "🌰",
        subtitle: "(and other hazelnut spreads)",
        startDate: "2025-01-20",
        endDate: "2025-01-31",
        categories: ["en:hazelnut-spreads"],
        numberOfContributions: 0,
        latestContributions: [],
        numberOfProofs: 0,
        userContributions: 0,
        userProofContributions: 0,
        exampleProofUrl: "https://prices.openfoodfacts.org/img/0029/nCWeCVnpQJ.webp"
      },
    }
  }
}
</script>
