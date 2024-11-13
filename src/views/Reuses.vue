<template>
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
