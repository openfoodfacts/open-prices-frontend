<template>
  <v-breadcrumbs v-if="breadcrumbs" class="text-h6 px-0 pt-0 pb-4" density="compact" :items="breadcrumbs">
    <template #item="{ item, index }">
      <div class="d-flex align-center ga-2">
        <v-breadcrumbs-item
          class="pa-0"
          :title="getItemTitle(item)"
          :to="getItemTo(item)"
          :disabled="item.disabled"
        />
        <v-icon
          v-if="showHelpIcon(item, index)"
          icon="mdi-information-outline"
          size="x-small"
          class="text-primary cursor-pointer"
          @click="showHelpDialog = true"
        />
      </div>
    </template>

    <HelpDialog
      v-if="showHelpDialog"
      v-model="showHelpDialog"
      :title="$t('Router.' + currentPageTitle + '.Title')"
      :text="helpText"
      @close="showHelpDialog = false"
    />
  </v-breadcrumbs>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    HelpDialog: defineAsyncComponent(() => import('../components/HelpDialog.vue'))
  },
  data() {
    return {
      possibleParams: [':id', ':username', ':country', ':city'],
      showHelpDialog: false
    }
  },
  computed: {
    breadcrumbs() {
      return this.$route.meta.breadcrumbs
    },
    currentPageTitle() {
      return this.breadcrumbs?.[this.breadcrumbs.length - 1]?.title || ''
    },
    helpText() {
      return this.$t(`Router.${this.currentPageTitle}.Help`, '')
    }
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
    },
    showHelpIcon(item, index) {
      let key = `Router.${item.title}.Help`
      return this.isLastItem(index) && this.$t(key) !== key
    },
    isLastItem(index) {
      return index === this.breadcrumbs.length - 1
    }
  }
}
</script>
