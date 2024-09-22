<template>
  <v-chip v-if="productLabels && productLabels.length" label size="small" density="comfortable" @click="showProductLabelsDialog">
    <i>{{ $t('ProductCard.LabelTotal', { count: productLabels.length }) }}</i>
    <ProductLabelsDialog
      v-if="productLabelsDialog"
      v-model="productLabelsDialog"
      :labels="productLabels"
      @close="productLabelsDialog = false"
    />
  </v-chip>
  <v-chip v-else label size="small" density="comfortable">
    <!-- prepend-icon="mdi-help" color="warning" -->
    <i>{{ $t('ProductCard.LabelTotal', { count: 0 }) }}</i>
  </v-chip>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    ProductLabelsDialog: defineAsyncComponent(() => import('../components/ProductLabelsDialog.vue')),
  },
  props: {
    productLabels: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      productLabelsDialog: false
    }
  },
  methods: {
    showProductLabelsDialog() {
      this.productLabelsDialog = true
    },
  }
}
</script>
