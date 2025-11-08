<template>
  <v-card :title="date" prepend-icon="mdi-calendar-today" data-name="date-card">
    <v-card-text>
      <v-row>
        <v-col :cols="hideActionMenuButton ? '12' : '11'">
          <PriceCountChip class="mr-1" :count="priceCount" :withLabel="true" />
          <v-chip
            v-for="dp in dateParentList"
            :key="dp.name"
            label size="small" density="comfortable" class="mr-1" @click="$router.push(dp.path)"
          >
            {{ dp.name }}
          </v-chip>
        </v-col>
        <v-col v-if="!hideActionMenuButton" cols="1">
          <DateActionMenuButton v-if="!hideActionMenuButton" :date="date" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'
import date_utils from '../utils/date.js'

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
    },
    hideActionMenuButton: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    dateType() {
      return date_utils.dateType(this.date)
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
