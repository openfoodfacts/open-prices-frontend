<template>
  <v-card>
    <v-card-text>
      <v-img :src="label.imageSrc" height="150px" />
    </v-card-text>
    <v-divider />
    <v-card-text>
      <v-chip class="mr-1" label size="small" density="comfortable" prepend-icon="mdi-information-outline">
        {{ label.boundingSource }}
      </v-chip>
      <v-chip v-if="statusObject" label size="small" density="comfortable" :color="statusObject.color" :prepend-icon="statusObject.icon">
        {{ $t(statusObject.textSmallScreen) }}
      </v-chip>
    </v-card-text>
    <v-divider v-if="existingPrices.length" />
    <v-card-text v-if="existingPrices.length">
      <v-row class="mt-0 mb-0">
        <v-col v-for="price in existingPrices" :key="price" cols="12">
          <PriceCard :price="price" :product="price.product" :hidePriceProof="true" :hidePriceFooterRow="true" :readonly="true" elevation="1" height="100%" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider v-if="canBeDeleted" />
    <v-card-actions v-if="canBeDeleted">
      <v-btn v-if="!$vuetify.display.smAndUp" color="error" variant="outlined" icon="mdi-delete" size="small" density="comfortable" :aria-label="$t('Common.Delete')" @click="removeLabel()" />
      <v-btn v-else color="error" variant="outlined" prepend-icon="mdi-delete" size="small" @click="removeLabel()">
        {{ $t('Common.Delete') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'

export default {
  components: {
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue')),
  },
  props: {
    label: {
      type: Object,
      default: () => ({})
    },
    existingPrices: {
      type: Array,
      default: () => []
    }
  },
  emits: ['removeLabel'],
  computed: {
    hasPrice() {
      return this.label.status === 1
    },
    sourceIsManual() {
      return this.label.boundingSource === 'manual'
    },
    newlyCreated() {
      return !this.label.id
    },
    canBeDeleted() {
      return this.sourceIsManual && this.newlyCreated
    },
    statusObject() {
      return constants.PRICE_TAG_STATUS_LIST.find(status => status.key === this.label.status) || {}
    }
  },
  methods: {
    removeLabel() {
      this.$emit('removeLabel')
    }
  }
}
</script>
