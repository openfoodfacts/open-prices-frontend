<template>
  <v-card :title="brand" prepend-icon="mdi-factory" data-name="brand-card">
    <v-card-text>
      <v-chip label size="small" density="comfortable" class="mr-1">
        <v-icon start icon="mdi-food-outline" />
        {{ $t('BrandDetail.BrandProductTotal', { count: productCount }) }}
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    brand: {
      type: String,
      default: null
    },
    productCount: {
      type: Number,
      default: 0
    }
  }
}
</script>
