<template>
  <h1 class="text-h5 mb-1">
    {{ $t('UserDashboard.Title') }}
  </h1>

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
        to="/dashboard/prices">
      </v-card>
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
      userPricePage: 0,
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
  },
  methods: {
    getUserPriceCount() {
      this.loading = true
      this.userPricePage += 1
      return api.getPrices({ owner: this.username, size: 1 })
        .then((data) => {
          this.userPriceTotal = data.total
          this.loading = false
        })
    },
  }
}
</script>
