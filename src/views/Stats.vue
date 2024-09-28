<template>
  <h1 class="text-h5 mb-1">
    {{ $t('Stats.Title') }}
    <v-progress-circular v-if="loading" indeterminate :size="30" />
  </h1>

  <v-row>
    <v-col cols="12" md="6" lg="4">
      <v-card :title="$t('Common.Prices')" height="100%">
        <v-card-text>
          <p>
            {{ $t('Stats.Total') }} <strong>{{ stats.price_count }}</strong>
          </p>
          <p>
            {{ $t('Stats.WithProduct') }} <v-chip label size="small" density="comfortable" class="mr-1">
              barcode
            </v-chip>
            <strong>{{ stats.price_barcode_count }}</strong>
          </p>
          <p>
            {{ $t('Stats.WithoutProduct') }} <v-chip label size="small" density="comfortable" class="mr-1">
              category
            </v-chip>
            <strong>{{ stats.price_category_count }}</strong>
          </p>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="6" lg="4">
      <v-card :title="$t('Common.Products')" height="100%">
        <v-card-text>
          <p>
            {{ $t('Stats.Total') }} <strong>{{ stats.product_count }}</strong>
          </p>
          <p>
            {{ $t('Stats.WithPrice') }} <strong>{{ stats.product_with_price_count }}</strong>
          </p>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="6" lg="4">
      <v-card :title="$t('Common.Locations')" height="100%">
        <v-card-text>
          <p>
            {{ $t('Stats.Total') }} <strong>{{ stats.location_count }}</strong>
          </p>
          <p>
            {{ $t('Stats.WithPrice') }} <strong>{{ stats.location_with_price_count }}</strong>
          </p>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="6" lg="4">
      <v-card :title="$t('Common.Proofs')" height="100%">
        <v-card-text>
          <p>
            {{ $t('Stats.Total') }} <strong>{{ stats.proof_count }}</strong>
          </p>
          <p>
            {{ $t('Stats.WithPrice') }} <strong>{{ stats.proof_with_price_count }}</strong>
          </p>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="6" lg="4">
      <v-card :title="$t('Stats.Users')" height="100%">
        <v-card-text>
          <p>
            {{ $t('Stats.Total') }} <strong>{{ stats.user_count }}</strong>
          </p>
          <p>
            {{ $t('Stats.WithPrice') }} <strong>{{ stats.user_with_price_count }}</strong>
          </p>
        </v-card-text>
      </v-card>
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
import api from '../services/api'
import utils from '../utils.js'

export default {
  data() {
    return {
      stats: {
        price_count: 0,
        price_barcode_count: 0,
        price_category_count: 0,
        product_count: 0,
        product_with_price_count: 0,
        location_count: 0,
        location_with_price_count: 0,
        proof_count: 0,
        proof_with_price_count: 0,
        user_count: 0,
        user_with_price_count: 0,
        updated: null,
      },
      loading: false,
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
