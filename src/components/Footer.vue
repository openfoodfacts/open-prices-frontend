<template>
  <v-footer class="bg-grey-lighten-1 py-4">
    <v-row no-gutters>
      <v-col cols="12" md="6" align="center">
        <i18n-t keypath="Footer.TagLine" tag="span">
          <template #name>
            {{ APP_NAME }}
          </template>
          <template #url>
            <OpenFoodFactsLink display="link" />
          </template>
        </i18n-t>
        <br>
        <v-btn v-for="source in sourceList" :key="source.source" class="mr-1" size="x-small" active :prepend-icon="source.icon" :href="source.url" target="_blank">
          {{ source.label }}
          <v-tooltip activator="parent" open-on-click location="top">
            {{ source.name }}
          </v-tooltip>
        </v-btn>
      </v-col>
      <v-col cols="12" md="6" align="center">
        <v-btn class="mx-2" variant="text" prepend-icon="mdi-chart-box-outline" to="/stats">
          {{ $t('Footer.Stats') }}
        </v-btn>
        <v-btn class="mx-2" variant="text" prepend-icon="mdi-information-outline" href="https://prices.openfoodfacts.org" target="_blank">
          {{ $t('Footer.About') }}
        </v-btn>
        <v-btn class="mx-2" variant="text" prepend-icon="mdi-github" href="https://github.com/openfoodfacts/open-prices-frontend" target="_blank">
          Github
        </v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'

export default {
  components: {
    OpenFoodFactsLink: defineAsyncComponent(() => import('../components/OpenFoodFactsLink.vue')),
  },
  data() {
    return {
      APP_NAME: constants.APP_NAME,
      sourceList: [
        {
          source: 'off',
          name: constants.OFF_NAME,
          label: this.$t('Common.Food'),
          url: constants.OFF_URL,
          icon: constants.OFF_ICON,
        },
        {
          source: 'obf',
          name: constants.OBF_NAME,
          label: this.$t('Common.Beauty'),
          url: constants.OBF_URL,
          icon: constants.OBF_ICON,
        },
        {
          source: 'opf',
          name: constants.OPF_NAME,
          label: this.$t('Common.Products'),
          url: constants.OPF_URL,
          icon: constants.OPF_ICON,
        },
        {
          source: 'opff',
          name: constants.OPFF_NAME,
          label: this.$t('Common.PetFood'),
          url: constants.OPFF_URL,
          icon: constants.OPFF_ICON,
        }
      ]
    }
  },
}
</script>
