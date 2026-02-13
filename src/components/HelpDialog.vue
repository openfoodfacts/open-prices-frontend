<template>
  <v-dialog max-width="500">
    <v-card :title="title">
      <template #prepend>
        <v-icon icon="mdi-information-outline" />
      </template>
      <template #append>
        <v-icon icon="mdi-close" @click="close" />
      </template>

      <v-divider />

      <v-card-text>
        {{ text }}
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  emits: ['close'],
  methods: {
    close() {
      this.$emit('close')
    },
  }
}
</script>
