<template>
  <v-menu scroll-strategy="close">
    <template #activator="{ props }">
      <v-btn v-bind="props" size="small" prepend-icon="mdi-plus" append-icon="mdi-menu-down">
        <i18n-t keypath="Common.AddToOFF" tag="span">
          <template #name>
            {{ OFF_NAME }}
          </template>
        </i18n-t>
      </v-btn>
    </template>
    <v-list>
      <template v-for="(source, index) in sourceList" :key="source.key">
        <v-list-item :slim="true" :href="getSourceAddUrlWithLocale(source)" target="_blank">
          <template #prepend>
            <v-icon :icon="source.icon" />
          </template>
          <i18n-t keypath="Common.AddToOFF" tag="span">
            <template #name>
              {{ source.value }}
            </template>
          </i18n-t>
          <template #append>
            <v-icon size="small" icon="mdi-open-in-new" />
          </template>
        </v-list-item>
        <v-divider v-if="index === 0" class="mt-2 mb-2" />
      </template>
    </v-list>
  </v-menu>
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
      OFF_NAME: constants.OFF_NAME,
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
      return SOURCE_ADD_URL.replace('world', this.appStore.user.language)
    },
  }
}
</script>
