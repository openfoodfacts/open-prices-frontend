<template>
  <h2 class="text-h6 mb-1">
    {{ $t('Community.JoinUs') }}
  </h2>

  <v-row>
    <v-col>
      <p><a :href="APP_GITHUB_BACKEND_URL" target="_blank">Github</a></p>
      <p><a :href="APP_HUGGING_FACE_URL" target="_blank">Open Food Facts Slack (#prices)</a></p>
    </v-col>
  </v-row>

  <br>

  <h2 class="text-h6 mb-1">
    {{ $t('Community.HowToUseTheData') }}
  </h2>

  <v-row>
    <v-col>
      <p><a :href="APP_API_URL" target="_blank">API</a></p>
      <p><a :href="APP_HUGGING_FACE_URL" target="_blank">Hugging Face</a></p>
      <p><a :href="APP_HUGGING_FACE_URL" target="_blank">data.gouv</a></p>
    </v-col>
  </v-row>

  <br>

  <h2 class="text-h6 mb-1">
    {{ $t('Common.ReusesKnown') }}
  </h2>
  <v-row>
    <v-col v-for="reuse in reusesList" :key="reuse.id" cols="12" sm="6" md="4" xl="3">
      <ReuseCard :reuse="reuse" />
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <v-alert
        class="mb-2"
        type="info"
        variant="outlined"
      >
        <i18n-t keypath="Reuses.AlertNew" tag="span">
          <template #url>
            <a :href="APP_GITHUB_REUSE_DISCUSSION_URL" target="_blank">{{ $t('Reuses.Here') }}</a>
          </template>
        </i18n-t>
      </v-alert>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import Reuses from '../data/reuses.json'
import constants from '../constants'

export default {
  components: {
    ReuseCard: defineAsyncComponent(() => import('../components/ReuseCard.vue')),
  },
  data() {
    return {
      APP_GITHUB_BACKEND_URL: constants.APP_GITHUB_BACKEND_URL,
      OFF_SLACK_URL: constants.OFF_SLACK_URL,
      APP_API_URL: constants.APP_API_URL,
      APP_HUGGING_FACE_URL: constants.APP_HUGGING_FACE_URL,
      APP_DATA_GOUV_URL: constants.APP_DATA_GOUV_URL,
      APP_GITHUB_REUSE_DISCUSSION_URL: constants.APP_GITHUB_REUSE_DISCUSSION_URL,
    }
  },
  computed: {
    reusesList() {
      return Reuses.filter(r => r.display)
    },
  }
}
</script>
