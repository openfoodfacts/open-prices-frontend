<template>
  <v-card
    class="d-flex flex-column"
    :title="$t('Challenge.StepCategories.Title')"
  >
    <v-card-text class="flex-grow-1 pb-0">
      <p class="mb-2">
        {{ $t('Challenge.StepCategories.line1', { name: OFF_NAME }) }}
      </p>
      <p class="mb-2">
        {{ $t('Challenge.StepCategories.line2') }}
      </p>
      <p class="mb-2">
        {{ $t('Challenge.StepCategories.line3') }}
      </p>
      <p class="mb-2">
        {{ $t('Challenge.StepCategories.line4') }}
      </p>
      <p class="mb-2">
        <span class="chip-group">
          <v-chip
            v-for="category in challenge.categories"
            :key="category"
            label
            color="primary"
            variant="flat"
            size="small"
            density="comfortable"
            append-icon="mdi-open-in-new"
            class="mr-1 mb-1"
            :href="getHungerGamesCategoryUrl(category)"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ categoryLocalizedNames[category] || category }}
          </v-chip>
        </span>
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'
import data_utils from '../utils/data.js'

export default {
  props: {
    challenge: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      OFF_NAME: constants.OFF_NAME,
      categoryLocalizedNames: {},  // see mounted
    }
  },
  computed: {
    ...mapStores(useAppStore),
  },
  mounted() {
    this.setCategoryLocalizedNames()
  },
  methods: {
    setCategoryLocalizedNames() {
      this.challenge.categories.forEach((category) => {
        data_utils.getLocaleCategoryTagName(this.appStore.getUserLanguage, category).then((categoryName) => {
          this.categoryLocalizedNames[category] = categoryName
        })
      })
    },
    getHungerGamesCategoryUrl(category) {
      const params = new URLSearchParams({ type: 'category', value_tag: category, sorted: 'true' })
      return `${constants.OFF_HUNGER_GAMES_URL}/questions?${params.toString()}`
    }
  }
}
</script>
