<template>
  <v-card
    :title="user.user_id"
    prepend-icon="mdi-account"
    data-name="user-card"
    @click="goToUser(user)"
  >
    <v-card-text>
      <PriceCountChip :count="user.price_count" :withLabel="true" />
      <UserActionMenuButton :user="user" />
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    UserActionMenuButton: defineAsyncComponent(() => import('../components/UserActionMenuButton.vue')),
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
