<template>
  <v-row>
    <v-col
      v-for="contribute in contributeCommonList"
      :key="contribute.url"
      cols="12"
      md="6"
      lg="4"
    >
      <ContributeCard :contribute="contribute" height="100%" />
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" class="pb-0">
      <h2 class="text-h6">
        <v-icon size="x-small" icon="mdi-hand-heart" />
        {{ $t("Contribute.OtherWaysToContribute") }}
      </h2>
    </v-col>
    <v-col>
      <ul class="pl-4">
        <li>
          <i18n-t keypath="Contribute.FidelityCardGDPRRequest" tag="span">
            <template #gdpr_request_link>
              <a
                :href="OFF_WIKI_GDPR_REQUEST_URL"
                target="_blank"
                rel="noopener noreferrer"
                >{{ $t("Contribute.GDPRRequestLink") }}</a
              >
            </template>
          </i18n-t>
        </li>
        <li>
          <router-link to="/challenges">{{
            $t("Contribute.ParticipateInChallenges")
          }}</router-link>
        </li>
        <li>
          <router-link to="/community">{{
            $t("Contribute.LearnMoreAboutCommunity")
          }}</router-link>
        </li>
        <li>
          <a
            :href="OFF_CONTRIBUTE_URL"
            target="_blank"
            rel="noopener noreferrer"
            >{{ $t("Contribute.ContributeToOFF") }}</a
          >
        </li>
      </ul>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from "vue";
import constants from "../constants";

export default {
  components: {
    ContributeCard: defineAsyncComponent(
      () => import("../components/ContributeCard.vue"),
    ),
  },
  data() {
    return {
      contributeCommonList: [
        {
          name: this.$t("Common.FromPriceTags"),
          description: "",
          background_image_url: constants.PROOF_TYPE_PRICE_TAG_IMAGE_THUMB_URL,
          url: "/proofs/add/price-tags",
        },
        {
          name: this.$t("Common.FromReceipt"),
          description: "",
          background_image_url: constants.PROOF_TYPE_RECEIPT_IMAGE_THUMB_URL,
          url: "/proofs/add/receipt",
        },
        {
          name: this.$t("Common.ValidatePrices"),
          description: "",
          background_image_url: "https://imgur.com/s0lenjt.png",
          url: "/prices/add/validate",
          community: true,
        },
      ],
      PROOF_TYPE_PRICE_TAG_ICON: constants.PROOF_TYPE_PRICE_TAG_ICON,
      PROOF_TYPE_RECEIPT_ICON: constants.PROOF_TYPE_RECEIPT_ICON,
      PROOF_TYPE_GDPR_REQUEST_ICON: constants.PROOF_TYPE_GDPR_REQUEST_ICON,
      OFF_WIKI_GDPR_REQUEST_URL: constants.OFF_WIKI_GDPR_REQUEST_URL,
      OFF_CONTRIBUTE_URL: constants.OFF_CONTRIBUTE_URL,
    };
  },
};
</script>
