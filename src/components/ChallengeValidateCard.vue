<template>
  <v-card
    class="d-flex flex-column"
    :title="$t('Challenge.StepValidate.Title')"
    prepend-icon="mdi-checkbox-marked-circle-plus-outline"
  >
    <v-divider />
    <v-card-text class="flex-grow-1 pb-0">
      <p class="mb-2">
        {{ $t('Challenge.StepValidate.line1') }}
      </p>
      <p class="mb-2">
        {{ $t('Challenge.StepValidate.line2') }}
      </p>
      <p class="mb-2">
        {{ $t('Challenge.StepValidate.line3') }}
      </p>
      <p class="mb-2">
        {{ $t('Challenge.StepValidate.line4') }}
      </p>
    </v-card-text>
    <v-card-text class="flex-grow-0">
      <v-row>
        <v-col cols="6">
          <StatCard :value="challenge.numberOfContributions" :subtitle="statSubtitlePriceCount" />
        </v-col>
        <v-col cols="6">
          <StatCard :value="challenge.userContributions" :subtitle="statSubtitlePriceOwnerCount" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-spacer v-if="$vuetify.display.smAndUp" />
      <v-btn
        color="primary"
        variant="flat"
        :block="!$vuetify.display.smAndUp"
        prepend-icon="mdi-checkbox-marked-circle-plus-outline"
        to="/experiments/price-validation-assistant"
      >
        {{ $t('Common.ValidatePrices') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    StatCard: defineAsyncComponent(() => import('../components/StatCard.vue')),
  },
  props: {
    challenge: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    statSubtitlePriceCount() {
      return this.$vuetify.display.smAndUp ? this.$t('Challenge.PricesAdded', { challenge_title: this.challenge.title }) : this.$t('Challenge.Prices', { challenge_title: this.challenge.title })
    },
    statSubtitlePriceOwnerCount() {
      return this.$vuetify.display.smAndUp ? this.$t('Challenge.PricesAddedByYou', { challenge_title: this.challenge.title }) : this.$t('Challenge.PricesByYou', { challenge_title: this.challenge.title })
    }
  }
}
</script>
