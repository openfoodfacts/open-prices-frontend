<template>
  <v-dialog>
    <v-card>
      <v-card-title>
        {{ $t('ProductCategories.Title') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="close"></v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text v-if="categories.length">
        <v-chip v-for="category in categories" label class="mr-2 mb-2">
          {{ category }}
        </v-chip>
      </v-card-text>
      <v-card-text v-if="!categories.length">
        <span class="text-red">{{ $t('ProductCategories.Empty') }}</span>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    'categories': Array,
  },
  data() {
    return {
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    close() {
      this.$emit('close')
    },
  }
}
</script>
