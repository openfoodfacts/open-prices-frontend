<template>
  <h1 class="text-h5 mb-1">
    The current Challenge is ...  {{ challenge.icon }} {{ challenge.title }}  {{ challenge.icon }}
  </h1>

  <h2 class="text-h6 mb-1">
    {{ challenge.subtitle }}
  </h2>

  <v-row>
    <v-col>
      <!-- Maybe replace with timeline ? https://vuetifyjs.com/en/components/timelines -->
      <table style="width: 100%; table-layout: fixed;">
        <tr>
          <td>Start</td>
          <td v-for="i in nb_days" :key="i">
            <span v-if="i == today_index">Today</span>
          </td>
          <td>End</td>
        </tr>
        <tr style="font-size: 10px; white-space: nowrap">
          <td>{{ challenge.start_date }}</td>
          <td v-for="i in nb_days" :key="i" />
          <td>{{ challenge.end_date }}</td>
        </tr>
      </table>
      <v-progress-linear
        color="light-blue"
        height="10"
        :model-value="progress"
        striped
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      TODO: Explain the challenge, how to contribute etc..
      TODO: maybe add a place for proofs with missing prices (ideally proofs would be tagged for the challenge)
      TODO: what about rewards ? badges for top 3 ? participation badges ?
      TODO: Maybe a goal should be a number of product / prices, instead of the day
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="6">
      <h2 class="text-h6 mb-1">
        General stats
      </h2>

      <v-row>
        <v-col cols="6">
          <StatCard :value="challenge.number_of_contributions" :subtitle="'Total number of prices added'" />
        </v-col>
        <v-col cols="6">
          <StatCard :value="challenge.number_of_contributors" :subtitle="'Total number of contributors'" />
        </v-col>
      </v-row>
    </v-col>
    
    <v-col cols="12" md="6">
      <h2 v-if="username" class="text-h6 mb-1">
        Your stats
      </h2>
      <v-row v-if="username">
        <v-col cols="6">
          <StatCard :value="challenge.user_contributions" :subtitle="'Prices added by you'" />
        </v-col>
        <v-col cols="6">
          <v-card :title="`${challenge.user_rank == 0 ? '50+' : challenge.user_rank} / ${challenge.number_of_contributors}`" :subtitle="'Your rank'" variant="tonal" density="compact" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  
  <v-row>
    <v-col cols="12" md="6">
      <v-card
        :title="'Top 5 contributors'"
        variant="tonal"
        density="compact"
      >
        <v-card-text>
          <v-list density="compact">
            <v-list-item
              v-for="(contributor, i) in challenge.top_contributors.slice(0, 5)"
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
        </v-card-text>
      </v-card>    
    </v-col>
    
    <v-col v-if="challenge.latest_contributions.length" cols="12" md="6">
      <v-card
        :title="'Number of contributions per day'"
        variant="tonal"
        density="compact"
      >
        <v-card-text>
          <PriceChart :priceList="challenge.latest_contributions" aggregate="count" dateField="created" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <h2 class="text-h6 mb-1">
    Most recent contributions
  </h2>
  <v-row v-if="challenge.latest_contributions">
    <v-col v-for="price in challenge.latest_contributions.slice(0, 10)" :key="price" cols="12" sm="6" md="4" xl="3">
      <PriceCard :price="price" :product="price.product" elevation="1" height="100%" />
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'
import api from '../services/api.js'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'

export default {
  components: {
    StatCard: defineAsyncComponent(() => import('../components/StatCard.vue')),
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue')),
    PriceChart: defineAsyncComponent(() => import('../components/PriceChart.vue'))
  },
  data() {
    return {
      challenge: {
        title: "MILK",
        subtitle: "(and milk alternatives)",
        icon: "🥛",
        start_date: "2024-09-01",
        end_date: "2024-10-31",
        categories: ["en:milk-substitutes", "en:milks"],
        top_contributors: [],
        number_of_contributors: 0,
        number_of_contributions: 0,
        latest_contributions: [],
        user_contributions: 0,
        user_rank: 0
      },
      loading: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    nb_days() {
      return Math.round((new Date(this.challenge.end_date) - new Date(this.challenge.start_date)) / (1000 * 60 * 60 * 24) / 2)
    },
    today_index() {
      return Math.round((new Date() - new Date(this.challenge.start_date)) / (1000 * 60 * 60 * 24) / 2)
    },
    progress() {
      return this.today_index * 100 / this.nb_days
    }
  },
  mounted() {
    this.getStats()
  },
  methods: {
    getStats() {
      this.loading = true
      // TODO: This should fetch only prices matching one of the product categories in this.challenge.categories
      api.getPrices({ size: 100, created__gte: this.challenge.start_date, created__lte: this.challenge.end_date })
      .then((data) => {
        this.challenge.latest_contributions = data.items
        this.challenge.number_of_contributions = data.total
        this.loading = false
      })

      // TODO: this should only fetch users that contributed to one of the product categories in this.challenge.categories, in the designated time range
      api.getUsers({ order_by: constants.USER_ORDER_LIST[0].key, size: 50})
      .then((data) => {
        this.challenge.top_contributors = data.items
        this.challenge.number_of_contributors = data.total
        for (let i = 0; i < data.items.length; i++) {
          const user = data.items[i]
          if (this.username && this.username == user.user_id) {
            this.challenge.user_rank = i
            break
          }
        }
      })
      if (this.username) {
        // TODO: This should fetch only prices matching one of the product categories in this.challenge.categories
        api.getPrices({ owner: this.username, created__gte: this.challenge.start_date, created__lte: this.challenge.end_date })
        .then((data) => {
          this.challenge.user_contributions = data.total
        })
      }
      
    }
      
  }
}
</script>
