<template>
  <v-chip label size="small" density="comfortable" :to="getBrandUrl">
    {{ brand }}
  </v-chip>
</template>

<script>
export default {
  props: {
    brand: {
      type: String,
      required: true,
    },
    brandTag: {
      type: String,
      default: null, // e.g. "xx:albert-heijn" (from product.brands_tags)
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getBrandUrl() {
      return this.brandTag && !this.readonly
        ? `/brands/${this.brandTag}`
        : null;
    },
  },
};
</script>
