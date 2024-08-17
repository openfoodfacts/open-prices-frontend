<template>
  <v-card :title="date" prepend-icon="mdi-calendar-today" data-name="date-card">
    <v-card-text>
      <PriceCountChip :count="priceCount" :withLabel="true" />
      <v-chip
        v-for="dp in dateParentList"
        :key="dp.name"
        label size="small" density="comfortable" class="mr-1" @click="$router.push(dp.path)"
      >
        {{ dp.name }}
      </v-chip>
      <DateActionMenuButton :date="date" />
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'
import utils from '../utils.js'

export default {
  components: {
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    DateActionMenuButton: defineAsyncComponent(() => import('../components/DateActionMenuButton.vue')),
  },
  props: {
    date: {
      type: String,
      default: null
    },
    priceCount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    dateType() {
      return utils.dateType(this.date)
    },
    dateParentList() {
      let dateParentList = []
      if (this.dateType === 'DAY') {
        const matches = this.date.match(constants.DATE_FULL_REGEX_MATCH)
        const year = matches[1]
        const month = `${year}-${matches[2]}`
        dateParentList.push({ name: month, path: `/dates/${month}` })
        dateParentList.push({ name: year, path: `/dates/${year}` })
      } else if (this.dateType === 'MONTH') {
        const matches = this.date.match(constants.DATE_YEAR_MONTH_REGEX_MATCH)
        const year = matches[1]
        dateParentList.push({ name: year, path: `/dates/${year}` })
      }
      return dateParentList
    },
  }
}
</script>
