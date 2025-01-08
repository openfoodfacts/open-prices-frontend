<template>
  <v-breadcrumbs v-if="breadcrumbs" class="text-h6 px-0 pt-0 pb-4" density="compact" :items="breadcrumbs">
    <template #item="{ item }">
      <v-breadcrumbs-item
        class="pa-0"
        :title="$t(`Router.${item.title}.Title`)"
        :to="item.to"
        :disabled="item.disabled"
      />
    </template>
  </v-breadcrumbs>
</template>
  
<script>
export default {
  computed: {
    breadcrumbs() {
      return this.$route.meta.breadcrumbs
    }
  },
}
</script>
