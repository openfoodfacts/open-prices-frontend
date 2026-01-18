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
  data() {
    return {
      possibleParams: [':id', ':username', ':country', ':city']
    }
  },
  computed: {
    breadcrumbs() {
      return this.$route.meta.breadcrumbs
    },
  },
  methods: {
    getItemTitle(item) {
      if (this.possibleParams.includes(item.title)) {
        return this.$route.params[item.title.substring(1)]
      }
      return this.$t(`Router.${item.title}.Title`)
    },
    getItemTo(item) {
      if (item.to) {
        if (this.possibleParams.some(param => item.to.includes(param))) {
          return item.to.replace(':id', this.$route.params.id)
            .replace(':username', this.$route.params.username)
            .replace(':country', this.$route.params.country)
            .replace(':city', this.$route.params.city)
        }
      }
      return item.to
    }
  }
}
</script>
