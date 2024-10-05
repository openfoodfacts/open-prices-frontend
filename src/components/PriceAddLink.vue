<template>
  <a v-if="display === 'link'" :to="getAddUrl" :disabled="disabled">
    {{ $t('Common.AddPrice') }}
  </a>
  <v-list-item v-else-if="display === 'list-item'" :slim="true" base-color="primary" prepend-icon="mdi-tag-plus-outline" :to="getAddUrl" :disabled="disabled">
    {{ $t('Common.AddPrice') }}
  </v-list-item>
  <v-btn
    v-else-if="display === 'button'"
    size="small"
    color="primary"
    prepend-icon="mdi-tag-plus-outline"
    :to="getAddUrl"
    :disabled="disabled"
  >
    {{ $t('Common.AddPrice') }}
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
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ADD_PRICE_SINGLE_BASE_URL: '/prices/add/single',
      ADD_PRICE_MULTIPLE_BASE_URL: '/prices/add/multiple',
    }
  },
  computed: {
    getAddUrl() {
      if (this.proofId) {
        return `${this.ADD_PRICE_MULTIPLE_BASE_URL}?proof_id=${this.proofId}`
      }
      return `${this.ADD_PRICE_SINGLE_BASE_URL}?code=${this.productCode}`
    }
  }
}
</script>
