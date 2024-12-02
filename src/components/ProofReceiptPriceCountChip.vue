<template>
  <v-chip class="mr-1" label size="small" variant="flat" density="comfortable" :title="$t('Common.ReceiptPriceCount')">
    {{ $t('Common.PriceCount', { count: count }) }}
  </v-chip>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: null
    },
  }
}
</script>
