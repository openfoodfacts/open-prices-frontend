<template>
  <v-row>
    <v-col>
      <CountTextChip kind="proof" :count="proofTotal" />
      <template v-if="!loading">
        <LoadedCountChip
          :loadedCount="proofList.length"
          :totalCount="proofTotal"
        />
        <FilterMenu
          kind="proof"
          :currentFilterList="currentFilterList"
          :currentType="typeFilter"
          :currentKind="kindFilter"
          :showKind="true"
          @update:currentFilterList="updateFilterList($event)"
          @update:currentType="toggleProofType($event)"
          @update:currentKind="toggleProofKind($event)"
        />
        <CountryFilter
          :currentCountry="countryFilter"
          @update:currentCountry="updateCountryFilter($event)"
        />
        <OrderMenu
          kind="proof"
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
          v-for="proof in proofList"
          :key="proof"
          cols="12"
          sm="6"
          md="4"
          xl="3"
        >
          <ProofCard
            :proof="proof"
            :hideProofHeader="true"
            :showImageThumb="true"
            height="100%"
          />
        </v-col>
      </v-row>
    </v-window-item>
    <v-window-item value="table">
      <ProofTable class="mt-3 mb-3" :proofList="proofList" />
    </v-window-item>
    <v-window-item value="map">
      <v-row class="mt-0 mb-1">
        <v-col style="height: 400px">
          <LeafletMap :locations="proofLocationList" />
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
    ProofCard: defineAsyncComponent(
      () => import("../components/ProofCard.vue"),
    ),
    ProofTable: defineAsyncComponent(
      () => import("../components/ProofTable.vue"),
    ),
    LeafletMap: defineAsyncComponent(
      () => import("../components/LeafletMap.vue"),
    ),
  },
  data() {
    return {
      // data
      proofList: [],
      proofTotal: null,
      proofPage: 0,
      proofLocationList: [],
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
        constants.PROOF_ORDER_LIST[2].key // date
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
    getProofsParams() {
      let defaultParams = {
        owner: this.username,
        order_by: this.currentOrder,
        page: this.proofPage,
      };
      if (this.currentFilterList.includes("hide_price_count_gte_1")) {
        defaultParams["price_count"] = 0;
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
        this.initProofList();
      }
    },
  },
  mounted() {
    this.currentDisplay =
      this.$route.query[constants.DISPLAY_PARAM] ||
      this.appStore.user.price_list_display_default_mode ||
      this.currentDisplay;
    this.initProofList();
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100);
    window.addEventListener("scroll", this.handleDebouncedScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleDebouncedScroll);
  },
  methods: {
    initProofList() {
      this.proofList = [];
      this.proofTotal = null;
      this.proofPage = 0;
      this.proofLocationList = [];
      this.getProofs();
    },
    getProofs() {
      if (this.proofTotal != null && this.proofList.length >= this.proofTotal)
        return;
      this.loading = true;
      this.proofPage += 1;
      return openPricesApi
        .getProofs(this.getProofsParams)
        .then((data) => {
          if (!data.items) return;
          this.proofList.push(...data.items);
          this.proofTotal = data.total;
          data.items.forEach((proof) => {
            if (proof.location) {
              utils.addObjectToArray(this.proofLocationList, proof.location);
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
      // this.initProofList() will be called in watch $route
    },
    updateCountryFilter(countryCode) {
      this.$router.push({
        query: geo_utils.buildCountryFilterQuery(
          this.$route.query,
          countryCode,
        ),
      });
      // this.initProofList() will be called in watch $route
    },
    toggleProofType(sourceKey) {
      this.$router.push({
        query: {
          ...this.$route.query,
          [constants.TYPE_PARAM]:
            this.typeFilter !== sourceKey ? sourceKey : "",
        },
      });
      // this.initProofList() will be called in watch $route
    },
    toggleProofKind(kindKey) {
      this.$router.push({
        query: {
          ...this.$route.query,
          [constants.KIND_PARAM]: this.kindFilter !== kindKey ? kindKey : "",
        },
      });
      // this.initProofList() will be called in watch $route
    },
    updateOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.$router.push({
          query: {
            ...this.$route.query,
            [constants.ORDER_PARAM]: orderKey,
          },
        });
        // this.initProofList() will be called in watch $route
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
      // this.initProofList() will NOT be called in watch $route
    },
    // eslint-disable-next-line no-unused-vars
    handleScroll(event) {
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getProofs();
      }
    },
  },
};
</script>
