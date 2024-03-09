<template>
  <v-dialog>
    <v-card>
      <v-card-title>
        {{ $t('ProductCard.Brands') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="close"></v-btn>
      </v-card-title>

      <v-divider></v-divider>

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
    brands: Array,
  },
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
