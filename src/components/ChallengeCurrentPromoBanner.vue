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
import date_utils from "../utils/date.js";

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
      const now = new Date();
      const eighthDay = date_utils.fromDateString(this.challenge.start_date);
      eighthDay.setDate(eighthDay.getDate() + 7);
      return now < eighthDay;
    },
    isEndingSoon() {
      // a challenge usually lasts 1 month
      // ending soon = last 7 days of the challenge (end_date included)
      const now = new Date();
      const seventhToLastDay = date_utils.fromDateString(
        this.challenge.end_date,
      );
      seventhToLastDay.setDate(seventhToLastDay.getDate() - 6);
      return now >= seventhToLastDay;
    },
    getUrl() {
      return `/challenge`;
    },
  },
};
</script>
