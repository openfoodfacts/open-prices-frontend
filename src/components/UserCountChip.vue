<template>
  <v-chip label size="small" density="comfortable">
    <v-icon start icon="mdi-account" />
    <span v-if="withLabel" id="user-count">{{ $t('Common.UserCount', { count: count }) }}</span>
    <span v-else id="user-count">{{ count }}</span>
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
