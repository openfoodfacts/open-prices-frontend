<template>
  <v-dialog scrollable max-height="80%" min-width="50%" width="auto">
    <v-card :title="$t('ProductCard.Labels')">
      <template #append>
        <v-icon icon="mdi-close" @click="close" />
      </template>

      <v-divider />

      <v-card-text>
        <span class="chip-group">
          <LabelTagChip v-for="label in labels" :key="label" :label="label" />
        </span>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    LabelTagChip: defineAsyncComponent(() => import('../components/LabelTagChip.vue')),
  },
  props: {
    labels: {
      type: Array,
      default: () => []
    }
  },
  emits: ['close'],
  methods: {
    close() {
      this.$emit('close')
    },
  }
}
</script>
