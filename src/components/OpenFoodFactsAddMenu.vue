<template>
  <v-menu scroll-strategy="close">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" size="small" color="primary" prepend-icon="mdi-plus" append-icon="mdi-menu-down">
        <i18n-t keypath="Common.AddToOFF" tag="span">
          <template #name>{{ OFF_NAME }}</template>
        </i18n-t>
      </v-btn>
    </template>
    <v-list>
      <template v-for="(source, index) in sourceListWithDivider" :key="source.key">
        <v-list-item :slim="true" :href="getSourceUrl(source)" target="_blank">
          <template v-slot:prepend>
            <v-icon :icon="source.icon"></v-icon>
          </template>
          <i18n-t keypath="Common.AddToOFF" tag="span">
            <template #name>{{ source.value }}</template>
          </i18n-t>
          <template v-slot:append>
            <v-icon size="small" icon="mdi-open-in-new"></v-icon>
          </template>
        </v-list-item>
        <v-divider v-if="index === 0" class="mt-2 mb-2"></v-divider>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
import constants from '../constants'

export default {
  data() {
    return {
      OFF_NAME: constants.OFF_NAME,
      sourceListWithDivider: constants.PRODUCT_SOURCE_LIST,
    }
  },
  methods: {
    getSourceUrl(source) {
      return constants[`${source.key.toUpperCase()}_URL`]
    }
  }
}
</script>
