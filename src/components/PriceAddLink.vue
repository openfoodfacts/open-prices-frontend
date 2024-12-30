<template>
  <a v-if="display === 'link'" :to="getUrl" :disabled="disabled">
    {{ getText }}
  </a>
  <v-list-item v-else-if="display === 'list-item'" :slim="true" base-color="primary" :prepend-icon="getIcon" :to="getUrl" :disabled="disabled">
    {{ getText }}
  </v-list-item>
  <v-btn
    v-else-if="display === 'button'"
    size="small"
    color="primary"
    :prepend-icon="getIcon"
    :to="getUrl"
    :disabled="disabled"
  >
    {{ getText }}
  </v-btn>
</template>

<script>
export default {
  props: {
    productCode: {
      type: String,
      default: null
    },
    proofId: {
      type: Number,
      default: null
    },
    display: {
      type: String,
      default: 'link',
      examples: ['link', 'list-item', 'button']
    },
    target: {
      type: String,
      default: 'prices-add-multiple'  // 'prices-add-single', 'contribution-assistant'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ADD_PRICE_SINGLE_BASE_URL: '/prices/add/single',
      ADD_PRICE_MULTIPLE_BASE_URL: '/prices/add/multiple',
      CONTRIBUTION_ASSISTANT_BASE_URL: '/experiments/contribution-assistant'
    }
  },
  computed: {
    getText() {
      if (this.target === 'contribution-assistant') {
        return this.$t('ContributionAssistant.OpenWithTheAssistant')
      }
      return this.$t('Common.AddPrice')
    },
    getUrl() {
      if (this.proofId) {
        if (this.target === 'contribution-assistant') {
          return `${this.CONTRIBUTION_ASSISTANT_BASE_URL}?proof_ids=${this.proofId}`
        }
        return `${this.ADD_PRICE_MULTIPLE_BASE_URL}?proof_id=${this.proofId}`
      }
      return `${this.ADD_PRICE_SINGLE_BASE_URL}?code=${this.productCode}`
    },
    getIcon() {
      if (this.target === 'contribution-assistant') {
        return 'mdi-draw'
      }
      return 'mdi-tag-plus-outline'
    }
  }
}
</script>
