<template>
  <v-menu
    v-model="menu"
    scroll-strategy="close"
    :close-on-content-click="false"
  >
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        data-name="country-filter-button"
        size="x-small"
        class="mr-2"
        prepend-icon="mdi-earth"
        :active="!!currentCountry"
        :aria-label="$t('Common.Country')"
      >
        <span v-if="currentCountry">{{ getCountryLabel(currentCountry) }}</span>
        <span v-else-if="$vuetify.display.smAndUp">{{
          $t("Common.Country")
        }}</span>
      </v-btn>
    </template>
    <v-card min-width="280">
      <v-list density="compact" class="d-sm-none pb-0">
        <v-list-item class="text-uppercase" :slim="true" disabled>
          {{ $t("Common.Country") }}
        </v-list-item>
      </v-list>
      <v-card-text>
        <v-autocomplete
          :model-value="currentCountry"
          :label="$t('CountryFilter.Search')"
          :items="countryList"
          item-title="name"
          item-value="country_code_2"
          density="compact"
          hide-details="auto"
          @update:modelValue="selectCountry($event)"
        >
          <template #item="{ props, item }">
            <v-list-item
              v-bind="props"
              :title="`${getCountryEmoji(item.raw.country_code_2)} ${item.raw.name}`"
            />
          </template>
        </v-autocomplete>
      </v-card-text>
      <v-list v-if="currentCountry" density="compact" class="pt-0">
        <v-list-item
          :slim="true"
          prepend-icon="mdi-close"
          @click="selectCountry(null)"
        >
          {{ $t("Common.Clear") }}
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import { mapStores } from "pinia";
import { useAppStore } from "../store";
import data_utils from "../utils/data.js";
import geo_utils from "../utils/geo.js";

export default {
  props: {
    currentCountry: {
      type: String,
      default: null,
      examples: ["FR", "BE"],
    },
  },
  emits: ["update:currentCountry"],
  data() {
    return {
      menu: false,
      countryTags: [], // list of country tags for autocomplete  // see mounted
    };
  },
  computed: {
    ...mapStores(useAppStore),
    userCountry() {
      return this.appStore.getUserCountry;
    },
    countryList() {
      // the user country first, then all the others
      const userCountry = this.countryTags.find(
        (country) => country.country_code_2 === this.userCountry,
      );
      if (!userCountry) return this.countryTags;
      return [
        userCountry,
        { type: "divider" },
        ...this.countryTags.filter((country) => country !== userCountry),
      ];
    },
  },
  mounted() {
    this.setCountryTags();
  },
  methods: {
    setCountryTags() {
      data_utils
        .getLocaleCountryTags(this.appStore.getUserLanguage)
        .then((module) => {
          this.countryTags = module.default.sort((a, b) =>
            a.name.localeCompare(b.name),
          );
        });
    },
    getCountryEmoji(countryCode) {
      return countryCode ? geo_utils.getCountryEmojiFromCode(countryCode) : "";
    },
    getCountryLabel(countryCode) {
      return `${this.getCountryEmoji(countryCode)} ${countryCode}`;
    },
    selectCountry(countryCode) {
      this.menu = false;
      if (countryCode !== this.currentCountry) {
        this.$emit("update:currentCountry", countryCode || null);
      }
    },
  },
};
</script>
