<template>
  <h2 class="text-h6 mb-1">
    Top 5 contributor
  </h2>
  <v-list density="compact">
    <v-list-item
      v-for="(contributor, i) in topContributors.slice(0, 5)"
      :key="i"
      :value="contributor"
      color="primary"
    >
      <template #prepend>
        {{ 
          i === 0 ? '🥇' :
          i === 1 ? '🥈' :
          i === 2 ? '🥉' :
          '🏅'
        }}
      </template>

      <v-list-item-title>
        {{ i+1 }}. {{ contributor.user_id }}, {{ contributor.price_count }} prices
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>
  
<script>
export default {
  props: {
    topContributors: {
      type: Array,
      default: () => []
    }
  },
}
</script>
  