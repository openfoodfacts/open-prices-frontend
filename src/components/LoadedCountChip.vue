<template>
  <v-chip class="mr-2" variant="tonal" size="x-small">
    <span v-if="loadedCount">
      {{ loadedCount }}&nbsp;/&nbsp;{{ totalCount }}
    </span>
    <span v-else>
      {{ totalCount }}
    </span>
  </v-chip>
</template>

<script>
export default {
  props: {
    loadedCount: {
      type: Number,
      default: 0
    },
    totalCount: {
      type: Number,
      default: 0
    }
  }
}
</script>
