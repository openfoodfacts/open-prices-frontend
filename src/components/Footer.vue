<template>
  <v-footer class="bg-grey-lighten-1" style="max-height: 20%">
    <v-row>
      <v-col cols="12" md="6" align="center">
        <i18n-t keypath="Footer.Open_Prices_Project.Text" tag="label" for="Footer.Open_Prices_Project.url">
          <a href="https://world.openfoodfacts.org" target="_blank">{{ $t('Footer.Open_Prices_Project.Url') }}</a>
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
