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
      <PriceCountChip v-if="hasPrice" :count="1" :withLabel="true" />
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

export default {
  components: {
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue'))
  },
  props: {
    label: {
      type: Object,
      default: () => ({})
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
    }
  },
  methods: {
    removeLabel() {
      this.$emit('removeLabel')
    }
  }
}
</script>
