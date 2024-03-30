<template>
  <v-menu scroll-strategy="close">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" size="small" rounded="xl" prepend-icon="mdi-arrow-down" :append-icon="getCurrentProductOrderIcon" :active="!!productOrder">{{ $t('Common.Order') }}</v-btn>
    </template>
    <v-list>
      <v-list-item :slim="true" v-for="order in productOrderList" :key="order.key" :prepend-icon="order.icon" :active="productOrder === order.key" @click="selectProductOrder(order.key)">
        {{ $t('Common.' + order.value) }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import constants from '../constants'

export default {
  props: {
    'productOrder': String,
  },
  data() {
    return {
      productOrderList: constants.PRODUCT_ORDER_LIST,
    }
  },
  computed: {
    getCurrentProductOrderIcon() {
      let currentProductOrder = this.productOrderList.find(o => o.key === this.productOrder)
      return currentProductOrder ? currentProductOrder.icon : ''
    },
  },
  emits: ['update:productOrder'],
  methods: {
    selectProductOrder(order) {
      this.$emit('update:productOrder', order)
    }
  }
}
</script>
