<template>
  <v-row>
    <v-col cols="12" sm="6">
      <LabelCard :label="labelId" :productCount="labelProductTotal" />
    </v-col>
  </v-row>

  <v-tabs v-model="currentTab" :grow="!$vuetify.display.smAndUp">
    <v-tab
      v-for="tab in tabItems"
      :key="tab.key"
      :value="tab.key"
      :prepend-icon="tab.icon"
      :data-name="`${tab.key}-label-tab`"
    >
      {{ $t(`Common.${tab.value}`) }}
    </v-tab>
  </v-tabs>

  <v-tabs-window v-model="currentTab" disabled>
    <v-tabs-window-item value="products">
      <v-row class="mt-1">
        <v-col>
          <h2 class="text-h6 d-inline mr-1">
            {{ $t("Common.TopProducts") }}
          </h2>
          <template v-if="!productLoading">
            <LoadedCountChip
              :loadedCount="labelProductList.length"
              :totalCount="labelProductTotal"
            />
            <FilterMenu
              kind="product"
              :currentFilterList="productFilterList"
              :hideSource="true"
              @update:currentFilterList="updateFilterList($event)"
            />
            <OrderMenu
              kind="product"
              :currentOrder="productOrder"
              @update:currentOrder="updateOrder($event)"
            />
          </template>
        </v-col>
      </v-row>

      <v-row class="mt-0" :dense="$vuetify.display.xs">
        <v-col
          v-for="product in labelProductList"
          :key="product"
          cols="12"
          sm="6"
          md="4"
          xl="3"
        >
          <ProductCard :product="product" elevation="1" height="100%" />
        </v-col>
      </v-row>

      <v-row v-if="productLoading">
        <v-col align="center">
          <v-progress-circular indeterminate :size="30" />
        </v-col>
      </v-row>
    </v-tabs-window-item>

    <v-tabs-window-item value="prices">
      <v-row class="mt-1">
        <v-col>
          <h2 class="text-h6 d-inline mr-1">
            {{ $t("Common.LatestPrices") }}
          </h2>
          <template v-if="!priceLoading">
            <LoadedCountChip
              :loadedCount="labelPriceList.length"
              :totalCount="labelPriceTotal"
            />
            <FilterMenu
              kind="price"
              :currentFilterList="priceFilterList"
              :currentType="priceTypeFilter"
              @update:currentFilterList="updateFilterList($event)"
              @update:currentType="updatePriceType($event)"
            />
            <CountryFilter
              :currentCountry="countryFilter"
              @update:currentCountry="updateCountryFilter($event)"
            />
            <OrderMenu
              kind="price"
              :currentOrder="priceOrder"
              @update:currentOrder="updateOrder($event)"
            />
          </template>
        </v-col>
      </v-row>

      <v-row class="mt-0">
        <v-col
          v-for="price in labelPriceList"
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

      <v-row v-if="priceLoading">
        <v-col align="center">
          <v-progress-circular indeterminate :size="30" />
        </v-col>
      </v-row>
    </v-tabs-window-item>
  </v-tabs-window>
</template>

<script>
import { defineAsyncComponent } from "vue";
import constants from "../constants";
import openPricesApi from "../services/openPricesApi";
import date_utils from "../utils/date.js";
import geo_utils from "../utils/geo.js";
import utils from "../utils.js";

export default {
  components: {
    LabelCard: defineAsyncComponent(
      () => import("../components/LabelCard.vue"),
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
    ProductCard: defineAsyncComponent(
      () => import("../components/ProductCard.vue"),
    ),
    PriceCard: defineAsyncComponent(
      () => import("../components/PriceCard.vue"),
    ),
  },
  data() {
    return {
      labelId: this.$route.params.id,
      tabItems: constants.PRODUCT_PRICE_TAB_LIST,
      // data
      label: null, // see init
      labelProductList: [],
      labelProductTotal: null,
      labelProductPage: 0,
      productLoading: false,
      labelPriceList: [],
      labelPriceTotal: null,
      labelPricePage: 0,
      priceLoading: false,
    };
  },
  computed: {
    currentTab: {
      get() {
        return (
          this.$route.query[constants.TAB_PARAM] || this.tabItems[0].key // products
        );
      },
      set(tab) {
        // switching tab resets the filters & order (they differ between products & prices)
        this.$router.push({ query: { [constants.TAB_PARAM]: tab } });
      },
    },
    currentFilterList() {
      return utils.toArray(this.$route.query[constants.FILTER_PARAM]);
    },
    productFilterList() {
      return this.currentTab === "products" ? this.currentFilterList : [];
    },
    priceFilterList() {
      return this.currentTab === "prices" ? this.currentFilterList : [];
    },
    productOrder() {
      return (
        (this.currentTab === "products" &&
          this.$route.query[constants.ORDER_PARAM]) ||
        constants.PRODUCT_ORDER_LIST[0].key // price_count
      );
    },
    priceOrder() {
      return (
        (this.currentTab === "prices" &&
          this.$route.query[constants.ORDER_PARAM]) ||
        constants.PRICE_ORDER_LIST[1].key // date
      );
    },
    priceTypeFilter() {
      // product prices by default, category prices (e.g. organic loose fruits) on demand
      return (
        this.$route.query[constants.TYPE_PARAM] || constants.PRICE_TYPE_PRODUCT
      );
    },
    countryFilter() {
      return geo_utils.getCountryFilter(this.$route.query);
    },
    getProductsParams() {
      let defaultParams = {
        labels_tags__contains: this.label.id,
        order_by: this.productOrder,
        page: this.labelProductPage,
      };
      if (this.productFilterList.includes("price_count_gte_1")) {
        defaultParams["price_count__gte"] = 1;
      } else if (this.productFilterList.includes("price_count_0")) {
        defaultParams["price_count"] = 0;
      }
      return defaultParams;
    },
    getPricesParams() {
      let defaultParams = {
        type: this.priceTypeFilter,
        order_by: this.priceOrder,
        page: this.labelPricePage,
      };
      if (this.priceTypeFilter === constants.PRICE_TYPE_CATEGORY) {
        defaultParams["labels_tags__contains"] = this.label.id;
      } else {
        defaultParams["product__labels_tags__contains"] = this.label.id;
      }
      if (this.priceFilterList.includes("show_last_month")) {
        defaultParams["date__gte"] = date_utils.oneMonthAgoDate();
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
      if (
        oldRoute &&
        newRoute &&
        newRoute.name == "label-detail" &&
        oldRoute.fullPath != newRoute.fullPath
      ) {
        if (oldRoute.params.id !== newRoute.params.id) {
          this.initLabel();
        } else if (this.currentTab === "prices") {
          this.initPrices();
        } else {
          this.initProducts();
        }
      }
    },
  },
  mounted() {
    this.initLabel();
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100);
    window.addEventListener("scroll", this.handleDebouncedScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleDebouncedScroll);
  },
  methods: {
    initLabel() {
      this.labelId = this.$route.params.id;
      this.label = { id: this.labelId, name: this.labelId };
      // always load the products: their total is shown in the LabelCard
      this.initProducts();
      if (this.currentTab === "prices") {
        this.initPrices();
      }
    },
    initProducts() {
      this.labelProductList = [];
      this.labelProductTotal = null;
      this.labelProductPage = 0;
      this.getLabelProducts();
    },
    initPrices() {
      this.labelPriceList = [];
      this.labelPriceTotal = null;
      this.labelPricePage = 0;
      this.getLabelPrices();
    },
    getLabelProducts() {
      if (
        this.labelProductTotal != null &&
        this.labelProductList.length >= this.labelProductTotal
      )
        return;
      this.productLoading = true;
      this.labelProductPage += 1;
      return openPricesApi
        .getProducts(this.getProductsParams)
        .then((data) => {
          if (!data.items) return;
          this.labelProductList.push(...data.items);
          this.labelProductTotal = data.total;
        })
        .finally(() => {
          this.productLoading = false;
        });
    },
    getLabelPrices() {
      if (
        this.labelPriceTotal != null &&
        this.labelPriceList.length >= this.labelPriceTotal
      )
        return;
      this.priceLoading = true;
      this.labelPricePage += 1;
      return openPricesApi
        .getPrices(this.getPricesParams)
        .then((data) => {
          if (!data.items) return;
          this.labelPriceList.push(...data.items);
          this.labelPriceTotal = data.total;
        })
        .finally(() => {
          this.priceLoading = false;
        });
    },
    updateFilterList(newFilterList) {
      this.$router.push({
        query: {
          ...this.$route.query,
          [constants.FILTER_PARAM]: newFilterList,
        },
      });
      // this.initProducts() or this.initPrices() will be called in watch $route
    },
    updateOrder(orderKey) {
      this.$router.push({
        query: {
          ...this.$route.query,
          [constants.ORDER_PARAM]: orderKey,
        },
      });
      // this.initProducts() or this.initPrices() will be called in watch $route
    },
    updatePriceType(typeKey) {
      // clicking the selected type again goes back to the default (product prices)
      const newType =
        this.priceTypeFilter !== typeKey
          ? typeKey
          : constants.PRICE_TYPE_PRODUCT;
      this.$router.push({
        query: {
          ...this.$route.query,
          [constants.TYPE_PARAM]:
            newType !== constants.PRICE_TYPE_PRODUCT ? newType : undefined,
        },
      });
      // this.initPrices() will be called in watch $route
    },
    updateCountryFilter(countryCode) {
      this.$router.push({
        query: geo_utils.buildCountryFilterQuery(
          this.$route.query,
          countryCode,
        ),
      });
      // this.initPrices() will be called in watch $route
    },
    // eslint-disable-next-line no-unused-vars
    handleScroll(event) {
      if (utils.getDocumentScrollPercentage() > 90) {
        if (this.currentTab === "prices") {
          this.getLabelPrices();
        } else {
          this.getLabelProducts();
        }
      }
    },
  },
};
</script>
