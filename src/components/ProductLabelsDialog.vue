<template>
  <v-dialog>
    <v-card>
      <v-card-title>
        {{ $t('ProductCard.Labels') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="close"></v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-chip v-for="label in labels" :key="label" label class="mr-2 mb-2">
          {{ label }}
        </v-chip>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    labels: Array,
  },
  methods: {
    close() {
      this.$emit('close')
    },
  }
}
</script>
