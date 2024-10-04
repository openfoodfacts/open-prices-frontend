<template>
  <v-row>
    <v-col>
      <v-chip class="mr-2" label variant="text" prepend-icon="mdi-account">
        {{ username }}
      </v-chip>
      <v-btn size="small" prepend-icon="mdi-cog-outline" to="/settings">
        {{ $t('UserDashboard.Settings') }}
      </v-btn>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('UserDashboard.MyPrices')"
        :subtitle="userPriceTotal"
        prepend-icon="mdi-tag-multiple-outline"
        height="100%"
        to="/dashboard/prices"
      />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('UserDashboard.MyProofs')"
        :subtitle="userProofTotal"
        prepend-icon="mdi-image"
        height="100%"
        to="/dashboard/proofs"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'

export default {
  data() {
    return {
      userPriceTotal: null,
      userProofTotal: null,
      loading: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
  },
  mounted() {
    this.getUserPriceCount()
    this.getUserProofCount()
  },
  methods: {
    getUserPriceCount() {
      this.loading = true
      return api.getPrices({ owner: this.username, size: 1 })
        .then((data) => {
          this.userPriceTotal = data.total
          this.loading = false
        })
    },
    getUserProofCount() {
      this.loading = true
      return api.getProofs({ owner: this.username, size: 1 })
        .then((data) => {
          this.userProofTotal = data.total
          this.loading = false
        })
    },
  }
}
</script>
