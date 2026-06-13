<template>
  <v-banner
    icon="mdi-comment-quote-outline"
    bg-color="primary"
    rounded
    density="compact"
  >
    <v-banner-text>
      <i18n-t keypath="Surveys.HelpFeatures" tag="h3" class="text-h6 mb-1">
        <template #op_name>
          {{ APP_NAME }}
        </template>
      </i18n-t>
      <p>
        <a :href="survey.url" target="_blank">
          {{ $t(`Surveys.Survey${survey.name}`) }}
        </a>
      </p>
    </v-banner-text>
  </v-banner>
</template>

<script>
import constants from '../constants'

export default {
  props: {
    survey: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      APP_NAME: constants.APP_NAME,
    }
  }
}
</script>
