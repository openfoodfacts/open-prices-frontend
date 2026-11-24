<template>
  <v-menu scroll-strategy="close">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        size="x-small"
        class="mr-2"
        :prepend-icon="getCurrentOrderDirectionIcon"
        :append-icon="getCurrentOrderIcon"
        :active="!!currentOrder"
      >
        <span v-if="$vuetify.display.smAndUp">{{
          $t("Common.OrderNoun")
        }}</span>
      </v-btn>
    </template>
    <v-list>
      <v-list-item class="d-sm-none text-uppercase" :slim="true" disabled>
        {{ $t("Common.OrderNoun") }}
      </v-list-item>
      <v-divider class="d-sm-none" />
      <v-list-item
        v-for="order in orderList"
        :key="order.key"
        :slim="true"
        :prepend-icon="order.icon"
        :append-icon="
          isCurrentOrder(order) ? getCurrentOrderDirectionIcon : undefined
        "
        :active="isCurrentOrder(order)"
        @click="selectOrder(order)"
      >
        {{ $t("Common." + order.value) }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import constants from "../constants";
import order_utils from "../utils/order.js";

export default {
  props: {
    currentOrder: {
      type: String,
      default: null,
    },
    kind: {
      type: String,
      default: "product",
      examples: [
        "product",
        "price",
        "proof",
        "location",
        "country",
        "user",
        "flag",
      ],
    },
  },
  emits: ["update:currentOrder"],
  data() {
    return {
      productOrderList: constants.PRODUCT_ORDER_LIST,
      productCreateOrderList: constants.PRODUCT_CREATE_ORDER_LIST,
      priceOrderList: constants.PRICE_ORDER_LIST,
      proofOrderList: constants.PROOF_ORDER_LIST,
      locationOrderList: constants.LOCATION_ORDER_LIST,
      countryOrderList: constants.LOCATION_COUNTRY_ORDER_LIST,
      userOrderList: constants.USER_ORDER_LIST,
      flagOrderList: constants.MODERATION_FLAG_ORDER_LIST,
    };
  },
  computed: {
    orderList() {
      return this[`${this.kind}OrderList`];
    },
    getCurrentOrderIcon() {
      let order = this.orderList.find((o) => this.isCurrentOrder(o));
      return order ? order.icon : "";
    },
    getCurrentOrderDirectionIcon() {
      return this.currentOrder && !order_utils.isOrderDesc(this.currentOrder)
        ? "mdi-arrow-up"
        : "mdi-arrow-down";
    },
  },
  methods: {
    isCurrentOrder(order) {
      // same field, whatever the direction (e.g. "-date,-created" & "date,created")
      return (
        !!this.currentOrder &&
        order_utils.getOrderField(order.key) ===
          order_utils.getOrderField(this.currentOrder)
      );
    },
    selectOrder(order) {
      // clicking the current order again reverses it
      this.$emit(
        "update:currentOrder",
        this.isCurrentOrder(order)
          ? order_utils.reverseOrder(this.currentOrder)
          : order.key,
      );
    },
  },
};
</script>
