<template>
  <v-dialog scrollable max-height="80%" min-width="50%" width="auto">
    <v-card :title="$t('ProductCard.Labels')">
      <template #append>
        <v-icon icon="mdi-close" @click="close" />
      </template>

      <v-divider />

      <v-card-text>
        <v-chip v-for="label in labels" :key="label" label class="mr-2 mb-2" @click="goToLabel(label)">
          {{ label }}
        </v-chip>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    labels: {
      type: Array,
      default: () => []
    }
  },
  emits: ['close'],
  methods: {
    goToLabel(label) {
      this.$router.push({ path: `/labels/${label}` })
    },
    close() {
      this.$emit('close')
    },
  }
}
</script>
