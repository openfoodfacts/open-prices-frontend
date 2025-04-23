<template>
  <h2 class="text-h6 mb-1">
    Add prices from price tags <v-icon :icon="PROOF_TYPE_PRICE_TAG_ICON" />
  </h2>

  <v-row>
    <v-col v-for="contribute in contributePriceTagsList" :key="contribute.url" cols="12" sm="6" md="4" xl="3">
      <ContributeCard :contribute="contribute" height="100%" />
    </v-col>
  </v-row>

  <br>

  <h2 class="text-h6 mb-1">
    Add prices from receipts <v-icon :icon="PROOF_TYPE_RECEIPT_ICON" />
  </h2>

  <v-row>
    <v-col v-for="contribute in contributeReceiptList" :key="contribute.url" cols="12" sm="6" md="4" xl="3">
      <ContributeCard :contribute="contribute" height="100%" />
    </v-col>
  </v-row>

  <br>

  <h2 class="text-h6 mb-1">
    Add prices from GDPR requests <v-icon :icon="PROOF_TYPE_GDPR_REQUEST_ICON" />
  </h2>

  <v-row>
    <v-col>
      <p><a :href="OFF_WIKI_GDPR_REQUEST_URL" target="_blank">Open Food Facts wiki</a></p>
    </v-col>
  </v-row>

  <br>

  <h2 class="text-h6 mb-1">
    Other ways to contribute
  </h2>

  <v-row>
    <v-col>
      <p><router-link to="/challenge">Participate in one of our challenges</router-link></p>
      <p><router-link to="/community">Learn more about the Open Prices project and its community</router-link></p>
      <p><a :href="OFF_CONTRIBUTE_URL" target="_blank">Contribute to Open Food Facts</a></p>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'

export default {
  components: {
    ContributeCard: defineAsyncComponent(() => import('../components/ContributeCard.vue')),
  },
  data() {
    return {
      contributePriceTagsList: [
        {name: 'Single picture', description: '', background_image_url: 'https://prices.openfoodfacts.org/img/0029/nCWeCVnpQJ.400.webp', url: '/prices/add/multiple'},
        {name: 'Single picture (with AI)', description: 'The AI will detect the price tags, and extract each price.',  background_image_url: 'https://imgur.com/M7cPb5l.png', url: '/experiments/contribution-assistant', experiment: true},
        {name: 'Bulk upload', description: 'Pictures should share the same shop location and date.', url: '/proofs/add/multiple', community: true},
        {name: 'Validate prices', description: '', background_image_url: 'https://imgur.com/s0lenjt.png', url: '/experiment/price-validation-assistant', community: true, experiment: true},
      ],
      contributeReceiptList: [
        {name: 'Single receipt', description: '', background_image_url: 'https://prices.openfoodfacts.org/img/0064/B7XwYylM6V.400.webp', url: '/proofs/add/multiple'},
        {name: 'Single receipt (with AI)', description: 'The AI will extract the list of prices.', url: '/experiment/receipt-assistant', experiment: true},
      ],
      PROOF_TYPE_PRICE_TAG_ICON: constants.PROOF_TYPE_PRICE_TAG_ICON,
      PROOF_TYPE_RECEIPT_ICON: constants.PROOF_TYPE_RECEIPT_ICON,
      PROOF_TYPE_GDPR_REQUEST_ICON: constants.PROOF_TYPE_GDPR_REQUEST_ICON,
      OFF_WIKI_GDPR_REQUEST_URL: constants.OFF_WIKI_GDPR_REQUEST_URL,
      OFF_CONTRIBUTE_URL: constants.OFF_CONTRIBUTE_URL
    }
  }
}
</script>
