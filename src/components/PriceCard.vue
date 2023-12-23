<template>
  <v-card>
    <v-card-item v-if="product" @click="goToProduct(product.id)">
      <template v-slot:prepend>
        <v-avatar rounded="0">
          <v-img v-if="product && product.image_url" :src="product.image_url"></v-img>
          <v-img v-if="!product || !product.image_url" :src="defaultAvatar" style="filter:invert(.9);"></v-img>
        </v-avatar>
      </template>

      <v-card-title>{{ product.product_name || price.product_code }}</v-card-title>

      <v-card-subtitle>
        <span v-if="product.brands">{{ product.brands }}</span>
        <span v-if="product.brands && product.product_quantity"> · </span>
        <span v-if="product.product_quantity">{{ product.product_quantity }} g</span>
        <span v-if="!price && (product.brands || product.product_quantity)"> · </span>
        <span v-if="!price">{{ product.code }}</span>
      </v-card-subtitle>
      <v-card-subtitle v-if="!product"></v-card-subtitle>
    </v-card-item>

    <v-card-text v-if="price">
      <span>{{ getPriceValueDisplay(price.price, price.currency) }}</span>
      <span v-if="product && product.product_quantity"> ({{  getPricePerKilo(price.price, price.currency, product.product_quantity) }})</span>
      <span> · </span>
      <span @click="goToLocation(price.location_id)">{{ getPriceLocationTitle(price) }}</span>
      <span> · </span>
      <span>{{ price.date }}</span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['price', 'product'],
  data() {
    return {
      defaultAvatar: 'https://world.openfoodfacts.org/images/icons/dist/packaging.svg'
    }
  },
  methods: {
    getPriceValueDisplay(priceValue, priceCurrency) {
      return priceValue.toLocaleString(navigator.language, {
        style: 'currency',
        currency: priceCurrency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      })
    },
    getPricePerKilo(priceValue, priceCurrency, productQuantity) {
      let pricePerKilo = (priceValue / productQuantity) * 1000
      return `${this.getPriceValueDisplay(pricePerKilo, priceCurrency)} / kg`
    },
    getPriceLocationTitle(price) {
      if (price.location) {
        return `${price.location.osm_name}, ${price.location.osm_address_city}`
      }
      return price.location_id
    },
    goToProduct(productId) {
      this.$router.push({ path: `/products/${productId}` })
    },
    goToLocation(locationId) {
      this.$router.push({ path: `/locations/${locationId}` })
    }
  }
}
</script>
