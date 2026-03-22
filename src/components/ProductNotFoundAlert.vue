<template>
  <v-btn 
    block
    color="#2e7d32"
    :href="getSourceAddUrlWithLocale(sourceList[0])"
    target="_blank"
    class="add-to-off-btn"
    elevation="0"
    size="large"
  >
    <template #prepend>
      <v-icon icon="mdi-plus-circle" />
    </template>

    {{ $t('add_product_to_off') }}

    <template #append>
      <v-icon icon="mdi-open-in-new" size="small" />
    </template>
  </v-btn>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'

export default {
  props: {
    productCode: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      sourceList: constants.PRODUCT_SOURCE_LIST,
    }
  },
  computed: {
    ...mapStores(useAppStore),
  },
  methods: {
    getSourceUrl(source) {
      return constants[`${source.key.toUpperCase()}_URL`]
    },
    getSourceAddUrlWithLocale(source) {
      const SOURCE_ADD_URL = `${this.getSourceUrl(source)}/cgi/product.pl?type=search_or_add&action=process&code=${this.productCode}`
      return SOURCE_ADD_URL.replace('world', this.appStore.user.country.toLowerCase())
    },
  }
}
</script>

<style scoped>
.add-to-off-btn {
  text-transform: none;
  font-weight: 600;
  border-radius: 12px;
}

.add-to-off-btn:hover {
  transform: translateY(-1px);
}
</style>