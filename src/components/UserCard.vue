<template>
  <v-card v-if="user" :id="'user_' + user.user_id" data-name="user-card">
    <v-card-text class="pa-2">
      <v-row>
        <v-col class="pr-0" style="max-width:20%;">
          <v-img :src="userImageDefault" width="100px" style="filter:invert(.9);" />
        </v-col>
        <v-col style="max-width:80%;">
          <v-row>
            <v-col @click="clickUser()">
              <h3>{{ getUserTitle }}</h3>
              <DateChip v-if="badgeAchievedAt" :title="$t('Common.BadgeAchievementDate')" :date="badgeAchievedAt" :readonly="true" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <UserFooterRow v-if="showUserFooterRow" class="mt-0" :user="user" :hideActionMenuButton="hideActionMenuButton" :readonly="readonly" />
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'

export default {
  components: {
    DateChip: defineAsyncComponent(() => import('../components/DateChip.vue')),
    UserFooterRow: defineAsyncComponent(() => import('../components/UserFooterRow.vue')),
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    badgeAchievedAt: {
      type: String,
      default: null
    },
    hideUserFooterRow: {
      type: Boolean,
      default: false
    },
    hideActionMenuButton: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      userImageDefault: constants.USER_IMAGE_DEFAULT_URL,
    }
  },
  computed: {
    getUserTitle() {
      return this.user.user_id
    },
    showUserFooterRow() {
      return !this.hideUserFooterRow
    }
  },
  methods: {
    clickUser() {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/users/${this.user.user_id}` })
    },
  }
}
</script>
