<template>
  <v-dialog scrollable max-height="80%" min-width="50%" width="auto">
    <v-card>
      <v-card-title>
        {{ $t('ProductCard.Categories') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="close" />
      </v-card-title>

      <v-divider />

      <v-card-text>
        <v-chip v-for="category in categories" :key="category" label class="mr-2 mb-2" @click="goToCategory(category)">
          {{ category }}
        </v-chip>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  emits: ['close'],
  methods: {
    goToCategory(category) {
      this.$router.push({ path: `/categories/${category}` })
    },
    close() {
      this.$emit('close')
    },
  }
}
</script>
