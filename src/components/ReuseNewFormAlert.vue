<template>
  <v-alert
    color="primary"
    variant="outlined"
    density="compact"
    icon="mdi-information"
  >
    <i18n-t keypath="Reuses.AlertNew" tag="span">
      <template #url>
        <a :href="APP_GITHUB_REUSE_DISCUSSION_URL" target="_blank" class="text-lowercase">{{ $t('Common.Here') }}</a>
      </template>
    </i18n-t>
  </v-alert>
</template>

<script>
import constants from '../constants'

export default {
  data() {
    return {
      APP_GITHUB_REUSE_DISCUSSION_URL: constants.APP_GITHUB_REUSE_DISCUSSION_URL,
    }
  }
}
</script>
