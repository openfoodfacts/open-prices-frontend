<template>
  <v-row>
    <v-col>
      <CountTextChip kind="price" :count="priceTotal" />
      <template v-if="!loading">
        <LoadedCountChip
          :loadedCount="priceList.length"
          :totalCount="priceTotal"
        />
        <FilterMenu
          kind="price"
          :currentFilterList="currentFilterList"
          :currentType="typeFilter"
          :currentKind="kindFilter"
          :showKind="true"
          @update:currentFilterList="updateFilterList($event)"
          @update:currentType="togglePriceType($event)"
          @update:currentKind="togglePriceKind($event)"
        />
        <CountryFilter
          :currentCountry="countryFilter"
          @update:currentCountry="updateCountryFilter($event)"
        />
        <OrderMenu
          kind="price"
          :currentOrder="currentOrder"
          @update:currentOrder="updateOrder($event)"
        />
        <DisplayMenu
          :show="['list', 'table', 'map']"
          :currentDisplay="currentDisplay"
          @update:currentDisplay="updateDisplay($event)"
        />
      </template>
    </v-col>
  </v-row>

  <v-window v-model="currentDisplay" disabled>
    <v-window-item value="list">
      <v-row class="mt-0 mb-1">
        <v-col
          v-for="price in priceList"
          :key="price"
          cols="12"
          sm="6"
          md="4"
          xl="3"
        >
          <PriceCard
            :price="price"
            :product="price.product"
            elevation="1"
            height="100%"
          />
        </v-col>
      </v-row>
    </v-window-item>
    <v-window-item value="table">
      <PriceTable class="mt-3 mb-3" :priceList="priceList" source="user" />
    </v-window-item>
    <v-window-item value="map">
      <v-row class="mt-0 mb-1">
        <v-col style="height: 400px">
          <LeafletMap :locations="priceLocationList" />
        </v-col>
      </v-row>
    </v-window-item>
  </v-window>

  <v-row v-if="loading">
    <v-col align="center">
      <v-progress-circular indeterminate :size="30" />
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapStores } from "pinia";
import { useAppStore } from "../store";
import openPricesApi from "../services/openPricesApi";
import constants from "../constants";
import date_utils from "../utils/date.js";
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
    DisplayMenu: defineAsyncComponent(
      () => import("../components/DisplayMenu.vue"),
    ),
    PriceCard: defineAsyncComponent(
      () => import("../components/PriceCard.vue"),
    ),
    PriceTable: defineAsyncComponent(
      () => import("../components/PriceTable.vue"),
    ),
    LeafletMap: defineAsyncComponent(
      () => import("../components/LeafletMap.vue"),
    ),
  },
  data() {
    return {
      // data
      priceList: [],
      priceTotal: null,
      pricePage: 0,
      priceLocationList: [],
      loading: false,
      // display
      currentDisplay: constants.DISPLAY_LIST[0].key, // list
    };
  },
  computed: {
    ...mapStores(useAppStore),
    currentOrder() {
      return (
        this.$route.query[constants.ORDER_PARAM] ||
        constants.PRICE_ORDER_LIST[2].key // created first
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
    kindFilter() {
      return this.$route.query[constants.KIND_PARAM] || "";
    },
    username() {
      return this.appStore.user.username;
    },
    getPricesParams() {
      let defaultParams = {
        owner: this.username,
        order_by: this.currentOrder,
        page: this.pricePage,
      };
      if (this.currentFilterList.includes("show_last_month")) {
        defaultParams["date__gte"] = date_utils.oneMonthAgoDate();
      }
      if (this.typeFilter) {
        defaultParams[constants.TYPE_PARAM] = this.typeFilter;
      }
      if (this.kindFilter) {
        defaultParams[constants.KIND_PARAM] = this.kindFilter;
      }
      if (this.countryFilter) {
        defaultParams["location__osm_address_country_code"] =
          this.countryFilter;
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
        this.initPriceList();
      }
    },
  },
  mounted() {
    this.currentDisplay =
      this.$route.query[constants.DISPLAY_PARAM] ||
      this.appStore.user.price_list_display_default_mode ||
      this.currentDisplay;
    this.initPriceList();
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100);
    window.addEventListener("scroll", this.handleDebouncedScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleDebouncedScroll);
  },
  methods: {
    initPriceList() {
      this.priceList = [];
      this.priceTotal = null;
      this.pricePage = 0;
      this.priceLocationList = [];
      this.getPrices();
    },
    getPrices() {
      if (this.priceTotal != null && this.priceList.length >= this.priceTotal)
        return;
      this.loading = true;
      this.pricePage += 1;
      return openPricesApi
        .getPrices(this.getPricesParams)
        .then((data) => {
          if (!data.items) return;
          this.priceList.push(...data.items);
          this.priceTotal = data.total;
          data.items.forEach((price) => {
            if (price.location) {
              utils.addObjectToArray(this.priceLocationList, price.location);
            }
          });
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
      // this.initPriceList() will be called in watch $route
    },
    updateCountryFilter(countryCode) {
      this.$router.push({
        query: geo_utils.buildCountryFilterQuery(
          this.$route.query,
          countryCode,
        ),
      });
      // this.initPriceList() will be called in watch $route
    },
    togglePriceType(typeKey) {
      this.$router.push({
        query: {
          ...this.$route.query,
          [constants.TYPE_PARAM]: this.typeFilter !== typeKey ? typeKey : "",
        },
      });
      // this.initPriceList() will be called in watch $route
    },
    togglePriceKind(kindKey) {
      this.$router.push({
        query: {
          ...this.$route.query,
          [constants.KIND_PARAM]: this.kindFilter !== kindKey ? kindKey : "",
        },
      });
      // this.initPriceList() will be called in watch $route
    },
    updateOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.$router.push({
          query: {
            ...this.$route.query,
            [constants.ORDER_PARAM]: orderKey,
          },
        });
        // this.initPriceList() will be called in watch $route
      }
    },
    updateDisplay(displayKey) {
      this.currentDisplay = displayKey;
      this.$router.push({
        query: {
          ...this.$route.query,
          [constants.DISPLAY_PARAM]: this.currentDisplay,
        },
      });
      // this.initPriceList() will NOT be called in watch $route
    },
    // eslint-disable-next-line no-unused-vars
    handleScroll(event) {
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getPrices();
      }
    },
  },
};
</script>
