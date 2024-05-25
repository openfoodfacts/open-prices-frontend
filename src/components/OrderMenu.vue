<template>
  <v-menu scroll-strategy="close">
    <template #activator="{ props }">
      <v-btn v-bind="props" size="x-small" rounded="xl" prepend-icon="mdi-arrow-down" :append-icon="getCurrentOrderIcon" :active="!!currentOrder">
        {{ $t('Common.Order') }}
      </v-btn>
    </template>
    <v-list>
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
      default: 'product'
    }
  },
  emits: ['update:currentOrder'],
  data() {
    return {
      productOrderList: constants.PRODUCT_ORDER_LIST,
      priceOrderList: constants.PRICE_ORDER_LIST,
    }
  },
  computed: {
    orderList() {
      return this.kind === 'product' ? this.productOrderList : this.priceOrderList
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
