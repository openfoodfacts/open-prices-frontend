<template>
  <v-card v-if="badge" :id="'badge_' + badge.id" data-name="badge-card">
    <v-card-text class="pa-2">
      <v-row>
        <v-col class="pr-0" style="max-width:20%;">
          <v-img :src="badgeImageDefault" width="100px" style="filter: invert(0.9);" />
        </v-col>
        <v-col style="max-width:80%;">
          <v-row>
            <v-col cols="12" @click="clickBadge()">
              <h3>{{ badge.name }}</h3>
              <p>{{ badge.description }}</p>
              <CountChip v-if="getCountChipKindFromBadgeMetric(badge.metric)" class="mr-2" :kind="getCountChipKindFromBadgeMetric(badge.metric)" :count="badge.threshold" :withLabel="true" />
              <ProofTypeChip v-if="getProofTypeFromBadgeMetric(badge.metric)" class="mr-2" :proofType="getProofTypeFromBadgeMetric(badge.metric)" />
              <DateChip v-if="achievedAt" :title="$t('Common.BadgeAchievementDate')" :date="achievedAt" :readonly="true" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row v-if="showBadgeFooterRow" class="mt-0">
        <v-col cols="12">
          <span class="chip-group">
            <CountChip kind="user" :count="badge.user_count" :withLabel="true" />
          </span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'

export default {
  components: {
    CountChip: defineAsyncComponent(() => import('../components/CountChip.vue')),
    ProofTypeChip: defineAsyncComponent(() => import('../components/ProofTypeChip.vue')),
    DateChip: defineAsyncComponent(() => import('../components/DateChip.vue')),
  },
  props: {
    badge: {
      type: Object,
      required: true
    },
    achievedAt: {
      type: String,
      default: null
    },
    hideBadgeFooterRow: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      badgeImageDefault: constants.BADGE_IMAGE_DEFAULT_URL,
    }
  },
  computed: {
    showBadgeFooterRow() {
      return !this.hideBadgeFooterRow
    }
  },
  methods: {
    getCountChipKindFromBadgeMetric(metric) {
      switch (metric) {
        case 'price_count':
        case 'price_in_proof_not_owned_count':
          return 'price'
        case 'proof_count':
        case 'proof_type_price_tag_count':
        case 'proof_type_receipt_count':
        case 'proof_type_gdpr_request_count':
        case 'proof_type_shop_import_count':
          return 'proof'
        case 'location_count':
          return 'location'
        case 'location_type_osm_city_count':
          return 'city'
        case 'location_type_osm_country_count':
          return 'country'
        case 'challenge_count':
          return 'challenge'
        case 'year_count':
          return 'year'
        default:
          return null
      }
    },
    getProofTypeFromBadgeMetric(metric) {
      switch (metric) {
        case 'proof_type_price_tag_count':
          return constants.PROOF_TYPE_PRICE_TAG
        case 'proof_type_receipt_count':
          return constants.PROOF_TYPE_RECEIPT
        case 'proof_type_gdpr_request_count':
          return constants.PROOF_TYPE_GDPR_REQUEST
        case 'proof_type_shop_import_count':
          return constants.PROOF_TYPE_SHOP_IMPORT
        default:
          return null
      }
    },
    clickBadge() {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/badges/${this.badge.id}` })
    },
  }
}
</script>
