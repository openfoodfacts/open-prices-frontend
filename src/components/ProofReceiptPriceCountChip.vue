<template>
  <v-chip label size="small" :variant="totalCount ? 'flat' : ''" density="comfortable" :title="$t('Common.ReceiptPriceCount')">
    <span v-if="uploadedCount && totalCount">
      {{ uploadedCount }}&nbsp;/&nbsp;{{ $t('Common.PriceCount', { count: totalCount }) }}
    </span>
    <span v-else-if="uploadedCount">
      {{ $t('Common.PriceCount', { count: uploadedCount }) }}
    </span>
    <span v-else>
      {{ $t('Common.PriceCount', { count: totalCount }) }}
    </span>
  </v-chip>
</template>

<script>
export default {
  props: {
    uploadedCount: {
      type: Number,
      default: null
    },
    totalCount: {
      type: Number,
      default: null
    }
  }
}
</script>
