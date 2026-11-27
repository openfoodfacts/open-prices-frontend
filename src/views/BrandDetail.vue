<template>
  <v-row>
    <v-col cols="12" sm="6">
      <BrandCard
        :brand="brandId"
        :brandName="brandName"
        :productCount="brandProductTotal"
      />
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col>
      <v-tabs v-model="currentTab" :grow="!$vuetify.display.smAndUp">
        <v-tab
          v-for="tab in tabItems"
          :key="tab.key"
          :value="tab.key"
          :prepend-icon="tab.icon"
          :data-name="`${tab.key}-brand-tab`"
        >
          {{ $t(`Common.${tab.value}`) }}
        </v-tab>
      </v-tabs>
    </v-col>
  </v-row>

  <v-tabs-window v-model="currentTab" disabled>
    <v-tabs-window-item value="products">
      <v-row class="mt-1">
        <v-col>
          <template v-if="!productLoading">
            <LoadedCountChip
              :loadedCount="brandProductList.length"
              :totalCount="brandProductTotal"
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
          v-for="product in brandProductList"
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
          <template v-if="!priceLoading">
            <LoadedCountChip
              :loadedCount="brandPriceList.length"
              :totalCount="brandPriceTotal"
            />
            <FilterMenu
              kind="price"
              :currentFilterList="priceFilterList"
              :hideType="true"
              @update:currentFilterList="updateFilterList($event)"
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

      <v-row class="mt-0" :dense="$vuetify.display.xs">
        <v-col
          v-for="price in brandPriceList"
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
    BrandCard: defineAsyncComponent(
      () => import("../components/BrandCard.vue"),
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
      brandId: this.$route.params.id,
      tabItems: constants.PRODUCT_PRICE_TAB_LIST,
      // data
      brandProductList: [],
      brandProductTotal: null,
      brandProductPage: 0,
      productLoading: false,
      brandPriceList: [],
      brandPriceTotal: null,
      brandPricePage: 0,
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
    brandName() {
      // the brand as typed, from the first product (brands & brands_tags are in the same order)
      const product = this.brandProductList[0];
      if (!product || !product.brands || !product.brands_tags) return null;
      const brandNames = product.brands.split(",").filter((b) => b.trim());
      const brandIndex = product.brands_tags.indexOf(this.brandId);
      if (brandNames.length !== product.brands_tags.length || brandIndex < 0)
        return null;
      return brandNames[brandIndex].trim();
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
    countryFilter() {
      return geo_utils.getCountryFilter(this.$route.query);
    },
    getProductsParams() {
      let defaultParams = {
        brands_tags__contains: this.brandId, // e.g. "xx:albert-heijn"
        order_by: this.productOrder,
        page: this.brandProductPage,
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
        // only product prices (category prices have no brand)
        product__brands_tags__contains: this.brandId,
        order_by: this.priceOrder,
        page: this.brandPricePage,
      };
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
        newRoute.name == "brand-detail" &&
        oldRoute.fullPath != newRoute.fullPath
      ) {
        if (oldRoute.params.id !== newRoute.params.id) {
          this.initBrand();
        } else if (this.currentTab === "prices") {
          this.initPrices();
        } else {
          this.initProducts();
        }
      }
    },
  },
  mounted() {
    this.initBrand();
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100);
    window.addEventListener("scroll", this.handleDebouncedScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleDebouncedScroll);
  },
  methods: {
    initBrand() {
      this.brandId = this.$route.params.id;
      // always load the products: their total (and the brand name) are shown in the BrandCard
      this.initProducts();
      if (this.currentTab === "prices") {
        this.initPrices();
      }
    },
    initProducts() {
      this.brandProductList = [];
      this.brandProductTotal = null;
      this.brandProductPage = 0;
      this.getBrandProducts();
    },
    initPrices() {
      this.brandPriceList = [];
      this.brandPriceTotal = null;
      this.brandPricePage = 0;
      this.getBrandPrices();
    },
    getBrandProducts() {
      if (
        this.brandProductTotal != null &&
        this.brandProductList.length >= this.brandProductTotal
      )
        return;
      this.productLoading = true;
      this.brandProductPage += 1;
      return openPricesApi
        .getProducts(this.getProductsParams)
        .then((data) => {
          if (!data.items) return;
          this.brandProductList.push(...data.items);
          this.brandProductTotal = data.total;
        })
        .finally(() => {
          this.productLoading = false;
        });
    },
    getBrandPrices() {
      if (
        this.brandPriceTotal != null &&
        this.brandPriceList.length >= this.brandPriceTotal
      )
        return;
      this.priceLoading = true;
      this.brandPricePage += 1;
      return openPricesApi
        .getPrices(this.getPricesParams)
        .then((data) => {
          if (!data.items) return;
          this.brandPriceList.push(...data.items);
          this.brandPriceTotal = data.total;
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
          this.getBrandPrices();
        } else {
          this.getBrandProducts();
        }
      }
    },
  },
};
</script>
