<template>
  <v-row>
    <v-col cols="12" class="pb-0">
      <h2 class="text-h6">
        <v-icon size="x-small" icon="mdi-tag-outline" />
        {{ $t('Common.Prices') }}
      </h2>
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.price_count" :subtitle="$t('Stats.Total')" to="/prices" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.price_type_product_code_count" :subtitle="$t('Stats.WithBarcode')" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.price_type_category_tag_count" :subtitle="$t('Stats.WithCategory')" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.price_with_discount_count" :subtitle="$t('Stats.WithDiscount')" />
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.price_kind_community_count" :subtitle="$t('Common.Community')" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.price_kind_consumption_count" :subtitle="$t('Common.Consumption')" />
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" class="pb-0">
      <h2 class="text-h6">
        <v-icon size="x-small" icon="mdi-database-outline" />
        {{ $t('Common.Products') }}
      </h2>
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.product_with_price_count" :subtitle="$t('Stats.WithPrice')" to="/products" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.product_count" :subtitle="$t('Stats.Total')" />
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" sm="4" md="3" lg="2">
      <StatCard :value="stats.product_source_off_with_price_count.toString() + ' / ' + stats.product_source_off_count.toString()" :subtitle="$t('Common.Food')" :subtitle-prepend-icon="OFF_ICON" />
    </v-col>
    <v-col cols="12" sm="4" md="3" lg="2">
      <StatCard :value="stats.product_source_obf_with_price_count.toString() + ' / ' + stats.product_source_obf_count.toString()" :subtitle="$t('Common.Beauty')" :subtitle-prepend-icon="OBF_ICON" />
    </v-col>
    <v-col cols="12" sm="4" md="3" lg="2">
      <StatCard :value="stats.product_source_opf_with_price_count.toString() + ' / ' + stats.product_source_opf_count.toString()" :subtitle="$t('Common.Products')" :subtitle-prepend-icon="OPF_ICON" />
    </v-col>
    <v-col cols="12" sm="4" md="3" lg="2">
      <StatCard :value="stats.product_source_opff_with_price_count.toString() + ' / ' + stats.product_source_opff_count.toString()" :subtitle="$t('Common.PetFood')" :subtitle-prepend-icon="OPFF_ICON" />
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" class="pb-0">
      <h2 class="text-h6">
        <v-icon size="x-small" icon="mdi-map-marker-outline" />
        {{ $t('Common.Locations') }}
      </h2>
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.location_count" :subtitle="$t('Stats.Total')" to="/locations" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.location_type_osm_count" :subtitle="OSM_NAME" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.location_type_online_count" :subtitle="$t('Common.Online')" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.location_type_osm_country_count" :subtitle="$t('Common.Countries')" />
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" class="pb-0">
      <h2 class="text-h6">
        <v-icon size="x-small" icon="mdi-image" />
        {{ $t('Common.Proofs') }}
      </h2>
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.proof_count" :subtitle="$t('Stats.Total')" to="/proofs" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.proof_type_price_tag_count" :subtitle="$t('ProofCard.PRICE_TAG')" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.proof_type_receipt_count" :subtitle="$t('ProofCard.RECEIPT')" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.proof_type_gdpr_request_count" :subtitle="$t('ProofCard.GDPR_REQUEST')" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.proof_type_shop_import_count" :subtitle="$t('ProofCard.SHOP_IMPORT')" />
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" class="pb-0">
      <h2 class="text-h6">
        <v-icon size="x-small" icon="mdi-account-outline" />
        {{ $t('Common.Contributors') }}
      </h2>
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.user_with_price_count" :subtitle="$t('Stats.Total')" to="/users" />
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" class="pb-0">
      <h2 class="text-h6">
        <v-icon size="x-small" icon="mdi-test-tube" />
        {{ $t('Common.Experiments') }}
      </h2>
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.challenge_count" :subtitle="$t('Common.Challenges')" to="/challenges" />
    </v-col>
    <v-col cols="6" sm="4">
      <StatCard :value="stats.price_tag_status_linked_to_price_count" :subtitle="$t('Stats.PricesLinkedToPriceTag')" />
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" class="pb-0">
      <h2 class="text-h6">
        <v-icon size="x-small" icon="mdi-tune-vertical" />
        {{ $t('Common.Miscellaneous') }}
      </h2>
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.price_location_country_count" :subtitle="$t('Common.Countries')" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.price_currency_count" :subtitle="$t('Common.Currencies')" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.price_year_count" :subtitle="$t('Common.Years')" />
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" class="pb-0">
      <h2 class="text-h6">
        <v-icon size="x-small" icon="mdi-circle-small" />
        {{ $t('Stats.PricesPerSource') }}
      </h2>
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.price_source_web_count.toString()" :subtitle="$t('Common.Website')" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.price_source_mobile_count.toString()" :subtitle="$t('Common.MobileApp')" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.price_source_api_count.toString()" subtitle="API" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.price_source_other_count.toString()" :subtitle="$t('Common.Other')" />
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" class="pb-0">
      <h2 class="text-h6">
        <v-icon size="x-small" icon="mdi-circle-small" />
        {{ $t('Stats.ProofsPerSource') }}
      </h2>
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.proof_source_web_count.toString()" :subtitle="$t('Common.Website')" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.proof_source_mobile_count.toString()" :subtitle="$t('Common.MobileApp')" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.proof_source_api_count.toString()" subtitle="API" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="stats.proof_source_other_count.toString()" :subtitle="$t('Common.Other')" />
    </v-col>
  </v-row>

  <br>

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
import date_utils from '../utils/date.js'

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
        price_with_discount_count: 0,
        price_kind_community_count: 0,
        price_kind_consumption_count: 0,
        price_source_web_count: 0,
        price_source_mobile_count: 0,
        price_source_api_count: 0,
        price_source_other_count: 0,
        price_location_country_count: 0,
        price_currency_count: 0,
        price_year_count: 0,
        product_count: 0,
        product_source_off_count: 0,
        product_source_obf_count: 0,
        product_source_opf_count: 0,
        product_source_opff_count: 0,
        product_with_price_count: 0,
        product_source_off_with_price_count: 0,
        product_source_obf_with_price_count: 0,
        product_source_opf_with_price_count: 0,
        product_source_opff_with_price_count: 0,
        location_count: 0,
        location_with_price_count: 0,
        location_type_osm_count: 0,
        location_type_online_count: 0,
        location_type_osm_country_count: 0,
        proof_count: 0,
        proof_with_price_count: 0,
        proof_type_price_tag_count: 0,
        proof_type_receipt_count: 0,
        proof_type_gdpr_request_count: 0,
        proof_type_shop_import_count: 0,
        proof_source_web_count: 0,
        proof_source_mobile_count: 0,
        proof_source_api_count: 0,
        proof_source_other_count: 0,
        user_count: 0,
        user_with_price_count: 0,
        challenge_count: 0,
        price_tag_status_linked_to_price_count: 0,
        updated: null,
      },
      loading: false,
      OSM_NAME: constants.OSM_NAME,
      OFF_ICON: constants.OFF_ICON,
      OBF_ICON: constants.OBF_ICON,
      OPF_ICON: constants.OPF_ICON,
      OPFF_ICON: constants.OPFF_ICON,
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
            this.stats[key] = (key in data) ? data[key] : this.stats[key]
          }
          this.loading = false
        })
    },
    getDateTimeFormatted(dateTimeString) {
      return date_utils.offDateTime(dateTimeString)
    },
    getRelativeDateTimeFormatted(dateTimeString) {
      return date_utils.prettyRelativeDateTime(dateTimeString, 'short')
    },
  }
}
</script>
