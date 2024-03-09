<template>
  <span v-if="priceLabels">
    <v-chip v-for="label in priceLabelsTagsList" :key="label" label size="small" density="comfortable" class="mr-1">
      {{ label.name }}
      <v-icon v-if="label.icon" end :icon="label.icon"></v-icon>
    </v-chip>
  </span>
</template>

<script>
import LabelTags from '../data/labels-tags.json'

export default {
  props: {
    priceLabels: Array
  },
  computed: {
    priceLabelsTagsList() {
      return LabelTags.filter(lt => this.priceLabels.indexOf(lt.id) > -1)
    },
  }
}
</script>
