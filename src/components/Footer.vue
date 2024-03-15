<template>
  <v-footer>
    <v-row>
      <v-col cols="12" md="6" align="center">
        <i18n-t keypath="Footer.TagLine" tag="span">
          <template #name>{{ APP_NAME }}</template>
          <template #url>
            <a href="https://world.openfoodfacts.org" target="_blank">{{ OFF_NAME }}</a>
          </template>
        </i18n-t>
      </v-col>
      <v-col cols="12" md="6" align="center">
        <v-btn class="mx-2" variant="text" href="https://prices.openfoodfacts.org" target="_blank">{{ $t('Footer.About') }}</v-btn>
        <v-btn class="mx-2" variant="text" to="/stats">{{ $t('Footer.Stats') }}</v-btn>
        <v-btn class="mx-2" variant="text" href="https://github.com/openfoodfacts/open-prices-frontend" target="_blank">Github</v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>

<style scoped>
.v-footer{
  max-height: 20%;
  background-color: #1E1E24;
  color: #fff
}
</style>

<script>
import constants from '../constants'

export default {
  data() {
    return {
      APP_NAME: constants.APP_NAME,
      OFF_NAME: constants.OFF_NAME,
    }
  },
}
</script>
