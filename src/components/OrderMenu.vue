<template>
  <v-menu scroll-strategy="close">
    <template #activator="{ props }">
      <v-btn v-bind="props" size="x-small" class="mr-2" prepend-icon="mdi-arrow-down" :append-icon="getCurrentOrderIcon" :active="!!currentOrder">
        <span v-if="$vuetify.display.smAndUp">{{ $t('Common.Order') }}</span>
      </v-btn>
    </template>
    <v-list>
      <v-list-item class="d-sm-none" :slim="true" disabled>
        {{ $t('Common.Order') }}
      </v-list-item>
      <v-divider class="d-sm-none" />
      <v-list-item v-for="order in orderList" :key="order.key" :slim="true" :prepend-icon="order.icon" :active="currentOrder === order.key" @click="selectOrder(order.key)">
        {{ $t('Common.' + order.value) }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import constants from '../constants'

export default {
  props: {
    currentOrder: {
      type: String,
      default: null
    },
    kind: {
      type: String,
      default: 'product',
      examples: ['product', 'price', 'proof', 'user']
    }
  },
  emits: ['update:currentOrder'],
  data() {
    return {
      productOrderList: constants.PRODUCT_ORDER_LIST,
      priceOrderList: constants.PRICE_ORDER_LIST,
      proofOrderList: constants.PROOF_ORDER_LIST,
      userOrderList: constants.USER_ORDER_LIST,
    }
  },
  computed: {
    orderList() {
      return this[`${this.kind}OrderList`]
    },
    getCurrentOrderIcon() {
      let order = this.orderList.find(o => o.key === this.currentOrder)
      return order ? order.icon : ''
    },
  },
  methods: {
    selectOrder(order) {
      this.$emit('update:currentOrder', order)
    }
  }
}
</script>
