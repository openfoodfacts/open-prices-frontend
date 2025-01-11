<template>
  <h2 class="text-h6 mb-1">
    {{ $t('Challenge.Top5Contributors') }}
  </h2>
  <v-list density="compact">
    <v-list-item
      v-for="(contributor, i) in topContributors.slice(0, 5)"
      :key="i"
      :value="contributor"
      :to="`/users/${contributor.owner}`"
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
        {{ i+1 }}. {{ contributor.owner }}, {{ contributor.price__count }} {{ $t('Common.Prices') }}
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
  