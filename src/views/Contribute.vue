<template>
  <v-row>
    <v-col v-for="contribute in contributeCommonList" :key="contribute.url" cols="12" sm="6" md="4" xl="3">
      <ContributeCard :contribute="contribute" height="100%" />
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" class="pb-0">
      <h2 class="text-h6">
        <v-icon size="x-small" icon="mdi-hand-heart" />
        Other ways to contribute
      </h2>
    </v-col>
    <v-col>
      <p>You have a fidelty card? You can <a :href="OFF_WIKI_GDPR_REQUEST_URL" target="_blank">make a GDPR request and upload the list of prices</a></p>
      <p><router-link to="/challenges">Participate in one of our challenges</router-link></p>
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
      contributeCommonList: [
        {
          name: this.$t('Common.FromPriceTag'),
          description: '',
          background_image_url: constants.PROOF_TYPE_PRICE_TAG_IMAGE_THUMB_URL,
          url: '/proofs/add/price-tags'
        },
        {
          name: this.$t('Common.FromReceipt'),
          description: '',
          background_image_url: constants.PROOF_TYPE_RECEIPT_IMAGE_THUMB_URL,
          url: '/prices/add/multiple?proof_type=RECEIPT'
        },
        {
          name: this.$t('Common.ValidatePricesFromCommunity'),
          description: '',
          background_image_url: 'https://imgur.com/s0lenjt.png',
          url: '/prices/add/validate'
        }
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
