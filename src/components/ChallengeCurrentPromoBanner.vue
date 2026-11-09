<template>
  <v-banner
    class="border-grey"
    style="cursor: pointer"
    :icon="CHALLENGE_ICON"
    rounded
    density="compact"
    @click="$router.push(getUrl)"
  >
    <v-banner-text>
      <h3 class="text-h6 mb-1">
        {{ $t("Challenge.Title") }}
        <NewChip v-if="isNew" />
        <EndingSoonChip v-else-if="isEndingSoon" />
      </h3>
      <p>
        {{
          $t("Challenge.Subtitle", {
            challenge_title: `${challenge.icon} ${challenge.title} ${challenge.icon}`,
            challenge_subtitle: challenge.subtitle,
          })
        }}
      </p>
    </v-banner-text>
    <v-spacer /><!-- needed to push v-banner-actions to the right on big screens -->
    <v-banner-actions>
      <v-btn
        icon="mdi-arrow-right"
        :aria-label="$t('Common.Join')"
        :to="getUrl"
      />
    </v-banner-actions>
  </v-banner>
</template>

<script>
import { defineAsyncComponent } from "vue";
import constants from "../constants";

export default {
  components: {
    NewChip: defineAsyncComponent(() => import("./NewChip.vue")),
    EndingSoonChip: defineAsyncComponent(() => import("./EndingSoonChip.vue")),
  },
  props: {
    challenge: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      CHALLENGE_ICON: constants.CHALLENGE_ICON,
    };
  },
  computed: {
    isNew() {
      // a challenge usually lasts 1 month
      // new = first 7 days of the challenge
      // 'YYYY-MM-DDT00:00:00' (no offset) is parsed as local midnight
      const now = new Date();
      const eighthDay = new Date(`${this.challenge.start_date}T00:00:00`);
      eighthDay.setDate(eighthDay.getDate() + 7);
      return now < eighthDay;
    },
    isEndingSoon() {
      // a challenge usually lasts 1 month
      // ending soon = last 7 days of the challenge (end_date included)
      // 'YYYY-MM-DDT00:00:00' (no offset) is parsed as local midnight
      const now = new Date();
      const seventhToLastDay = new Date(`${this.challenge.end_date}T00:00:00`);
      seventhToLastDay.setDate(seventhToLastDay.getDate() - 6);
      return now >= seventhToLastDay;
    },
    getUrl() {
      return `/challenge`;
    },
  },
};
</script>
