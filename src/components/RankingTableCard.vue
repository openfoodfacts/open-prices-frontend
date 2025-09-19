<template>
  <v-card>
    <template #title>
      <small>{{ title }}</small>
    </template>
  
    <v-card-text>
      <v-data-table :headers="headers" :items="items" hide-default-header hide-default-footer items-per-page="100">
        <template #[`item.rank`]="{ index }">
          {{ index + 1 }}
        </template>
        <template #[`item.owner`]="{ item }">
          {{ item.owner }}
        </template>
        <template #[`item.country`]="{ item }">
          {{ item.country }}
        </template>
        <template #[`item.count`]="{ item }">
          {{ item.count }}
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    },
  },
  computed: {
    headers() {
      let allHeaders = [
        { text: this.$t('Common.Rank'), key: 'rank', width: '10%' },
        { text: this.$t('Common.User'), key: 'owner' },
        { text: this.$t('Common.Country'), key: 'country' },
        { text: this.$t('Common.Count'), key: 'count' },
      ]
      return allHeaders.filter((header, index) => index === 0 || this.items.some(item => item[header.key] !== undefined))
    }
  }
}
</script>
