<template>
  <v-footer class="bg-grey-lighten-1" style="max-height: 20%">
    <v-row>
      <v-col cols="12" md="6" align="center">
        <i18n-t keypath="Footer.TagLine" tag="span">
          <template #name>{{ APP_NAME }}</template>
          <template #url>
            <a :href="OFF_URL" target="_blank">{{ OFF_NAME }}</a>
          </template>
        </i18n-t>
      </v-col>
      <v-col cols="12" md="6" align="center">
        <v-btn class="mx-2" variant="text" :href="OP_URL" target="_blank">{{ $t('Footer.About') }}</v-btn>
        <v-btn class="mx-2" variant="text" to="/stats">{{ $t('Footer.Stats') }}</v-btn>
        <v-btn class="mx-2" variant="text" :href="OP_FRONTEND_GITHUB_URL" target="_blank">Github</v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import constants from '../constants'

export default {
  data() {
    return {
      APP_NAME: constants.APP_NAME,
      OP_URL: constants.OP_URL,
      OP_FRONTEND_GITHUB_URL: constants.OP_FRONTEND_GITHUB_URL,
      OFF_NAME: constants.OFF_NAME,
      OFF_URL: constants.OFF_URL,
    }
  },
}
</script>
