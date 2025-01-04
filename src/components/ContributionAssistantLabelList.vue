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
          <v-img style="height:150px" :src="label.imageSrc" />
        </v-card-text>
        <v-divider />
        <v-card-text>
          <v-chip class="mr-1" label size="small" density="comfortable">
            {{ $t('Common.Source') }} {{ label.boundingSource }}
          </v-chip>
          <PriceCountChip v-if="labelHasPrice(label)" :count="1" :withLabel="true" source="proof" />
        </v-card-text>
        <v-divider v-if="!labelHasPrice(label)" />
        <v-card-actions v-if="!labelHasPrice(label)">
          <v-btn
            color="error"
            variant="outlined"
            prepend-icon="mdi-delete"
            @click="removeLabel(index)"
          >
            {{ $t('Common.Delete') }}
          </v-btn>
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
