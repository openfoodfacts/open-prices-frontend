<template>
  <v-chip label size="small" density="comfortable">
    <v-icon start icon="mdi-cash" />
    <span v-if="withLabel" id="currency-count">{{ $t('Common.CurrencyCount', { count: count }) }}</span>
    <span v-else id="currency-count">{{ count }}</span>
  </v-chip>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: null
    },
    withLabel: {
      type: Boolean,
      default: false
    },
  }
}
</script>
