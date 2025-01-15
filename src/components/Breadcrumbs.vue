<template>
  <v-breadcrumbs v-if="breadcrumbs" class="text-h6 px-0 pt-0 pb-4" density="compact" :items="breadcrumbs">
    <template #item="{ item }">
      <v-breadcrumbs-item
        class="pa-0"
        :title="getItemTitle(item)"
        :to="getItemTo(item)"
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
    },
    objectId() {
      return this.$route.params.id
    },
    objectUsername() {
      return this.$route.params.username
    }
  },
  methods: {
    getItemTitle(item) {
      if (this.objectId && item.to && item.to.includes(':id')) return this.objectId
      if (this.objectUsername && item.to && item.to.includes(':username')) return this.objectUsername
      return this.$t(`Router.${item.title}.Title`)
    },
    getItemTo(item) {
      if (this.objectId && item.to && item.to.includes(':id')) return item.to.replace(':id', this.objectId)
      if (this.objectUsername && item.to && item.to.includes(':username')) return item.to.replace(':username', this.objectUsername)
      return item.to
    }
  }
}
</script>
