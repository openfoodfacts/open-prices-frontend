<template>
  <v-row v-if="labels.length">
    <v-col
      v-for="(label, index) in labels"
      :key="index"
      cols="6"
      md="6"
      xl="4"
    >
      <v-card>
        <v-card-text>
          <v-img :src="label.imageSrc" height="150px" />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn v-if="!$vuetify.display.smAndUp && !labelHasPrice(label)" color="error" variant="outlined" icon="mdi-delete" size="small" density="comfortable" :aria-label="$t('Common.Delete')" @click="removeLabel(index)" />
          <v-btn
            v-else-if="!labelHasPrice(label)"
            color="error"
            variant="outlined"
            prepend-icon="mdi-delete"
            size="small"
            @click="removeLabel(index)"
          >
            {{ $t('Common.Delete') }}
          </v-btn>
          <v-chip class="mr-1" label size="small" density="comfortable" prepend-icon="mdi-information-outline">
            {{ label.boundingSource }}
          </v-chip>
          <PriceCountChip v-if="labelHasPrice(label)" :count="1" :withLabel="true" />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue'))
  },
  props: {
    labels: {
      type: Array,
      default: () => []
    }
  },
  emits: ['removeLabel'],
  methods: {
    labelHasPrice(label) {
      return label.status === 1
    },
    removeLabel(index) {
      this.$emit('removeLabel', index)
    }
  }
}
</script>
