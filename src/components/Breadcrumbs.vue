<template>
  <v-breadcrumbs v-if="breadcrumbs" :items="breadcrumbs">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  computed: {
    breadcrumbs() {
      return this.$route.meta.breadcrumbs;
    }
  },
}
</script>
