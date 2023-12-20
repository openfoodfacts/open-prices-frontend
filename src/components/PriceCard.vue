<template>
  <v-card>
    <v-card-item>
      <template v-slot:prepend>
        <v-avatar rounded="0">
          <v-img v-if="price.product && price.product.image_url" :src="price.product.image_url"></v-img>
          <v-img v-if="!price.product || !price.product.image_url" :src="defaultAvatar" style="filter:invert(.9);"></v-img>
        </v-avatar>
      </template>

      <v-card-title v-if="price.product && price.product.product_name">{{ price.product.product_name }}</v-card-title>
      <v-card-title v-if="!price.product || !price.product.product_name">{{ price.product_code }}</v-card-title>

      <v-card-subtitle v-if="price.product">
        <span v-if="price.product.brands">{{ price.product.brands }}</span>
        <span v-if="price.product.brands && price.product.product_quantity"> · </span>
        <span v-if="price.product.product_quantity">{{ price.product.product_quantity }} g</span>
      </v-card-subtitle>
      <v-card-subtitle v-if="!price.product"></v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <span>{{ price.price }} €</span>
      <span v-if="price.price && price.product && price.product.product_quantity"> ({{  getPricePerKilo(price) }})</span>
      <span> · </span>
      <span v-if="price.location">{{ price.location.osm_name }}, {{ price.location.osm_address_city }}</span>
      <span v-if="!price.location">{{ price.location_id }}</span>
      <span> · </span>
      <span>{{ price.date }}</span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['price'],
  data() {
    return {
      defaultAvatar: 'https://world.openfoodfacts.org/images/icons/dist/packaging.svg'
    }
  },
  methods: {
    getPricePerKilo(price) {
      let pricePerKilo = (price.price / price.product.product_quantity) * 1000
      let pricePerKiloRounded = Math.round(pricePerKilo * 100) / 100
      return `${pricePerKiloRounded} € / kg`
    }
  }
}
</script>
