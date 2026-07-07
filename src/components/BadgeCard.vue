<template>
  <v-card v-if="badge" :id="'badge_' + badge.id" data-name="badge-card">
    <v-card-text class="pa-2">
      <v-row>
        <v-col class="pr-0" style="max-width:20%;">
          <v-img :src="badgeImageDefault" width="100px" style="filter: invert(0.9);" />
        </v-col>
        <v-col style="max-width:80%;">
          <v-row>
            <v-col cols="12">
              <h3>{{ badge.name }}</h3>
              <p>{{ badge.description }}</p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row v-if="showBadgeFooterRow" class="mt-0">
        <v-col cols="12">
          <span class="chip-group">
            <UserCountChip :count="badge.user_count" :withLabel="true" />
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
    UserCountChip: defineAsyncComponent(() => import('../components/UserCountChip.vue')),
  },
  props: {
    badge: {
      type: Object,
      required: true
    },
    hideBadgeFooterRow: {
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
  }
}
</script>
