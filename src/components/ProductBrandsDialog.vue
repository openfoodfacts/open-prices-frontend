<template>
  <v-dialog scrollable max-height="80%" min-width="50%" width="auto">
    <v-card :title="$t('ProductCard.Brands')">
      <template #append>
        <v-icon icon="mdi-close" @click="close" />
      </template>

      <v-divider />

      <v-card-text>
        <v-chip v-for="brand in brands" :key="brand" label class="mr-2 mb-2" @click="goToBrand(brand)">
          {{ brand }}
        </v-chip>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    brands: {
      type: Array,
      default: () => []
    }
  },
  emits: ['close'],
  methods: {
    goToBrand(brand) {
      this.$router.push({ path: `/brands/${brand}` })
    },
    close() {
      this.$emit('close')
    },
  }
}
</script>
