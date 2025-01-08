<template>
  <v-row v-if="breadcrumbs">
    <v-col class="py-0">
      <v-breadcrumbs class="text-h6 pa-0" density="compact" :items="breadcrumbs">
        <template #item="{ item }">
          <v-breadcrumbs-item
            class="pa-0"
            :title="$t(`Router.${item.title}.Title`)"
            :to="item.to"
            :disabled="item.disabled"
          />
        </template>
      </v-breadcrumbs>
    </v-col>
  </v-row>
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
