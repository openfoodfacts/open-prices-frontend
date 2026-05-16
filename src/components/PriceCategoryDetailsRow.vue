<template>
  <v-row>
    <v-col cols="12" class="pt-2 pb-2">
      <span class="chip-group">
        <CategoryTagChip v-if="!hideCategoryChip" :category="price.category_tag" :localize="true" />
        <OriginTagChip v-for="origin in price.origins_tags" :key="origin" :origin="origin" :localize="true" />
        <LabelTagChip v-for="label in price.labels_tags" :key="label" :label="label" :localize="true" />
      </span>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    CategoryTagChip: defineAsyncComponent(() => import('../components/CategoryTagChip.vue')),
    OriginTagChip: defineAsyncComponent(() => import('../components/OriginTagChip.vue')),
    LabelTagChip: defineAsyncComponent(() => import('../components/LabelTagChip.vue')),
  },
  props: {
    price: {
      type: Object,
      default: null
    },
    hideCategoryChip: {
      type: Boolean,
      default: true
    }
  }
}
</script>
