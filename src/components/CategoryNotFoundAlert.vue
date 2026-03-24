<template>
  <v-alert data-name="category-not-found-alert" type="error" variant="outlined" density="compact">
    {{ $t('ProductDetail.CategoryNotFound') }}
  </v-alert>
</template>

<script>
export default {
  props: {
    // not used for now
    categoryTag: {
      type: String,
      default: '',
    },
  },
}
</script>
