<template>
  <h1 class="mb-1">
    Dashboard
    <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h1>
</template>

<script>
export default {
  data() {
    return {
      prices: [],
      loading: false,
    }
  },
}
</script>
