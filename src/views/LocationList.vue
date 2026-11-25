<template>
  <v-row>
    <v-col>
      <CountTextChip kind="location" :count="locationTotal" />
      <template v-if="!loading">
        <LoadedCountChip
          :loadedCount="locationList.length"
          :totalCount="locationTotal"
        />
        <FilterMenu
          kind="location"
          :currentFilterList="currentFilterList"
          :currentType="typeFilter"
          @update:currentFilterList="updateFilterList($event)"
          @update:currentType="toggleLocationType($event)"
        />
        <CountryFilter
          :currentCountry="countryFilter"
          @update:currentCountry="updateCountryFilter($event)"
        />
        <OrderMenu
          kind="location"
          :currentOrder="currentOrder"
          @update:currentOrder="updateOrder($event)"
        />
      </template>
    </v-col>
  </v-row>

  <v-row class="mt-0" :dense="$vuetify.display.xs">
    <v-col
      v-for="location in locationList"
      :key="location"
      cols="12"
      sm="6"
      md="4"
      xl="3"
    >
      <LocationCard :location="location" height="100%" />
    </v-col>
  </v-row>

  <v-row v-if="loading">
    <v-col align="center">
      <v-progress-circular indeterminate :size="30" />
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from "vue";
import openPricesApi from "../services/openPricesApi";
import constants from "../constants";
import geo_utils from "../utils/geo.js";
import utils from "../utils.js";

export default {
  components: {
    CountTextChip: defineAsyncComponent(
      () => import("../components/CountTextChip.vue"),
    ),
    LoadedCountChip: defineAsyncComponent(
      () => import("../components/LoadedCountChip.vue"),
    ),
    FilterMenu: defineAsyncComponent(
      () => import("../components/FilterMenu.vue"),
    ),
    CountryFilter: defineAsyncComponent(
      () => import("../components/CountryFilter.vue"),
    ),
    OrderMenu: defineAsyncComponent(
      () => import("../components/OrderMenu.vue"),
    ),
    LocationCard: defineAsyncComponent(
      () => import("../components/LocationCard.vue"),
    ),
  },
  data() {
    return {
      // data
      locationList: [],
      locationTotal: null,
      locationPage: 0,
      loading: false,
    };
  },
  computed: {
    currentOrder() {
      return (
        this.$route.query[constants.ORDER_PARAM] ||
        constants.LOCATION_ORDER_LIST[0].key // price_count
      );
    },
    currentFilterList() {
      return utils.toArray(this.$route.query[constants.FILTER_PARAM]);
    },
    typeFilter() {
      return this.$route.query[constants.TYPE_PARAM] || "";
    },
    countryFilter() {
      return geo_utils.getCountryFilter(this.$route.query);
    },
    getLocationsParams() {
      let defaultParams = {
        order_by: this.currentOrder,
        page: this.locationPage,
      };
      if (this.currentFilterList.includes("hide_price_count_gte_1")) {
        defaultParams["price_count"] = 0;
      }
      if (this.typeFilter) {
        defaultParams[constants.TYPE_PARAM] = this.typeFilter;
      }
      if (this.countryFilter) {
        defaultParams["osm_address_country_code"] = this.countryFilter;
      }
      return defaultParams;
    },
  },
  watch: {
    $route(newRoute, oldRoute) {
      // only called when query changes to avoid having an API call when the path changes
      if (
        oldRoute.path === newRoute.path &&
        JSON.stringify(oldRoute.query) !== JSON.stringify(newRoute.query)
      ) {
        this.initLocationList();
      }
    },
  },
  mounted() {
    this.initLocationList();
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100);
    window.addEventListener("scroll", this.handleDebouncedScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleDebouncedScroll);
  },
  methods: {
    initLocationList() {
      this.locationList = [];
      this.locationTotal = null;
      this.locationPage = 0;
      this.getLocations();
    },
    getLocations() {
      if (
        this.locationTotal != null &&
        this.locationList.length >= this.locationTotal
      )
        return;
      this.loading = true;
      this.locationPage += 1;
      return openPricesApi
        .getLocations(this.getLocationsParams)
        .then((data) => {
          if (!data.items) return;
          this.locationList.push(...data.items);
          this.locationTotal = data.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    updateFilterList(newFilterList) {
      this.$router.push({
        query: {
          ...this.$route.query,
          [constants.FILTER_PARAM]: newFilterList,
        },
      });
      // this.initLocationList() will be called in watch $route
    },
    updateCountryFilter(countryCode) {
      this.$router.push({
        query: geo_utils.buildCountryFilterQuery(
          this.$route.query,
          countryCode,
        ),
      });
      // this.initLocationList() will be called in watch $route
    },
    toggleLocationType(sourceKey) {
      this.$router.push({
        query: {
          ...this.$route.query,
          [constants.TYPE_PARAM]:
            this.typeFilter !== sourceKey ? sourceKey : "",
        },
      });
      // this.initLocationList() will be called in watch $route
    },
    updateOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.$router.push({
          query: {
            ...this.$route.query,
            [constants.ORDER_PARAM]: orderKey,
          },
        });
        // this.initLocationList() will be called in watch $route
      }
    },
    // eslint-disable-next-line no-unused-vars
    handleScroll(event) {
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getLocations();
      }
    },
  },
};
</script>
