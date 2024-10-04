<template>
  <v-breadcrumbs v-if="breadcrumbs" class="text-h5 px-0 pt-0" density="compact" :items="breadcrumbs">
    <template #title="{ item }">
      {{ $t(`Router.${item.title}.Title`) }}
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
