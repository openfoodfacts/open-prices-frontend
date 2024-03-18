<template>
  <v-chip v-if="productLabels.length" label size="small" density="comfortable" @click="showProductLabelsDialog">
    {{ $t('ProductCard.LabelTotal', { count: productLabels.length }) }}
  </v-chip>
  <v-chip v-else label size="small" density="comfortable"><!-- prepend-icon="mdi-help" color="warning" -->
    {{ $t('ProductCard.LabelTotal', { count: 0 }) }}
  </v-chip>

  <ProductLabelsDialog
    v-if="productLabels.length && productLabelsDialog"
    :labels="productLabels"
    v-model="productLabelsDialog"
    @close="productLabelsDialog = false"
  ></ProductLabelsDialog>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    'ProductLabelsDialog': defineAsyncComponent(() => import('../components/ProductLabelsDialog.vue')),
  },
  props: {
    productLabels: {
      type: Array,
      default: []
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
