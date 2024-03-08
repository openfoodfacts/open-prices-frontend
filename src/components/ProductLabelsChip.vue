<template>
  <v-chip label size="small" density="comfortable" class="mr-1" @click="showProductLabelsDialog">
    {{ $t('ProductCard.LabelTotal', { count: productLabels ? productLabels.length : 0 }) }}
  </v-chip>

  <ProductLabelsDialog
    v-if="productLabels && productLabelsDialog"
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
    productLabels: null,
  },
  data() {
    return {
      productLabelsDialog: false
    }
  },
  computed: {
  },
  methods: {
    showProductLabelsDialog() {
      this.productLabelsDialog = true
    },
  }
}
</script>
