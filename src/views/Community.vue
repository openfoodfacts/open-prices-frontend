<template>
  <v-row>
    <v-col cols="12" class="pb-0">
      <h2 class="text-h6">
        {{ $t('Community.JoinUs') }}
      </h2>
    </v-col>
    <v-col>
      <ul class="pl-4">
        <li><a :href="APP_GITHUB_BACKEND_URL" target="_blank">Github</a></li>
        <li><a :href="OFF_SLACK_URL" target="_blank">Open Food Facts Slack (#prices)</a></li>
      </ul>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" class="pb-0">
      <h2 class="text-h6">
        {{ $t('Community.HowToUseTheData') }}
      </h2>
    </v-col>
    <v-col>
      <ul class="pl-4">
        <li><a :href="APP_API_URL" target="_blank">API</a></li>
        <li><a :href="APP_HUGGING_FACE_URL" target="_blank">Hugging Face</a></li>
        <li><a :href="APP_DATA_GOUV_URL" target="_blank">data.gouv</a></li>
        <li><a :href="APP_DUMP_PRICES_URL" target="_blank">prices.jsonl.gz</a> | <a :href="APP_DUMP_PROOFS_URL" target="_blank">proofs.jsonl.gz</a> | <a :href="APP_DUMP_LOCATIONS_URL" target="_blank">locations.jsonl.gz</a></li>
      </ul>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" class="pb-0">
      <h2 class="text-h6">
        {{ $t('Common.ReusesKnown') }}
      </h2>
    </v-col>
    <v-col v-for="reuse in reusesList" :key="reuse.id" cols="12" sm="6" md="4" xl="3">
      <ReuseCard :reuse="reuse" height="100%" />
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <ReuseNewFormAlert />
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
    ReuseNewFormAlert: defineAsyncComponent(() => import('../components/ReuseNewFormAlert.vue')),
  },
  data() {
    return {
      APP_GITHUB_BACKEND_URL: constants.APP_GITHUB_BACKEND_URL,
      OFF_SLACK_URL: constants.OFF_SLACK_URL,
      APP_API_URL: constants.APP_API_URL,
      APP_HUGGING_FACE_URL: constants.APP_HUGGING_FACE_URL,
      APP_DATA_GOUV_URL: constants.APP_DATA_GOUV_URL,
      APP_DUMP_PRICES_URL: constants.APP_DUMP_PRICES_URL,
      APP_DUMP_PROOFS_URL: constants.APP_DUMP_PROOFS_URL,
      APP_DUMP_LOCATIONS_URL: constants.APP_DUMP_LOCATIONS_URL,
    }
  },
  computed: {
    reusesList() {
      return Reuses.filter(r => r.display)
    },
  }
}
</script>
