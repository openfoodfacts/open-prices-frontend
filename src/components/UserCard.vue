<template>
  <v-card
    :title="user.user_id"
    prepend-icon="mdi-account"
    @click="goToUser(user)"
  >
    <v-card-text>
      <PriceCountChip :count="user.price_count" :withLabel="true" />
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goToUser(user) {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/users/${user.user_id}` })
    },
  }
}
</script>
