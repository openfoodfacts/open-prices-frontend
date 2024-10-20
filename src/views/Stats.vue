<template>
  <h1 class="text-h5 mb-1">
    {{ $t('Common.Stats') }}
  </h1>

  <h2 class="text-h6 mb-1">
    <v-icon size="x-small" icon="mdi-tag-outline" />
    {{ $t('Common.Prices') }}
  </h2>

  <v-row>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.price_count" :subtitle="$t('Stats.Total')" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.price_type_product_code_count" :subtitle="$t('Stats.WithBarcode')" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.price_type_category_tag_count" :subtitle="$t('Stats.WithCategory')" />
    </v-col>
  </v-row>

  <br>

  <h2 class="text-h6 mb-1">
    <v-icon size="x-small" icon="mdi-database-outline" />
    {{ $t('Common.Products') }}
  </h2>

  <v-row>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.product_with_price_count" :subtitle="$t('Stats.WithPrice')" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.product_count" :subtitle="$t('Stats.Total')" />
    </v-col>
  </v-row>

  <br>

  <h2 class="text-h6 mb-1">
    <v-icon size="x-small" icon="mdi-map-marker-outline" />
    {{ $t('Common.Locations') }}
  </h2>

  <v-row>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.location_with_price_count" :subtitle="$t('Stats.Total')" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.location_type_osm_count" :subtitle="OSM_NAME" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.location_type_online_count" :subtitle="$t('LocationCard.ONLINE')" />
    </v-col>
  </v-row>

  <br>

  <h2 class="text-h6 mb-1">
    <v-icon size="x-small" icon="mdi-image" />
    {{ $t('Common.Proofs') }}
  </h2>

  <v-row>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.proof_with_price_count" :subtitle="$t('Stats.Total')" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.proof_type_price_tag_count" :subtitle="$t('ProofCard.PRICE_TAG')" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.proof_type_gdpr_request_count" :subtitle="$t('ProofCard.GDPR_REQUEST')" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.proof_type_shop_import_count" :subtitle="$t('ProofCard.SHOP_IMPORT')" />
    </v-col>
  </v-row>

  <br>

  <h2 class="text-h6 mb-1">
    <v-icon size="x-small" icon="mdi-account-outline" />
    {{ $t('Common.Users') }}
  </h2>

  <v-row>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.user_with_price_count" :subtitle="$t('Stats.Total')" />
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12">
      <i18n-t keypath="Stats.LastUpdated" tag="span" :title="getRelativeDateTimeFormatted(stats.updated)">
        <template #date>
          {{ getDateTimeFormatted(stats.updated) }}
        </template>
      </i18n-t>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import api from '../services/api'
import constants from '../constants'
import utils from '../utils.js'

export default {
  components: {
    StatCard: defineAsyncComponent(() => import('../components/StatCard.vue')),
  },
  data() {
    return {
      stats: {
        price_count: 0,
        price_type_product_code_count: 0,
        price_type_category_tag_count: 0,
        product_count: 0,
        product_with_price_count: 0,
        // location_count: 0,
        location_with_price_count: 0,
        location_type_osm_count: 0,
        location_type_online_count: 0,
        // proof_count: 0,
        proof_with_price_count: 0,
        proof_type_price_tag_count: 0,
        proof_type_receipt_count: 0,
        proof_type_gdpr_request_count: 0,
        proof_type_shop_import_count: 0,
        user_count: 0,
        user_with_price_count: 0,
        updated: null,
      },
      loading: false,
      OSM_NAME: constants.OSM_NAME,
    }
  },
  mounted() {
    this.getStats()
  },
  methods: {
    getStats() {
      this.loading = true
      return api.getStats()
        .then((data) => {
          for (const key in this.stats) {
            this.stats[key] = data[key]
          }
          this.loading = false
        })
    },
    getDateTimeFormatted(dateTimeString) {
      return utils.offDateTime(dateTimeString)
    },
    getRelativeDateTimeFormatted(dateTimeString) {
      return utils.prettyRelativeDateTime(dateTimeString, 'short')
    },
  }
}
</script>
